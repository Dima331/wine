(function () {
    $(".order").click(function () {
        $("html, body").animate({
            scrollTop: $(".wines").offset().top + "px"
        }, {
                duration: 500,
                easing: "swing"
            });
        return false;
    });
})()