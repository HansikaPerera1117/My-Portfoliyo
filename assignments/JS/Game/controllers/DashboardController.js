
$(window).on('load',function (){
    $("#loader").fadeOut(1000);
});

$(document).ready(function () {

    $("#menuMain").css('display','none');

    $("#btnPlay").click(function(){
        $("#startMain").css('display','none');
        $("#menuMain").css('display','block');
    });

    $("#menuMain").css('display','none');

    $("#btnBackToHome").click(function(){
        $("#startMain").css('display','block');
        $("#menuMain").css('display','none');
    });

});
