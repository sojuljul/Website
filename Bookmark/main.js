// listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

// save bookmark
function saveBookmark(e)
{

	// get form values
	var siteName = document.getElementById("siteName").value;
	var siteURL = document.getElementById("siteURL").value;
	
	if(!validateForm(siteName, siteURL))
	{
		return false;
	}	

	var bookmark =
	{
		name: siteName,
		url: siteURL
	}

	// local storage test
	/*
	localStorage.setItem("test", "Hello World");
	console.log(localStorage.getItem("test"));
	localStorage.removeItem("test");
	console.log(localStorage.getItem("test"));
	*/

	// test if bookmarks is null
	if(localStorage.getItem("bookmarks") === null)
	{
		// initialize array
		var bookmarks = [];

		// add to array
		bookmarks.push(bookmark);

		// set to localstorage
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks)); // turn into string
	}
	else
	{
		// get bookmarks from localstorage
		var bookmarks = JSON.parse(localStorage.getItem("bookmarks")); // back into JSON

		// add bookmark to array
		bookmarks.push(bookmark);

		// reset back to localstorage
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	}

	// clear form
	document.getElementById("myForm").reset();

	// refetch
	fetchBookmarks();

	// prevent form from submitting
	e.preventDefault();
}

// delete boomark
function deleteBookmark(url)
{
	// get bookmarks from localstorage
	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

	// loop through bookmarks
	for (var i = 0; i < bookmarks.length; i++)
	{
		if (bookmarks[i].url == url)
		{
			// remove from array
			bookmarks.splice(i, 1);
		}
	}

	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

	// refetch
	fetchBookmarks();

}

function editBookmark(name, url)
{
	document.getElementById("siteName").value = name;
	document.getElementById("siteURL").value = url;
	document.getElementById("save-btn").style.visibility = "";

	document.getElementById("submit-btn").disabled = true;
	document.getElementById("siteName").disabled = true;
	
}

function saveChange()
{
	var name = document.getElementById("siteName").value;
	var newURL = document.getElementById("siteURL").value;

	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

	for (var i = 0; i < bookmarks.length; i++)
	{
		if (bookmarks[i].name == name)
		{
			bookmarks[i].url = newURL;
		}
	}

	
	document.getElementById("myForm").reset();
	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	document.getElementById("siteName").disabled = false;
	document.getElementById("submit-btn").disabled = false;
	document.getElementById("save-btn").style.visibility = "hidden";
	fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks()
{
	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

	// get output id
	var bookmarksResults = document.getElementById("bookmarksResults");

	// build output
	bookmarksResults.innerHTML = "";
	for(var i = 0; i < bookmarks.length; i++)
	{
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<tr> <td style="min-width:500px; font-size:20px"> <strong>'
									+ name + ' </strong></td> <td><a class="btn btn-success" target="_blank" href=" '
									+ url + ' "> Open </a> </td> '
									+ '<td> <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#"> Delete </a> </td> '
									+ '<td> <a onclick="editBookmark(\'' + name + '\',\'' + url + '\')" class="btn btn-primary" href="#"> Edit URL </a> </td>'
									+ '</tr>';

		// bookmarksResults.innerHTML += "<div class='well'>" 
		// 							+ "<h3>" 
		// 							+ name 
		// 							+ "<a class='btn btn-success' target='_blank' href=' " 
		// 							+ url 
		// 							+ " '>Visit</a>"

		// 							+ '<a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#"> Delete </a> ' 
									
		// 							+ "</h3>" 
		// 							+ "</div>";
	}
}


function validateForm(siteName, siteURL)
{
	if (!siteName || !siteURL)
	{
		alert("Please fill in the form");
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteURL.match(regex))
	{
		alert("Please use a valid URL");
		return false;
	}

	return true;
}