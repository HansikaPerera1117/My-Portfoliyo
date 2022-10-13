$("#searchOrderBar").focus();

$("#btnUpdateSOItems").attr('disabled',true);
$("#btnConfirmEdits").attr('disabled',true);

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
    clearAllTextFieldsAndLabels();
});

function clearAllTextFieldsAndLabels(){
    $("#inputSOItemCode, #inputSOItemName, #inputSOPrice, #inputSOOrderQty , #SearchTotal, #SearchSubTotal").val("");
    $("#searchOrderId, #searchOrderDate, #searchCusId, #SearchTotal, #SearchSubTotal").text("");
    $(".tblSearchO").empty();
}

$("#btnUpdateSOItems").click(function (){
    updateSearchOrderQty();

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Order details has been updated successfully...',
        showConfirmButton: false,
        timer: 1500
    })

});

function updateSearchOrderQty(){
    let updateOrderQty = $("#inputSOOrderQty").val();

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

    $("#btnConfirmEdits").attr('disabled',false);
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

$("#btnConfirmEdits").click(function (){

    let search = $("#searchOrderBar").val();

     let response = updateOrderDetails(search);

    if (response) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Order details has been updated successfully...',
            showConfirmButton: false,
            timer: 1500
        })

        $("#inputSOItemCode, #inputSOItemName, #inputSOPrice, #inputSOOrderQty , #SearchTotal, #SearchSubTotal").val("");
        $("#searchOrderBar").val("");

    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Unsuccessful...',
            showConfirmButton: false,
            timer: 1500
        })

    }


});

function updateOrderDetails(oId) {
    let order = searchItem(oId);
    if (order != null) {

        $("#tblSearchOrder>tr").each(function (index, tr) {

            for (let orderDtl of orderDetails) {
                console.log(orderDtl)
                if (oId == orderDtl.oId) {
                    console.log("samana wela")
                    let tblcode = $(tr).children(":eq(0)").text();
                    console.log(tblcode)
                    if (orderDtl.code == tblcode) {

                        console.log()

                        let tblOQty = $(tr).children(":eq(3)").text();
                        let tblTotal = $(tr).children(":eq(4)").text();

                        orderDtl.orderItemQty = tblOQty;
                        orderDtl.total = tblTotal;
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
        });

    }
}



$("#btnDeleteOrder").click(function (){

    let search = $("#searchOrderBar").val();

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {

            if (deleteOrder(search)) {
                Swal.fire(
                    'Deleted!',
                    'Order ' +search + ' has been deleted successfully',
                    'success'
                )
            } else {
                alert("No such Item to delete. please check the code or name");
            }


            $("#searchOrderBar").val("");

            clearAllTextFieldsAndLabels();

            loadOrderIDs();

            loadAllOrders();

        }
    })
});

function deleteOrder(orderID) {
    let odr = searchOrder(orderID);
    if (odr != null) {

        order=  order.filter(function(v){
            return v.oId!=orderID;
        });

        orderDetails=  orderDetails.filter(function(v){
            return v.oId!=orderID;
        });

        return true;
    } else {
        return false;
    }
}




//---------------Validation of orderQty---------------------------

const updateOrderQtyRegEx = /^[1-9][0-9]{0,2}$/;

var updateOrderQtyValidations = {
    reg: updateOrderQtyRegEx,
    field: $('#inputSOOrderQty'),
    error:'Quantity Pattern is Wrong : 1-9'
}


$("#inputSOOrderQty").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#inputSOOrderQty").on('keyup', function (event) {
    checkUpdateOrderQtyValidity();
});

$("#inputSOOrderQty").on('blur', function (event) {
    checkUpdateOrderQtyValidity();
});

$("#inputSOOrderQty").on('keydown', function (event) {
    if (event.key == "Enter" && checkUpdateOrderQty(updateOrderQtyRegEx ,$("#inputSOOrderQty"))) {
        let res = confirm("Do you want to update this order item quantity?");
        if (res) {
            updateSearchOrderQty();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Order details has been updated successfully...',
                showConfirmButton: false,
                timer: 1500
            })
            $("#btnUpdateSOItems").attr('disabled',true);
        }
    }
});

function checkUpdateOrderQtyValidity() {
    let errorCount=0;

    if (checkUpdateOrderQty(updateOrderQtyValidations.reg,updateOrderQtyValidations.field)) {
        UpdateOrderQtyTextSuccess(updateOrderQtyValidations.field,"");
        errorCount=errorCount+1;
    }else{
        setUpdateOrderQtyTextError(updateOrderQtyValidations.field,updateOrderQtyValidations.error);
    }

    setUpdateOrderQtyButtonState(errorCount);

}

function checkUpdateOrderQty(regex, txtField) {

    let inputValue = txtField.val();

    if(regex.test(inputValue)){
        return true;
    }else{
        return false;
    }

    inputValue = txtField.val();

    if (inputValue.length == 0 ){
        return false;
    }else {
        return true;
    }

}

function setUpdateOrderQtyTextError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultUpdateOrderQtyText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function UpdateOrderQtyTextSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultUpdateOrderQtyText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultUpdateOrderQtyText(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function setUpdateOrderQtyButtonState(value){
    if (value > 0){
        $("#btnUpdateSOItems").attr('disabled',false);
    }else {
        $("#btnUpdateSOItems").attr('disabled',true);
    }
}

