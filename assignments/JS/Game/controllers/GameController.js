

    // Toggle start screen cards
    $('.logo .card:not(".twist")').on('click', function (e) {
        $(this).toggleClass('active').siblings().not('.twist').removeClass('active');
        if ($(e.target).is('.playnow')) {
            $('.logo .card').last().addClass('active');
        }
    });
