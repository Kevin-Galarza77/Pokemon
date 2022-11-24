
const consultarPokemon = (id, number) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            return response.json();
        }).then(data => {
            pintarPokemon(data, number);
        }).catch(error => {
            console.log(error);
        });
}

const btnSeleccionar = () => {
    let primerPokemon = Math.round(Math.random() * 150);
    let segundoPokemon = Math.round(Math.random() * 150);
    consultarPokemon(primerPokemon, 1);
    consultarPokemon(segundoPokemon, 2);
}

btnSeleccionar();

const lista = document.getElementById("listarpokemon");
const modals = document.getElementById("modals");

const pintarPokemon = (data, id) => {
    console.log(data);
    let item = lista.querySelector(`#pok-${id}`);
    let modal = modals.querySelector(`#modal-pok-${id}`);
    item.getElementsByTagName("img")[0].setAttribute("src", data.sprites.front_default);
    item.getElementsByTagName("p")[0].innerHTML = data.name.toUpperCase();
    modal.getElementsByTagName("h2")[0].innerHTML = data.name.toUpperCase();
    let imagenes = '';
    for (const property in data.sprites) {
        console.log();
        if (data.sprites[property] && typeof (data.sprites[property]) === "string") {
            imagenes += `<img src="${data.sprites[property]}" alt="${property}">`;
        }
    }
    imagenes += `<hr>
    <div class="d-flex justify-content-between align-items-center">
        <h6 class="text-primary fs-6">Experiencia Base</h6>
        <p class="text-dark fs-6">${data.base_experience}</p>
    </div>
    <hr>
    <div class="d-flex justify-content-between align-items-center">
        <h6 class="text-primary fs-6">Altura (Decímetros)</h6>
        <p class="text-dark fs-6">${data.height}</p>
    </div>
    <hr>
    <div class="d-flex justify-content-between align-items-center">
        <h6 class="text-primary fs-6">Peso (Hectogramos)</h6>
        <p class="text-dark fs-6">${data.weight}</p>
    </div>
    <hr>
    <div class="d-flex justify-content-between align-items-center">
        <h6 class="text-primary fs-6">Especie</h6>
        <p class="text-dark fs-6">${data.species.name}</p>
    </div>
    <hr>
    <div class="d-flex justify-content-between align-items-center">
        <h6 class="text-primary fs-6">Slot y Tipos</h6>
    `
    console.log(data.game_indices);
    let game_indices = "<ul class='list-group list-group-numbered'>";
    for (let index = 0; index < data.types.length; index++) {
        game_indices += `<li class='text-end'>${data.types[index].slot} ${data.types[index].type.name}</li>`
    }
    game_indices += "</ul>"
    imagenes += game_indices + `</div><hr>
        <div class="d-flex justify-content-between align-items-center">
        <h6 class="text-primary fs-6">Lista de Elementos</h6>
    `
    let elementos = "<ul class='list-group list-group-numbered'>";
    if (!data.held_items.length) {
        elementos += "Ninguno";
    } else {
        for (let index = 0; index < data.held_items.length; index++) {
            elementos += `<li class='text-end'>${data.held_items[index].item.name}</li>`
        }
    }
    elementos += "</ul>"
    imagenes += elementos + `</div><hr>`
    modal.getElementsByClassName("modal-body")[0].innerHTML = imagenes;
    let skills = ``
    for (let index = 0; index < data.abilities.length; index++) {
        skills += `<li>${data.abilities[index].ability.name} </li>`
    }
    item.getElementsByTagName("ol")[0].innerHTML = skills;
}