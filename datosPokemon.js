const d=document;
const consultarPokemon= (id,number) =>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((result) => {
      return result.json()  
    })
    .then((data)=>{
        console.log(data);
        pintarPokemon(data,number)
    })
    .catch(error => {
        console.log(error);
    })
}


const pintarPokemon=(data,id)=>{
    let item= d.getElementById(`pok-img-${id}`)
    let habilidades= d.getElementById(`pok-hab-${id}`)
    let name=d.getElementById(`pok-name-${id}`)
    name.innerHTML=data.name.toUpperCase()
    item.setAttribute("src",data.sprites.front_default)
    let poke1=""
    for (let index = 0; index < data.abilities.length; index++) {
        poke1+=`<li>${data.abilities[index].ability.name} </li>`
    }
    console.log(poke1);
    habilidades.innerHTML=poke1;
}

const btnSeleccionar = ()=>{
    let primerPokemon= Math.round(Math.random()*150)
    let segundoPokemon= Math.round(Math.random()*150)
    consultarPokemon(primerPokemon,1)
    consultarPokemon(segundoPokemon,2)
}

var boton=d.getElementById("seleccionar");
boton.addEventListener("click",btnSeleccionar)


