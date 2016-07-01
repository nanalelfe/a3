Name:       Nargiza NOSIROVA
CDF ID:     g5nana
Email:      nargiza.nosirova@mail.utoronto.ca
Student #:  999755858


USAGE INSTRUCTIONS:


1) SHOW ALL ARTICLES
	- Description: Returns all articles' title, published date, brief description (abstract) and short url. 
	- HTTP Request: http://127.0.0.1:8080/articles
	- URL: /articles
	- Method: GET
	- Response format: JSON Array
	- Success Response:
		- Code: 200
		- Content: [{"published date": published date, "title" : title, "abstract": list of tags, "url": article url},
					{...}]
		- Sample Content: [ {
						"published_date":"2016-06-22T00:00:00-04:00",
						"title":"Goodbye, Password. Banks Opt to Scan Fingers and Faces Instead.",
						"abstract":"Frustrated by thieves stealing personal data from millions of customers",
						"url":"http://www.nytimes.com/2016/06/22/business/dealbook/goodbye-password-banks-opt-to-scan-fingers-and-faces-instead.html"
					}]
	- Error Response:
		- Code: Error 404 - Page not found
		- Content: none
	- Sample Call: 
		$.ajax({
			url: '/articles',
			contentType: "application/json",
			success: function(response) {
				console.log(response);
			}
		});

2) SHOW ALL AUTHORS

	- Description: Returns a list of all known authors.
	- HTTP Request: http://127.0.0.1:8080/authors
	- URL: /authors
	- Method: GET
	- Response format: JSON Object
	- Success Response:
		- Code: 200
		- Content: {"authors" : [author1, author2, ...]}
		- Sample Content: {"authors":["Michael Corkery"]}
	- Error Response:
		- Code: Error 404 - Page not found
		- Content: none
	- Sample Call: 
		$.ajax({
			url: '/authors',
			contentType: "application/json",
			success: function(response) {
				console.log(response);
			}
		});

3) SHOW ALL SHORT URLs
	- Description: Returns a list of all articles' short URLS grouped by published date.
	- HTTP Request: http://127.0.0.1:8080/short_urls
	- URL: /short_urls
	- Method: GET
	- Response format: JSON Object
	- Success Response:
		- Code: 200
		- Content: {published date: [article url 1, article url2, ...]}
		- Sample Content: {"2016-06-21T00:00:00-04:00":["http://nyti.ms/28J9fyW","http://nyti.ms/28IVUqj","http://nyti.ms/28J6nlF"]}
	- Error Response:
		- Code: Error 404 - Page not found
		- Content: none
	- Sample Call: 
		$.ajax({
			url: '/short_urls',
			contentType: "application/json",
			success: function(response) {
				console.log(response);
			}
		});

4) SHOW ALL TAGS
	- Description: Returns the tags of all the articles with their corresponding number of appearances. 
	- HTTP Request: http://127.0.0.1:8080/tags
	- URL: /tags
	- Method: GET
	- Response format: JSON Object
	- Success Response:
		- Code: 200
		- Content: {tag1: # of appearances, tag2: # of appearances, ...}
		- Sample Content: {"Computer Security" : 2, "Banking and Financial Institutions" : 1, "Biometrics" : 1}
	- Error Response
		- Code: Error 404 - Page not found
		- Content: none
	- Sample Call: 
		$.ajax({
			url: '/tags',
			contentType: "application/json",
			success: function(response) {
				console.log(response);
			}
		});

5) SHOW ARTICLE WITH INDEX
	- Description: Given an index, returns the article at that index. 
	- HTTP Request: http://127.0.0.1:8080/details?index=0 (To get the article at index 0)
	- URL: /details?index
	- Method: GET
	- URL Parameters: 
		- Required: index=[integer]
	- Response format: JSON Object
	- Success Response:
		- Code: 200
		- Content: {"section": section, "subsection": subsection, "title": title, "abstract": brief description, "byline": authors,
		"published date": published date, "des_facet": list of tags}
		- Sample Content: 
						{
							"section":"Business Day",
							"subsection":"DealBook",
							"title":"Goodbye, Password. Banks Opt to Scan Fingers and Faces Instead.",
							"abstract":"Frustrated by thieves stealing personal data from millions of customers, banks are investing in biometric technology to offer better security.",
							"byline":"By MICHAEL CORKERY",
							"published_date":"2016-06-22T00:00:00-04:00",
							"des_facet":["Computer Security","Banking and Financial Institutions","Biometrics"]
						}

	- Error Response
		- Code: Error 404 - Page not found
		- Content: none
	- Sample Call: 
		$.ajax({
			url: '/details?index=0',
			contentType: "application/json",
			success: function(response) {
				console.log(response);
			}
		});

6) SHOW ARTICLES WITH IMAGES
	- Description: Returns the list of all articles' title with their corresponding article URL and image URL.
	- HTTP Request: http://127.0.0.1:8080/image_articles
	- URL: /image_articles
	- Method: GET
	- Response format: JSON Object
	- Success Response:
		- Code: 200
		- Content: { {title: [article url, image url]}, {...} }
		- Sample Content: 
						{
							{"Goodbye, Password. Banks Opt to Scan Fingers and Faces Instead.":["http://www.nytimes.com/2016/06/22/business/dealbook/goodbye-password-banks-opt-to-scan-fingers-and-faces-instead.html","https://static01.nyt.com/images/2016/06/21/business/00DB-BIOMETRICS/00DB-BIOMETRICS-thumbLarge-v2.jpg"]}
						}

	- Error Response
		- Code: Error 404 - Page not found
		- Content: none
	- Sample Call: 
		$.ajax({
			url: '/image_articles',
			contentType: "application/json",
			success: function(response) {
				console.log(response);
			}
		});

