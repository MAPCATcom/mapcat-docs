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
});
