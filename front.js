var main = function () {
	"use strict";

	// GET/READ
	$('#get_articles').on('click', function() {
		$.ajax({
			url: '/get_articles',
			contentType: "application/json",
			success: function(response) {
				var $results = $("#info");

				$results.html('');
				response.forEach(function (article) {
					var $section = $("<article>")
					var $date = $("<h3>");
					var $title = $("<h2>");
					var $abstract = $("<p>");
					var $url = $("<p>");

					$date.text(article.published_date);
					$title.text(article.title);
					$abstract.text(article.abstract);
					$url.text(article.url);


					$section.append($date);
					$section.append($title);
					$section.append($abstract);
					$section.append($url);
					$section.append("----------------------------");
					$("#info").append($section);

				});
			}
		});
	});

	$('#get_authors').on('click', function () {
		$.ajax({
			url: '/get_authors',
			contentType: "application/json",
			success: function (response) {
				var $results = $("#info");
				$results.html('');

				var $ul = $("<ul>");
				response.forEach(function (name) {
					var $li = $("<li>");
					$li.text(name);
					$ul.append($li);
				});
				$ul.appendTo($results);
			}
		});
	});

	$('#get_urls').on('click', function() {
		$.ajax({
			url: '/get_urls',
			contentType: "application/json",
			success: function (response) {
				var $results = $("#info");
				$results.html('');

				for (var key in response) {
					$results.append(key);
					var $ul = $("<ul>");
					response[key].forEach(function(url) {
						var $li = $("<li>");
						$li.text(url);
						$ul.append($li);
					});
					$results.append($ul);
				}
			}
		});
	});

	$('#get_tags').on('click', function() {
		$.ajax({
			url: '/get_tags',
			contentType: "application/json",
			success: function (response) {
				var $results = $("#info");
				$results.html('');

				var $cloud = $('<p>');
				$results.append($cloud);
				var total = response["total"];
				delete response["total"];

				for (var key in response) {
					var $span = $("<span>");
					//var tag = key.fontsize((response[key]/total) + 3);
					//console.log("the function is " + (response[key]/total) + 1);
					//console.log(response[key]);
					$span.append("  " + key + "  ");
					var size = String((response[key]/total) * 100) + "%";
					console.log((response[key]/total) * 100);
					
					$cloud.append($span);
					$span.css("fontSize", "+=" + size);

				}
				$cloud.css("fontSize", "100%");
				$cloud.css('text-align','center');
				$("span").css("padding", "10px");
			}
		});
	});

	$('#get_details').on('click', function() {
		$.ajax({
			url: "/get_details",
			contentType: "application/json",
			success: function (response) {
				$("#info").html('');
				var $header = $("<p>").text("Article Index: ").appendTo("#info");


				/*var $input = $("<input>").attr("type", "number").attr("name", "index");
				$input.attr("value", "0").appendTo("#info");*/

				var $input = $("<select>").appendTo("#info");
				for (var i = 0; i < response.obj_num; i++) {
					var $option = $("<option>").val(i).text(i);
					$input.append($option);
				}


				var $button = $("<button>").attr("id", "get_index");
				$button.text("GET ARTICLE WITH INDEX").appendTo("#info");

				var $warning = $("<p>").attr("id", "warning").text("Please choose an index between 0 and " + (response.obj_num - 1) + ".");
				$("#info").append($warning);

				var $article = $("<article>").appendTo("#info");

			}

		});
	});

	$('#info').on('click', '#get_index', function() {
		var index = $('select').val();
		console.log(index);
		$.ajax({
			url: "/get_index",
			dataType: "json",
			contentType: "application/json",
			method: 'GET',
			data: {"index":index},
			success: function (response) {
				//$results.html('');
				if (Object.keys(response).length !== 0) {
					var $article = $("article")
					$article.html('');
					var $date = $("<h5>");
					var $title = $("<h2>");
					var $section = $("<h3>");
					var $subsection = $("<h4>");
					var $by_line = $("<h6>");
					var $abstract = $("<p>");
					var $tags = $("<p>");

					$date.text("Published date: " + response.published_date);
					$title.text(response.title);
					$section.text(response.section);
					$subsection.text(response.subsection);
					$by_line.text(response.byline);
					$abstract.text(response.abstract);
					$tags.text("Tags: ");

					$article.append($title).append($abstract)
					.append($date).append($by_line).append($section).append($subsection).append($tags);

					var string = "";
					response.des_facet.forEach(function (tag) {
						string += tag + ", ";
					});
					console.log(string);
					string = string.slice(0, -2);
					$tags.append(string);

				}

				else {
					$("#warning").prepend("The index you have entered is undefined. ");
					$("article").html('');
				}

			
			}
		});
	});

	$('#get_imgs').on('click', function() {
		$.ajax({
			url: "/get_imgs",
			contentType: "application/json",
			success: function (response) {
				var placeholder = response["placeholder"];
				delete response["placeholder"];
				for (var key in response) {
				
					var url = response[key][0];
					var img_url = response[key][1];

					var $a = $("<a>").attr("href", url).attr("target","_blank").appendTo("#info");

					if (img_url == placeholder) {
						var $new_div = $("<div>").appendTo($a).height(100).width(100).css("display", "inline-block");
						$new_div.css("vertical-align", "top");
						$new_div.css("background-image", "url(" + placeholder + ")");
						$new_div.css("background-size", "100px 100px");
						$new_div.css("text-align", "center");
						console.log("url(" + placeholder + ")");
						$new_div.append(key);
					}

					else {
						var $img = $("<img>").attr("src", img_url).appendTo($a);
						$img.width(100).height(100).attr("alt", key);
					}
				}
			}

		});
	});

}

$(document).ready(main);









