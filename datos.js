// var selectedRow = null;

// Muestra las alertas

// function showAlert(message, className) {
//  const div = document.createElement("div");
// div.className = `alert alert - $(className)`;

// div.appendChild(document.createTextNode(message));
// const container = document.querySelector(".container");
// const main = document.querySelector(".main");
// container.insertBefore(div, main);

// setTimeout(() => document.querySelector(".alert").remove(), 3000);
// }

// Borrar todos los campos

// function clearFields() {
// document.querySelector("#firstName").value = "";
// document.querySelector("#lastName").value = "";
// document.querySelector("#run").value = "";
// document.querySelector("#email").value = "";
// }

// Agregar postulante

// document.querySelector("#worker-form").addEventListener("submit", (e) => {
// e.preventDefault();

// Obtener los valores del formulario

// const firstName = document.querySelector("#firstName").value;
// const lastName = document.querySelector("#lastName").value;
// const run = document.querySelector("#run").value;
// const email = document.querySelector("#email").value;

// Validar

// if (firstName == "" || lastName == "" || run == "" || email == "") {
// showAlert("Por favor, debes llenar todo el formulario", "danger")
//  }
// else {
// if (selectedRow == null) {
// const list = document.querySelector("#worker-list");
// const row = document.createElement("tr");

// row.innerHTML = `
// <td>${firstName}</td>
// <td>${lastName}</td>
// <td>${run}</td>
// <td>${email}</td>
// <td>
// <a href="#" class="btn btn-warning btn-sm edit">Editar</a>
//  <a href="#" class="btn btn-danger btn-sm delete">Eliminar</a>
// `;
// list.appendChild(row);
// selectedRow = null;
// showAlert("El postulante ha sido agregado", "success");
//  }
// else{
// selectedRow.children[0].textContent = firstName;
// selectedRow.children[1].textContent = lastName;
// selectedRow.children[2].textContent = run;
// selectedRow.children[3].textContent = email;
// selectedRow = null;
// showAlert("La información ha sido actualizada", "info");
// }

// clearFields();
// }
// });

// Actualizar información

// document.querySelector("#worker-list").addEventListener("click", (e) =>{
// target = e.target;
// if(target.classList.contains("edit")){
// selectedRow = target.parentElement.parentElement;
//  document.querySelector("#firstName").value = selectedRow.children[0].textContent;
// document.querySelector("#lastName").value = selectedRow.children[1].textContent;
// document.querySelector("#run").value = selectedRow.children[2].textContent;
//  document.querySelector("#email").value = selectedRow.children[3].textContent;
// }
// })


// Borrar información

// document.querySelector("#worker-list").addEventListener("click", (e) => {
// target = e.target;
// if(target.classList.contains("delete")){
// target.parentElement.parentElement.remove();
//  showAlert("El postulante ha sido eliminado", "danger");
// }
// }); 

// Para validar la información escrita en el formulario antes de agregarla a la data
function validateForm() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var run = document.getElementById("run").value;
    var email = document.getElementById("email").value;

    if (firstName == "") {
        alert("Debes escribir los nombres");
        return false;
    }

    if (lastName == "") {
        alert("Debes escribir los apellidos");
        return false;
    }

    if (run == "") {
        alert("Debes escribir el RUN");
        return false;
    }

    if (email == "") {
        alert("Debes escribir el correo electrónico");
        return false;
    }

    else if (!email.includes("@")) {
        alert("El correo no está bien escrito");
        return false;
    }
    return true;
}

// Para mostrar la data
function showData() {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    var html = "";

    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.firstName + "</td>";
        html += "<td>" + element.lastName + "</td>";
        html += "<td>" + element.run + "</td>";
        html += "<td>" + element.email + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Eliminar</button><button onclick="updateData(' + index + ')" class="btn btn-warning m-2">Editar</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// Para cargar la data en la página cuando cargue
document.onload = showData();

// Para agregar la data a la tabla
function AddData() {
    if (validateForm() == true) {
        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var run = document.getElementById("run").value;
        var email = document.getElementById("email").value;

        var peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            firstName: firstName,
            lastName: lastName,
            run: run,
            email: email,
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("run").value = "";
        document.getElementById("email").value = "";

        alert("El postulante ha sido agregado");
    }
}

// Para eliminar datos
function deleteData(index) {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();

    alert("El postulante ha sido eliminado");
}

// Para actualizar la información (Lo que falta por completar)
function updateData(index) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("firstName").value = peopleList[index].firstName;
    document.getElementById("lastName").value = peopleList[index].lastName;
    document.getElementById("run").value = peopleList[index].run;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#Update").onclick = function () {
        if (validateForm() == true) {
            peopleList[index].firstName = document.getElementById("firstName").value;
            peopleList[index].lastName = document.getElementById("lastName").value;
            peopleList[index].run = document.getElementById("run").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("PeopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("firstName").value = "";
            document.getElementById("lastName").value = "";
            document.getElementById("run").value = "";
            document.getElementById("email").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}