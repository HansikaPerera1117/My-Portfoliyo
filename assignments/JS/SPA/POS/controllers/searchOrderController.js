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


    $("#inputIPrice").val(item.price);
    $("#inputIQuantity").val(item.qty);
});

function searchOrder(orID) {
    for (let ord of order) {
        if (ord.oId == orID) {
            return ord;
        }
    }
    return null;
}