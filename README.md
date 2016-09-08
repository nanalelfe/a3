# The New York Times - RESTful API
A set of RESTful APIs capable of reading the JSON file from the New York Times official API, deployed on a Node.js server.

## Usage Intructions

### Show All Articles


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
				$.ajax({
					url: '/articles',
					contentType: "application/json",
					success: function(response) {
					console.log(response);
					}
				});
			</code>
		</td>	
	</tr>
</table>
		


### Show All Authors

<table  align="center">
				<tr>
					<th>Description</th>
					<td>Returns a list of all known authors.</td>
				</tr>
				<tr>
					<th>URL</th>
					<td>/authors</td>
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
							<li><span>Code</span> : 200</li>
							<li><span>Content</span>:<code>{"authors" : [author1, author2, ...]}</code></li>
							<li><span>Sample Content</span>: <code>{"authors":["Michael Corkery"]}</code></li>			
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
								&nbsp;&nbsp;url: '/authors',</br>
								&nbsp;&nbsp;contentType: "application/json",</br>
								&nbsp;&nbsp;success: function(response) {</br>
								&nbsp;&nbsp;&nbsp;&nbsp;	console.log(response);</br>
								&nbsp;&nbsp;}</br>
							});</br>
						</code>
					</td>	
				</tr>
			</table>


### Show All Short URLs

<table  align="center">
					<tr>
						<th>Description</th>
						<td>Returns a list of all articles' short URLS grouped by published date.</td>
					</tr>
					<tr>
						<th>URL</th>
						<td>/short_urls</td>
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
								<li><span>Code</span> : 200</li>
								<li><span>Content</span>: <code>{published date: [article url 1, article url2, ...]}}</code></li>
								<li><span>Sample Content</span>: <code>{"2016-06-21T00:00:00-04:00":["http://nyti.ms/28J9fyW","http://nyti.ms/28IVUqj","http://nyti.ms/28J6nlF"]}</code></li>
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
									&nbsp;&nbsp;url: 'short_urls',</br>
									&nbsp;&nbsp;contentType: "application/json",</br>
									&nbsp;&nbsp;success: function(response) {</br>
									&nbsp;&nbsp;&nbsp;&nbsp;	console.log(response);</br>
									&nbsp;&nbsp;}</br>
								});</br>
							</code>
						</td>
					</tr>
				</table>


### Show Tags

<table  align="center">
					<tr>
						<th>Description</th>
						<td>Returns the tags of all the articles with their corresponding number of appearances, as well as the total number of tags.</td>
					</tr>
					<tr>
						<th>URL</th>
						<td>/tags</td>
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
								<li><span>Content</span>: <code>{{"total" : total#, tag1: # of appearances, tag2: # of appearances, ...}</code></li>
								<li><span>Sample Content</span>: <code>"Computer Security" : 2, "Banking and Financial Institutions" : 1, "Biometrics" : 1,"total" : 37}</code>{</li>
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
									&nbsp;&nbsp;url: '/tags',</br>
									&nbsp;&nbsp;contentType: "application/json",</br>
									&nbsp;&nbsp;success: function(response) {</br>
									&nbsp;&nbsp;&nbsp;&nbsp;	console.log(response);</br>
									&nbsp;&nbsp;}</br>
								});</br>
							</code>
						</td>
					</tr>
				</table>


### Show Article with Index

<table  align="center">
					<tr>
						<th>Description</th>
						<td>Given an index, returns the article at that index.</td>
					</tr>
					<tr>
						<th>URL</th>
						<td>/details?index</td>
					</tr>
					<tr>
						<th>Method</th>
						<td>GET</td>
					</tr>
					<tr>
						<th>URL Parameters</th>
						<td>Required: index=[integer]</td>
					</tr>
					<tr>
						<th>Response format</th>
						<td>JSON Object</td>
					</tr>
					<tr>
						<th>Success Response</th>
						<td>
							<ul>
								<li><span>Code</span> : 200</li>
								<li><span>Content</span>: <code>{"section": section, "subsection": subsection, "title": title, "abstract": brief description, "byline": authors,
									"published date": published date, "des_facet": list of tags}</code></li>
								<li><span>Sample Content</span>: <code>{</br>
							"section":"Business Day",</br>
							"subsection":"DealBook",</br>
							"title":"Goodbye, Password. Banks Opt to Scan Fingers and Faces Instead.",</br>
							"abstract":"Frustrated by thieves stealing personal data from millions of customers, banks are </br>investing in biometric technology to offer better security.",</br>
							"byline":"By MICHAEL CORKERY",</br>
							"published_date":"2016-06-22T00:00:00-04:00",</br>
							"des_facet":["Computer Security","Banking and Financial Institutions","Biometrics"]</br>
						}</code></li>
							</ul>
						</td>
					</tr>
					<tr>
						<th>Error Response</th>
						<td>
							<ul>
								<li><span>Code</span> : 404</li>
								<li><span>Content</span>: none</li>
							</ul>
						</td>
					</tr>
					<tr>
						<th>Sample Call</th>
						<td>
							<code>
								$.ajax({</br>
									&nbsp;&nbsp;url: '/details?index=0',</br>
									&nbsp;&nbsp;contentType: "application/json",</br>
									&nbsp;&nbsp;success: function(response) {</br>
									&nbsp;&nbsp;&nbsp;&nbsp;	console.log(response);</br>
									&nbsp;&nbsp;}</br>
								});</br>
							</code>
						</td>
					</tr>
				</table>


### Show Articles With Images

<table  align="center">
					<tr>
						<th>Description</th>
						<td>Returns the list of all articles' title with their corresponding article URL and image URL.</td>
					</tr>
					<tr>
						<th>URL</th>
						<td>/image_articles</td>
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
								<li><span>Code</span> : 200</li>
								<li><span>Content</span>:<code>{ {title: [article url, image url]}, {...} }</code></li>
								<li><span>Sample Content</span>:<code>{
							{
							"Goodbye, Password. Banks Opt to Scan Fingers and Faces Instead.":["http://www.nytimes.com/2016/06/22/business/dealbook/goodbye-password-banks-opt-to-scan-fingers-and-faces-instead.html","https://static01.nyt.com/images/2016/06/21/business/00DB-BIOMETRICS/00DB-BIOMETRICS-thumbLarge-v2.jpg"]
							}</code>
						}</li>
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
						
									&nbsp;&nbsp;url: '/tags',</br>
									&nbsp;&nbsp;contentType: "application/json",</br>
									&nbsp;&nbsp;success: function(response) {</br>
									&nbsp;&nbsp;&nbsp;&nbsp;	console.log(response);</br>
									&nbsp;&nbsp;}</br>
							
								});</br>
								
							</code>
						</td>
					</tr>
				</table>




