(function() {
    $('.wines-list').slick({
        appendArrows: $('.wines-navigation'),
        nextArrow: $('.wines-navigation__next'),
        prevArrow: $('.wines-navigation__prev'),
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1050,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 851,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    variableWidth: true
                }
            },
            {
                breakpoint: 660,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    variableWidth: true
                }
            }
        ]
    });
})()