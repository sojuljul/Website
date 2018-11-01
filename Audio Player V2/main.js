var audio;

$("#pause").hide();

initAudio($("#playlist li:first-child"));

function initAudio(element)
{
	var song = element.attr("song");
	var title = element.text();
	var cover = element.attr("cover");
	var artist = element.attr("artist");

	audio = new Audio(song);

	audio.volume = 0.1;

	if (!audio.currentTime)
	{
		$("#duration").html("0:00");
		$("#endDuration").html("0:00");
	}

	$("#player .title").text(title);
	$("#player .artist").text(artist);

	$("img.cover").attr("src", cover);
	$("#bg img").attr("src", cover);

	$("#playlist li").removeClass("active");
	element.addClass("active");
}

$("#play").click(function()
{
	audio.volume = 0.1;
	audio.play();
	$("#play").hide();
	$("#pause").show();
	$("#duration").fadeIn(400);
	$("#endDuration").fadeIn(400);
	showDuration();
});

$("#pause").click(function()
{
	audio.pause();
	$("#play").show();
	$("#pause").hide();
});

$("#next").click(function()
{
	audio.pause();
	var next = $("#playlist li.active").next();
	if(next.length == 0)
	{
		next = $("#playlist li:first-child");
	}
	initAudio(next);
	audio.play();
	showDuration();
});

$("#prev").click(function()
{
	audio.pause();
	var prev = $("#playlist li.active").prev();
	if(prev.length == 0)
	{
		prev = $("#playlist li:last-child");
	}
	initAudio(prev);
	audio.play();
	showDuration();
});

$("#volume").change(function()
{
	audio.volume = parseFloat(this.value / 10);

	if (audio.volume == 0)
	{
		$(".volumeIcon").attr("src", "novolume.png");
	}
	else
	{
		$(".volumeIcon").attr("src", "volume.png");
	}
});

function showDuration()
{
	$(audio).bind("timeupdate", function()
	{

		var s = parseInt(audio.currentTime % 60);
		var m = parseInt((audio.currentTime / 60) % 60);

		var fulltime = parseInt(audio.duration);
		var current = parseInt(audio.currentTime);
		var timeleft = fulltime - current;

		var fullsec = timeleft % 60;
		var fullmin = Math.floor(timeleft / 60) % 60;

		if (fullsec < 10)
		{
			fullsec = "0" + fullsec;
		}

		if (s < 10)
		{
			s = "0" + s;
		}

		$("#duration").html(m + ":" + s);
		$("#endDuration").html(fullmin + ":" + fullsec);

		var value = 0;

		if(audio.currentTime > 0)
		{
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}

		$("#progress").css("width", value + "%");
	});
}

$("#progressbar").mouseup(function(e)
{
	var leftOffset = e.pageX - $(this).offset().left;
	var songPercent = leftOffset / $("#progressbar").width();
	audio.currentTime = songPercent * audio.duration;
});

$(audio).on("ended", function()
{
	audio.pause();
	var next = $("#playlist li.active").next();
	if (next.length == 0)
	{
		next = $("#playlist li:first-child");
	}

	initAudio(next);
	audio.volume = 0.3;
	audio.play();
	showDuration();
});

function decreaseVolume()
{
	audio.volume -= 0.10; // volume value between 0 to 1

	if (audio.volume == 0)
	{
		$(".volumeIcon").attr("src", "novolume.png");
	}
}

function increaseVolume()
{
	audio.volume += 0.10;
}