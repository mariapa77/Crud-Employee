var selectedRow = null


function onFormSubmit () {
    if (validate()){
     var formData = readFormData();
    if(selectedRow == null)
        insertNewRecord(formData);
    else
    updateRecord(formData);
    resetForm();


    }
    
}

function readFormData(){
    var formData ={};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["empCode"] = document.getElementById("empCode").value;
    formData["Salary"] = document.getElementById("Salary").value;
    formData["City"] = document.getElementById("City").value;
    return formData;
    

}

function insertNewRecord(data){
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2 = innerHTML = data.empCode;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.Salary;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.City
    cell4 = newRow.insertCell(4);
    cell.innerHTML =  `<a onclick ="onEdit(this)">Edit</a> <a onclick ="onDelete(this)">Delete</a>`;
                      
}

function resetForm(){
    document.getElementById("fullName").value = "";
    document.getElementById("empCode").value = "";
    document.getElementById("Salary").value = "";
    document.getElementById("City").value = "";
    selectedRow = null;

}

function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("empCode").value = selectedRow.cells[1].innerHTML;
    document.getElementById("Salary").value = selectedRow.cells[2].innerHTML;
    document.getElementById("City").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML=formData.fullName;
    selectedRow.cells[1].innerHTML=formData.empCode;
    selectedRow.cells[2].innerHTML=formData.Salary;
    selectedRow.cells[3].innerHTML=formData.city;
}

function onDelete(td){
    if(confirm('Are you sure to delete this record?')){
        row =td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate(){
    isValid = true;
    if(document.getElementById("fullName").value == "") {
        isvalid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");

    }else{
        isValid = true;
        if(!document.getElementById("fullNameValidationError").classList.contains("hide"))
        document.getElementById("fullNameValidationError").classList.add("hide");
    }
}

