// initialize
const bookmarkList = document.querySelector('#bookmarkList');
const form = document.querySelector('#myForm');

// global id to use for saving data
var globalId = 0;

// adding data to table in html
function renderBookmarks(doc)
{
	let tr = document.createElement('tr');

	let name = document.createElement('td');
	let openColumn = document.createElement('td');
	let deleteColumn = document.createElement('td');
	let editColumn = document.createElement('td');

	let openBtn = document.createElement('a');
	let deleteBtn = document.createElement('a');
	let editBtn = document.createElement('a');

	tr.setAttribute('data-id', doc.id);

	name.textContent = doc.data().name;
	name.setAttribute('style', 'min-width: 350px; font-weight: bold');

	openBtn.textContent = 'Open';
	deleteBtn.textContent = 'Delete';
	editBtn.textContent = 'Edit';

	// open attributes
	openBtn.setAttribute('href', doc.data().url);
	openBtn.setAttribute('class', 'btn btn-success');
	openBtn.setAttribute('target', '_blank')
	openBtn.setAttribute('value', 'Open');

	// delete attributes
	deleteBtn.setAttribute('class', 'btn btn-danger');
	deleteBtn.setAttribute('href', '#');

	// edit attributes
	editBtn.setAttribute('class', 'btn btn-secondary');
	editBtn.setAttribute('href', '#');

	// appending tags
	openColumn.appendChild(openBtn);
	deleteColumn.appendChild(deleteBtn);
	editColumn.appendChild(editBtn);

	tr.appendChild(name);
	tr.appendChild(openColumn);
	tr.appendChild(deleteColumn);
	tr.appendChild(editColumn);

	bookmarkList.appendChild(tr);

	// delete action
	deleteBtn.addEventListener('click', (e) => {
		e.stopPropagation();

		let id = e.target.parentElement.parentElement.getAttribute('data-id'); // nested as a, td, tr
		db.collection('websites').doc(id).delete();
	})

	// edit action
	editBtn.addEventListener('click', (e) => {
		let id = e.target.parentElement.parentElement.getAttribute('data-id'); // nested as a, td, tr
		
		console.log(id);

		let item = bookmarkList.querySelector('[data-id=\'' + id + '\']');
		
		document.getElementById('siteName').value = item.children[0].textContent; // children[0] is name
		document.getElementById('siteURL').value = item.children[1].children[0].href; // children[1] is url
		document.getElementById('save-btn').style.visibility = '';
		document.getElementById('cancel-btn').style.visibility = '';
		document.getElementById('submit-btn').disabled = true;

		setID(id); // set global id to current item being edited
	})
}

function setID(id)
{
	globalId = id;
}

function saveChange()
{
	let newName = document.getElementById('siteName').value;
	let newUrl = document.getElementById('siteURL').value;

	// use globalId which was set when edit btn clicked
	db.collection('websites').doc(globalId).update({
		name: newName,
		url: newUrl
	})

	document.getElementById('myForm').reset();
	document.getElementById('submit-btn').disabled = false;
	document.getElementById('save-btn').style.visibility = 'hidden';
	document.getElementById('cancel-btn').style.visibility = 'hidden';
}

function cancelChange()
{
	document.getElementById('myForm').reset();
	document.getElementById('submit-btn').disabled = false;
	document.getElementById('save-btn').style.visibility = 'hidden';
	document.getElementById('cancel-btn').style.visibility = 'hidden';
}

// adding data to database
form.addEventListener('submit', (e) => {
	
	e.preventDefault();

	db.collection('websites').add({
		name: form.siteName.value,
		url: form.siteURL.value
	})

	document.getElementById('myForm').reset();

})

// upon any change, update front-end of site in real time
db.collection('websites').orderBy('name').onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	console.log(changes);

	changes.forEach(change => {
		console.log(change.doc.data());

		if (change.type == 'added')
		{
			renderBookmarks(change.doc);
		}
		else if (change.type == 'removed')
		{
			console.log('removed');
			let tr = bookmarkList.querySelector('[data-id=\'' + change.doc.id + '\']'); // added '' around id bc CSS selectors dont accept int as start
			bookmarkList.removeChild(tr);
		}
		else if (change.type == 'modified')
		{
			console.log('modified');
			let item = bookmarkList.querySelector('[data-id=\'' + change.doc.id + '\']');
			item.children[0].textContent = change.doc.data().name;
			item.children[1].children[0].href = change.doc.data().url;

		}
	})
})
