"use strict";

$(function () {
    // Toggle nav button
    $('.nav-btn').on('click', function () {
        $(this).toggleClass('open');
    });

    // Header glass effect on scroll
    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        $("#header").toggleClass('glass-effect', scroll > 100);

        // Jalankan fungsi checkScroll juga saat scroll
        checkScroll();
    });

    // Tab switching (event delegation)
    $(document).on('click', '.tab', function () {
        let tabs = $(this).closest('.tabs');
        let tabContent = tabs.siblings('.tab-content');

        tabs.find('.tab').removeClass('active');
        $(this).addClass("active");

        let selectedTab = $(this).data("tab");
        tabContent.find(".content").removeClass("active");
        tabContent.find("#" + selectedTab).addClass("active");
    });

    // Marquee clone setup
    $('.marquee-container').each(function () {
        const cont = $(this);
        const content = cont.find('.marquee-content');
        const clone = content.clone();
        const clone2 = clone.clone();
        cont.append(clone, clone2);
        cont.find('.marquee-content').addClass('marquee');
    });

    // Icon box click activation
    $(document).on('click', '.icon-box', function () {
        $('.icon-box').removeClass('active');
        $(this).addClass('active');
    });

    // Tab filtering for course and duration
    const tabCourse = $('#course-tab');
    const tabDuration = $('#tab-duration');

    let courseActive = tabCourse.find('.tab.active');
    let dataCourseActive = courseActive.data('course');

    let durationActive = tabDuration.find('.tab.active');
    let dataDurationActive = durationActive.data('duration');

    filterClasses(dataCourseActive);
    filterDuration(dataDurationActive);

    tabCourse.on('click', '.tab', function (e) {
        e.preventDefault();
        let course = $(this).data('course');
        filterClasses(course);
        $(this).addClass('active').siblings().removeClass('active');
    });

    tabDuration.on('click', '.tab', function (e) {
        e.preventDefault();
        let duration = $(this).data('duration');
        filterDuration(duration);
        $(this).addClass('active').siblings().removeClass('active');
    });

    // Hotspot click alert
    $(document).on('click', '.hotspot', function () {
        alert($(this).attr('data-text'));
    });
});

// Helper functions
function filterClasses(course) {
    if (course === 'all') {
        $('.class-course').addClass('active');
    } else {
        $('.class-course').each(function () {
            const courses = $(this).attr('data-courses') || '';
            $(this).toggleClass('active', courses.includes(course));
        });
    }
}

function filterDuration(duration) {
    if (duration === 'all') {
        $('.class-duration').addClass('active');
    } else {
        $('.class-duration').each(function () {
            const durations = $(this).attr('data-duration') || '';
            $(this).toggleClass('active', durations.includes(duration));
        });
    }
}

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function animateNumber(element, targetNumber, duration) {
    const startTime = performance.now();
    const startNumber = 0;

    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentNumber = Math.floor(startNumber + progress * (targetNumber - startNumber));

        element.innerText = formatNumber(currentNumber);

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }

    requestAnimationFrame(updateNumber);
}

function checkScroll() {
    const numberElements = document.querySelectorAll('.number');
    numberElements.forEach(element => {
        if (!element.classList.contains('animated')) {
            const targetValue = parseInt(element.getAttribute("data-target"), 10);
            const durationValue = parseInt(element.getAttribute("data-duration"), 10);

            const rect = element.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                animateNumber(element, targetValue, durationValue);
                element.classList.add('animated');
            }
        }
    });
}

// Initial check on page load (in case number is already visible)
window.addEventListener('load', checkScroll);
