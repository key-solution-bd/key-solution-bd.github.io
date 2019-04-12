(function($) {
    "use strict";
	
    // responsive-menu tigger
    $(".responsive-menu-tigger a").on("click", function() {
        $(".responsive-menu-area").toggleClass("active");
    });

    $('ul.metismenu').metisMenu({
    });

    // swipper slider
    var interleaveOffset = 0.5;
    var swiperOptions = {
        loop: true,
        speed: 1000,
        grabCursor: true,
        watchSlidesProgress: true,
        mousewheelControl: true,
        keyboardControl: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        on: {
            progress: function() {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".slide-inner").style.transform =
                        "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            },
            touchStart: function() {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },
            setTransition: function(speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-inner").style.transition =
                        speed + "ms";
                }
            }
        }
    };

    var swiper = new Swiper(".swiper-container", swiperOptions);


    // brand-active
    $('.team-active').owlCarousel({
        margin: 30,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        nav: false,
        smartSpeed: 800,
        navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
        URLhashListener: true,
        startPosition: 'URLHash',
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 1
            },
            768: {
                items: 2
            },
            1000: {
                items: 3
            },

            1200: {
                items: 4
            }
        }
    });

    // slider-active2
    $('.test-active').owlCarousel({
        margin: 30,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        nav: true,
        smartSpeed: 800,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        URLhashListener: true,
        startPosition: 'URLHash',
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 1
            },
            768: {
                items: 2
            },
            1000: {
                items: 2
            }
        }
    });

    // service-details-active
    $('.service-details-active').owlCarousel({
        margin: 0,
        loop: true,
        autoplay: true,
        center: true,
        autoplayTimeout: 4000,
        nav: true,
        smartSpeed: 800,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        URLhashListener: true,
        startPosition: 'URLHash',
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/

    /*-------------------------------------------------------
        blog details
    -----------------------------------------------------*/
    if ($(".choos-area").length) {
        var post = $(".choost-img");

        post.each(function() {
            var $this = $(this);
            var entryMedia = $this.find("img");
            var entryMediaPic = entryMedia.attr("src");

            $this.css({
                backgroundImage: "url(" + entryMediaPic + ")",
                backgroundSize: "cover",
                backgroundPosition: "center center",
            })
        })
    }

    function setTwoColEqHeight($col1, $col2) {
        var firstCol = $col1,
            secondCol = $col2,
            firstColHeight = $col1.innerHeight(),
            secondColHeight = $col2.innerHeight();

        if (firstColHeight > secondColHeight) {
            secondCol.css({
                "height": firstColHeight + 1 + "px"
            })
        } else {
            firstCol.css({
                "height": secondColHeight + 1 + "px"
            })
        }
    }


    $(window).on("load", function() {
        setTwoColEqHeight($(".choost-img"), $(".choos-content"));

    });

    // // stickey menu
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop(),
            mainHeader = $('#sticky-header'),
            mainHeaderHeight = mainHeader.innerHeight();

        // console.log(mainHeader.innerHeight());
        if (scroll > 0) {
            $("#sticky-header").addClass("sticky-menu");
        } else {
            $("#sticky-header").removeClass("sticky-menu");
        }
    });

    /*--------------------------
     scrollUp
    ---------------------------- */
    $.scrollUp({
        scrollText: '<i class="fa fa-arrow-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

    /*--
    Magnific Popup
    ------------------------*/
    $('.popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }

    });

    $('.video-popup').magnificPopup({
        type: 'iframe',
        gallery: {
            enabled: true
        }

    });


    $('.grid').imagesLoaded(function() {

        // filter items on button click
        $('.project-menu').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });

        // init Isotope
        var $grid = $('.grid').isotope({
            itemSelector: '.project',
            percentPosition: true,
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: '.project',
            }
        });
    });

    $('.project-menu button').on('click', function(event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });

    // mouse scrolling effect
    $.scrollSpeed(200, 800);

    /*---------------------
    // Ajax Contact Form
    --------------------- */

    $('.cf-msg').hide();
    $('form#cf button#submit').on('click', function() {
        var fname = $('#fname').val();
        var subject = $('#subject').val();
        var email = $('#email').val();
        var msg = $('#msg').val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!regex.test(email)) {
            alert('Please enter valid email');
            return false;
        }

        fname = $.trim(fname);
        subject = $.trim(subject);
        email = $.trim(email);
        msg = $.trim(msg);

        if (fname != '' && email != '' && msg != '') {
            var values = "fname=" + fname + "&subject=" + subject + "&email=" + email + " &msg=" + msg;
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: values,
                success: function() {
                    $('#fname').val('');
                    $('#subject').val('');
                    $('#email').val('');
                    $('#msg').val('');

                    $('.cf-msg').fadeIn().html('<div class="alert alert-success"><strong>Success!</strong> Email has been sent successfully.</div>');
                    setTimeout(function() {
                        $('.cf-msg').fadeOut('slow');
                    }, 4000);
                }
            });
        } else {
            $('.cf-msg').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> Please fillup the informations correctly.</div>')
        }
        return false;
    });

})(jQuery);