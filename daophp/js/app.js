///*************************************************************VARIABLES GLOBALES********************************************************** */
const table = document.getElementById("cartable"); //Tableau
const formulaire = document.querySelector("#formulaire"); //Formulaire

//calling fields in the input section
const reg = document.getElementById("registration");
const colour = document.getElementById("colour");
const make = document.getElementById("make");
const model = document.getElementById("model");
const infoForm = document.getElementById("confirmation");

let form; // Formdata
let lastId = getLastId(); //get last ID in BDD

let luke = false; // If registration already exist
let buttonTimer = true;
// verifExist(formulaire.children[1].value);
///******************************************************************FONCTIONS************************************************************** */
//DESSINE LE TABLEAU prend en argument un Array ou un objet(resultat JSON)
function drawRow(element) {
  let row = document.createElement("tr");
  table.appendChild(row);
  let typeOf = Array.isArray(element) ? true : false;
  if (typeOf) {
    getLastId();
    let remplacant;
    for (let i = 0; i < element.length; i++) {
      remplacant = {
        registration: element[0],
        colour: element[1],
        make: element[2],
        model: element[3],
        id: parseInt(lastId) + 1,
      };
    }
    element = remplacant;
  }
  for (const key in element) {
    if (Object.hasOwnProperty.call(element, key)) {
      if (key != "id") {
        const elem = element[key];
        let cell = document.createElement("td");

        row.appendChild(cell);
        cell.innerHTML = elem;
        cell.setAttribute("data-label", key);
      }
    }
  }
  let cell = document.createElement("td");
  row.appendChild(cell);
  let img = document.createElement("img");
  cell.appendChild(img);
  img.setAttribute("src", "asset/changement.png");
  img.style.width = "30px";
  img.addEventListener("click", function (event) {
    event.preventDefault();
    for (let i = 0; i < Array.from(row.children).length - 2; i++) {
      const element = Array.from(row.children)[i];
      let input = document.createElement("input");
      element.appendChild(input);
      input.value = element.textContent;
    }
    let validate = document.createElement("button");
    validate.textContent = "Validé changements";
    cell.appendChild(validate);
    validate.addEventListener("click", function () {
      let params = [];
      for (let i = 0; i < Array.from(row.children).length - 2; i++) {
        const y = Array.from(row.children)[i].lastChild;
        params.push(y.value);
      }
      for (const key in element) {
        if (Object.hasOwnProperty.call(element, key)) {
          element[key];
          switch (key) {
            case "registration":
              element[key] = params[0];
              break;
            case "colour":
              element[key] = params[1];
              break;
            case "make":
              element[key] = params[2];
              break;
            case "model":
              element[key] = params[3];
              break;
            default:
              break;
          }
        }
      }
      modifierParam(element);
      Array.from(row.children)[0].innerHTML = element["registration"];
      Array.from(row.children)[1].innerHTML = element["colour"];
      Array.from(row.children)[2].innerHTML = element["make"];
      Array.from(row.children)[3].innerHTML = element["model"];
    });
  });
  //

  //make the yes function here

  let cell2 = document.createElement("td");
  row.appendChild(cell2);
  let img2 = document.createElement("img");
  cell2.appendChild(img2);
  img2.setAttribute("src", "asset/bin.png"); //ICONE POUR MODIFIER

  img2.style.width = "30px";

  img2.addEventListener("click", function () {
    modal.style.display = "block";
    yes.addEventListener("click", function () {
      modal.style.display = "none";
      table.removeChild(row);
      deleteThis(element.registration);
    });
  });
}

function getLastId() {
  fetch(`./controllerVoiture.php?fonction=getID`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      lastId = data[0]["MAX(id)"];
      // console.log(data[0]["MAX(id)"]);
    })
    .catch((err) => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    });
}

function findAll() {
  fetch(`./controllerVoiture.php?fonction=findALL`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      if (data.length > 0) {
        data.forEach((element) => {
          drawRow(element);
        });
      }
    })
    .catch((err) => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    });
}
findAll();

function deleteThis(get) {
  fetch(`./controllerVoiture.php?fonction=deleteRow&variable=${get}`)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
    })
    .catch((err) => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    });
}

function addThis() {
  $init = { method: "POST", body: form };
  fetch(`./controllerVoiture.php?fonction=addNew`, $init)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      // console.log(data);
    })
    .catch((err) => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    });
}
formulaire.children[1].addEventListener("change", function () {
  verifExist(formulaire.children[1].value);
  console.log(luke);
});
///////////////////////
formulaire.addEventListener("submit", function (event) {
  event.preventDefault();
  if (
    reg.value.length == 0 ||
    colour.value.length == 0 ||
    make.value.length == 0 ||
    model.value.length == 0
  ) {
    infoForm.innerHTML = "please fill in all fields";
    infoForm.style.color = "red";
  }
  // verifExist(formulaire.children[1].value);
  else if (luke) {
    luke = false;
    form = new FormData();
    let keepValue = [];
    for (let i = 0; i < Array.from(formulaire.children).length; i++) {
      let z;
      if (i % 2 == 1) {
        z = Array.from(formulaire.children)[i];
        form.append(z.name, z.value);
        keepValue.push(z.value);
      }
    }
    addThis();
    drawRow(keepValue);
    infoForm.innerHTML = "submission added!";
    infoForm.style.color = "green";
    console.log(`luke est ${luke}`);
  } else {
    infoForm.innerHTML = "registration already exists";
    infoForm.style.color = "red";
  }
});

function modifierParam(params) {
  //envoyer objet [{"",""}] clé valeur dans un array
  params = JSON.stringify(params);
  fetch(`./controllerVoiture.php?fonction=modifyRow&variable=${params}`)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      console.log(data);
    })
    .catch((err) => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    });
}
function verifExist(params) {
  // params = JSON.stringify(params);
  //await fetch
  fetch(`./controllerVoiture.php?fonction=verifExist&registration=${params}`)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(typeof data);
      if (data < 1) {
        luke = true;
      }
    })
    .catch((err) => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    });
}
