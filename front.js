$(function() {
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
				var total = response["total"];
				delete response["total"];

				for (var key in response) {
					var $span = $("<span>");
					//var tag = key.fontsize((response[key]/total) + 3);
					//console.log("the function is " + (response[key]/total) + 1);
					//console.log(response[key]);
					$span.append("  " + key + "  ");
					var size = String(((response[key]/total) + 1/3) * 100) + "%";
					console.log(((response[key]/total) + 1/3) * 100);
					
					$cloud.append($span);
					$results.append($cloud);
					$cloud.css("fontSize", "200%");
					$span.css("fontSize", size);

				}
			}
		});
	});
});







