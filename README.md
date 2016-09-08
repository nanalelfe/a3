# The New York Times - RESTful API
A set of RESTful APIs capable of reading the JSON file from the New York Times official API, deployed on a Node.js server.

## Usage Intructions

### Show All Articles

#### Description
Returns all articles' title, published date, brief description (abstract) and short url.

#### URL
/articles

#### Method
GET

#### URL Parameters
None

#### Response format
JSON Object

#### Success Response
* Code: 200
* Content:

* Sample Content:

#### Error Response
#### Sample Call

<table  align="center">
				<tr>
					<th>Description</th>
					<td>Returns all articles' title, published date, brief description (abstract) and short url.</td>
				</tr>
				<tr>
					<th>URL</th>
					<td>/articles</td>
				</tr>
				<tr>
					<th>Method</th>
					<td>GET</td>
				</tr>
				<tr>
					<th>URL Parameters</th>
					<td>None</td>
				</tr>
				<tr>
					<th>Response format</th>
					<td>JSON Object</td>
				</tr>
				<tr>
					<th>Success Response</th>
					<td>
						<ul>
							<li><span>Code</span>: 200</li>
							<li><span>Content</span>: <code>{"articles" : [{"published date": published date, "title" : title, "abstract": list of tags, "url": article url},
							{...}]}</code></li>
							<li><span>Sample Content</span>: <code>{"articles" : </br>
											[{</br>
											"published_date":"2016-06-22T00:00:00-04:00",</br>
											"title":"Goodbye, Password. Banks Opt to Scan Fingers and Faces Instead.",</br>
											"abstract":"Frustrated by thieves stealing personal data from millions of </br>customers",</br>
											"url":"http://www.nytimes.com/2016/06/22/business/dealbook/goodbye-password-</br>banks-opt-to-scan-fingers-and-faces-instead.html"</br>
											}]</br>
										}</code></li>			
						</ul>
					</td>
				</tr>
				<tr>
					<th>Error Response</th>
					<td> 
						<ul>
							<li><span>Code</span>: 404</li>
							<li><span>Content</span>: none</li>
						</ul>
					</td>
				</tr>
				<tr>
					<th>Sample Call</th>
					<td>
						<code>
							$.ajax({</br>
								&nbsp;&nbsp;url: '/articles',</br>
								&nbsp;&nbsp;contentType: "application/json",</br>
								&nbsp;&nbsp;success: function(response) {</br>
								&nbsp;&nbsp;&nbsp;&nbsp;	console.log(response);</br>
								&nbsp;&nbsp;}</br>
							});</br>
						</code>
					</td>	
				</tr>
			</table>


### Show All Authors

#### Description
#### URL
#### Method
#### URL Parameters
#### Response format
#### JSON Object
#### Success Response
* Code: 
* Content:
* Sample Content:


#### Error Response
#### Sample Call

### Show All Short URLs

#### Description
#### URL
#### Method
#### URL Parameters
#### Response format
#### JSON Object
#### Success Response
* Code: 
* Content:
* Sample Content:
#### Error Response
#### Sample Call

### Show Tags

#### Description
#### URL
#### Method
#### URL Parameters
#### Response format
#### JSON Object
#### Success Response
* Code: 
* Content:
* Sample Content:
#### Error Response
#### Sample Call

### Show Article with Index

#### Description
#### URL
#### Method
#### URL Parameters
#### Response format
#### JSON Object
#### Success Response
* Code: 
* Content:
* Sample Content:
#### Error Response
#### Sample Call

### Show Articles With Images

#### Description
#### URL
#### Method
#### URL Parameters
#### Response format
#### JSON Object
#### Success Response
* Code: 
* Content:
* Sample Content:
#### Error Response
#### Sample Call

