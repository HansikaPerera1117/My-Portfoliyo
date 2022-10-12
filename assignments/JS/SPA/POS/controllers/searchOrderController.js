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

$("#viewAllOrders").click(function (){
    loadAllOrders();
});
