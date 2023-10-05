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

// Para actualizar la información
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

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("firstName").value = "";
            document.getElementById("lastName").value = "";
            document.getElementById("run").value = "";
            document.getElementById("email").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";

            alert("El postulante ha sido editado");
        }
    }
}