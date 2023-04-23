$(function(){

	// Скролл к элементам с хэшем

	$(document).on('click', '.xs_hash', function(event){
		var height = parseInt(Math.round($($(this).attr('href')).offset().top))
		
		$('html, body').stop().animate({
			scrollTop: height
		}, 500, "linear")
		
		return false
	})
	
	
	// Выдвигаем адаптивное меню
	
	$('.buttonMenu').click(function()
	{
		$('body').toggleClass('show_menu')
	})
	
	$('.menu-container__close').click(function()
	{
		$('body').removeClass('show_menu')
	})
	
	
	// Обратная связь
	
	$('a[href="#xs_recall"]').click(function()
	{
		var t = $(this).data('theme'),
			b = $(this).data('button'),
            d = $(this).data("description"),
			y = $(this).data('yandexid'),
			g = $(this).data('googleid')
			
		$('#xs_recall input[type=submit]').val(b)
		$('#xs_recall input[name=xs_theme]').val(t)
		$("#xs_recall .description").text(d)
		$('#xs_recall .title').text(t)
		
		if(y !== undefined)
			$('#xs_recall .xs_send_form').data('yandexid', y)
		else
			$('#xs_recall .xs_send_form').data('yandexid', '')
		
		if(g !== undefined)
			$('#xs_recall .xs_send_form').data('googleid', g)
		else
			$('#xs_recall .xs_send_form').data('googleid', '')
		
		$('.xs_result').text('');
	})
	
	if($('input[name=xs_link]').length > 0)
		$('input[name=xs_link]').val(window.location.href)
	
	$('.xs_send_form').on('submit', function(e)
	{
		e.preventDefault()
		
		var f = $(this),
			yandexid = f.data('yandexid'),
			googleid = $(this).data('googleid')
		
		f.addClass('xs_load')
		
		$.ajax({
			url: '/wp-content/themes/xs_business/load/mail.php',
			method: 'post',
			data: f.serialize(),
			success: function(data)
			{
				if(data != 'error')
				{
					//if(yandexid !== undefined && yandexid != '')
					//	yaCounter50465191.reachGoal(yandexid)
					
					//if(googleid !== undefined && googleid != '')
					//	ga('send', 'event', googleid);
					
					f.find('input[type=text],textarea,input[type=url],input[type=number],select,input[type=email],input[type=date],input[type=tel]').val('')
					f.find('.xs_result').html(data)
				}
				else
					alert('Ошибка при отправке данных. Пожалуйста заполните обязательное поле "Телефон"')
				
				
				f.removeClass('xs_load')
			}
		})
	})


    // Проверяем, можно ли использовать Webp формат
	function canUseWebp() {
	    // Создаем элемент canvas
	    let elem = document.createElement('canvas');
	    // Приводим элемент к булеву типу
	    if (!!(elem.getContext && elem.getContext('2d'))) {
	        // Создаем изображение в формате webp, возвращаем индекс искомого элемента и сразу же проверяем его
	        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
	    }
	    // Иначе Webp не используем
	    return false;
	}

	window.onload = function () {
	    // Получаем все элементы с дата-атрибутом data-bg
	    let images = document.querySelectorAll('[data-bg]');
	    // Проходимся по каждому
	    for (let i = 0; i < images.length; i++) {
	        // Получаем значение каждого дата-атрибута
	        let image = images[i].getAttribute('data-bg');
	        // Каждому найденному элементу задаем свойство background-image с изображение формата jpg
	        images[i].style.backgroundImage = 'url(' + image + ')';
	    }

	    // Проверяем, является ли браузер посетителя сайта Firefox и получаем его версию
	    let isitFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
	    let firefoxVer = isitFirefox ? parseInt(isitFirefox[1]) : 0;

	    // Если есть поддержка Webp или браузер Firefox версии больше или равно 65
	    if (canUseWebp() || firefoxVer >= 65) {
	        // Делаем все то же самое что и для jpg, но уже для изображений формата Webp
	        let imagesWebp = document.querySelectorAll('[data-bg-webp]');
	        for (let i = 0; i < imagesWebp.length; i++) {
	            let imageWebp = imagesWebp[i].getAttribute('data-bg-webp');
	            imagesWebp[i].style.backgroundImage = 'url(' + imageWebp + ')';
	        }
	    }
	};



	// Добавление к 4му проекту класса _anim-items при 992px
	if( $(document).width() <= 992)
		$('.portfolio__item:nth-child(4)').addClass('_anim-items')

	// Добавление к 4му проекту класса _anim-items при 700px
	if( $(document).width() <= 700)
		$('.portfolio__item:nth-child(3)').addClass('_anim-items')



	// Добавление анимации к тегу H1
	function startAnimation() {
      let heroTitle = document.querySelector('.hero__title');
      if (heroTitle) 
      {

		  var blasts = document.querySelectorAll(".hero__title.main-blast .blast");
		  var i = 0;
		  var logoAnimation = false;

		  function addAnimationClass() {
		    if (i >= blasts.length) {
		      if (logoAnimation) {
		        document.querySelector(".hero__highlight").classList.add("animation-logo");
		      }
		      return;
		    }

		    if (blasts[i].classList.contains("hero__highlight")) {
		      logoAnimation = true;
		      blasts[i].classList.add("animation-logo");
		    }

		    blasts[i].classList.add("animated", "bounceIn");
		    blasts[i].style.opacity = 1;

		    i++;

		    if (i === blasts.length) {
		      setTimeout(function () {
		        for (var j = 0; j < blasts.length; j++) {
		          if (!blasts[j].classList.contains("hero__highlight")) {
		            blasts[j].classList.remove("animated", "bounceIn");
		          }
		        }
		      }, 100);
		    }

		    setTimeout(addAnimationClass, 100);
		  }

			addAnimationClass();
		}
	}

	// Добавление класса loaded когда страница полность загружена
	/*function addLoadedClass() {
		window.addEventListener("load", function () {
			setTimeout(function () {
				document.documentElement.classList.add('loaded');
				startAnimation();
			}, 0);
		});
	}

	addLoadedClass();*/


	// Добавление класса loaded когда страница полность загружена GPT
	function addLoadedClass() {
	  var htmlElement = document.querySelector('html');
	  htmlElement.classList.add('loaded');
	}

	if (document.readyState === 'complete') {
	  addLoadedClass();
	  startAnimation();
	}
	else {
	  window.addEventListener('load', addLoadedClass);
	  startAnimation();
	}


	// Эффект при наведении на каждую букву
	function addAnimationClass() {
	  var blasts = document.querySelectorAll(".main-blast .blast");
	  var timeoutIds = {};

	  function onHover() {
	    var element = this;
	    element.classList.add("animated", "rubberBand");
	    clearTimeout(timeoutIds[element]);
	  }

	  function onHoverOut() {
	    var element = this;
	    blasts.forEach(function(blast) {
	      clearTimeout(timeoutIds[blast]);
	      if (blast !== element) {
	        blast.classList.remove("animated", "rubberBand");
	      }
	    });
	    timeoutIds[element] = setTimeout(function() {
	      element.classList.remove("animated", "rubberBand");
	    }, 700);
	  }

	  blasts.forEach(function(blast) {
	    blast.addEventListener("mouseover", onHover);
	    blast.addEventListener("mouseout", onHoverOut);
	  });
	}

	addAnimationClass();

	// Для главной буквы H1 отключаем доп анимацию
	let heroTitle = document.querySelector('.hero__title');
    if (heroTitle) 
    {
		const animationLogo = document.querySelector('.hero__highlight');

		animationLogo.addEventListener('mouseover', function() {
		  this.classList.remove('animation-logo');
		  this.classList.remove('bounceIn');
		});
	}




	// Добавление анимации к последующим Title
	/*function startAnimationTitle() {
		var blasts = document.querySelectorAll(".main-blast._active .blast");
		var i = 0;
		var logoAnimation = false;

		function addAnimationClass() {
			if (i >= blasts.length) {
		  	return;
		}

	    blasts[i].classList.add("animated", "bounceIn");
	    blasts[i].style.opacity = 1;

	    i++;

	    if (i === blasts.length) {
	      setTimeout(function () {
	        for (var j = 0; j < blasts.length; j++) {
	            blasts[j].classList.remove("animated", "bounceIn");
	        }
	      }, 100);
	    }

	    setTimeout(addAnimationClass, 100);
	  }

	  addAnimationClass();
	}*/


	// Анимация при скролле  
	const animItems = document.querySelectorAll('._anim-items');  
	// Событие, при скролле начинается эта функция 
	window.addEventListener('scroll', animOnScroll);  

	function animOnScroll() {  
	  for (let index = 0; index < animItems.length; index++) {  
	    // Получаем каждый из элементов массива 
	    const animItem = animItems[index]; 

	    // Получаем высоту каждого элемента 
	    const animItemHeight = animItem.offsetHeight;

	    // Как далеко объект от верха страницы 
	    const animItemOffset = offset(animItem).top; 

	    // 1/4 высоты объекта 
	    const animStart = 4; 

	    // Высчитываем Высота окна браузера - высота объекта / на коэф. 
	    let animItemPoint = window.innerHeight - animItemHeight / animStart;  

	    // Если высота объекта выше высоты окна браузера 
	    if (animItemHeight > window.innerHeight) {  
	      animItemPoint = window.innerHeight - window.innerHeight / animStart;  
	    }  

	    // Если мы прокрутили нужное кол-во px то добавляем класс 
	    // Нужно для повтоной анимации 
	    if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {  
	      animItem.classList.add('_active')  
	    } else {  
	      // Повторная анимация 
	      /*if(!animItem.classList.contains('_anim-no-hide')) {  
	        animItem.classList.remove('_active')  
	      } */ 
	    }  
	  }  
	}  

	// Инициализация  
	setTimeout( function(){  
	    animOnScroll();  
	}, 300 )




	// Blast для последующих title
	/*let chars = $('._title_anim h2').blast({
  		delimiter: 'character',
		returnGenerated: false
	});*/	

	let chars = $('._title_anim h2')

	chars.each(function(i) {
	  $(this).css({
	    opacity: 0
	  })

	  .delay(i * 45)

	  .animate({ opacity: 1 }, 300);
	});

	const observerCallback = function(mutationsList, observer) {
	  for (let mutation of mutationsList) {
	    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
	      if (mutation.target.classList.contains('_active')) {

	        var sectionAbout = jQuery('._title_anim');
	        var a = 0;
	        sectionAbout.find("h2 .blast").each(function(){
	            var el = jQuery(this);
	            setTimeout(function(){
	                el.addClass('animated bounceIn');
	            },a);
	            a = a + 80;
	        });
	        setTimeout(function(){
	            sectionAbout.find(".blast").removeClass('animated bounceIn');
	            sectionAbout.find(".blast").css('opacity',1);
	            sectionAbout.find(".blast").mouseenter(function (){
	                var el = jQuery(this);
	                jQuery(this).addClass('animated rubberBand');
	                jQuery(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	                    el.removeClass('animated rubberBand');
	                });
	            });
	        },2000);
	        // отключаем Observer, когда наш код был запущен
	        observer.disconnect();
	      }
	    }
	  }
	};

	// создаем Observer для элемента с классом portfolio
	let portfolio = document.querySelector('.portfolio__wrtitle');
	let observer = new MutationObserver(observerCallback);
	observer.observe(portfolio, { attributes: true });




	// Paralax курсор мыши
	if ($('#canvas').length) {
	  initOciliator(false);
	}

	// Сфера, страница skills
	if( ! $('#myCanvas').tagcanvas({
	    textColour : '#08FDD8',
	    outlineThickness : 0.5,
	    outlineColour : '#FE0853',
	    maxSpeed : 0.06,
	    freezeActive:true,
	    shuffleTags:true,
	    shape:'sphere',
	    zoom:0.8,
	    noSelect:true,
	    textFont:null,
	    pinchZoom:true,
	    wheelZoom:false,
	    freezeDecel:true,
	    fadeIn:3000,
	    initial: [0.3,-0.1],
	    depth : 1.1
	})) 


	// Функция рассчета скролла
	function offset(el) { 
		const rect = el.getBoundingClientRect(), 
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, 
		scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft } 
	} 

	// Открытие бургер меню
	$(document).on('click', '.menu-burger', function(){
		$('body').toggleClass('dropmenu')
	})

	// Portfolio
	$(document).on('click', '.portfolio__item', function () {
		let link = $(this).data('link')

		$('.popup-port').attr('href', link)
	})


	// paralax эффект на изображение
	/*class t {
	    constructor(t, e = null) {
	        if (
	            ((this.config = Object.assign({
	                    init: !0,
	                    logging: !0
	                }, t)),
	                this.config.init)
	        ) {
	            const t = document.querySelectorAll("[data-prlx-mouse]");
	            t.length ?
	                (this.paralaxMouseInit(t),
	                    this.setLogging(`Проснулся, слежу за объектами: (${t.length})`)) :
	                this.setLogging("Нет ни одного объекта. Сплю...zzZZZzZZz...");
	        }
	    }
	    paralaxMouseInit(t) {
	        t.forEach((t) => {
	            const e = t.closest("[data-prlx-mouse-wrapper]"),
	                n = t.dataset.prlxCx ? +t.dataset.prlxCx : 50,
	                o = t.dataset.prlxCy ? +t.dataset.prlxCy : 200,
	                i = t.hasAttribute("data-prlx-dxr") ? -1 : 1,
	                s = t.hasAttribute("data-prlx-dyr") ? -1 : 1,
	                a = t.dataset.prlxA ? +t.dataset.prlxA : 50;
	            let l = 0,
	                r = 0,
	                d = 0,
	                c = 0;

	            function u(e = window) {
	                e.addEventListener("mousemove", function(e) {
	                    const n = t.getBoundingClientRect().top + window.scrollY;
	                    if (n >= window.scrollY || n + t.offsetHeight >= window.scrollY) {
	                        const t = window.innerWidth,
	                            n = window.innerHeight,
	                            o = e.clientX - t / 2,
	                            i = e.clientY - n / 2;
	                        (d = (o / t) * 100), (c = (i / n) * 100);
	                    }
	                });
	            }!(function e() {
	                (l += ((d - l) * a) / 1e3),
	                (r += ((c - r) * a) / 1e3),
	                (t.style.cssText = `transform: translate3D(${(i * l) / (n / 10)}%,${
	          (s * r) / (o / 10)
	        }%,0);`),
	                requestAnimationFrame(e);
	            })(),
	            e ? u(e) : u();
	        });
	    }
	    setLogging(t) {
	        this.config.logging &&
	            (function(t) {
	                setTimeout(() => {
	                    window.FLS && console.log(t);
	                }, 0);
	            })(`[PRLX Mouse]: ${t}`);
	    }
	}

	const myParallax = new t({ init: true, logging: true });*/

})