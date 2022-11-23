function set(key, value) {
    localStorage.setItem(key, value);
}

function get(key) {
    return localStorage.getItem(key);
}

function increase(el) {
    set(el, parseInt(get(el)) + 1);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};


//===================================Toggle menu screen cards start=========================
    $('.logo .card:not(".twist")').on('click', function (e) {
        $(this).toggleClass('active').siblings().not('.twist').removeClass('active');
        if ($(e.target).is('.playnow')) {
            $('.logo .card').last().addClass('active');
        }
    });

//===================================Toggle menu screen cards end=========================



$('.play').on('click', function () {
        increase('flip_abandoned');
        $('.info').fadeOut();

        var difficulty = '',
            level = $(this).data('level');

        // Set game timer and difficulty
        if (level == 8) {
            difficulty = 'casual';
        } else if (level == 18) {
            difficulty = 'medium';
        } else if (level == 32) {
            difficulty = 'hard';

        }

        $('#g').addClass(difficulty);

        $('.logo').fadeOut(250, function () {
            var startGame = $.now(),
                obj = [];

            // Create and add shuffled cards to game
            for (i = 0; i < level; i++) {
                obj.push(i);
            }

            var shu = shuffle($.merge(obj, obj)),
                cardSize = 100 / Math.sqrt(shu.length);

            for (i = 0; i < shu.length; i++) {
                var code = shu[i];
                if (code < 10) code = "0" + code;
                if (code == 30) code = 10;
                if (code == 31) code = 21;
                $('<div class="card" style="width:' + cardSize + '%;height:' + cardSize + '%;">' +
                    '<div class="flipper"><div class="f"></div><div class="b" data-f="&#xf0' + code + ';"></div></div>' +
                    '</div>').appendTo('#g');
            }

        });
    });