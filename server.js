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

	else if (request.method == 'GET' && request.url == "/get_articles") {
		response.setHeader('Content-Type', 'application/json');

		var data = fs.readFileSync("file.js");
		
		var obj = JSON.parse(data);

		response.write(JSON.stringify(obj[0].results));
		response.end();
		console.log(obj);
	}

	else if (request.method == 'GET' && request.url == "/get_authors") {
		response.setHeader('Content-Type', 'application/json');

		var data = fs.readFileSync("file.js");
		
		var obj = JSON.parse(data);

		var arr = [];
		obj[0].results.forEach(function(article) {
			var names = article.byline.substring(3).toUpperCase();

			// Case: Multiple names 
			if (names.includes(" AND ")) {
				var strings = names.split(" AND ");
				strings.forEach(function(name) {
					// CASE: NAME, NAME AND NAME
					if (name.includes(",")){
						var strings2 = name.split(",");
						strings2.forEach(function (name) {
							name.trim();
							if (name !== "") {
								arr.push(name);
							}
						});
					// CASE: NAME AND NAME
					} else {
						arr.push(name);
					}
					
				});

			// Case: one name only
			} else {
				arr.push(names);
			}

		});

		response.write(JSON.stringify(arr));
		response.end();
	}

	else if (request.method == 'GET' && request.url == "/get_urls") {
		response.setHeader('Content-Type', 'application/json');
		var data = fs.readFileSync("file.js");
		var obj = JSON.parse(data);

		var dates_urls= {};
		obj[0].results.forEach(function (article) {
			var pub_date = article.published_date;
			var url = article.short_url;
			if (!dates_urls[pub_date]) {
				dates_urls[pub_date] = [];
			}

			dates_urls[pub_date].push(url);
		});
		//console.log(dates_urls);

		
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

		response.write(JSON.stringify(tags));
		response.end();

	}
	else {
		send404Response(response);
	}
		
}
// http://localhost:8080/

http.createServer(onRequest).listen(8080);
console.log("Server is now running...");

