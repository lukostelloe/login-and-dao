var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var yes = document.getElementById("yes");
var cancel = document.getElementById("cancel");

var carbutton = document.getElementById("addcarbutton");
var statu = document.getElementById("confirmation");

carbutton.addEventListener("click", function () {
  status.innerHTML = "car added!";
});

// When the user clicks on (x) or cancel, close the modal
span.onclick = function () {
  modal.style.display = "none";
};

cancel.onclick = function () {
  modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
