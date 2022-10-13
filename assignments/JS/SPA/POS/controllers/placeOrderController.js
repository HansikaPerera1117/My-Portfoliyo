
var date = new Date();
var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
$("#OrderDate").text(current_date);

$("#selectItem").focus();
$("#btnAddToCart").attr('disabled',true);
$("#btnPurchaseOrder").attr('disabled',true);


function generateOrderID(){

    let lastOId =" ";
    for (const orderid of order) {
        lastOId = orderid.oId;
    }


    if (order.length == 0){

        $("#OrderId").text("D00-1");

    }else {

        let co = lastOId.length;
        console.log(co);
        let text = lastOId.substring(0,4);
        console.log(text);
        let num= lastOId.substring(4,co);
        console.log(num);

        let n = parseInt(num);
        n++;
        console.log(n);

        let GenerateId = text+n;

        console.log(GenerateId);

        $("#OrderId").text(GenerateId);

    }
}

generateOrderID();


function loadAllCustomersForOption() {
    $("#selectCustomer").empty();
    for (let cus of customers) {
        console.log(cus.id)
        $("#selectCustomer").append(`<option>${cus.id}</option>`);
    }

}

$("#selectCustomer").click(function () {
    let selectedID = $('#selectCustomer>option:selected').val();

    for (let i = 0; i < customers.length; i++) {
        let Customer = customers[i];

        if (Customer.id == selectedID){
            $("#inputPOCustomerID").val(Customer.id);
            $("#inputPOCName").val(Customer.name);
            $("#inputPOCSalary").val(Customer.salary);
            $("#inputAddress").val(Customer.address);

        }
    }

});

function loadAllItemsForOption() {
    $("#selectItem").empty();
    for (let itm of items) {
        console.log(itm.code)
        $("#selectItem").append(`<option>${itm.code}</option>`);
    }

}

$("#selectItem").click(function () {
    let selectedCode = $('#selectItem>option:selected').val();

    for (let i = 0; i < items.length; i++) {
        let Item = items[i];

        if (Item.code == selectedCode){
            $("#inputPOItemCode").val(Item.code);
            $("#inputPOItemName").val(Item.name);
            $("#inputPOPrice").val(Item.price);
            $("#inputPOQtyOnHand").val(Item.qty);
        }
    }
});

$("#btnAddToCart").click(function (){
    addToCart();
});

function addToCart(){
    let orderID = $("#OrderId").text();
    let itemCode = $("#inputPOItemCode").val();
    let itemName = $("#inputPOItemName").val();
    let price = $("#inputPOPrice").val();
    let quantity =  $("#inputPOQtyOnHand").val();
    let orderItemQty =$("#inputPOOrderQty").val();

    let total = price * orderItemQty;

    var addToCartObject = {
        code: itemCode,
        name: itemName,
        price: price,
        qty: orderItemQty,
        total: total,
    }

    var row= `<tr> <td>${addToCartObject.code}</td><td>${addToCartObject.name}</td><td>${addToCartObject.price}</td><td>${addToCartObject.qty}</td><td>${addToCartObject.total}</td></tr>`;
    $(".tblCart").append(row);


    var orderDetailsObject = {
        oId:orderID,
        code: itemCode,
        orderItemQty: orderItemQty,
        total: total,

    }

    let afterCount = orderDetails.length;
    // console.log(afterCount);
    let beforCount = afterCount+1;
    // console.log(beforCount);

    orderDetails.push(orderDetailsObject);

    if (beforCount == orderDetails.length){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Item add to cart successfully...',
            showConfirmButton: false,
            timer: 1500
        })
    }else{
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Unsuccessful...',
            showConfirmButton: false,
            timer: 1500
        })
    }

    console.log(orderDetails);

    let updateQtyOnHand = manageQtyOnHand(quantity,orderItemQty);
    console.log(updateQtyOnHand)
    for (let item of items) {
        if(itemCode == item.code){
            item.qty = updateQtyOnHand;
        }
    }

     manageTotal(orderID);

    setTextInItemTextfields("","","","","")

    $("#btnAddToCart").attr('disabled',true);
}

function setTextInItemTextfields( code, name, price, qtyOHand, orderQty) {
    $("#inputPOItemCode").val(code);
    $("#inputPOItemName").val(name);
    $("#inputPOPrice").val(price);
    $("#inputPOQtyOnHand").val(qtyOHand);
    $("#inputPOOrderQty").val(orderQty);
}

function manageQtyOnHand(qtyOnHand , orderQty){
    let updatedQtyOnHand = qtyOnHand-orderQty;
    return updatedQtyOnHand;
}

function manageTotal(orderId){
  let tot = 0;
    for (let oDetails of orderDetails) {
        if (oDetails.oId == orderId){
            tot += oDetails.total;
        }
    }

    $("#Total").text(tot);

    $("#inputDiscount").on('keydown', function (event) {

        if (event.key == "Enter") {
            let discount = $("#inputDiscount").val();

            let dis = (tot*discount)/100;

            let subTot= tot-dis;

            $("#SubTotal").text(subTot);

        }
    });
}

$("#btnPurchaseOrder").click(function (){
    purchaseOrder();
});

function purchaseOrder() {
    let orderID = $("#OrderId").text();
    let orderDate = $("#OrderDate").text();
    let cusId = $("#inputPOCustomerID").val();

    let discount = $("#inputDiscount").val();

    var orderObject = {
        oId: orderID,
        oDate: orderDate,
        customerId: cusId,
        discount :discount,
    }

    let afterCount = order.length;
    // console.log(afterCount);
    let beforCount = afterCount + 1;
    // console.log(beforCount);


//------------alert--------------------------------
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, place order!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                order.push(orderObject);

                if (beforCount == order.length) {

                    swalWithBootstrapButtons.fire(
                        'Purchased!',
                        'Your order has been purchased successfully !...',
                        'success'
                    )

                    setTextInItemTextfields("","","","","");
                    $("#inputPOCustomerID, #inputPOCName,#inputPOCSalary, #inputAddress ").val("");
                    $("#inputCash, #inputDiscount, #inputBalance ").val("");
                    $("#Total").text("");
                    $("#SubTotal").text("");
                    $(".tblCart").empty();
                    generateOrderID();
                    loadOrderIDs();

                }else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Unsuccessful...',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your order has been cancelled !',
                    'error'
                )
                cancelOrder(orderObject.oId);
                setTextInItemTextfields("","","","","");
                $("#inputPOCustomerID, #inputPOCName,#inputPOCSalary, #inputAddress ").val("");
                $(".tblCart").empty();
                $("#inputPOCustomerID, #inputPOCName,#inputPOCSalary, #inputAddress ").val("");
                $("#inputCash, #inputDiscount, #inputBalance ").val("");
                $("#Total").text("");
                $("#SubTotal").text("");
            }
        })

    console.log(orderDetails);
    $("#btnPurchaseOrder").attr('disabled',true);
}


function cancelOrder(oId) {
    orderDetails=  orderDetails.filter(function(v){
        return v.oId!=oId;
    });
}

$("#inputCash").on('keydown', function (event) {
        if (event.key == "Enter") {
            let cash = $("#inputCash").val();
            let subTotal =  $("#SubTotal").text();

            let balance = cash - subTotal;
            $("#inputBalance").val(balance);
        }
});



//---------------Validation of orderQty---------------------------

const orderQtyRegEx = /^[1-9][0-9]{0,3}$/;

var addToCartValidations = {
    reg: orderQtyRegEx,
    field: $('#inputPOOrderQty'),
    error:'Quantity Pattern is Wrong : 1-9'
}


$("#inputPOOrderQty").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#inputPOOrderQty").on('keyup', function (event) {
    checkOrderQtyValidity();
});

$("#inputPOOrderQty").on('blur', function (event) {
    checkOrderQtyValidity();
});

$("#selectItem").on('keydown', function (event) {
    if (event.key == "Enter") {
        $("#inputPOOrderQty").focus();
    }
});

$("#inputPOOrderQty").on('keydown', function (event) {
    if (event.key == "Enter" && checkOrderQty(orderQtyRegEx ,$("#inputPOOrderQty"))) {
        let res = confirm("Do you want to add this item to cart?");
        if (res) {
            addToCart();
            $("#btnAddToCart").attr('disabled',true);
        }
    }
});

$("#inputPOOrderQty").on('keydown', function (event) {
    if (event.key == "Enter") {
        $("#selectItem").focus();
    }
});

function checkOrderQtyValidity() {
    let errorCount=0;

        if (checkOrderQty(addToCartValidations.reg,addToCartValidations.field)) {
            OrderQtyTextSuccess(addToCartValidations.field,"");
            errorCount=errorCount+1;
        }else{
            setOrderQtyTextError(addToCartValidations.field,addToCartValidations.error);
        }

    setAddToCartButtonState(errorCount);

}

function checkOrderQty(regex, txtField) {

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

function setOrderQtyTextError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultOrderQtyText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function OrderQtyTextSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultOrderQtyText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultOrderQtyText(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function setAddToCartButtonState(value){
    if (value > 0){
        $("#btnAddToCart").attr('disabled',false);
    }else {
        $("#btnAddToCart").attr('disabled',true);
    }
}



//-----------------validation of cash----------------------------------------

const cashRegEx = /^[1-9][0-9]{0,}[.]?[0-9]{1,2}$/;
const discountRegEx = /^[0-9]{0,2}$/;

let billingValidations = [];
billingValidations.push({reg: cashRegEx, field: $('#inputCash'),error:'Wrong : 100 or 100.00'});
billingValidations.push({reg: discountRegEx, field: $('#inputDiscount'),error:'Wrong Pattern : 1-9'});



$("#inputCash,#inputDiscount").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#inputCash,#inputDiscount").on('keyup', function (event) {
    checkBillingValidity();
});

$("#inputCash,#inputDiscount").on('blur', function (event) {
    checkBillingValidity();
});



$("#inputDiscount").on('keydown', function (event) {
    if (event.key == "Enter" && checkBilling(cashRegEx, $("#inputDiscount"))) {
        focusBillingText($("#inputCash"));
    }
});


$("#inputCash").on('keydown', function (event) {
    if (event.key == "Enter" && checkBilling(discountRegEx, $("#inputCash"))) {
            purchaseOrder();
            $("#btnPurchaseOrder").attr('disabled',true);
    }
});

function checkBillingValidity() {
    let errorCount=0;
    for (let validation of billingValidations) {
        if (checkBilling(validation.reg,validation.field)) {
            BillingTextSuccess(validation.field,"");
            errorCount=errorCount+1;
        } else {
            setBillingTextError(validation.field,validation.error);
        }
    }
    setPurchaseButtonState(errorCount);

}

function checkBilling(regex, txtField) {

    let inputValue = txtField.val();

    if((regex.test(inputValue)) && (inputValue.length != 0)){
        return true;
    }else{
        return false;
    }
}

function setBillingTextError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultBillingText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function BillingTextSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultBillingText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultBillingText(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusBillingText(txtField) {
    txtField.focus();
}


function setPurchaseButtonState(value){
    if (value > 0){
        $("#btnPurchaseOrder").attr('disabled',false);
    }else {
        $("#btnPurchaseOrder").attr('disabled',true);
    }
}


