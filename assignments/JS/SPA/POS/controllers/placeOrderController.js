
var date = new Date();
var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
$("#OrderDate").text(current_date);


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
