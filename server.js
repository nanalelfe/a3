var http = require("http");
var fs = require("fs");
var path = require("path");
var url = require("url");

/* Function that capitalizes the name string */
function capitalize_name(string) {
	var split = string.split(" ");
	for (var i = 0; i < split.length; i++) {
		split[i] = split[i].trim();
		if (split[i].indexOf(".") > -1) {
			split[i] = split[i].toUpperCase();
		}

		else if (split[i].length > 2) {
			split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1);
		}
	}

	return split.join(" ");
}

// Handle client requests
function onRequest (request, response) {

	var file_path = '.' + request.url;
	// Get file extension
	var extension = path.extname(file_path);

	var content_type = "text/html";

	// Serve HTML page
	if (request.method == 'GET' && file_path == './') {
		response.writeHead(200, {"Content-Type": content_type});
		fs.createReadStream("a3.html").pipe(response);
	} 

	// Serve Javascript and jQuery files
	else if (request.method == 'GET' && extension == '.js') {
		content_type = "text/javascript";
		response.writeHead(200, {"Content-Type": content_type});
		fs.createReadStream(file_path).pipe(response);
	}

	// Serve CSS file
	else if (request.method == 'GET' && extension == '.css') {
		content_type = "text/css";
		response.writeHead(200, {"Content-Type": content_type});
		fs.createReadStream(file_path).pipe(response);
	} 

	// Serve images with .png extensions
	else if (request.method == 'GET' && extension == '.png') {
		content_type = "image/jpg";
		response.writeHead(200, {"Content-Type": content_type});
		fs.createReadStream(file_path).pipe(response);
	}

	/* Serve all articles from JSON file as a stringified JSON object. */
	else if (request.method == 'GET' && request.url == "/articles") {
		response.writeHead(200, {"Content-Type":"application/json"});
		var data = fs.readFileSync("nytimes.json");
		
		var obj = JSON.parse(data);

		var article_object = {};

		article_object.articles = [];

		// Build article object and store in article_object
		obj[0].results.forEach(function (article) {
			var details = {
				"published_date" : article.published_date,
				"title" : article.title,
				"abstract" : article.abstract,
				"url" : article.url
			};

			article_object.articles.push(details);
		});

		response.write(JSON.stringify(article_object));
		response.end();
	}

	/* Serve all authors from the file as a strigified JSON Object */
	else if (request.method == 'GET' && request.url == "/authors") {
		response.writeHead(200, {"Content-Type":"application/json"});

		var data = fs.readFileSync("nytimes.json");
		
		var obj = JSON.parse(data);

		var authors = {}; // object that will contain all authors
		authors["authors"] = []; // the authors will go into this array

		// Checks for duplicate, and if none, adds to the array of authors
		var check_duplicate = function(name) {
			if (authors["authors"].indexOf(name) == -1) {
				authors["authors"].push(name);
			}
		}
		obj[0].results.forEach(function(article) {

			// Get the author(s) from that article and remove the "By "
			var names = article.byline.substring(3).toLowerCase();

			// Case: Multiple names 
			if (names.includes(" and ")) {
				var strings = names.split(" and ");
				strings.forEach(function(name) {
					// CASE: NAME, NAME,..., NAME AND NAME (contains coma)
					if (name.includes(",")){
						var strings2 = name.split(",");
						strings2.forEach(function (name) {
							name = name.trim();
							name = capitalize_name(name);
							// Check for duplicate
							if (name !== "") {
								check_duplicate(name);
							}
						});
					// CASE: NAME AND NAME
					} else {
						name = capitalize_name(name);
						check_duplicate(name);
					}
					
				});

			// Case: one name only
			} else {
				names = capitalize_name(names);
				check_duplicate(names);
			}

		});

		response.write(JSON.stringify(authors));
		response.end();
	}

	/* Serve all article short URLs as a strigified JSON object */
	else if (request.method == 'GET' && request.url == "/short_urls") {
		response.writeHead(200, {"Content-Type":"application/json"});
		var data = fs.readFileSync("nytimes.json");
		var obj = JSON.parse(data);

		var dates_urls = {}; // {published_date : [url1, url2, ...]}
		obj[0].results.forEach(function (article) {
			var pub_date = article.published_date;
			var url = article.short_url;
			if (!dates_urls[pub_date]) {
				dates_urls[pub_date] = [];
			}

			dates_urls[pub_date].push(url);
		});

		response.write(JSON.stringify(dates_urls));
		response.end();
	}

	/* Serve a list of all the tags and their frequencies from the file as a
	stringified  JSON object */
	else if (request.method == 'GET' && request.url == "/tags"){
		response.writeHead(200, {"Content-Type":"application/json"});
		var data = fs.readFileSync("nytimes.json");
		var obj = JSON.parse(data);

		var tags = {}; // {"total" : #, tag1 : frequency, tag2: frequency, ...}
		var total = 0;


		obj[0].results.forEach(function (article) {
			// For each tag in article, update frequency in tags object
			article.des_facet.forEach(function (tag) {
				if (!tags[tag]) {
					tags[tag] = 1;
				} else {
					tags[tag]++;
				}
				total++;
			});
		});

		// Add the total number of tags into the tags object
		tags["total"] = total;

		response.write(JSON.stringify(tags));
		response.end();
	}


	/* Serve the total number of articles as a stringified JSON object */
	else if (request.method == 'GET' && request.url == "/get_index") {
		response.writeHead(200, {"Content-Type":"application/json"});
		var data = fs.readFileSync("nytimes.json");
		var obj = JSON.parse(data);

		response.write(JSON.stringify({"obj_num" : obj[0].num_results}));
		response.end();
	}

	/* Serve details of an article given its index as a stringified JSON object */
	else if (request.method == 'GET' && request.url.slice(0, 8) == "/details") {
		response.writeHead(200, {"Content-Type":"application/json"});
		var data = fs.readFileSync("nytimes.json");
		var obj = JSON.parse(data);

		var urls = require('url').parse(request.url, true);
		var index = urls.query.index;

		var details = {};

		if (index < obj[0].num_results) {
			var article = obj[0].results[index];
			details["section"] = article.section;
			details["subsection"] = article.subsection;
			details["title"] = article.title;
			details["abstract"] = article.abstract;
			details["byline"] = article.byline;
			details["published_date"] = article.published_date;
			details["des_facet"] = article.des_facet;
		}
		
		response.write(JSON.stringify(details));
		response.end();
	}

	/* Serve all articles' title, image link and article link as a stringified
	JSON object */
	else if (request.method == 'GET' && request.url == "/image_articles") {
		response.writeHead(200, {"Content-Type":"application/json"});
		var data = fs.readFileSync("nytimes.json");
		var obj = JSON.parse(data);

		var articles = {};
		obj[0].results.forEach(function (article) {
			article.multimedia.forEach( function (image) {
				// For the given article, if the needed image format exists,
				// then we save that image url into the articles object.
				if (image.format == "thumbLarge") {
					articles[article.title] = [article.url, image.url];
				}
			});
			// Else, we just leave the image url part null.
			if (!articles[article.title]) {
				articles[article.title] = [article.url, null];
			}
		});

		response.write(JSON.stringify(articles));
		response.end();

	}

	/* Does not exist - 404 Response */
	else {
		response.writeHead(404, {"Content-Type":"text/plain"});
		response.write("Error 404 - Page not found");
		response.end();
	}
		
}

http.createServer(onRequest).listen(8080);

