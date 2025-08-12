$(function () {
    var swiperPartner = new Swiper('.swiper.swiperPartner', {
        autoplay: {
            delay: 3000
        },
        speed: 2000,
        slidesPerView: 5,
        slidesPerGroup: 1,
        spaceBetween: 10,
        loop: false,
        grabCursor: true,
        breakpoints: {
            // when window width is >= 360px
            360: {
                slidesPerView: 2,
                slidesPerGroup: 1,
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 2,
                slidesPerGroup: 1,
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 5,
                slidesPerGroup: 1,
            }
        },
        // If we need pagination
        pagination: {
            enabled: false,
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    });

});

$(function () {
    var swiperCard = new Swiper('.swiper.swiperCard', {
        autoplay: {
            delay: 6000
        },
        speed: 2000,
        slidesPerView: 3,
        slidesPerGroup: 2,
        spaceBetween: 10,
        loop: false,
        grabCursor: true,
        breakpoints: {
            // when window width is >= 360px
            360: {
                slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 3,
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 3,
            }
        },
        // If we need navigation
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

});

$(function () {
    var swiperTeam = new Swiper('.swiper.swiperTeam', {
        autoplay: {
            delay: 5000
        },
        speed: 2000,
        slidesPerView: 1,
        slidesPerGroup: 2,
        spaceBetween: 10,
        loop: false,
        grabCursor: true,
        breakpoints: {
            // when window width is >= 360px
            360: {
                slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 1,
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 1,
            }
        },
        // If we need pagination
        pagination: {
            enabled: true,
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    });

});

$(function () {
    // Swiper 1
    var swiperTestimonials1 = new Swiper('.swiper.swiperTestimonials', {
        autoplay: {
            delay: 2000
        },
        speed: 2000,
        slidesPerView: 2,
        slidesPerGroup: 2,
        initialSlide: 2,
        spaceBetween: 10,
        loop: false,
        grabCursor: true,
        breakpoints: {
            360: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 2,
            }
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            },
        },
        on: {
            init: function () {
                setSlideWidth('.swiper.swiperTestimonials');
            },
            resize: function () {
                setSlideWidth('.swiper.swiperTestimonials');
            }
        }
    });

    // Swiper 2
    var swiperTestimonials2 = new Swiper('.swiper.swiperTestimonials2', {
        autoplay: {
            delay: 3000
        },
        speed: 2000,
        slidesPerView: 2,
        slidesPerGroup: 2,
        initialSlide: 2,
        spaceBetween: 10,
        loop: false,
        grabCursor: true,
        breakpoints: {
            360: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 2,
            }
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            },
        },
        on: {
            init: function () {
                setSlideWidth('.swiper.swiperTestimonials2');
            },
            resize: function () {
                setSlideWidth('.swiper.swiperTestimonials2');
            }
        }
    });

    // Fungsi set width + margin-left
    function setSlideWidth(selector) {
        $(`${selector} .swiper-slide`).each(function (index) {
            if ($(window).width() <= 768) {
                $(this).css({
                    'width': '100%',
                    'margin-right': '0',
                    'margin-left': '2px'
                });
            } else {
                if (selector === '.swiper.swiperTestimonials') {
                    // Swiper 1: 60 / 40
                    if (index % 2 === 0) {
                        $(this).css({
                            'width': '60%',
                            'margin-right': '0',
                            'margin-left': '2px'
                        });
                    } else {
                        $(this).css({
                            'width': '40%',
                            'margin-right': '0',
                            'margin-left': '2px'
                        });
                    }
                } else if (selector === '.swiper.swiperTestimonials2') {
                    // Swiper 2: 40 / 60
                    if (index % 2 === 0) {
                        $(this).css({
                            'width': '40%',
                            'margin-right': '0',
                            'margin-left': '2px'
                        });
                    } else {
                        $(this).css({
                            'width': '60%',
                            'margin-right': '0',
                            'margin-left': '2px'
                        });
                    }
                }
            }
        });
    }
});

$(function () {
    var swiperImage = new Swiper('.swiper.swiperImage', {
        speed: 2000,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        loop: false,
        grabCursor: true,
        breakpoints: {
            // when window width is >= 360px
            360: {
                slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 1,
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 1,
            }
        },
        // If we need pagination
        pagination: {
            enabled: true,
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    });

});

$(function () {
    var swiperImage2 = new Swiper('.swiper.swiperImage2', {
        autoplay: {
            delay: 6000
        },
        speed: 2000,
        slidesPerView: 4,
        slidesPerGroup: 2,
        spaceBetween: 10,
        loop: false,
        grabCursor: true,
        breakpoints: {
            // when window width is >= 360px
            360: {
                slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 4,
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 4,
            }
        },
        // If we need pagination
        pagination: {
            enabled: true,
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    });

});


