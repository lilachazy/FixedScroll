/*
 *	FixedScroll 1.0.0 (jQuery Plugin)
 *
 *	Copyright (C) 2012 神 (@nemousucom). All Rights Reserved.
 *	Licensed under the GPL license.
 *
 *	Usage:
 *
 *	$(function() {
 *		$('#Navigation').FixedScroll();
 *	}
 *
 *	or
 *
 *	$(function() {
 *		$('#Navigation').FixedScroll({
 *			avoid: '#Footer',	// ID or Class to avoid overlap
 *			margin: 20			// The margin(px) between #Footer
 *		});
 *	});
 */
 
(function($) {
	$.fn.FixedScroll = function(option) {
		var is_IE6 = (navigator.userAgent.indexOf('MSIE 6') >= 0) ? true : false;
		if (is_IE6) {
			return false;
		}

		var option_default = {
			avoid: null,
			margin: 0
		};
		var option = $.extend(option_default, option);

		var target = this;
		var avoid  = (option.avoid) ? $(option.avoid) : null;

		var target_top = parseInt(target.css('top'));
		var target_height;

		var margin = option.margin;

		var ty;
		var ay;
		var sy;

		var set_position = function() {
			sy = $(window).scrollTop(); 

			if ((sy + target_top + target_height + margin) > ay) {
				target.css({
					'position': 'absolute',
					'top': ay - ty - (target_height - target_top) - margin
				});
			} else if (sy > (ty - target_top)) {
				target.css({
					'position': 'fixed',
					'top': target_top
				});
			} else {
				target.css({
					'position': 'absolute',
					'top': target_top
				});
			}
		};

		$(window).load(function() {
			if ($(window).scrollTop() == 0) {
				ty = target.offset().top;
			} else {
				var tmp = $(window).scrollTop();
				$(window).scrollTop(0);
				ty = target.offset().top;
				$(window).scrollTop(tmp);
			}
			target_height = target.height();
			ay = (avoid) ? avoid.offset().top : Number.MAX_VALUE;
		});

		$(window).bind('load, scroll', function() {
			set_position();
		});
	};
})(jQuery);