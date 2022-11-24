
    function set(key, value) {
        localStorage.setItem(key, value);
    }

    function get(key) {
        return localStorage.getItem(key);
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

//===================================back to start screen start=========================
    function startScreen() {
        $('#g').removeAttr('class').empty();
        $('.logo').fadeIn(250);
    };

//===================================back to start screen start=========================


//===================================Toggle menu screen cards start=========================

    $('.logo .card:not(".twist")').on('click', function (e) {
        $(this).toggleClass('active').siblings().not('.twist').removeClass('active');
        if ($(e.target).is('.playnow')) {
            $('.logo .card').last().addClass('active');
        }
    });

//===================================Toggle menu screen cards end=========================

//================== Start game==================================

    $('.play').on('click', function () {
        $('.info').fadeOut();

        var difficulty = '',
            timer = 1000,
            level = $(this).data('level');

        // Set game timer and difficulty
        if (level == 8) {
            difficulty = 'casual';
            timer *= level * 4;
        } else if (level == 18) {
            difficulty = 'medium';
            timer *= level * 5;
        } else if (level == 32) {
            difficulty = 'hard';
            timer *= level * 6;
        }

        $('#g').addClass(difficulty);

        $('.logo').fadeOut(250, function () {
                obj = [];

            // ========================Create and add shuffled cards==========================
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

            // ==================Set card actions start ============================================
            $('#g .card').on({
                'mousedown': function () {
                    if ($('#g').attr('data-paused') == 1) {
                        return;
                    }
                    var data = $(this).addClass('active').find('.b').attr('data-f');

                    if ($('#g').find('.card.active').length > 1) {
                        setTimeout(function () {
                            var thisCard = $('#g .active .b[data-f=' + data + ']');

                            if (thisCard.length > 1) {
                                thisCard.parents('.card').toggleClass('active card found').empty();

                                // Win game
                                if (!$('#g .card').length) {

                                    Swal.fire({
                                        title: 'Sweet!',
                                        text: 'Congratulations You Win!.. Try the next level.',
                                        imageUrl: "assests/images/bacground_images/bg2.jpg",
                                        imageWidth: 400,
                                        imageHeight: 200,
                                        imageAlt: 'Custom image',
                                    });

                                    startScreen();
                                    $(" #g .timer").css('display','none');

                                }
                            } else {
                                $('#g .card.active').removeClass('active');
                            }
                        }, 401);
                    }
                }
            });
            // ==================Set card actions end ============================================

            //====================Add timer bar start===============================================

            $('<i class="timer"></i>')
                .prependTo('#g')
                .css({
                    'animation': 'timer ' + timer + 'ms linear'
                })
                .one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
                    startScreen(); // fail game
                });

            //====================Add timer bar end===============================================

        });
    });
