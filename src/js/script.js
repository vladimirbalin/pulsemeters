import $ from 'jquery';
window.jQuery = $;
window.$ = $;


import './parts/jquery.maskedinput.min';
import 'jquery-validation';
import 'owl.carousel';
import WOW from './parts/wow.min';
import './parts/awesome.fonts';


window.addEventListener('DOMContentLoaded', function () {

  'use strict';

	$('.owl-carousel').owlCarousel({
    loop: true,
    center: true,
    nav: false,	
    smartSpeed:1150,
    responsive:{ 
        0:{
            center: true,
            items:1            
        }, 
        500:{
            items: 1
        },
        1200:{
            loop: true,
            items: 1
        }
        }
    });
	
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    const owl = $('.owl-carousel');
    $('.prev').click(function() {
        owl.trigger('prev.owl.carousel');
    });

    $('.next').click(function() {
        owl.trigger('next.owl.carousel');
    });

    //modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');        
    });
    $('.overlay').on('click', function (e) { 
        if(e.target === document.querySelector('.overlay')){
            $('.overlay, #consultation, #thanks, #order').fadeOut('slow');    
        }
    });
    //на esc тоже закрываем
    $(document).keydown(function(e) {
        if (e.keyCode === 27) {
            $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
        }
    }); 

    $('.button_mini').each(function(i){
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    function validateForms(form){
        $(form).validate({
            rules: {
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
                    required: "Введите своё имя",
                    minlength: window.$.validator.format("Поле должно состоять минимум из {0} символов!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
    
        });
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
    });

    //pageup and  
    $(window).scroll(function() {
        if ($(this).scrollTop() > 800) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }        
    });
    //Smooth scroll 
    $("a[href^='#up']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();

    let map = document.querySelector('#map-wrap iframe');
        $(document).click(function(e) { 
            if(e.target.id === 'map-wrap') {
                map.style.pointerEvents = 'all';
                return false;
            } 
            map.style.pointerEvents = 'none';        
      });
});
