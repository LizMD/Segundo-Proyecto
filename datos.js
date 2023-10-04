var selectedRow = null;

// Muestra las alertas

function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert - $(className)`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Borrar todos los campos

function clearFields() {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#run").value = "";
    document.querySelector("#email").value = "";
}

// Agregar postulante

document.querySelector("#worker-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener los valores del formulario

    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const run = document.querySelector("#run").value;
    const email = document.querySelector("#email").value;

    // Validar

    if (firstName == "" || lastName == "" || run == "" || email == "") {
        showAlert("Por favor, debes llenar todo el formulario", "danger")
    }
    else {
        if (selectedRow == null) {
            const list = document.querySelector("#worker-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${run}</td>
            <td>${email}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm edit">Editar</a>
            <a href="#" class="btn btn-danger btn-sm delete">Eliminar</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("El postulante ha sido agregado", "success");
        }
        else{
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = run;
            selectedRow.children[3].textContent = email;
            selectedRow = null;
            showAlert("La información ha sido actualizada", "info");
        }

        clearFields();
    }
});

// Actualizar información

document.querySelector("#worker-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#run").value = selectedRow.children[2].textContent;
        document.querySelector("#email").value = selectedRow.children[3].textContent;
    }
})


// Borrar información

document.querySelector("#worker-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("El postulante ha sido eliminado", "danger");
    }
});