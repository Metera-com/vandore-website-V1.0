$(function () {
    $('.share-button').click(function () {
        var platform = $(this).data('platform');
        var currentUrl = window.location.href;

        switch (platform) {
            case 'facebook':
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(currentUrl));
                break;
            case 'twitter':
                var tweetText = 'Check out this awesome website!';
                window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweetText) + '&url=' + encodeURIComponent(currentUrl));
                break;
            case 'whatsapp':
                var shareText = 'Check out this awesome website: ';
                window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(shareText + currentUrl));
                break;
            case 'copy':
                navigator.clipboard.writeText(currentUrl);
                alert('Link URL Copied')
                break
            default:
                break;
        }
    });
});