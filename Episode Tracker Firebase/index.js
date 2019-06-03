const episodeList = document.querySelector('#episodeList');
const form = document.querySelector('#myForm');

function renderEpisodes(doc) {
    let tr = document.createElement('tr');

    let title = document.createElement('td');
    let currentEp = document.createElement('td');
    let totalEp = document.createElement('td');

    let websiteIcon = document.createElement('i');
    websiteIcon.setAttribute('class', 'fas fa-external-link-alt');

    let websiteCol = document.createElement('td');
    let websiteBtn = document.createElement('a');
    //websiteBtn.textContent = 'Website ';
    websiteBtn.setAttribute('class', 'btn btn-primary');
    websiteBtn.setAttribute('href', doc.data().url);
    websiteBtn.setAttribute('target', '_blank');
    websiteCol.appendChild(websiteBtn);
    websiteBtn.appendChild(websiteIcon);

    let incrementIcon = document.createElement('i');
    incrementIcon.setAttribute('class', 'fas fa-plus');

    let incrementCol = document.createElement('td');
    let incrementBtn = document.createElement('button');
    //incrementBtn.textContent = '+';
    incrementBtn.setAttribute('class', 'btn btn-dark');
    incrementCol.appendChild(incrementBtn);
    incrementBtn.appendChild(incrementIcon);


    let decrementIcon = document.createElement('i');
    decrementIcon.setAttribute('class', 'fas fa-minus');

    let decrementCol = document.createElement('td');
    let decrementBtn = document.createElement('button');
    //decrementBtn.textContent = '-';
    decrementBtn.setAttribute('class', 'btn btn-dark');
    decrementCol.appendChild(decrementBtn);
    decrementBtn.appendChild(decrementIcon);


    let deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class', 'fas fa-trash');

    let deleteCol = document.createElement('td');
    let deleteBtn = document.createElement('button');
    //deleteBtn.textContent = 'x';
    deleteBtn.setAttribute('class', 'btn btn-danger');
    deleteCol.appendChild(deleteBtn);
    deleteBtn.appendChild(deleteIcon);

    tr.setAttribute('data-id', doc.id);

    title.textContent = doc.data().title;
    currentEp.textContent = doc.data().currentEp;
    totalEp.textContent = doc.data().totalEp;

    let notify = document.createElement('span');
    notify.setAttribute('class', 'badge badge-success');
    notify.textContent = 'Completed';

    let space = document.createElement('span');
    space.textContent = ' ';

    if (currentEp.textContent === totalEp.textContent) {
        notify.hidden = false;
    } else {
        notify.hidden = true;
    }

    title.appendChild(space);
    title.appendChild(notify);

    tr.appendChild(title);
    tr.appendChild(currentEp);
    tr.appendChild(totalEp);
    tr.appendChild(websiteCol);
    tr.appendChild(incrementCol);
    tr.appendChild(decrementCol);
    tr.appendChild(deleteCol);

    episodeList.appendChild(tr);

    incrementBtn.addEventListener('click', (e) => {
        console.log('increment target', e.target);
        console.log('increment currentTarget', e.currentTarget);

        let id = e.currentTarget.parentElement.parentElement.getAttribute('data-id');
        console.log('increment id', id);

        let item = episodeList.querySelector('[data-id=\'' + id + '\']');
        console.log('increment item', item);

        let value = parseInt(item.children[1].textContent);
        console.log('increment children', item.children);

        if (value < parseInt(totalEp.textContent)) {
            value++;
            console.log(value);

            db.collection('episodes').doc(id).update({
                currentEp: value
            })
        }


    })

    decrementBtn.addEventListener('click', (e) => {
        let id = e.currentTarget.parentElement.parentElement.getAttribute('data-id');
        console.log(id);

        let item = episodeList.querySelector('[data-id=\'' + id + '\']');

        let value = parseInt(item.children[1].textContent);

        if (value > 0) {
            value--;
            console.log(value);

            db.collection('episodes').doc(id).update({
                currentEp: value
            })
        }


    })

    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        let id = e.currentTarget.parentElement.parentElement.getAttribute('data-id');
        db.collection('episodes').doc(id).delete();
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (form.title.value === "") {
        alert("ERROR: Empty title");
    } else if (form.currentEp.value > form.totalEp.value) {
        alert("ERROR: Current episode number is greater than total episode count");
    } else {

        if (form.urlLink.value === "") {
            form.urlLink.value = "#";
        }

        db.collection('episodes').add({
            title: form.title.value,
            currentEp: form.currentEp.value,
            totalEp: form.totalEp.value,
            url: form.urlLink.value
        })

        document.getElementById('myForm').reset();
    }


})

db.collection('episodes').orderBy('title').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();

    console.log(changes);

    changes.forEach(change => {
        console.log(change.doc.data());

        if (change.type == 'added') {
            renderEpisodes(change.doc);

        } else if (change.type == 'removed') {
            console.log('removed');
            let tr = episodeList.querySelector('[data-id=\'' + change.doc.id + '\']');
            episodeList.removeChild(tr);
        } else if (change.type == 'modified') {
            console.log('modified');
            let item = episodeList.querySelector('[data-id=\'' + change.doc.id + '\']');
            item.children[1].textContent = change.doc.data().currentEp;

            if (item.children[1].textContent === item.children[2].textContent) {
                console.log('inside if');
                console.log(item.children[0]);
                item.children[0].children[1].hidden = false;

            } else {
                console.log('inside else');
                console.log(item.children[0]);
                item.children[0].children[1].hidden = true;

            }

        }
    })
})