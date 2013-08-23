var  createDragbar = function  ($dom , fun_ , opts) {

			//fun_ : function: while mouseup after dragging the drag-button
			
			opts = $.extend(
				{
					width: '285px',
					bar_height: '6px',
					margin: '6px 0',
					left_bg: '#74818b',
					button_bg: '#5a656e',
					right_bg: '#c7c7c7',
					dir: 'x'
				}
				, opts);

			opts.buttoon_size = parseInt(opts.bar_height) + 2 * parseInt(opts.margin) +'px';

			var $html = $('<div><p></p><div></div><p></p></div>');

			var e_mousemove_active = false;		//judge for mouseup

			if(opts.dir !== 'x' && opts.dir !== 'X'){

				 	$html.first().css({

						'-webkit-transform': 'rotate(90deg)',
						'-moz-transform': 'rotate(90deg)',
						'-ms-transform': 'rotate(90deg)'
				 	});
			}

			$html.addClass('clearfix').css({

					'position': 'relative',
					'display': 'inline-block'
				})

			.children('div').css({

				width: opts.buttoon_size,
				height: opts.buttoon_size,
				display: 'inline-block',
				position: 'absolute',
				top:0,
				left:0,
				'border-radius': '100%',
				'background-color': opts.button_bg

			}).on('mousedown', function (e) {

				var left_offset;

				var $that = $(this);

				e_mousemove_active = true;

				if(opts.dir != 'x' && (opts.dir != 'X')){

				 	left_offset =  -e.pageY + parseInt($(this).css('left'));
				 }

				else{

					left_offset = e.pageX - parseInt($(this).css('left'));
				}

				$(window).on('mousemove.drag_moving', function (e) {
					
					var left_reset;

					if(opts.dir != 'x' && (opts.dir != 'X')){

					 	left_reset = e.pageY + left_offset;
					 }

					else{

						left_reset = e.pageX - left_offset;
					}

						if(left_reset < 0){

							left_reset = 0;
						}

						var max_left = parseInt(opts.width)-parseInt(opts.buttoon_size);

						if(left_reset > max_left ){

							left_reset  = max_left;
						}
				
							bodySelect(false);

						$that.css({

							left: left_reset+'px',
						});

						$that.prev().width(left_reset);

						$that.next().width(parseInt(opts.width)-left_reset);

				}).on('mouseup', function () {

						if(!e_mousemove_active){

							return ;
						}

						$(this).off('.drag_moving');

						fun_();

						bodySelect(true);

						e_mousemove_active = false;

				});
				
			}).siblings('p').css({

				float: 'left',
				height: opts.bar_height

			});

			$html.children('p').css('margin', opts.margin)

			//		can add other ClassName using for more stylesheet

				.first().css({

						'background-color': opts.left_bg,
						'border-radius': '55px 0 0 55px'
					})

				.siblings('p').css({

					'background-color': opts.right_bg,
					'width': opts.width,
					'border-radius': '0 55px 55px 0'

				});

			$dom.append($html);

		}

		var bodySelect = function (t_or_f){

			if(t_or_f === true){

				$('body').css({

					'-moz-user-select': 'text',
					'-webkit-user-select': 'text',
					'-ms-user-select': 'text'

				});

			}
			if(t_or_f === false){

				$('body').css({

					'-moz-user-select': 'none',
					'-webkit-user-select': 'none',
					'-ms-user-selecct': 'none'

				});
			}
		}