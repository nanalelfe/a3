var main = function () {
	"use strict";

	/* Show the usage submenu when asked, and hide everything else */
	$('#usage').on('click', function() {
		$("#nav_usage").css("display", "block");
		$("#nav_demo").css("display", "none");
		$("#info").html('');
	});

	/*  Show the demo submenu, and hide everything else */
	$('#demo').on('click', function() {

		$("#nav_demo").css("display", "block");
		$("#nav_usage").css("display", "none");
		$("[id^=usage-]").css("display", "none");
	});

	/* Show the usage instructions for the specified API - Show all articles 
	 - usage submenu */
	$('#us_articles').on('click', function() {
		$("[id^=usage-]").css("display", "none");
		$("[id^=usage-articles]").css("display", "block");
	});

	/* Show the usage instructions for the specified API - Show all authors 
	 - usage submenu */
	$('#us_authors').on('click', function() {
		$("[id^=usage-]").css("display", "none");
		$("[id^=usage-authors]").css("display", "block");
	});

	/* Show the usage instructions for the specified API - Show all short urls
	 - usage submenu */
	$('#us_urls').on('click', function() {
		$("[id^=usage-]").css("display", "none");
		$("[id^=usage-urls]").css("display", "block");
	});

	/* Show the usage instructions for the specified API - Show all tags
	  - usage submenu */
	$('#us_tags').on('click', function() {
		$("[id^=usage-]").css("display", "none");
		$("[id^=usage-tags]").css("display", "block");
	});

	/* Show the usage instructions for the specified API - Show article with 
	index  - usage submenu */
	$('#us_index').on('click', function() {
		$("[id^=usage-]").css("display", "none");
		$("[id^=usage-index]").css("display", "block");
	});

	/* Show the usage instructions for the specified API - Show all article
	images - usage submenu */
	$('#us_imgs').on('click', function() {
		$("[id^=usage-]").css("display", "none");
		$("[id^=usage-images]").css("display", "block");
	});
	
	/* Show all the articles when "Articles" is clicked from the demo submenu */
	$('#get_articles').on('click', function() {
		$.ajax({
			url: '/articles',
			contentType: "application/json",
			success: function(response) {
				console.log(response);
				var $results = $("#info");
				var articles = response.articles;

				// clear the page beforehand
				$results.html('');
				articles.forEach(function (article) {
					// Create an element for each section
					// and add it to the DOM
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

	/* Show all the authors when "Authors" is clicked from the demo submenu */
	$('#get_authors').on('click', function () {
		$.ajax({
			url: '/authors',
			contentType: "application/json",
			success: function (response) {
				var $results = $("#info");
				// clear the page beforehand
				$results.html('');

				// Append all retrieved authors to the DOM
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

	/* Show all the short URLs when "Article URLs" is clicked from the demo submenu */
	$('#get_urls').on('click', function() {
		$.ajax({
			url: '/short_urls',
			contentType: "application/json",
			success: function (response) {
				// clear page
				$("#info").html('');
				var $results = $("<div>")
										.appendTo("#info")
										.attr("id", "url_results");

				// Each key is the published date and has a corresponding 
				// array of short URLs
				for (var key in response) {
					$results.append("Published date: " + key);
					// Each of the corresponding short URLs will be in an 
					// unordered list
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

	/* Show all the tags when "Tags" is clicked from the demo submenu */
	$('#get_tags').on('click', function() {
		$.ajax({
			url: '/tags',
			contentType: "application/json",
			success: function (response) {
				var $results = $("#info");
				// clear page
				$results.html('');

				// Create a paragraph where the tag cloud will be stored
				var $cloud = $('<p>');
				$cloud.css("fontSize", "125%");
				$results.append($cloud);

				// Save the total field and take it out, to be able to 
				// only loop through the tags and their frequencies
				var total = response["total"];
				delete response["total"];

				for (var key in response) {
					var $span = $("<span>");
					$span.append("  " + key + "  ");
					// Toggle the font size of the tag according to its
					// frequency, relative to other tags' frequency
					var size = String((response[key]/total) * 1000) + "%";
					$cloud.append($span);
					$span.css("fontSize", "+=" + size);

				}
				
				$cloud.css('text-align','center');
				$("span").css("padding", "10px");
			}
		});
	});


	/* Show a drop-down list where the user can choose an article index to
		display that article. Triggered when "Article with Index" is 
		clicked from the demo submenu */
	$('#get_index').on('click', function() {
		$.ajax({
			url: "/get_index",
			contentType: "application/json",
			success: function (response) {
				// clear page
				$("#info").html('');
				var $section = $("<section>").appendTo("#info");
				var $header = $("<p>")
									.text("Article Index: ")
									.appendTo($section);

				// Create a select object and add all the available indices 
				// given the number of articles (response)
				var $input = $("<select>").appendTo($section);
				for (var i = 0; i < response.obj_num; i++) {
					var $option = $("<option>").val(i).text(i);
					$input.append($option);
				}

				// A button to submit the chosen index
				var $button = $("<button>").attr("id", "get_details");
				$button.text("Submit").appendTo($section);

				var $article = $("<section>")
											.attr("id", "article_container")
											.appendTo("#info")
											.hide();

			}

		});
	});

	/* Show the article with the given index. Triggered when the user submits
	an index from the drop-down list located at Demo > Article with Index */
	$('#info').on('click', '#get_details', function() {
		var index = $('select').val(); //the selected value from submit
		$.ajax({
			url: "/details",
			dataType: "json",
			contentType: "application/json",
			method: 'GET',
			data: {"index":index},
			success: function (response) {
				// Error checking whether there is an article at the given index
				// is unnecessary, since the drop-down list only offers indices 
				// that are within bounds

				// Create elements for the different sections and append
				// to the DOM
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

				$article
					.append($title)
					.append($abstract)
					.append($date)
					.append($by_line)
					.append($section)
					.append($subsection)
					.append($tags);

				// Tags
				var string = "";
				response.des_facet.forEach(function (tag) {
					string += tag + ", ";
				});

				string = string.slice(0, -2); // getting rid of the last coma
				$tags.append(string);

				

			
			}
		});
	});

	/* Show images as  slideshow when "Get Images" is clicked from the demo submenu */
	$('#get_imgs').on('click', function() {
		$.ajax({
			url: "/image_articles",
			contentType: "application/json",
			success: function (response) {
				// Clear page
				$("#info").html('');

				// Placeholder image, pulled from babybedding.com
				var placeholder = "http://www.babybedding.com/images" + 
				"/fabric/silver-gray-minky-fabric_medium.jpg";

				// Contains all images stacked in a row
				var $slide_inner = $("<div>").attr("id", "slide_inner");

				// Contains the inner slides
				var $slide_container = $("<div>").attr("id", "slide_container")
												.append($slide_inner);

				// Container for the entire slideshow, for positioning
				var $slideshow = $("<div>")
					.attr("id", "slideshow")
					.appendTo("#info")
					.append($slide_container);

				// Count for number of articles
				var num_objs = 0;

				// Build DOM items and build object count
				for (var key in response) {
					num_objs++;
					var url = response[key][0];
					var img_url = response[key][1];

					// Slide container
					var $div = $("<div>");

					// Container for image, create link to articl url
					// Contained in slide container
					var $a = $("<a>")
						.attr("href", url)
						.attr("target","_blank")
						.appendTo($div);

                    $div.attr("class","slide").appendTo($slide_inner);

					// If image does not exist, create place-holder replacement
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
						
						$new_div.append($line_break).append(key);
					}
					// Image exists, use image src as hyperlinked image
					else {
						var $img = $("<img>").attr("src", img_url).appendTo($a);
						$img.width(263).height(263).attr("alt", key);
					}
                }

				// Current slide position
                var curr = 0;

				// Width of each slide
                var slide_width = 560;
                $slide_inner.css('width', slide_width * num_objs);

				// Create the arrow controls for slideshow
                $slideshow.prepend('<figure class="arrows" id="left_arrow"/>')
	            $slideshow.append('<figure class="arrows" id="right_arrow"/>');

				// Function controls which arros to toggle
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

				// Initial arrow state toggling
	            toggle_arrows(curr, num_objs);

				// Create lider animation based on current position
				function moveSlider(){
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







