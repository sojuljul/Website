// Materialize initialization
document.addEventListener('DOMContentLoaded', function() {
    var slides = document.querySelectorAll('.slider');
    M.Slider.init(slides, {
        height: 450
    });

    var tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs);

    var materials = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(materials, {});

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});


const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const membersLink = document.querySelector(".membersLink");

const mainContent = document.querySelector('#main');
const header = document.querySelector("#header");
const headerContent = document.querySelector("#headerContent");

// setup UI
const setupUI = (user) => {
    if (user) {
        // nav links
        loggedInLinks.forEach(item => item.style.display = "block");
        loggedOutLinks.forEach(item => item.style.display = "none");

        // html link
        membersLink.href = 'members.html';

        // main content display
        mainContent.className = '';
        
        // header
        header.style.backgroundImage = "url(img/loonaAlbum.png)";
        header.style.minHeight = "1000px";
        headerContent.style.display = "none";

        // reinitialize, otherwise itll highlight all tabs
        var tabs = document.querySelectorAll('.tabs');
        M.Tabs.init(tabs);
        
    }
    else {
        // nav links
        loggedInLinks.forEach(item => item.style.display = "none");
        loggedOutLinks.forEach(item => item.style.display = "block");
        
        // html link
        membersLink.href = '#';

        // main content display
        mainContent.className = 'hide';

        // header
        header.style.backgroundImage = "none";
        header.style.minHeight = "0";
        headerContent.style.display = "block";

    }
}


// scroll back to top
window.onscroll = function() {
    scrollFunction();
}

function scrollFunction() {
    // body = safari
    // documentElement = chrome, firefox

    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        document.getElementById('topBtn').style.display = 'block';
    }
    else {
        document.getElementById('topBtn').style.display = 'none';
    }
}

function backTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}