let heejinPic = document.getElementById('heejinPic');
let hyunjinPic = document.getElementById('hyunjinPic');
let haseulPic = document.getElementById('haseulPic');
let yeojinPic = document.getElementById('yeojinPic');
let viviPic = document.getElementById('viviPic');
let kimlipPic = document.getElementById('kimlipPic');
let jinsoulPic = document.getElementById('jinsoulPic');
let choerryPic = document.getElementById('choerryPic');
let yvesPic = document.getElementById('yvesPic');
let chuuPic = document.getElementById('chuuPic');
let gowonPic = document.getElementById('gowonPic');
let oliviaPic = document.getElementById('oliviaPic');

heejinPic.addEventListener('click', showInfo);
hyunjinPic.addEventListener('click', showInfo);
haseulPic.addEventListener('click', showInfo);
yeojinPic.addEventListener('click', showInfo);
viviPic.addEventListener('click', showInfo);
kimlipPic.addEventListener('click', showInfo);
jinsoulPic.addEventListener('click', showInfo);
choerryPic.addEventListener('click', showInfo);
yvesPic.addEventListener('click', showInfo);
chuuPic.addEventListener('click', showInfo);
gowonPic.addEventListener('click', showInfo);
oliviaPic.addEventListener('click', showInfo);

function showInfo() {
    let allText = document.querySelectorAll('.member');

    for (let i = 0; i < allText.length; i++) {
        allText[i].children[0].className = 'hide';
    }

    console.log(this);

    let textId = this.attributes['data-txt'].value;
    let text = document.getElementById(textId);

    if (text.className === 'hide') {
        text.className = '';
    }
}

const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');

// setup UI
const setupUI = (user) => {
    if (user) {
        loggedInLinks.forEach(item => item.style.display = "block");
        loggedOutLinks.forEach(item => item.style.display = "none");
    }
    else {
        loggedInLinks.forEach(item => item.style.display = "none");
        loggedOutLinks.forEach(item => item.style.display = "block");
    }
}