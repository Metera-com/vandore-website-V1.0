$(function () {
    var videoBtn = $('.video-btn');

    videoBtn.click(function () {
        var videoContainer = $(this).closest('.video-container');
        var src = videoContainer.data('url');
        var title = videoContainer.data('title');
        var videoFrame = $('<iframe>', {
            src: src,
            frameborder: 0,
            title: title,
            allow : "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ,
            class: 'video-iframe'
        });

        videoContainer.append(videoFrame);
    });
});