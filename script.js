var pass1 = document.getElementById("pass");

var check1 = document.getElementById("lowercase");
var check2 = document.getElementById("uppercase");
var check3 = document.getElementById("special");
var check4 = document.getElementById("minimum8");
var rules = document.getElementById("rules");

pass1.addEventListener("keyup", function () {
  // Must contain a lowercase
  var regex = /^(?=.*?[a-z]).+$/;
  if (!regex.test(pass1.value)) {
    check1.classList.remove("valid");
  } else {
    check1.classList.add("valid");
  }
  // Must contain an uppercase
  var regex = /^(?=.*?[A-Z]).+$/;
  if (!regex.test(pass1.value)) {
    check2.classList.remove("valid");
  } else {
    check2.classList.add("valid");
  }
  // Must contain a special character and a number
  var regex = /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/;
  if (!regex.test(pass1.value)) {
    check3.classList.remove("valid");
  } else {
    check3.classList.add("valid");
  }
  // Minimum 8 characters
  if (pass1.value.length > 7) {
    check4.classList.add("valid");
  } else {
    check4.classList.remove("valid");
  }
});
