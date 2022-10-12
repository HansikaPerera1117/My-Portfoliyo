
var date = new Date();
var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
$("#OrderDate").text(current_date);

$("#selectItem").focus();
$("#btnAddToCart").attr('disabled',true);
// $("#btnPurchaseOrder").attr('disabled',true);


function generateOrderID(){
    let lastOId ="";
    for (const ords of order) {
        lastOId = ords.id;
        console.log(lastOId)
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

    let TOTAL = manageTotal(total);
    // console.log(TOTAL);
    $("#Total").text(TOTAL);

    setTextInItemTextfields("","","","","")

    $("#btnAddToCart").attr('disabled',true);
}

// function gettable() {
//
//     for (const row of $(".tblCart").get($("tr"))) {
//         console.log(row)
//         let code = row.children(":eq(0)").text();
//         console.log(code)
//         let name = row.children(":eq(1)").text();
//         console.log(name);
//         let price = row.children(":eq(2)").text();
//         console.log(price)
//         let qty = row.children(":eq(3)").text();
//         console.log(qty)
//         let total = row.children(":eq(3)").text();
//         console.log(total)
//     }
//     // // console.log(id, name, address, salary);
//     //
//     // //setting table details values to text fields
//     // $('#txtCustomerID').val(id);
//     // $('#txtCustomerName').val(name);
//     // $('#txtCustomerAddress').val(address);
//     // $('#txtCustomerSalary').val(salary);
//
// }

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

function manageTotal(total){

    // var a=10;
    // var b=100;
    // var c =a+=b;
    // b=c;

    // console.log(total);
    //let tot1 = 0;
    let tot2 = null;
    tot2 = tot2 += total;

   // let fulTot = tot1+=tot2
   // tot1 = fulTot;
    return tot2;
}

$("#btnPurchaseOrder").click(function (){
    purchaseOrder();
});

function purchaseOrder() {

    let orderID = $("#OrderId").text();
    let orderDate = $("#OrderDate").text();
    let cusId = $("#inputPOCustomerID").val();
    let cash = $("#inputCash").val();
    let discount = $("#inputDiscount").val();

    let balance


    var orderObject = {
        oId: orderID,
        oDate: orderDate,
        customerId: cusId,
    }

    let afterCount = order.length;
    console.log(afterCount);
    let beforCount = afterCount + 1;
    console.log(beforCount);


    // order.push(orderObject);
    //
    // if (beforCount == order.length){
    //     Swal.fire({
    //         position: 'top-end',
    //         icon: 'success',
    //         title: 'Order has bees saved successfully...',
    //         showConfirmButton: false,
    //         timer: 1500
    //     })
    //     setTextInItemTextfields("","","","","");
    //     $("#inputPOCustomerID, #inputPOCName,#inputPOCSalary, #inputAddress ").val("");
    //     $(".tblCart").empty();
    // }else{
    //     Swal.fire({
    //         position: 'top-end',
    //         icon: 'error',
    //         title: 'Unsuccessful...',
    //         showConfirmButton: false,
    //         timer: 1500
    //     })
    // }
    //
    console.log(order);



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
            }
        })

    console.log(orderDetails);
}

 function cancelOrder(oId) {

    for(var i of orderDetails){
        if(i.oId == oId){
            var index= orderDetails.indexOf(i);
            customers.splice(index,1);
        }
    }
//
//     // let target = oId;
//     // var i = 0;
//     // while (i < orderDetails.length) {
//     //     if (orderDetails[i] == target) {
//     //         orderDetails.splice(i, 1);
//     //     } else {
//     //         ++i;
//     //     }
//     // }
//     // console.log(orderDetails);
//
//     // for (let od of orderDetails) {
//     //         if (od.oId == oId) {
//     //             let indexNumber = orderDetails.indexOf(oId);
//     //             orderDetails.splice(indexNumber, 1);
//     //         }
//     // }
//
//     // if (oDetail != null) {
//     //     let indexNumber = orderDetails.indexOf(oDetail);
//     //     orderDetails.splice(indexNumber, 1);
//     //     return true;
//     // } else {
//     //     return false;
//     // }
}

// function searchOrderDetails(oId) {
//     for (let od of orderDetails) {
//         if (od.oId == oId) {
//             return oId;
//         }
//     }
//     return null;
// }







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

const cashRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const discountRegEx = /^[0-9]{0,1}$/;

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



$("#inputCash").on('keydown', function (event) {
    if (event.key == "Enter" && checkBilling(cashRegEx, $("#inputCash"))) {
        focusBillingText($("#inputDiscount"));
    }
});


$("#inputDiscount").on('keydown', function (event) {
    if (event.key == "Enter" && checkBilling(discountRegEx, $("#inputDiscount"))) {
        let res = confirm("Do you want to add this item.?");
        if (res) {
            //saveItem();
            clearAllBillingTexts();
            $("#btnPurchaseOrder").attr('disabled',true);
        }
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
    if (value>0){
        $("#btnPurchaseOrder").attr('disabled',false);
    }else{
        $("#btnPurchaseOrder").attr('disabled',true);
    }
}

function clearAllBillingTexts() {
    $("#inputCash").focus();
    $("#inputCash,#inputDiscount").val("");
    checkBillingValidity();
}

