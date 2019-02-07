// Initialize materialize
document.addEventListener('DOMContentLoaded', function() {
    var sideNavs = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sideNavs, {});

    var materialBoxes = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(materialBoxes, {});

    var parallax = document.querySelectorAll('.parallax');
    M.Parallax.init(parallax, {});

    var tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs, {});

    var sliders = document.querySelectorAll('.slider');
    M.Slider.init(sliders, {
        height: 275
    });

    var scrollspy = document.querySelectorAll('.scrollspy');
    M.ScrollSpy.init(scrollspy, {});

});

// scroll back to top
window.onscroll = function()
{
    scrollFunction();
}

function scrollFunction()
{
    if(document.body.scrollTop > 900 || document.documentElement.scrollTop > 900)
    {
        document.getElementById("btnTop").style.display = "block";
    }
    else
    {
        document.getElementById("btnTop").style.display = "none";
    }
}

function backTop()
{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


// $(document).ready(function(){
//     $(".sidenav").sidenav();
//     $(".materialboxed").materialbox();
//     $(".parallax").parallax();
//     $(".tabs").tabs();
//     $(".slider").slider({
//         height: 275
//     });
//     $(".scrollspy").scrollSpy();
// });