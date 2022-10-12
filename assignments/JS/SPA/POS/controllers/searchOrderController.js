$("#searchOrderBar").focus();

// $("#btnSaveItem").click(function (){
//     saveItem();
// });

// function saveItem(){
//     let itemCode = $("#ItemCode").text();
//     let itemName = $("#inputItemName").val();
//     let packSize = $("#inputItemPackSize").val();
//     let price = $("#inputItemPrice").val();
//     let quantity = $("#inputItemQuantity").val();
//
//
//     var itemObject = {
//         code: itemCode,
//         name: itemName,
//         packSize: packSize,
//         price: price,
//         qty: quantity,
//     }
//
//     let afterCount = items.length;
//     console.log(afterCount);
//     let beforCount = afterCount+1;
//     console.log(beforCount);
//
//     items.push(itemObject);
//
//     if (beforCount == items.length){
//         Swal.fire({
//             position: 'top-end',
//             icon: 'success',
//             title: 'Item has been saved successfully...',
//             showConfirmButton: false,
//             timer: 1500
//         })
//     }else{
//         Swal.fire({
//             position: 'top-end',
//             icon: 'error',
//             title: 'Unsuccessful...',
//             showConfirmButton: false,
//             timer: 1500
//         })
//     }
//
//     console.log(items);
//
//     loadAllItems();
//
//     loadItemNames();
//
//     generateItemID();
//
//     bindItemRowClickEvents();
//
//     loadAllItemsForOption();
//
// }

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

// function bindItemRowClickEvents() {
//     $(".tblItems>tr").click(function () {
//         let id = $(this).children(":eq(0)").text();
//         $("#ItemSearchBar").val(id);
//     });
// }
//
// function loadItemNames(){
//     $("#cmbItemNames").empty();
//     var selected = `<option selected>Item Names</option>`;
//     $("#cmbItemNames").append(selected);
//     for (var item of items){
//         var names =  `<option>${item.name}</option>`;
//         $("#cmbItemNames").append(names);
//     }
// }
//
// $("#cmbItemNames").click(function () {
//     let name = $('#cmbItemNames>option:selected').val();
//
//     for (let i = 0; i < items.length; i++) {
//         let itemName = items[i].name;
//
//         if (itemName == name){
//             $("#ItemSearchBar").val(name);
//         }
//
//     }
//
// });

$("#viewAllOrders").click(function (){
    loadAllOrders();
});
//
// $("#ItemSearchButton").click(function (){
//
//     let search = $("#ItemSearchBar").val();
//
//     let item = searchItem(search);
//
//     $("#ICode").text(item.code);
//     $("#inputIName").val(item.name);
//     $("#inputIPacketSize").val(item.packSize);
//     $("#inputIPrice").val(item.price);
//     $("#inputIQuantity").val(item.qty);
// });
//
// $("#btnItemDelete").click(function (){
//
//     let search = $("#ItemSearchBar").val();
//
//     console.log(items);
//
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//         if (result.isConfirmed) {
//
//             if (deleteItem(search)) {
//                 Swal.fire(
//                     'Deleted!',
//                     'Item ' +search + ' has been deleted successfully',
//                     'success'
//                 )
//             } else {
//                 alert("No such Item to delete. please check the code or name");
//             }
//
//             setTextfieldValuesItem("","","","");
//
//             $("#ItemSearchBar").val("");
//
//             loadAllItems();
//
//             loadItemNames();
//
//             bindItemRowClickEvents();
//
//             loadAllItemsForOption();
//
//             console.log(items);
//         }
//     })
// });
//
// $("#updateItem").click(function () {
//
//     let search = $("#ItemSearchBar").val();
//
//     let response = updateItem(search);
//     if (response) {
//         Swal.fire({
//             position: 'top-end',
//             icon: 'success',
//             title: 'Item has been updated successfully...',
//             showConfirmButton: false,
//             timer: 1500
//         })
//
//         setTextfieldValuesItem("","","","");
//         $("#ItemSearchBar").val("");
//
//     } else {
//         Swal.fire({
//             position: 'top-end',
//             icon: 'error',
//             title: 'Unsuccessful...',
//             showConfirmButton: false,
//             timer: 1500
//         })
//
//     }
// });
//
// $("#ItemBtnReset").click(function (){
//     let typedItm = $("#ItemSearchBar").val();
//     let item = searchItem(typedItm);
//     if (item != null) {
//         setTextfieldValuesItem(item.name, item.packSize, item.price, item.qty);
//     } else {
//         alert("There is no item available for that " + typedItm);
//         setTextfieldValuesItem("", "", "", "");
//     }
// });
//
// function setTextfieldValuesItem( name, packSize,price, qty) {
//     $("#inputIName").val(name);
//     $("#inputIPacketSize").val(packSize);
//     $("#inputIPrice").val(price);
//     $("#inputIQuantity").val(qty);
// }
//
// function updateItem(itm) {
//     let item = searchItem(itm);
//     if (item != null) {
//
//         item.name = $("#inputIName").val();
//         item.packSize = $("#inputIPacketSize").val();
//         item.price = $("#inputIPrice").val();
//         item.qty = $("#inputIQuantity").val();
//
//         loadAllItems()
//
//         loadItemNames()
//
//         bindItemRowClickEvents();
//
//         return true;
//     } else {
//         return false;
//     }
//
// }
//
// function deleteItem(itm) {
//     let item = searchItem(itm);
//     if (item != null) {
//         let indexNumber = items.indexOf(item);
//         items.splice(indexNumber, 1);
//         loadAllItems()
//         return true;
//     } else {
//         return false;
//     }
// }
//
// function searchItem(itm) {
//     for (let item of items) {
//         if (item.code == itm || item.name == itm) {
//             return item;
//         }
//     }
//     return null;
// }