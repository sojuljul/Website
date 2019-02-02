// Materialize initialization
document.addEventListener('DOMContentLoaded', function() {
    var slides = document.querySelectorAll('.slider');
    M.Slider.init(slides, {
        height: 450
    });

    var materials = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(materials, {});

    var tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs, {});
});

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