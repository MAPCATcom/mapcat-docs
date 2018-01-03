let resize = function() {
    let padding = 50;
    let footHeight = $('footer').height();
    let pageWidth = $(window).width();
    if (pageWidth < 768) {
        $('body').css('margin-bottom',0);
    } else {
        $('body').css('margin-bottom', (padding + footHeight) + 'px');
    }
}
$(window).on('resize', resize);
$(document).ready(function() {
    resize();
    $('.main table').addClass('table');
    if (window.location.pathname.split('/').length > 2) {
        $('.homelink').css('visibility', 'visible');
    }
    $(document.links).filter(function() {
        return this.hostname !== window.location.hostname;
    }).attr('target', '_blank').attr('rel', 'noopener');
});
