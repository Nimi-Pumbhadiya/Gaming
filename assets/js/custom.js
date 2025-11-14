/*  jQuery Nice Select - v1.0
https://github.com/hernansartorio/jquery-nice-select
Made by Hernán Sartorio  */
!function (e) { e.fn.niceSelect = function (t) { function s(t) { t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><div class="list-wrp"><ul class="list"></ul></div>')); var s = t.next(), n = t.find("option"), i = t.find("option:selected"); s.find(".current").html(i.data("display") || i.text()), n.each(function (t) { var n = e(this), i = n.data("display"); s.find("ul").append(e("<li></li>").attr("data-value", n.val()).attr("data-display", i || null).addClass("option" + (n.is(":selected") ? " selected" : "") + (n.is(":disabled") ? " disabled" : "")).html(n.text())) }) } if ("string" == typeof t) return "update" == t ? this.each(function () { var t = e(this), n = e(this).next(".nice-select"), i = n.hasClass("open"); n.length && (n.remove(), s(t), i && t.next().trigger("click")) }) : "destroy" == t ? (this.each(function () { var t = e(this), s = e(this).next(".nice-select"); s.length && (s.remove(), t.css("display", "")) }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this; this.hide(), this.each(function () { var t = e(this); t.next().hasClass("nice-select") || s(t) }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function (t) { var s = e(this); e(".nice-select").not(s).removeClass("open"), s.toggleClass("open"), s.hasClass("open") ? (s.find(".option"), s.find(".focus").removeClass("focus"), s.find(".selected").addClass("focus")) : s.focus() }), e(document).on("click.nice_select", function (t) { 0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option") }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function (t) { var s = e(this), n = s.closest(".nice-select"); n.find(".selected").removeClass("selected"), s.addClass("selected"); var i = s.data("display") || s.text(); n.find(".current").text(i), n.prev("select").val(s.data("value")).trigger("change") }), e(document).on("keydown.nice_select", ".nice-select", function (t) { var s = e(this), n = e(s.find(".focus") || s.find(".list .option.selected")); if (32 == t.keyCode || 13 == t.keyCode) return s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1; if (40 == t.keyCode) { if (s.hasClass("open")) { var i = n.nextAll(".option:not(.disabled)").first(); i.length > 0 && (s.find(".focus").removeClass("focus"), i.addClass("focus")) } else s.trigger("click"); return !1 } if (38 == t.keyCode) { if (s.hasClass("open")) { var l = n.prevAll(".option:not(.disabled)").first(); l.length > 0 && (s.find(".focus").removeClass("focus"), l.addClass("focus")) } else s.trigger("click"); return !1 } if (27 == t.keyCode) s.hasClass("open") && s.trigger("click"); else if (9 == t.keyCode && s.hasClass("open")) return !1 }); var n = document.createElement("a").style; return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"), this } }(jQuery);
$(document).ready(function () {
    // /********* On scroll heder Sticky *********/
    function initHeaderSticky() {
        if (jQuery(document).height() > jQuery(window).height()) {
            if (jQuery(this).scrollTop() > 250) {
                jQuery('.site-header').addClass("fixed");
            } else {
                jQuery('.site-header').removeClass("fixed");
            }
        }
    }
    $(document).ready(function () {
        initHeaderSticky()
    });
    $(window).on('resize scroll', function () {
        initHeaderSticky()
    });
    // /********* On scroll heder back *********/
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("header-sticky").style.transform = "translateY(0)";
        } else {
            if (jQuery(this).scrollTop() > 250) {
                document.getElementById("header-sticky").style.transform = "translateY(-100%)";
            }
        }
        prevScrollpos = currentScrollPos;
    }
    /******  Nice Select  ******/
    $('select').niceSelect();
    /********* Mobile Menu ********/
    /******  menu hover  ******/
    // Open the mobile menu
    $('body').on('click', '.mobile-menu-button', function (e) {
        e.preventDefault();
        setTimeout(function () {
            $('body').addClass('no-scroll active_menu');
            $('.overlay').addClass('active');
        }, 50);
    });
    // Open the main menu desk & mob
    $(window).on("resize", function () {
        if ($(window).width() < 992) {
            $('body').off('mouseenter mouseleave', '.main-menu.has-item'); // Unbind hover events
            $('body').on('click', '.main-menu.has-item > a', function (e) {
                e.preventDefault();
                var $parentMenu = $(this).closest('.main-menu.has-item');
                $parentMenu.addClass("menu_active");
                $parentMenu.find(".menu-dropdown").addClass("open_menu");
            });
        } else {
            $('body').off('click', '.main-menu.has-item > a'); // Unbind click events
            $('body').on('mouseenter', '.main-menu.has-item', function (e) {
                e.preventDefault();
                var $parentMenu = $(this).closest('.main-menu.has-item');
                $parentMenu.addClass("menu_active");
                $parentMenu.find(".menu-dropdown").addClass("open_menu");
                $("body").addClass("no-scroll");
            }).on('mouseleave', '.main-menu.has-item', function (e) {
                e.preventDefault();
                $(this).removeClass("menu_active");
                $(this).find(".menu-dropdown").removeClass("open_menu");
                $("body").removeClass("no-scroll");
            });
        }
    }).resize();
    // Close the main-menu
    $('body').on('click', '.back-menu-button', function () {
        $('.main-menu.has-item').removeClass("menu_active");
        $('.menu-dropdown').removeClass("open_menu");
    });
    // Open the submenu
    $('body').on('click', '.sub-menu-lnk > a', function (e) {
        e.preventDefault();
        var $parentMenu = $(this).closest('.sub-menu-lnk');
        $parentMenu.addClass("menu_active");
        $parentMenu.find(".sub-menu-dropdown").addClass("open_menu");
    });
    // Close the submenu
    $('body').on('click', '.sub-menu-back', function () {
        $('.sub-menu-lnk').removeClass("menu_active");
        $('.sub-menu-dropdown').removeClass("open_menu");
    });
    // Close all menu
    $('body').on('click', '.overlay, .menu-close-icon svg', function (e) {
        e.preventDefault();
        $('.main-menu.has-item').removeClass("menu_active");
        $('.overlay').removeClass('active');
        $('body').removeClass('no-scroll active_menu');
        $(".menu-dropdown").removeClass("open_menu");
        $('.sub-menu-lnk').removeClass("menu_active");
        $('.sub-menu-dropdown').removeClass("open_menu");
    });
    /********* mobile stickybar ********/
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $(".mobile-stickybar").addClass('show');
        } else {
            $(".mobile-stickybar").removeClass('show');
        }
    });
    /*********  Multi-level accordion nav (header & faq) ********/
    $('.acnav-label').click(function () {
        var label = $(this);
        var parent = label.parent('.has-children');
        var list = label.siblings('.acnav-list');
        if (parent.hasClass('is-open')) {
            list.slideUp('fast');
            parent.removeClass('is-open');
        }
        else {
            list.slideDown('fast');
            parent.addClass('is-open');
        }
    });
    /******* header responsive add language and currency js ********/
    function responsiveMenu() {
        if (jQuery(window).width() < 992) {
            if (!$('.mobile-lag').length > 0) {
                const newDiv = document.createElement('div');
                newDiv.className = 'mobile-lag flex align-center';
                $(newDiv).insertAfter('.menu-close-icon');
                $('.country-name, .languages').prependTo('.mobile-lag');
            } else {
                return false;
            }
        }
        else {
            $('.site-header .country-name,.site-header .languages').prependTo('.site-header .announcebar-right');
            $('.mobile-lag').remove();
        }
    }
    jQuery(document).ready(function () {
        responsiveMenu();
    });
    jQuery(window).resize(function () {
        responsiveMenu();
    });
    var headerClass = $('header').attr('class').match(/header-style-(one|two|three)/);
    if (headerClass) {
        $('body').addClass(headerClass[0]);
    }
    /********* Cart Popup ********/
    $('.main-cart').on('click', function (e) {
        e.preventDefault();
        setTimeout(function () {
            $('body').addClass('no-scroll cartopen');
            $('.overlay').addClass('active');
        }, 50);
    });
    $(document).on('click', '.overlay, .mini-cart-header .closecart', function (e) {
        e.preventDefault();
        $('.overlay').removeClass('active');
        $('body').removeClass('no-scroll cartopen');
        $('.coupon-popup').removeClass('active');
        $('.gift-popup').removeClass('active');
    });
    /******* Cookie Js *******/
    if ($('.cookie-popup').length > 0) {
        $('.cookie-popup').addClass('active');
    }
    $('.cookie-accept-btn').click(function () {
        $('.cookie-popup').slideUp();
    });
    /******** product notification js ********/
    if ($('.product-notification-popup').length > 0) {
        $('.product-notification-popup').addClass('active');
    }
    $(".notification-close-btn").on("click", function () {
        $('.product-notification-popup').removeClass('active');
    });
    /*********coupon popup ********/
    $(".coupon-icon").click(function () {
        $(".coupon-popup").addClass("active");
    });
    $(".coupon-icon").click(function () {
        $(".gift-popup").removeClass("active");
    });
    $(".close-coupon").click(function () {
        $(".coupon-popup").removeClass("active");
    });
    /*********gift popup ********/
    $(".gift-icon").click(function () {
        $(".gift-popup").addClass("active");
    });
    $(".gift-icon").click(function () {
        $(".coupon-popup").removeClass("active");
    });
    $(".close-gift").click(function () {
        $(".gift-popup").removeClass("active");
    });
    /********* qty spinner ********/
    var quantity = 0;
    $('.quantity-increment').click(function () {
        ;
        var t = $(this).siblings('.quantity');
        var quantity = parseInt($(t).val());
        $(t).val(quantity + 1);
    });
    $('.quantity-decrement').click(function () {
        var t = $(this).siblings('.quantity');
        var quantity = parseInt($(t).val());
        if (quantity > 1) {
            $(t).val(quantity - 1);
        }
    });
    /******* quick-view-popup Js *******/
    $(".qv-btn").click(function () {
        $(".quick-view-popup").addClass("active");
        $("body").addClass("no-scroll");
        $('.overlay').addClass('active');
    });
    $(".quick-close-btn, .overlay").click(function () {
        $(".quick-view-popup").removeClass("active");
        $("body").removeClass("no-scroll");
        $('.overlay').removeClass('active');
    });
    /******* subscribe-popup Js *******/
    if ($('.subscribe-popup').length > 0) {
        $('.subscribe-popup').addClass('active');
        $('body').addClass('no-scroll');
        $(".overlay").addClass("active");
    };
    $('body').on('click', '.overlay , .close-sub-btn', function (e) {
        e.preventDefault();
        $("body").removeClass("no-scroll");
        $(".overlay").removeClass("active");
        $(".subscribe-popup").removeClass("active");
    });
    /*********  Header Search Popup  ********/
    $(".search-header a").click(function () {
        $(".search-popup").addClass("active");
        $("body").addClass("no-scroll");
        $('.overlay').addClass('active');
        $('body').addClass('search-overlay');
    });
    $(".close-search, .overlay").click(function () {
        $(".search-popup").removeClass("active");
        $("body").removeClass("no-scroll"); +
            $('.overlay').removeClass('active');
        $('body').removeClass('search-overlay');
    });
      //*** megamenu  popup  ******/
  $(".demo-btn").click(function () {
    $(".megamenu-popup").addClass("active");
    $("body").toggleClass("no-scroll");
    $('.overlay').addClass('active');
});
$(".close-btn, .megamenu-popup").click(function () {
    $(".megamenu-popup").removeClass("active");
    $("body").removeClass("no-scroll");
    $('.overlay').removeClass('active');
});
    /*********  ask qustion Popup  ********/
    $(".pro-features li a.ask-qus").click(function () {
        $(".ask-qus-popup").addClass("active");
        $("body").addClass("no-scroll");
        $('.overlay').addClass('active');
    });
    $(".close-btn, .ask-qus-popup").click(function () {
        $(".ask-qus-popup").removeClass("active");
        $("body").removeClass("no-scroll");
        $('.overlay').removeClass('active');
    });
    $(".ask-qus-inner").click(function (event) {
        event.stopPropagation();
    });
    /*********  size Popup  ********/
    $(".size-btn").click(function () {
        $(".size-popup").addClass("active");
        $("body").addClass("no-scroll");
    });
    $(".close-btn, .size-popup").click(function () {
        $(".size-popup").removeClass("active");
        $("body").removeClass("no-scroll");
    });
    $(".size-table-wrapper").click(function (event) {
        event.stopPropagation();
    });
    //** product review js **//
    $('.product-review').click(function () {
        $('.product-review-form').toggleClass("showform");
    });
    /***** product-add-cart-stickey *****/
    if ($('body').hasClass('product')) {
        $.fn.isInViewport = function () {
            var elementTop = this.offset().top;
            var elementBottom = elementTop + this.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            return elementBottom > viewportTop && elementTop < viewportBottom;
        };
        $(window).scroll(function () {
            if ($('.cart-btn').isInViewport()) {
                $('.products-add-cart-sticky').removeClass('show_btn');
            } else {
                $('.products-add-cart-sticky').addClass('show_btn');
            }
        });
    }
    /** cart-slider **/
    var swiper = new Swiper(".cart-slider", {
        slidesPerView: 1,
        spaceBetween: 15,
        speed: 800,
        loop: true,
        autoplay: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
    });
    /** footer acnav **/
    $(".footer-acnav").on("click", function () {
        if ($(window).width() < 768) {
            if ($(this).hasClass("is_open")) {
                $(this).removeClass("is_open");
                $(this).siblings(".footer-acnav-list").slideUp(200);
            } else {
                $(".footer-acnav").removeClass("is_open");
                $(this).addClass("is_open");
                $(".footer-acnav-list").slideUp(200);
                $(this).siblings(".footer-acnav-list").slideDown(200);
            }
        }
    });
    /* about-logo-slider */
    var swiper = new Swiper(".partner-logo-slider", {
        spaceBetween: 20,
        slidesPerColumn: 2,
        slidesPerView: 3,
        speed: 3000,
        grid: {
            rows: 2,
        },
        breakpoints: {
            1200: {
                slidesPerView: 3,
                grid: {
                    rows: 2,
                },
            },
            768: {
                slidesPerView: 3,
                grid: {
                    rows: 1,
                },
            },
            576: {
                slidesPerView: 3,
                grid: {
                    rows: 1,
                },
            },
            0: {
                slidesPerView: 2,
                grid: {
                    rows: 1,
                },
            },
        },
    });
    /* Product slider */
    var swiper = new Swiper(".product-slider", {
        spaceBetween: 25,
        slidesPerView: 4,
        speed: 800,
        navigation: {
            nextEl: ".product-arrow.swiper-button-next",
            prevEl: ".product-arrow.swiper-button-prev",
        },
        breakpoints: {
            1200: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });
    /* Bestseller slider */
    var swiper = new Swiper(".bestseller-slider", {
        spaceBetween: 20,
        slidesPerView: 4,
        speed: 800,
        // autoplay: true,
        navigation: {
            nextEl: ".bestseller-arrow.swiper-button-next",
            prevEl: ".bestseller-arrow.swiper-button-prev",
        },
        breakpoints: {
            1200: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });
    /** recent slider **/
    var swiper = new Swiper(".recent-slider", {
        slidesPerView: 4,
        spaceBetween: 20,
        speed: 800,
        navigation: {
            nextEl: '.recent-arrow.swiper-button-next',
            prevEl: '.recent-arrow.swiper-button-prev',
        },
        breakpoints: {
            1200: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });
    /* about-info-slider */
    var swiper = new Swiper(".about-info-slider", {
        speed: 3000,
        centeredSlides: true,
        autoplay: {
            delay: 1,
        },
        loop: true,
        slidesPerView: 'auto',
        allowTouchMove: false,
        disableOnInteraction: true
    });
    /**************************/
    /** Timer Counter **/
    /**************************/
    function makeTimer() {
        var endTime = new Date("15 december 2024 9:56:00 GMT+01:00");
        endTime = (Date.parse(endTime) / 1000);
        var now = new Date();
        now = (Date.parse(now) / 1000);
        var timeLeft = endTime - now;
        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }
        $(".count-days").html(days);
        $(".count-hours").html(hours);
        $(".count-minites").html(minutes);
        $(".count-seconds").html(seconds);
    }
    setInterval(function () { makeTimer(); }, 1000);
    /**testimonial-slider **/
    var swiper = new Swiper(".testimonial-slider", {
        spaceBetween: 80,
        slidesPerView: 2.1,
        speed: 800,
        centeredSlides: true,
        roundLengths: true,
        loop: true,
        // autoplay: true,
        infinite: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            1200: {
                slidesPerView: 2.1,
            },
            992: {
                slidesPerView: 1.5,
                spaceBetween: 30,
            },
            576: {
                slidesPerView: 1.5,
                spaceBetween: 20,
            },
            0: {
                slidesPerView: 1.1,
            },
        },
    });
    /** blog-slider **/
    var swiper = new Swiper(".blog-slider", {
        slidesPerView: 3,
        spaceBetween: 20,
        speed: 800,
        // autoplay: true,
        loop: true,
        navigation: {
            nextEl: ".blog-arrow.swiper-button-next",
            prevEl: ".blog-arrow.swiper-button-prev",
        },
        breakpoints: {
            992: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });
    /**quickview-slider**/
    var swiper = new Swiper(".quickview-image-slider", {
        slidesPerView: 1,
        spaceBetween: 15,
        loop: true,
        speed: 800,
        navigation: {
            nextEl: ".quickview-arrow.swiper-button-next",
            prevEl: ".quickview-arrow.swiper-button-prev",
        },
    });
    // bottom-thumb-slider
    var sliderThumbnail = new Swiper(".bottom-thumbslider", {
        slidesPerView: 2,
        spaceBetween: 15,
        speed: 800,
        centeredSlides: false,
        centeredSlidesBounds: true,
        watchOverflow: true,
        watchSlidesVisibility: false,
        watchSlidesProgress: false,
        breakpoints: {
            992: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 2,
            },
        },
    });
    var sliderMain = new Swiper(".bottom-mainslider", {
        spaceBetween: 15,
        watchOverflow: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        speed: 800,
        preventInteractionOnTransition: true,
        navigation: {
            nextEl: '.pdp-arrow.swiper-button-next',
            prevEl: '.pdp-arrow.swiper-button-prev',
        },
        thumbs: {
            swiper: sliderThumbnail
        }
    });
    sliderMain.on('slideChangeTransitionStart', function () {
        sliderThumbnail.slideTo(sliderMain.activeIndex);
    });
    sliderThumbnail.on('transitionStart', function () {
        sliderMain.slideTo(sliderThumbnail.activeIndex);
    });
    /****  TAB Js ****/
    $("ul.tabs li").click(function () {
        var $this = $(this);
        var $theTab = $(this).attr("data-tab");
        if ($this.hasClass("active")) {
        } else {
            $this
                .closest(".tabs-wrapper")
                .find("ul.tabs li, .tabs-container .tab-content")
                .removeClass("active");
            $(
                '.tabs-container .tab-content[id="' +
                $theTab +
                '"], ul.tabs li[data-tab="' +
                $theTab +
                "]"
            ).addClass("active");
        }
        $(this).addClass("active");
    });
    /*********************************/
    /******* Collection Filter *******/
    /*********************************/
    if ($('.product-listing-sec').hasClass('collection-leftbar')) {
        $(window).on('resize load', function () {
            if ($(window).width() < 768) {
                $('.filter-title').on('click', function (e) {
                    e.preventDefault();
                    setTimeout(function () {
                        $('body').addClass('no-scroll filter_open');
                        $('.overlay').addClass('filter_overlay');
                    }, 50);
                });
                $('body').on('click', '.overlay, .close-filter', function (e) {
                    e.preventDefault();
                    $('.overlay').removeClass('filter_overlay');
                    $('body').removeClass('no-scroll filter_open');
                });
            } else {
                $('.filter-title').off('click');
                $('.overlay').removeClass('filter_overlay');
                $('body').removeClass('no-scroll filter_open');
            }
        });
    }
    // ******** progress-wrap ************//
    "use strict";
    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on('scroll', function () {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
        } else {
            jQuery('.progress-wrap').removeClass('active-progress');
        }
    });
    jQuery('.progress-wrap').on('click', function (event) {
        event.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, duration);
        return false;
    });
});
/**************************/
        /** counter js **/
  /**************************/
  $('.counting').each(function () {
    var $this = $(this),
      countTo = $this.attr('data-count');
    $({ countNum: $this.text() }).animate({
      countNum: countTo
    },
      {
        duration: 3000,
        easing: 'linear',
        step: function () {
          $this.text(Math.floor(this.countNum));
        },
        complete: function () {
          $this.text(this.countNum);
        }
      });
  });
  /** Team slider **/
  var swiper = new Swiper(".about-team-slider", {
    slidesPerView: 1,
    spaceBetween: 25,
    loop: true,
    speed: 800,
    navigation: {
      nextEl: ".team-btn-wrp.swiper-button-next",
      prevEl: ".team-btn-wrp.swiper-button-prev",
    },
    breakpoints: {
      1200: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });