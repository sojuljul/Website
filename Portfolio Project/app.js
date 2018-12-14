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

$(document).ready(function(){
    $(".sidenav").sidenav();
    $(".materialboxed").materialbox();
    $(".parallax").parallax();
    $(".tabs").tabs();
});