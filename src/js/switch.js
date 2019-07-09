(function () {
    if ($("#delivery").is(":checked")) {
        $('#self-delivery').hide();
        $('#not-self-delivery').show();
    }

    $('#radio input[type=radio]').change(function () {
        if ($("#delivery").is(":checked")) {
            $('#self-delivery').hide();
            $('#not-self-delivery').show();
        }
        if ($("#samovi").is(":checked")) {
            $('#self-delivery').show();
            $('#not-self-delivery').hide();
        }
    });
})()


