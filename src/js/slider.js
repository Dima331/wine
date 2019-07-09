(function() {
    $('.wines-list').slick({
        appendArrows: $('.wines-navigation'),
        nextArrow: $('.wines-navigation__next'),
        prevArrow: $('.wines-navigation__prev'),
        //autoplay: true
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
                breakpoint: 660,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    variableWidth: true
                }
            },
            // {
            //   breakpoint: 480,
            //   settings: {
            //     slidesToShow: 1,
            //     slidesToScroll: 1
            //   }
            // }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
})()