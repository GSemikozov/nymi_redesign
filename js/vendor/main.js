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