
var date = new Date();
var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
$("#OrderDate").text(current_date);

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

    // $(".tblCart").empty();
    var row= `<tr> <td>${addToCartObject.code}</td><td>${addToCartObject.name}</td><td>${addToCartObject.price}</td><td>${addToCartObject.qty}</td><td>${addToCartObject.total}</td></tr>`;
    $(".tblCart").append(row);



    var orderDetailsObject = {
        oId:orderID,
        code: itemCode,
        orderItemQty: orderItemQty,
        total: total,
    }

    let afterCount = orderDetails.length;
    console.log(afterCount);
    let beforCount = afterCount+1;
    console.log(beforCount);

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
    console.log(TOTAL);
    $("#Total").text(TOTAL);

    setItemTextfieldValues("","","","","")

}

function setItemTextfieldValues( code, name, price, qtyOHand, orderQty) {
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

// function manageTotal(total){
// //     console.log(total);
// //     let tot = 0;
// //     tot = tot + total;
// //     console.log(tot);
// //     return tot;
// // }

