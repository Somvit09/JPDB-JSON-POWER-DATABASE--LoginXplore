var connToken = "90938239|-31949273140845010|90954992";
var dataBase = "EMP-DB";
var databaseRel = "EmpData";
var jpdbUrl = "http://api.login2explore.com:5577";
var jpdbIrlEndpoint = "/api/irl";
var jpdbImlEndpoint = "/api/iml";

$("#empId").focus();

function saveRecNo2LocalStorage(jsonobj) {
  var lvData = JSON.parse(jsonobj.data);
  localStorage.setItem("recno", lvData.rec_no);
}

function getEmpAsJsonOBJ() {
  var empId = $("#empId").val();
  var jsonStr = {
     id: empId
   };
   return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
  saveRecNo2LocalStorage(jsonObj);
  var record = JSON.parse(jsonObj.data).record;
  $("#empName").val("record.name");
  $("#empSalary").val("record.salary");
  $("#empDA").val("record.da");
  $("#empHRA").val("record.hra");
  $("#empDeduction").val("record.deduc");
}

function getEmp() {
  var empIdJsonOBJ = getEmpAsJsonOBJ();
  var getRequest = createGET_BY_KEYRequest(connToken, dataBase, databaseRel, empIdJsonOBJ);
  jQuery.ajaxSetup({async: false});
  var resJsonObj = executeCommand(getRequest, jpdbUrl, jpdbIrlEndpoint);
  jQuery.ajaxSetup({async: true});
  console.log(resJsonObj.status);
  if (resJsonObj.status === 400) {
    $("#empSave").prop("disabled", false);
    $("#empReset").prop("disabled", false);
    $("#empName").focus();
  }
  else if (resJsonObj.status === 200) {
    $("#empId").prop("disabled", true);
    fillData(resJsonObj);
    $("#empChange").prop("disabled", false);
    $("#empReset").prop("disabled", false);
    $("#empName").focus();
  }
}
console.log(getEmp());

function validateAndGetFormData() {
  var empIdVar = $("#empId").val();
  if (empIdVar === "") {
    alert("Employee ID Required Value");
    $("#empId").focus();
    return "";
  }
  var empNameVar = $("#empName").val();
  if (empNameVar === "") {
    alert("Employee Name is Required Value");
    $("#empName").focus();
    return "";
  }
  var empSalaryVar = $("#empSalary").val();
  if (empSalaryVar === "") {
    alert("Employee Salary is Required Value");
    $("#empSalary").focus();
    return "";
  }
  var empHRAVar = $("#empHRA").val();
  if (empHRAVar === "") {
    alert("Employee HRA is Required Value");
    $("#empHRA").focus();
    return "";
  }
  var empDAVar = $("#empDA").val();
  if (empDAVar === "") {
    alert("Employee DA is Required Value");
      $("#empDA").focus();
    return "";
  }
  var empDeductionVar = $("#empDeduction").val();
  if (empDeductionVar === "") {
    alert("Employee Deduction is Required Value");
    $("#empDeduction").focus();
    return "";
  }
  var jsonStrObj = {
    empId: empIdVar,
    empName: empNameVar,
    empSalary: empSalaryVar,
    empDA: empDAVar,
    empHRA:empHRAVar,
    empDeduction: empDeductionVar
  };
  return JSON.stringify(jsonStrObj);
}
console.log(validateAndGetFormData());

function reset() {
  $("#empId").val("")
  $("#empName").val("");
  $("#empSalary").val("");
  $("#empHRA").val("");
  $("#empDA").val("");
  $("#empDeduction").val("");
  $("#empId").prop("disabled", false),
  $("#empSave").prop("disabled", true),
  $("#empChange").prop("disabled", true),
  $("#empReset").prop("disabled", true),
  $("#empId").focus();
}
function save() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
    return "";
    }
    var putReqStr = createPUTRequest(connToken,
    jsonStr, dataBase, databaseRel);
    alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommand(putReqStr,
    jpdbUrl, jpdbImlEndpoint);
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#empId").focus();
}
function update() {
  $("#empChange").prop("disabled", true);
  var jsonChange = validateAndGetFormData();
  var updateRequest = createUPDATERecordRequest(connToken, jsonChange, dataBase, databaseRel, localStorage.getItem("recno"));
  jQuery.ajaxSetup({async: false});
  var resJsonObj = executeCommand(updateRequest, jpdbUrl, jpdbImlEndpoint);
  jQuery.ajaxSetup({async: true});
  console.log(resJsonObj);
  resetForm();
  $("#empId").focus();
}
console.log(saveEmployee());
console.log(changeEmployee());
