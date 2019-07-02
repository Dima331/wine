(function () {
    $(".person").on("click", function () {
        let tmpHeight;

        tmpHeight = $(".person__profession", this).height();
        tmpHeight += $(".person__do", this).height();
        
        if ($(this).hasClass("team-list__item-active")) {
            $(this).removeClass("team-list__item-active");
            $(".person__about", this).height(0);
        } else {
            $(this).toggleClass("team-list__item-active");
            $(".person__about", this).height(tmpHeight);
        }
    });
})();