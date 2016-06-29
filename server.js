var http = require("http");
var fs = require("fs");
var path = require("path");
var url = require("url");

var url = 'http://www.cdf.toronto.edu/~csc309h/summer/docs/nytimes.json';

function send404Response(response) {
	response.writeHead(404, {"Context-Type":"text/plain"});
	response.write("Error 404 - Page not found");
	response.end();
}

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

function onRequest (request, response) {

	var file_path = '.' + request.url;
	var extension = path.extname(file_path);
	console.log(request.url);
	var content_type = "text/html";

	if (request.method == 'GET' && file_path == './') {
		response.writeHead(200, {"Context-Type": content_type});
		fs.createReadStream("index.html").pipe(response);
	} 

	else if (request.method == 'GET' && extension == '.js') {
		content_type = "text/javascript";
		response.writeHead(200, {"Context-Type": content_type});
		fs.createReadStream(file_path).pipe(response);
	}

	else if (request.method == 'GET' && extension == '.css') {
		content_type = "text/css";
		response.writeHead(200, {"Context-Type": content_type});
		fs.createReadStream(file_path).pipe(response);
	} 

	else if (request.method == 'GET' && request.url == "/get_articles") {
		response.setHeader('Content-Type', 'application/json');

		var data = fs.readFileSync("file.js");
		
		var obj = JSON.parse(data);

		var articles = [];

		obj[0].results.forEach(function (article) {
			var details = {
				"published_date" : article.published_date,
				"title" : article.title,
				"abstract" : article.abstract,
				"url" : article.url
			};

			articles.push(details);
		});

		response.write(JSON.stringify(articles));
		response.end();
	}

	else if (request.method == 'GET' && request.url == "/get_authors") {
		response.setHeader('Content-Type', 'application/json');

		var data = fs.readFileSync("file.js");
		
		var obj = JSON.parse(data);

		var arr = [];
		obj[0].results.forEach(function(article) {
			var names = article.byline.substring(3).toLowerCase();

			// Case: Multiple names 
			if (names.includes(" and ")) {
				var strings = names.split(" and ");
				strings.forEach(function(name) {
					// CASE: NAME, NAME AND NAME
					if (name.includes(",")){
						var strings2 = name.split(",");
						strings2.forEach(function (name) {
							name = name.trim();
							if (name !== "") {
								arr.push({"name": capitalize_name(name)});
							}
						});
					// CASE: NAME AND NAME
					} else {
						arr.push({"name": capitalize_name(name)});
					}
					
				});

			// Case: one name only
			} else {
				
				arr.push({"name": capitalize_name(names)});
			}

		});

		response.write(JSON.stringify(arr));
		response.end();
	}

	else if (request.method == 'GET' && request.url == "/get_urls") {
		response.setHeader('Content-Type', 'application/json');
		var data = fs.readFileSync("file.js");
		var obj = JSON.parse(data);

		var dates_urls = {};
		obj[0].results.forEach(function (article) {
			var pub_date = article.published_date;
			var url = article.short_url;
			if (!dates_urls[pub_date]) {
				dates_urls[pub_date] = [];
			}

			dates_urls[pub_date].push(url);
		});
		//console.log(dates_urls);

		console.log(dates_urls);
		response.write(JSON.stringify(dates_urls));
		response.end();

	}

	else if (request.method == 'GET' && request.url == "/get_tags"){
		response.setHeader('Content-Type', 'application/json');
		var data = fs.readFileSync("file.js");
		var obj = JSON.parse(data);

		var tags = {};
		var total = 0;
		obj[0].results.forEach(function (article) {
			article.des_facet.forEach(function (tag) {
				if (!tags[tag]) {
					tags[tag] = 1;
				} else {
					tags[tag]++;
				}
				total++;
			});
		});

		console.log(tags);
		tags["total"] = total;

		console.log(tags);
		response.write(JSON.stringify(tags));
		response.end();

	}

	else if (request.method == 'GET' && request.url == "/get_index") {
		response.setHeader('Content-Type', 'application/json');
		var data = fs.readFileSync("file.js");
		var obj = JSON.parse(data);

		console.log(obj.num_results);
		response.write(JSON.stringify({"obj_num" : obj[0].num_results}));
		response.end();

	}

	else if (request.method == 'GET' && request.url.slice(0, 12) == "/get_details") {
		response.setHeader('Content-Type', 'application/json');
		var data = fs.readFileSync("file.js");
		var obj = JSON.parse(data);

		var urls = require('url').parse(request.url, true);
		var index = urls.query.index;

		var details = {};

		if (index < obj[0].num_results) {
			var article = obj[0].results[index];
			console.log(details);
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

	else if (request.method == 'GET' && request.url == "/get_imgs") {
		response.setHeader('Content-Type', 'application/json');
		var data = fs.readFileSync("file.js");
		var obj = JSON.parse(data);

		var placeholder = "http://brucemctague.com/wp-content/uploads/2015/10/cool-stuff.jpeg";
		var articles = {};
		obj[0].results.forEach(function (article) {
			article.multimedia.forEach( function (image) {
				if (image.format == "thumbLarge") {
					articles[article.title] = [article.url, image.url];
				}
			});

			if (!articles[article.title]) {
				articles[article.title] = [article.url, placeholder];
			}
		});

		articles["placeholder"] = placeholder;

		response.write(JSON.stringify(articles));
		response.end();

	}

	else {
		send404Response(response);
	}
		
}
// http://localhost:8080/

http.createServer(onRequest).listen(8080);
console.log("Server is now running...");

