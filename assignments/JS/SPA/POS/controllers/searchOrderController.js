$("#searchOrderBar").focus();


function loadAllOrders(){
    $("#tblViewAllOrders").empty();

    for(var ods of order){
        let customer = ods.customerId;
        for (var cus of customers) {
            if (cus.id == customer) {
                var row = `<tr> <td>${ods.oId}</td><td>${ods.oDate}</td><td>${ods.customerId}</td><td>${cus.name}</td><td>${cus.address}</td><td>${cus.contact}</td></tr>`;

                $("#tblViewAllOrders").append(row);
            }
        }
    }
}



function loadOrderIDs(){
    $("#cmbOrderIDs").empty();
    var selected = `<option selected>Order IDs</option>`;

    $("#cmbOrderIDs").append(selected);
    for (var ords of order){
        var ID =  `<option>${ords.oId}</option>`;
        $("#cmbOrderIDs").append(ID);
    }
}

$("#cmbOrderIDs").click(function () {
    let id = $('#cmbOrderIDs>option:selected').val();

    for (let ord of order) {
        let odId = ord.oId;

        if (odId == id){
            $("#searchOrderBar").val(id);
        }

    }

});

$("#viewAllOrders").click(function (){
    loadAllOrders();
});


$("#btnSearchOrder").click(function (){
    searchOrderDetailsAndSetTable();

});

function searchOrderDetailsAndSetTable(){
    let search = $("#searchOrderBar").val();

    let order = searchOrder(search);

    $(".tblSearchO").empty();

    $("#searchOrderId").text(order.oId);
    $("#searchOrderDate").text(order.oDate);
    $("#searchCusId").text(order.customerId);

    for (let orderList of orderDetails) {
        if (orderList.oId == order.oId){
            let itemCode = orderList.code;
            for (let  itm of items) {
                if (itm.code == itemCode){
                    var row= `<tr><td>${orderList.code}</td><td>${itm.name}</td><td>${itm.price}</td><td>${orderList.orderItemQty}</td><td>${orderList.total}</td></tr>`;
                    $(".tblSearchO").append(row);
                }
            }
        }
    }
    bindOrderListRowClickEvents();
    manageSearchOrderTotal(order.oId);
}

function searchOrder(orID) {
    for (let ord of order) {
        if (ord.oId == orID) {
            return ord;
        }
    }
    return null;
}

function bindOrderListRowClickEvents() {
    $("#tblSearchOrder>tr").click(function () {
        let code = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let price = $(this).children(":eq(2)").text();
        let oQty = $(this).children(":eq(3)").text();

        $("#inputSOItemCode").val(code);
        $("#inputSOItemName").val(name);
        $("#inputSOPrice").val(price);
        $("#inputSOOrderQty").val(oQty);
    });
}

function manageSearchOrderTotal(orderId){
    let tot = 0;
    let dis = 0;
    for (let oDetails of orderDetails) {
        if (oDetails.oId == orderId){
            tot += oDetails.total;
        }
    }

    $("#SearchTotal").text(tot);

    for (let ords of order) {
        if (ords.oId == orderId){
           dis = ords.discount;
        }
    }

    let discount = (tot*dis)/100;

    let subTot= tot-discount;

    $("#SearchSubTotal").text(subTot);

}

$("#closeBtn").click(function (){
    $("#inputSOItemCode, #inputSOItemName, #inputSOPrice, #inputSOOrderQty , #SearchTotal, #SearchSubTotal").val("");
    $("#searchOrderId, #searchOrderDate, #searchCusId, #SearchTotal, #SearchSubTotal").text("");
    $(".tblSearchO").empty();
});

$("#btnUpdateSOItems").click(function (){
    updateSearchOrderQty();
});

function updateSearchOrderQty(){
    let updateOrderQty = $("#inputSOOrderQty").val();

    // table row loop karanna one

    $("#tblSearchOrder>tr").each(function(index, tr) {

        let tblCode = $(tr).children(":eq(0)").text();
        let txtCode =  $("#inputSOItemCode").val();

        // console.log(index);
        // console.log(tr);

        if(txtCode == tblCode){

            $(tr).children(":eq(3)").text(updateOrderQty);

            let price = $("#inputSOPrice").val();


            let updatedTot =  price * updateOrderQty;

            $(tr).children(":eq(4)").text(updatedTot);

        }
    });

   let orderid =  $("#searchOrderId").text();
    manageSearchOrderTotalWhenUpdateOrderQty(orderid);
}

function manageSearchOrderTotalWhenUpdateOrderQty(orderId){
    let tot = 0;
    let dis = 0;

    $("#tblSearchOrder>tr").each(function(index, tr) {

        let tblItemTotal = $(tr).children(":eq(4)").text();
        console.log(tblItemTotal);
        tot = tot + parseInt(tblItemTotal);
    });

    $("#SearchTotal").text(tot);

    for (let ords of order) {
        if (ords.oId == orderId){
            dis = ords.discount;
        }
    }

    let discount = (tot*dis)/100;

    let subTot= tot-discount;

    $("#SearchSubTotal").text(subTot);

}

$("#btnSearchOrderReset").click(function (){
    $("#inputSOItemCode, #inputSOItemName, #inputSOPrice, #inputSOOrderQty , #SearchTotal, #SearchSubTotal").val("");
    searchOrderDetailsAndSetTable();
});

$("#btnClear").click(function (){
    $(".tblSearchO").empty();
});
