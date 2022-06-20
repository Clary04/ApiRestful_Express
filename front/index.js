var thead = document.getElementById("thead_1");
var tbody = document.getElementById("tbody_1");

window.addEventListener("load", (e) => {
  e.preventDefault();
  listarPessoas();
});

function ManipularDados(profissional) {
  let row_increment = document.createElement("tr");
  let td_id = document.createElement("td");
  td_id.style.display = "none";

  let td_increment_data_4 = document.createElement("td");
  let buttonRemove = document.createElement("button");
  buttonRemove.textContent = "Remover";
  buttonRemove.id = "btnRemover";
  td_increment_data_4.appendChild(buttonRemove);

  let td_increment_data_5 = document.createElement("td");
  let buttonUpdate = document.createElement("button");
  buttonUpdate.textContent = "Atualizar";
  buttonUpdate.id = "btnAtualizar";
  td_increment_data_5.appendChild(buttonUpdate);

  let id, name, salary, charge;

  if (!profissional) {
    name = document.getElementById("name").value;
    salary = document.getElementById("salary").value;
    charge = document.getElementById("charge").value;

    const profissional = {
      name: name,
      salary: salary,
      charge: charge,
    };

    fetch("http://localhost:3000/person", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profissional),
    }).then(() => {
      window.location.reload();
    });

    let td_increment_data = document.createElement("td");
    td_increment_data.innerHTML = name;
    let td_increment_data_2 = document.createElement("td");
    td_increment_data_2.innerHTML = salary;
    let td_increment_data_3 = document.createElement("td");
    td_increment_data_3.innerHTML = charge;

    document.getElementById("name").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("charge").value = "";

    row_increment.appendChild(td_increment_data);
    row_increment.appendChild(td_increment_data_2);
    row_increment.appendChild(td_increment_data_3);
    row_increment.appendChild(td_increment_data_4);
    row_increment.appendChild(td_increment_data_5);
  } else {
    name = profissional.name;
    salary = profissional.salary;
    charge = profissional.charge;
    id = profissional._id;

    let td_increment_data = document.createElement("td");
    td_increment_data.innerHTML = name;
    let td_increment_data_2 = document.createElement("td");
    td_increment_data_2.innerHTML = salary;
    let td_increment_data_3 = document.createElement("td");
    td_increment_data_3.innerHTML = charge;
    td_id.id = id;

    row_increment.appendChild(td_id);
    row_increment.appendChild(td_increment_data);
    row_increment.appendChild(td_increment_data_2);
    row_increment.appendChild(td_increment_data_3);
    row_increment.appendChild(td_increment_data_4);
    row_increment.appendChild(td_increment_data_5);

    tbody.appendChild(row_increment);

    buttonRemove.addEventListener("click", (e) => {

      let id_table = e.target.parentNode.parentNode.children[0].id;

      fetch("http://localhost:3000/person/" + id_table, {
        method: "DELETE",
      }).then(() => {
        window.location.reload();
      });
    });

    buttonUpdate.addEventListener("click", (e) => {

      btnCadastrar.setAttribute("disabled", true);
      
      let id_table = e.target.parentNode.parentNode.children[0].id;

      fetch("http://localhost:3000/person/" + id_table)
        .then((response) => response.json())
        .then((profissional) => {

          document.getElementById("name").value = profissional.name;
          document.getElementById("salary").value = profissional.salary;
          document.getElementById("charge").value = profissional.charge;

          btnConfirmaAtualizacao.addEventListener("click", (e) => {

            let name = document.getElementById("name").value;
            let salary = document.getElementById("salary").value;
            let charge = document.getElementById("charge").value;

            const profissional = {
                name: name,
                salary: salary,
                charge: charge
            }
            
            if (!name || !salary || !charge) {
              alert("Preencha o formulário para conseguir atualizar!");
            } else {
            
            btnCadastrar.setAttribute("disabled", false);

              fetch("http://localhost:3000/person/" + id_table, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(profissional),
              }).then(() => {
                window.location.reload();
              });
            }
          });
        });
    });
  }
}

function listarPessoas() {
  fetch("http://localhost:3000/person")
    .then((response) => response.json())
    .then((pessoas) => {
      pessoas.forEach((pessoa) => {
        ManipularDados(pessoa);
      });
    });
}
