var main = function () {
	"use strict";

	// GET/READ
	$('#usage').on('click', function() {
		$("#nav_usage").css("display", "block");
		$("#nav_demo").css("display", "none");
		$("#info").html('');
	});

	$('#demo').on('click', function() {

		$("#nav_demo").css("display", "block");
		$("#nav_usage").css("display", "none");
		$("[id^=usage-]").css("display", "none");
	});

	$('#us_articles').on('click', function() {
		$("[id^=usage-]").css("display", "none");
		$("[id^=usage-articles]").css("display", "block");
	});

	$('#us_authors').on('click', function() {
		$("[id^=usage-]").css("display", "none");
		$("[id^=usage-authors]").css("display", "block");
	});

	$('#us_urls').on('click', function() {
		$("[id^=usage-]").css("display", "none");
		$("[id^=usage-urls]").css("display", "block");
	});

	$('#us_tags').on('click', function() {
		$("[id^=usage-]").css("display", "none");
		$("[id^=usage-tags]").css("display", "block");
	});

	$('#us_index').on('click', function() {
		$("[id^=usage-]").css("display", "none");
		$("[id^=usage-index]").css("display", "block");
	});

	$('#us_imgs').on('click', function() {
		$("[id^=usage-]").css("display", "none");
		$("[id^=usage-images]").css("display", "block");
	});
	
	$('#get_articles').on('click', function() {
		$.ajax({
			url: '/articles',
			contentType: "application/json",
			success: function(response) {
				console.log(response);
				var $results = $("#info");
				var articles = response.articles;
				$results.html('');
				articles.forEach(function (article) {
					var $section = $("<section>");
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
					$("#info").append($section);

				});
			}
		});
	});

	$('#get_authors').on('click', function () {
		$.ajax({
			url: '/authors',
			contentType: "application/json",
			success: function (response) {
				var $results = $("#info");
				$results.html('');

				var $ul = $("<ul>").attr("id", "authors");
				response["authors"].forEach(function (name_obj) {
					var $li = $("<li>");
					$li.text(name_obj);
					$ul.append($li);
				});
				$ul.appendTo($results);
			}
		});
	});

	$('#get_urls').on('click', function() {
		$.ajax({
			url: '/short_urls',
			contentType: "application/json",
			success: function (response) {
				$("#info").html('');
				var $results = $("<div>").appendTo("#info").attr("id", "url_results");
				for (var key in response) {
					$results.append("Published date: " + key);
					var $ul = $("<ul>");
					response[key].forEach(function(url) {
						var $li = $("<li>");
						var $a = $("<a>").attr("href", url).appendTo($li);
						$a.text(url);
						$ul.append($li);
					});
					$results.append($ul);
				}
			}
		});
	});

	$('#get_tags').on('click', function() {
		$.ajax({
			url: '/tags',
			contentType: "application/json",
			success: function (response) {
				var $results = $("#info");
				$results.html('');

				var $cloud = $('<p>');
				$cloud.css("fontSize", "125%");
				$results.append($cloud);
				var total = response["total"];
				delete response["total"];

				for (var key in response) {
					var $span = $("<span>");
					$span.append("  " + key + "  ");
					var size = String((response[key]/total) * 1000) + "%";
					$cloud.append($span);
					$span.css("fontSize", "+=" + size);

				}
				
				$cloud.css('text-align','center');
				$("span").css("padding", "10px");
			}
		});
	});

	$('#get_index').on('click', function() {
		$.ajax({
			url: "/get_index",
			contentType: "application/json",
			success: function (response) {
				$("#info").html('');
				var $section = $("<section>").appendTo("#info");
				var $header = $("<p>").text("Article Index: ").appendTo($section);

				var $input = $("<select>").appendTo($section);
				for (var i = 0; i < response.obj_num; i++) {
					var $option = $("<option>").val(i).text(i);
					$input.append($option);
				}


				var $button = $("<button>").attr("id", "get_details");
				$button.text("Submit").appendTo($section);

				var $article = $("<section>").attr("id", "article_container").appendTo("#info").hide();

			}

		});
	});

	$('#info').on('click', '#get_details', function() {
		var index = $('select').val();
		console.log(index);
		$.ajax({
			url: "/details",
			dataType: "json",
			contentType: "application/json",
			method: 'GET',
			data: {"index":index},
			success: function (response) {
				if (Object.keys(response).length !== 0) {
					var $article = $("#article_container").show();
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
			url: "/image_articles",
			contentType: "application/json",
			success: function (response) {
				$("#info").html('');

				var placeholder = "http://www.babybedding.com/images/fabric/silver-gray-minky-fabric_medium.jpg";

				/* Changed the order of declarations */
				var $slide_inner = $("<div>").attr("id", "slide_inner");
				var $slide_container = $("<div>").attr("id", "slide_container")
												.append($slide_inner);

				var $slideshow = $("<div>").attr("id", "slideshow")
					.appendTo("#info")
					.append($slide_container);

				var num_objs = 0;


				for (var key in response) {
					num_objs++;
					var url = response[key][0];
					var img_url = response[key][1];
                    var $div = $("<div>");

					var $a = $("<a>")
						.attr("href", url)
						.attr("target","_blank")
						.appendTo($div);

                    $div.attr("class","slide").appendTo($slide_inner);

					if (img_url == null) {
						var $new_div = $("<div>")
							.appendTo($a)
							.height(263)
							.width(263)
							.css("display", "inline-block");

						$new_div.css("vertical-align", "top");
						$new_div.css("background-image", "url(" + placeholder + ")");
						$new_div.css("background-size", "100px 100px");
						$new_div.css("text-align", "center");
						var $line_break = $("<br>");
						/*for (var i = 0; i < 2; i++) {
							$new_div.append($line_break);
						}*/
						$new_div.append($line_break).append(key);
					}
					else {
						var $img = $("<img>").attr("src", img_url).appendTo($a);
						$img.width(263).height(263).attr("alt", key);
					}
                }

                var curr = 0;
                var slide_width = 560;
                $slide_inner.css('width', slide_width * num_objs);


                $slideshow.prepend('<figure class="arrows" id="left_arrow"/>')
	            $slideshow.append('<figure class="arrows" id="right_arrow"/>');

	            var toggle_arrows = function (current, num_objs) {
	            	if (curr == 0) { 
                	$("#left_arrow").hide(); 
	                }
	                else { 
	                	$("#left_arrow").show(); 
	                }

	                if (curr == num_objs - 1){
	                	$("#right_arrow").hide();
	             	} 

	             	else { 
	             		$("#right_arrow").show(); 
	             	}
	            }

	            toggle_arrows(curr, num_objs);

				function moveSlider(){
					// Move slideInner using margin-left
					$slide_inner.animate({
						'marginLeft' : slide_width * (-curr)
					}, 200);
				}

                // Create event listeners for .controls clicks
				$("#left_arrow").on('click', function(){
					curr--;
					moveSlider();
					toggle_arrows(curr, num_objs);
				});
				$("#right_arrow").on('click', function(){
					curr++;
					moveSlider();
					toggle_arrows(curr, num_objs);
				});

			}

		});
	});

}

$(document).ready(main);







