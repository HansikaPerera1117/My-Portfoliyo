
$(window).on('load',function (){
    $("#loader").fadeOut(1000);
});

$(document).ready(function () {

    $("#mainCustomer").css('display','none');
    $("#mainItem").css('display','none');
    $("#mainPlaceOrders").css('display','none');
    $("#mainSearchOrders").css('display','none');


    $("#imgHome").mousedown(function(){
        $("#mainHome").css('display','block');
        $("#mainCustomer").css('display','none');
        $("#mainItem").css('display','none');
        $("#mainPlaceOrders").css('display','none');
        $("#mainSearchOrders").css('display','none');
    });

    $("#imgCustomer").mousedown(function(){
        $("#mainHome").css('display','none');
        $("#mainCustomer").css('display','block');
        $("#mainItem").css('display','none');
        $("#mainPlaceOrders").css('display','none');
        $("#mainSearchOrders").css('display','none');
    });

    $("#imgItem").mousedown(function(){
        $("#mainHome").css('display','none');
        $("#mainCustomer").css('display','none');
        $("#mainItem").css('display','block');
        $("#mainPlaceOrders").css('display','none');
        $("#mainSearchOrders").css('display','none');
    });

    $("#imgOrders").mousedown(function(){
        $("#mainHome").css('display','none');
        $("#mainCustomer").css('display','none');
        $("#mainItem").css('display','none');
        $("#mainPlaceOrders").css('display','block');
        $("#mainSearchOrders").css('display','none');
    });

    $("#searchOrderButton").mousedown(function(){
        $("#mainPlaceOrders").css('display','none');
        $("#mainSearchOrders").css('display','block');
    });

    $("#placeOrderButton").mousedown(function(){
        $("#mainPlaceOrders").css('display','block');
        $("#mainSearchOrders").css('display','none');
    });

    $(".homepage").mousedown(function(){
        $("#mainHome").css('display','block');
        $("#mainCustomer").css('display','none');
        $("#mainItem").css('display','none');
        $("#mainPlaceOrders").css('display','none');
        $("#mainSearchOrders").css('display','none');
    });

});
