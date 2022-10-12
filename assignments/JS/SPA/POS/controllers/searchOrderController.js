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
