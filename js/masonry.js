$(document).ready(function () {
    var $grid = $('.masonry-grid').isotope({
        itemSelector: '.masonry-item',
        layoutMode: 'masonry'
    });

    $('.nav-tabs .nav-link').on('shown.bs.tab' , function(){
        $grid.isotope('layout');
    });
});