		function bodySelect (t_or_f){

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