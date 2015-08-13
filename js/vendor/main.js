jQuery(document).ready(function($) {

    var $menuContainer = $('#menu-wrapper');
    $('#menu-button').click(function(){
        if ($menuContainer.hasClass('menu-open')) {
            $menuContainer.removeClass('menu-open');
        } else {
            $menuContainer.addClass('menu-open');
        }
    });
});


jQuery(document).ready(function($) {

	if (Modernizr.mq('only screen and (min-width: 700px)')) {

		$(window).scroll(function () {
			var scroll = $(window).scrollTop();

			if (scroll >= 40) {
				$("#menu-wrapper").addClass("compress");
			} else {
				$("#menu-wrapper").removeClass("compress");
			}
		});
	};
});

jQuery(document).ready(function($){

	var stage = $("#animation-block");
	if (!$('body').hasClass('mobile-device')) {

		$(window).scroll(function () {
			var scroll = $(window).scrollTop();

			if (scroll >= ($(window).height() * 2) - ($(window).height() / 2)) {
				stage.removeClass().addClass('frame-3-active');
				if ($(window).width() < 600) {
					$(".content-text.first-step").hide();
					$(".content-text.second-step").hide();
					$(".content-text.third-step").show();
				} else {
					$(".content-text.first-step").fadeOut();
					$(".content-text.second-step").fadeOut();
					$(".content-text.third-step").fadeIn();
				}

			} else if (scroll >= $(window).height() - ($(window).height() / 4)) {
				stage.removeClass().addClass('frame-2-active');
				if ($(window).width() < 600) {
					$(".content-text.first-step").hide();
					$(".content-text.second-step").show();
					$(".content-text.third-step").hide();
				} else {
					$(".content-text.first-step").fadeOut();
					$(".content-text.second-step").fadeIn();
					$(".content-text.third-step").fadeOut();
				}

			} else {
				stage.removeClass().addClass('frame-1-active');
				if ($(window).width() < 600) {
					$(".content-text.first-step").show();
					$(".content-text.second-step").hide();
					$(".content-text.third-step").hide();
				} else {
					$(".content-text.first-step").fadeIn();
					$(".content-text.second-step").fadeOut();
					$(".content-text.third-step").fadeOut();
				}
			}

			if (scroll >= ($(window).height() / 3)) {
				$("#presentation").addClass('fade-out');
			} else {
				$("#presentation").removeClass('fade-out');
			}

			if (scroll >= ($(window).height())) {
				stage.addClass('complete');
			} else {
				stage.removeClass('complete');
			}
		});
	}
});


jQuery(document).ready(function($) {

	var $header = $('header.header-container');
	var $close = $('.video-player .icon-close');
	var $player = $('#inner-video-player');

	var duration = 600;

	var active_video;
	var video_id;

	$('.inner-video').each(function(i, video) {

		// fetch youtube oembed
		var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
		var match = video.href.match(p);
		if (!match) return;
		var video_id = match[1];

		$(video).data('video-id',video_id );

		$(video).click(function(e) {
			e.preventDefault();
			if (active_video) {
				close();
			}

			play(video);
		});

	});

	$close.click(function(e) { e.preventDefault(); close(); });


	function play(video){

		active_video = video;

		var video_id = $(video).data('video-id');
		var video_src = '//www.youtube.com/embed/'+video_id+'?feature=oembed&autoplay=1';

		var this_duration = duration;
		var $this_oembed = $('<iframe src="' + video_src + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
		var $this_player = $player;

		var hero_video = false;

		$header.addClass('video style-video');

		$this_player.fadeIn(this_duration);

		setTimeout(function() {
			$this_player.find('.player').append($this_oembed);
			resizePlayer();
		}, this_duration + 500);
	}


	function resizePlayer() {

		var ratio = 16/9;

		var $wrap = $player.find('.player');
		var $this_oembed = $player.find('iframe');

		var max_height = $wrap.height();
		var max_width = $wrap.width();

		var wrap_ratio = max_width / max_height;
		if (wrap_ratio > ratio) {
			// limit iframe width
			$this_oembed.css('width', max_height * ratio);
			$this_oembed.css('height', '');
		}
		if (wrap_ratio < ratio) {
			// limit iframe height
			$this_oembed.css('width', '');
			$this_oembed.css('height', max_width / ratio);
		}

		console.log(max_width,max_height);
	}

	function close() {

		if (active_video) {
			video = active_video;
		} else {
			return;
		}

		var this_duration = duration;
		var $this_player = $player;

		$this_oembed = $this_player.find('iframe');
		$this_oembed.attr('src', "about:blank");
		$this_oembed.remove();

		active_video = null;

		setTimeout(function() {

			$header.removeClass('style-video');

			$this_player.fadeOut(this_duration, function(){
				$header.removeClass('video');
				active_video = null;
			});
		}, 500);
	}

	$(window).on('resize orientationchange', function(e) {
		resizePlayer();
	});

	$('.tabs-legal .tab-link').click(function(){
		var tab_id = $(this).attr('data-tab');
		$('.tabs-legal .tab-link, .tab-content').removeClass('current');
		$(this).addClass('current');
		$('#tab-'+tab_id).addClass('current');
	});
});