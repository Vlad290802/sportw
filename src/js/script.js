const slider = tns({ 
	container: '.carousel__inner',
	items: 1,
	slideBy: 'page',
	autoplay: false,
	controls: false,
	nav: false,
	responsive: {
		320: {
			edgePadding: 20,
			gutter: 20,
			items: 1,
			nav: true
		},
		768: {
			items: 1,
			nav: true
		},
		992: {
			items: 1,
			nav: true
		},
		1200: {
			items: 1,
			nav: false
		}
	}
});

document.querySelector('.prev').addEventListener('click', function () {
		slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
		slider.goTo('next');
});

$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
	$(this)
		.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
});


function toggleSlide(item){
	$(item).each(function(i){
		$(this).on('click', function(e){
			e.preventDefault();
			$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
			$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
		})
	});
};

toggleSlide('.catalog-item__link');
toggleSlide('.catalog-item__back');


// Modal
$('[data-modal=consultation]').on('click', function(){
	$('.overlay, #consultation').fadeIn('slow');
});
$('.modal__close').on('click', function(){
	$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
});

$('.button_mini').each(function(i){
	$(this).on('click', function(){
		$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
		$('.overlay, #order').fadeIn('slow');
	})
});


function validateForms(form){
	$(form).validate({
		rules:{
			name: {
				required: true,
				minlength: 2
			  },
			phone: "required",
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			name: {
				required: "Пожалуйста, введите свое имя",
				minlength: jQuery.validator.format("Введите {0} символа!")
			  },
			phone: "Пожалуйста, введите свой номер телефон!",
			email: {
			  required: "Пожалуйста, введите свой email",
			  email: "Неправильный формат, пример: name@domain.com"
			}
		  }
	});
}

validateForms('#consultation-form');
validateForms('#consultation form');
validateForms('#order form');

$('input[name=phone]').mask("+38 (999) 999-9999");

$('form').submit(function(e) {
	e.preventDefault();
	$.ajax({
		type: "POST",
		url: "mailer/smart.php",
		data: $(this).serialize()
	}).done(function() {
		$(this).find("input").val("");
		$('#consultation, #order').fadeOut();
		$('.overlay, #thanks').fadeIn('slow');

		$('form').trigger('reset');
	});
	return false;
});



// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1000,
//         // adaptiveHeight: true,
//         prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left-solid.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="../icons/right-solid.png"></button>',
//         responsive: [
//             {
//                 breakpoint: 992,
//                 settings: {
//                     dots: true,
//                     arrows: false
//                 }
//             }
//         ]
//     });
// });