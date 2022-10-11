
$("#ItemSearchBar").focus();

function generateItemID(){
    let lastItmId ="";
    for (const item of items) {
        lastItmId = item.code;
        console.log(lastItmId)
    }

    if (items.length == 0){
        $("#ItemCode").text("P00-1");
    }else {

        let co = lastItmId.length;
        console.log(co);
        let text = lastItmId.substring(0,4);
        console.log(text);
        let num= lastItmId.substring(4,co);
        console.log(num);

        let n = parseInt(num);
        n++;
        console.log(n);

        let GenerateId = text+n;

        console.log(GenerateId);

        $("#ItemCode").text(GenerateId);

    }
}

generateItemID();

$("#btnSaveItem").click(function (){
    saveItem();
});

function saveItem(){
    let itemCode = $("#ItemCode").text();
    let itemName = $("#inputItemName").val();
    let packSize = $("#inputItemPackSize").val();
    let price = $("#inputItemPrice").val();
    let quantity = $("#inputItemQuantity").val();


    var itemObject = {
        code: itemCode,
        name: itemName,
        packSize: packSize,
        price: price,
        qty: quantity,
    }

    let afterCount = items.length;
    console.log(afterCount);
    let beforCount = afterCount+1;
    console.log(beforCount);

    items.push(itemObject);

    if (beforCount == items.length){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Item has been saved successfully...',
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

    console.log(items);

    loadAllItems();

    loadItemNames();

    generateItemID();

    bindItemRowClickEvents();

    loadAllItemsForOption();

}

function loadAllItems(){
    $(".tblItems").empty();

    for(var item of items){
        var row= `<tr> <td>${item.code}</td><td>${item.name}</td><td>${item.packSize}</td><td>${item.price}</td><td>${item.qty}</td></tr>`;

        $(".tblItems").append(row);
    }
}

function bindItemRowClickEvents() {
    $(".tblItems>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        $("#ItemSearchBar").val(id);
    });
}

function loadItemNames(){
    $("#cmbItemNames").empty();
    var selected = `<option selected>Item Names</option>`;
    $("#cmbItemNames").append(selected);
    for (var item of items){
        var names =  `<option>${item.name}</option>`;
        $("#cmbItemNames").append(names);
    }
}

$("#cmbItemNames").click(function () {
    let name = $('#cmbItemNames>option:selected').val();

    for (let i = 0; i < items.length; i++) {
        let itemName = items[i].name;

        if (itemName == name){
            $("#ItemSearchBar").val(name);
        }

    }

});

$("#viewAll").click(function (){
    loadAllItems();
});

$("#ItemSearchButton").click(function (){

    let search = $("#ItemSearchBar").val();

    let item = searchItem(search);

    $("#ICode").text(item.code);
    $("#inputIName").val(item.name);
    $("#inputIPacketSize").val(item.packSize);
    $("#inputIPrice").val(item.price);
    $("#inputIQuantity").val(item.qty);
});

$("#btnItemDelete").click(function (){

    let search = $("#ItemSearchBar").val();

    console.log(items);

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

            if (deleteItem(search)) {
                Swal.fire(
                    'Deleted!',
                    'Item ' +search + ' has been deleted successfully',
                    'success'
                )
            } else {
                alert("No such Item to delete. please check the code or name");
            }

            setItemTextfieldValues("","","","");

            $("#ItemSearchBar").val("");

            loadAllItems();

            loadItemNames();

            bindItemRowClickEvents();

            console.log(items);
        }
    })
});

$("#updateItem").click(function () {

    let search = $("#ItemSearchBar").val();

    let response = updateItem(search);
    if (response) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Item has been updated successfully...',
            showConfirmButton: false,
            timer: 1500
        })

        setTextfieldValuesItem("","","","");
        $("#ItemSearchBar").val("");

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

$("#ItemBtnReset").click(function (){
    let typedItm = $("#ItemSearchBar").val();
    let item = searchItem(typedItm);
    if (item != null) {
        setTextfieldValuesItem(item.name, item.packSize, item.price, item.qty);
    } else {
        alert("There is no item available for that " + typedItm);
        setTextfieldValuesItem("", "", "", "");
    }
});

function setTextfieldValuesItem( name, packSize,price, qty) {
    $("#inputIName").val(name);
    $("#inputIPacketSize").val(packSize);
    $("#inputIPrice").val(price);
    $("#inputIQuantity").val(qty);
}

function updateItem(itm) {
    let item = searchItem(itm);
    if (item != null) {

        item.name = $("#inputIName").val();
        item.packSize = $("#inputIPacketSize").val();
        item.price = $("#inputIPrice").val();
        item.qty = $("#inputIQuantity").val();

        loadAllItems()

        loadItemNames()

        bindItemRowClickEvents();

        return true;
    } else {
        return false;
    }

}

function deleteItem(itm) {
    let item = searchItem(itm);
    if (item != null) {
        let indexNumber = items.indexOf(item);
        items.splice(indexNumber, 1);
        loadAllItems()
        return true;
    } else {
        return false;
    }
}

function searchItem(itm) {
    for (let item of items) {
        if (item.code == itm || item.name == itm) {
            return item;
        }
    }
    return null;
}

//----------------add new item form validation------------------------

$("#inputItemName").focus();

const itmNameRegEx = /^[A-z ]{5,40}$/;
const itmPackSizesRegEx = /^[1-9][0-9]{0,5}(g|kg|ml|l)$/;
const itmPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const itmQtyRegEx = /^[1-9][0-9]{0,3}$/;

let itemValidations = [];
itemValidations.push({reg: itmNameRegEx, field: $('#inputItemName'),error:'Item Name Pattern is Wrong : A-z 5-40'});
itemValidations.push({reg: itmPackSizesRegEx, field: $('#inputItemPackSize'),error:'Item PackSizes Pattern is Wrong : 0-9 with g/kg/ml/l'});
itemValidations.push({reg: itmPriceRegEx, field: $('#inputItemPrice'),error:'Item Price Pattern is Wrong : 100 or 100.00'});
itemValidations.push({reg: itmQtyRegEx, field: $('#inputItemQuantity'),error:'Item Quantity Pattern is Wrong : 1-9'});


$("#inputItemName,#inputItemPackSize,#inputItemPrice,#inputItemQuantity").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#inputItemName,#inputItemPackSize,#inputItemPrice,#inputItemQuantity").on('keyup', function (event) {
    checkItemValidity()
});

$("#inputItemName,#inputItemPackSize,#inputItemPrice,#inputItemQuantity").on('blur', function (event) {
    checkItemValidity()
});


$("#inputItemName").on('keydown', function (event) {
    if (event.key == "Enter" && checkItem(itmNameRegEx, $("#inputItemName"))) {
        $("#inputItemPackSize").focus();
    } else {
        focusItemText($("#inputItemName"));
    }
});


$("#inputItemPackSize").on('keydown', function (event) {
    if (event.key == "Enter" && checkItem(itmPackSizesRegEx, $("#inputItemPackSize"))) {
        focusItemText($("#inputItemPrice"));
    }
});


$("#inputItemPrice").on('keydown', function (event) {
    if (event.key == "Enter" && checkItem(itmPriceRegEx, $("#inputItemPrice"))) {
        focusItemText($("#inputItemQuantity"));
    }
});


$("#inputItemQuantity").on('keydown', function (event) {
    if (event.key == "Enter" && checkItem(itmQtyRegEx, $("#inputItemQuantity"))) {
        let res = confirm("Do you want to add this item.?");
        if (res) {
            saveItem();
            clearAllItemTexts();
        }
    }
});


$("#inputItemQuantity").on('keydown', function (event) {
    if (event.key == "Enter") {
        focusItemText($("#inputItemName"));
    }
});

function checkItemValidity() {
    let errorCount=0;
    for (let validation of itemValidations) {
        if (checkItem(validation.reg,validation.field)) {
            ItemtextSuccess(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setItemTextError(validation.field,validation.error);
        }

    }
    setItemButtonState(errorCount);

}

function checkItem(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setItemTextError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultItemText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function ItemtextSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultItemText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultItemText(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusItemText(txtField) {
    txtField.focus();
}

function setItemButtonState(value){
    if (value>0){
        $("#btnSaveItem").attr('disabled',true);
    }else{
        $("#btnSaveItem").attr('disabled',false);
    }
}

function clearAllItemTexts() {
    $("#inputItemName").focus();
    $("#inputItemName,#inputItemPackSize,#inputItemPrice,#inputItemQuantity").val("");
    checkItemValidity()
}



