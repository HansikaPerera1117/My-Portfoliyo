
$("#searchBar").focus();


function generateID(){
    let lastId ="";
    for (const customer of customers) {
        lastId = customer.id;
    }

    if (customers.length == 0){
        $("#CustomerId").text("C00-1");
    }else {
        let co = lastId.length;
        console.log(co);
        let text = lastId.substring(0,4);
        console.log(text);
        let num= lastId.substring(4,co);
        console.log(num);

        let n = parseInt(num);
        n++;
        console.log(n);

        let GenerateId = text+n;

        console.log(GenerateId);

        $("#CustomerId").text(GenerateId);

    }
}

generateID();

$("#btnSaveCustomer").click(function (){
    saveCustomer();
});

function saveCustomer(){
    let customerID = $("#CustomerId").text();
    let customerName = $("#inputCustomerName").val();
    let customerAddress = $("#inputCustomerAddress").val();
    let customerContact = $("#inputCustomerContactNo").val();

    let customerGender;
    var radios = document.getElementsByName('flexRadioDefault');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            let Gender = (radios[i].className);
            let gName = Gender.split(",");
            for (let j = 0; j < gName.length; j++) {
                customerGender = gName[j];
            }
            break;
        }
    }

    let customerSalary = $("#inputCustomerSalary").val();


    var customerObject = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        contact: customerContact,
        gender: customerGender,
        salary: customerSalary
    }

    let afterCount = customers.length;
    console.log(afterCount);
    let beforCount = afterCount+1;
    console.log(beforCount);

    customers.push(customerObject);

    if (beforCount == customers.length){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Customer has been saved successfully...',
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

    console.log(customers);

    loadAllCustomers();

    loadCustomerNames();

    generateID();

    bindRowClickEvents();

    loadAllCustomersForOption();

}

function loadAllCustomers(){
    $(".tblCustomer").empty();

    for(var customer of customers){
        var row= `<tr> <td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td><td>${customer.gender}</td><td>${customer.salary}</td></tr>`;
        $(".tblCustomer").append(row);
    }
}

function bindRowClickEvents() {
    $(".tblCustomer>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        $("#searchBar").val(id);
    });
}

function loadCustomerNames(){
    $("#cmbNames").empty();
    var selected = ` <option selected>Customer Names</option>`;
    $("#cmbNames").append(selected);

    for (var customer of customers){
        console.log(customer);

        var names =  `<option>${customer.name}</option>`;

        console.log(names);

        $("#cmbNames").append(names);
    }
}

$("#cmbNames").click(function () {
    let name = $('#cmbNames>option:selected').val();

    for (let i = 0; i < customers.length; i++) {
        let CustomerName = customers[i].name;

        if (CustomerName == name){
            $("#searchBar").val(name);
        }
    }

});

$("#viewAll").click(function (){
    loadAllCustomers();
});

$("#searchButton").click(function (){

    let search = $("#searchBar").val();

    let customer = searchCustomer(search);

    $("#CID").text(customer.id);
    $("#inputCName").val(customer.name);
    $("#inputCAddress").val(customer.address);
    $("#inputCContact").val(customer.contact);

    // ================aul start   deweniyata dana kenage gender eka pennanwa.e gender eke ayage gender eka pennanwa.anith 1 weni gender eke ekkage gender eka pennanne na================
    if (customer.gender == "Male") {
        $("#Male").prop('checked', true);
        $("#Female").prop('checked', false);
    }
    if (customer.gender == "Female") {
        $("#Female").prop('checked', true);
        $("#Male").prop('checked', false);
    }
    // ================aul end================

    $("#inputCSalary").val(customer.salary);
});

$("#btnCustomerDelete").click(function (){

    let search = $("#searchBar").val();

    console.log(customers);

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

            if (deleteCustomer(search)) {
                Swal.fire(
                    'Deleted!',
                    'Customer ' +search + ' has been deleted successfully',
                    'success'
                )
            } else {
                alert("No such customer to delete. please check the id or name");
            }

            setTextfieldValues("","","","")
            $("#Male").prop('checked', false);
            $("#Female").prop('checked', false);

            $("#searchBar").val("");

            loadAllCustomers();

            loadCustomerNames();

            bindRowClickEvents();

            loadAllCustomersForOption();

            console.log(customers);

        }
    })
});

$("#updateCustomer").click(function () {

    let search = $("#searchBar").val();

    let response = updateCustomer(search);
    if (response) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Customer has been updated successfully...',
            showConfirmButton: false,
            timer: 1500
        })
        setTextfieldValues("","","","");
        $("#Male").prop('checked', false);
        $("#Female").prop('checked', false);
        $("#searchBar").val("");
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

$("#btnReset").click(function (){
    let typedCus = $("#searchBar").val();
    let customer = searchCustomer(typedCus);
    if (customer != null) {
        setTextfieldValues(customer.name, customer.address,customer.contact, customer.salary);
    } else {
        alert("There is no customer available for that " + typedCus);
        setTextfieldValues("", "", "", "");
    }
});

function setTextfieldValues( name, address,contact, salary) {

    $("#inputCName").val(name);
    $("#inputCAddress").val(address);
    $("#inputCContact").val(contact);
    $("#inputCSalary").val(salary);
}

function updateCustomer(cust) {
    let customer = searchCustomer(cust);
    if (customer != null) {
        customer.name =   $("#inputCName").val();
        customer.address = $("#inputCAddress").val();
        customer.contact =$("#inputCContact").val();
        customer.salary =$("#inputCSalary").val();

        loadAllCustomers();

        loadCustomerNames();

        bindRowClickEvents();

        return true;
    } else {
        return false;
    }

}

function deleteCustomer(cust) {
    let customer = searchCustomer(cust);
    if (customer != null) {
        let indexNumber = customers.indexOf(customer);
        customers.splice(indexNumber, 1);

        loadAllCustomers();

        return true;
    } else {
        return false;
    }
}

function searchCustomer(cus) {
    for (let customer of customers) {
        if (customer.id == cus || customer.name == cus) {
            return customer;
        }
    }
    return null;
}

//----------------add new customer form validation------------------------

$("#inputCustomerName").focus();

const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{15,}$/;
const cusContactNoRegEx = /^(011|070|071|072|074|075|076|077|078)[0-9]{7}$/;
const cusSalaryRegEx = /^[0-9]{3,}[.]?[0-9]{1,2}$/;

let customerValidations = [];
customerValidations.push({reg: cusNameRegEx, field: $('#inputCustomerName'),error:'Customer Name Pattern is Wrong : A-z 5-20'});
customerValidations.push({reg: cusAddressRegEx, field: $('#inputCustomerAddress'),error:'Customer Address Pattern is Wrong : A-z 0-9'});
customerValidations.push({reg: cusContactNoRegEx, field: $('#inputCustomerContactNo'),error:'Customer Contact No Pattern is Wrong : start : 011|070|071|072|074|075|076|077|078'});
customerValidations.push({reg: cusSalaryRegEx, field: $('#inputCustomerSalary'),error:'Customer Salary Pattern is Wrong : 100 or 100.00'});


$("#inputCustomerName,#inputCustomerAddress,#inputCustomerContactNo,#inputCustomerSalary").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#inputCustomerName,#inputCustomerAddress,#inputCustomerContactNo,#inputCustomerSalary").on('keyup', function (event) {
    checkValidity();
});

$("#inputCustomerName,#inputCustomerAddress,#inputCustomerContactNo,#inputCustomerSalary").on('blur', function (event) {
    checkValidity();
});


$("#inputCustomerName").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusNameRegEx, $("#inputCustomerName"))) {
        $("#inputCustomerAddress").focus();
    } else {
        focusText($("#inputCustomerName"));
    }
});


$("#inputCustomerAddress").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusAddressRegEx, $("#inputCustomerAddress"))) {
        focusText($("#inputCustomerContactNo"));
    }
});


$("#inputCustomerContactNo").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusContactNoRegEx, $("#inputCustomerContactNo"))) {
        focusText($("#inputCustomerSalary"));
    }
});


$("#inputCustomerSalary").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusSalaryRegEx, $("#inputCustomerSalary"))) {
        let res = confirm("Do you want to add this customer.?");
        if (res) {
            saveCustomer();
            clearAllTexts();

        }
    }
});

$("#inputCustomerSalary").on('keydown', function (event) {
    if (event.key == "Enter") {
        focusText($("#inputCustomerName"));
    }
});

function checkValidity() {
    let errorCount=0;
    for (let validation of customerValidations) {
        if (check(validation.reg,validation.field)) {
            textSuccess(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setTextError(validation.field,validation.error);
        }

    }
    setButtonState(errorCount);

}

function check(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultText(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusText(txtField) {
    txtField.focus();
}

function setButtonState(value){
    if (value>0){
        $("#btnSaveCustomer").attr('disabled',true);
    }else{
        $("#btnSaveCustomer").attr('disabled',false);
    }
}

function clearAllTexts() {
    $("#inputCustomerName").focus();
    $("#inputCustomerName,#inputCustomerAddress,#inputCustomerContactNo,#inputCustomerSalary").val("");
    $("#Female").prop('checked', false);
    $("#Male").prop('checked', false);
    checkValidity();
}


//---------------update customer form validation------------------------

$("#inputCName").focus();

const cusUNameRegEx = /^[A-z ]{5,20}$/;
const cusUAddressRegEx = /^[0-9/A-z. ,]{15,}$/;
const cusUContactNoRegEx = /^(011|070|071|072|074|075|076|077|078)[0-9]{7}$/;
const cusUSalaryRegEx = /^[0-9]{3,}[.]?[0-9]{1,2}$/;

let customerUpdateValidations = [];
customerUpdateValidations.push({reg: cusUNameRegEx, field: $('#inputCName'),error:'Customer Name Pattern is Wrong : A-z 5-20'});
customerUpdateValidations.push({reg: cusUAddressRegEx, field: $('#inputCAddress'),error:'Customer Address Pattern is Wrong : A-z 0-9'});
customerUpdateValidations.push({reg: cusUContactNoRegEx, field: $('#inputCContact'),error:'Customer Contact No Pattern is Wrong : start : 011|070|071|072|074|075|076|077|078'});
customerUpdateValidations.push({reg: cusUSalaryRegEx, field: $('#inputCSalary'),error:'Customer Salary Pattern is Wrong : 100 or 100.00'});


$("#inputCName,#inputCAddress,#inputCContact,#inputCSalary").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});



$("#inputCName,#inputCAddress,#inputCContact,#inputCSalary").on('keyup', function (event) {
    checkValidityInUpdate();
});

$("#inputCName,#inputCAddress,#inputCContact,#inputCSalary").on('blur', function (event) {
    checkValidityInUpdate();
});


$("#inputCName").on('keydown', function (event) {
    if (event.key == "Enter" && checkInUpdate(cusUNameRegEx, $("#inputCName"))) {
        $("#inputCAddress").focus();
    } else {
        focusTextInUpdate($("#inputCName"));
    }
});


$("#inputCAddress").on('keydown', function (event) {
    if (event.key == "Enter" && checkInUpdate(cusUAddressRegEx, $("#inputCAddress"))) {
        focusTextInUpdate($("#inputCContact"));
    }
});


$("#inputCContact").on('keydown', function (event) {
    if (event.key == "Enter" && checkInUpdate(cusUContactNoRegEx, $("#inputCContact"))) {
        focusTextInUpdate()($("#inputCSalary"));
    }
});


$("#inputCSalary").on('keydown', function (event) {
    if (event.key == "Enter" && checkInUpdate(cusUSalaryRegEx, $("#inputCSalary"))) {
        let id = $("#CID").text();
        let response =  updateCustomer(id);
        if (response) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Customer has been updated successfully...',
                showConfirmButton: false,
                timer: 1500
            })
            clearAllTextsInUpdate();
            $("#searchBar").val("");
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Unsuccessful...',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
});



function checkValidityInUpdate() {
    let errorCount=0;
    for (let validation of customerUpdateValidations) {
        if (checkInUpdate(validation.reg,validation.field)) {
            textSuccessInUpdate(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setTextErrorInUpdate(validation.field,validation.error);
        }

    }
    setButtonStateInUpdate(errorCount);

}

function checkInUpdate(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextErrorInUpdate(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultTextInUpdate(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textSuccessInUpdate(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultTextInUpdate(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultTextInUpdate(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusTextInUpdate(txtField) {
    txtField.focus();
}

function setButtonStateInUpdate(value){
    if (value>0){
        $("#updateCustomer").attr('disabled',true);
    }else{
        $("#updateCustomer").attr('disabled',false);
    }
}

function clearAllTextsInUpdate() {
    $("#inputCName").focus();
    $("#inputCName,#inputCAddress,#inputCContact,#inputCSalary").val("");
    checkValidityInUpdate();
}



