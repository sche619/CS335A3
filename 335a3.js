function getBooks() {
	var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booklist";
	var xhr = new XMLHttpRequest();
	xhr.open("GET",uri,true);
	xhr.setRequestHeader("Accept","application/json");
	xhr.onload = function() {
		var resp = JSON.parse(xhr.responseText);
		showBooks(resp);	
	}
	xhr.send(null);
}
function showBooks(dest) {
	//var tableContent = "<tr class='bookImg'><td></td><td>Book name</td><td>Buy now</td></tr>\n";
	var tableContent = "<tr class='bookImg'><td></td>";
	for (var i = 0;i<dest.length;++i) {
		var record = dest[i];
		var id = record.Id;
		var title = record.Title
		tableContent += "<tr><td><img src='http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/bookimg?id="+id+"'</td><td>"+title+"</td><td><button id='buy' type = 'button' onclick = 'location.href =\"http://redsox.tcs.auckland.ac.nz/BC/Closed/Service.svc/bookbuy?id="+record.Id+"\"'>Buy now</button></td></tr>\n";
		}
	tableContent+="</tr>\n"
	document.getElementById("showTab").innerHTML =tableContent;
}

function getBluerays() {
	var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brlist";
	var xhr = new XMLHttpRequest();
	xhr.open("GET",uri,true);
	xhr.setRequestHeader("Accept","application/json");
	xhr.onload = function() {
		var resp = JSON.parse(xhr.responseText);
		showBluerays(resp);	
	}
	xhr.send(null);
}
function showBluerays(dest) {
	var tableContent = "<tr class='bookImg'><td></td>";
	for (var i = 0;i<dest.length;++i) {
		var record = dest[i];
		var id = record.Id;
		var title = record.Title
		tableContent += "<tr><td><img src='http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brimg?id="+id+"'</td><td>"+title+"</td><td><button id='buy' type = 'button' onclick = 'location.href =\"http://redsox.tcs.auckland.ac.nz/BC/Closed/Service.svc/brbuy?id="+record.Id+"\"'>Buy now</button></td></tr>\n";
		}
	tableContent+="</tr>\n"
	document.getElementById("showTab").innerHTML =tableContent;
}

function select() {
	var x = document.getElementById("item").value;
	if (x == "Book") {
		getBooks();
	}
	if (x == "Blueray") {
		getBluerays();
	}
}

function search() {
	var xhr = new XMLHttpRequest();
	var x = document.getElementById("item").value;
	var search = document.getElementById("search").value;
	if (x == "Book") {
		var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booksearch?term=" + "" + search;
		xhr.open("GET",uri,true);
		xhr.setRequestHeader("Accept","application/json");
		xhr.onload = function() {
			var resp = JSON.parse(xhr.responseText);
			showBooks(resp);	
		}
		xhr.send(null);
	}
	if (x == "Blueray") {
		var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brsearch?term=" + "" + search;
		xhr.open("GET",uri,true);
		xhr.setRequestHeader("Accept","application/json");
		xhr.onload = function() {
			var resp = JSON.parse(xhr.responseText);
			showBluerays(resp);	
		}
		xhr.send(null);
	}
}

function register() {
	var xhr = new XMLHttpRequest();
	var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/register";
	xhr.open("POST",uri,true);
	xhr.setRequestHeader("Content-Type","application/json");
	xhr.onload = function() {
		alert(xhr.responseText);
	}
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var address = document.getElementById("address").value;
	var content = '{ "Address":"' +address + '", "Name": "'+ username + '", "password":"' + password +'"}';
	var objectToPost = JSON.parse(content);
	xhr.send(JSON.stringify(objectToPost));
}
		
function getComments() {
	var uri = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/htmlcomments";
	var xhr = new XMLHttpRequest();
	xhr.open("GET",uri,true);
	xhr.setRequestHeader("Accept","application/json");
	xhr.onload = function() {
	var resp = xhr.responseText;
	document.getElementById("comments").innerHTML = resp;
	}
	xhr.send(null);	 
}
function postComments() {
	var xhr = new XMLHttpRequest();
	var user = document.getElementById("user").value;
	var uri =  "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/comment?name=" + "" + user;
	xhr.open("POST",uri,true);
	xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
	
	var feedback = document.getElementById("feedback").value;
	xhr.send(JSON.stringify(feedback));
	location.reload();
}


