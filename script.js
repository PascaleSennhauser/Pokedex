let pokemon = ['bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard', 'squirtle', 'wartortle', 'blastoise', 'caterpie', 'metapod', 'butterfree', 'weedle', 'kakuna', 'beedrill', 'pidgey', 'pidgeotto', 'pidgeot', 'rattata', 'raticate', 'spearow', 'fearow', 'ekans', 'arbok', 'pikachu', 'raichu'];
let currentPokemon;

async function loadPokemon() {
    for (let i = 0; i  < pokemon.length; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon[i]}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
    
        console.log('Loaded pokemon', currentPokemon);

        renderPokemonInfo(i);
    }

}


function renderPokemonInfo(i) {
    document.getElementById('bodyPart').innerHTML += /*html*/`
    <div class="pokedex-small" id="pokedexSmall${i}">
        <div class="name-number-container">
            <h1 id="pokemonName" class="pokemon-name-small">${currentPokemon['name']}</h1>
            <span id="number" class="number-small">Nr. ${formatNumber(currentPokemon['id'])}</span>
        </div>
        <img src=${currentPokemon['sprites']['other']['dream_world']['front_default']} class="img-small">
        <div class="typ-container-small" id="typContainerSmall${i}">
        </div>
    </div>
    `;
    renderTypes(i);
    backgroundColor(i);
}


function renderTypes(i) {
    let types = currentPokemon['types'];
    for (let j = 0; j < types.length; j++) {
        let type = types[j];
        document.getElementById(`typContainerSmall${i}`).innerHTML += /*html*/`
            <div class="btn-type">${type['type']['name']}</div>
        `;
    }
}


function backgroundColor(i) {
    let firstType = currentPokemon['types'][0]['type']['name'];
    let currentPokedex = document.getElementById(`pokedexSmall${i}`);
    if (firstType == 'grass') {
        currentPokedex.classList.add('grass');
    } else if (firstType == 'fire') {
        currentPokedex.classList.add('fire');
    } else if (firstType == 'water') {
        currentPokedex.classList.add('water');
    } else if (firstType == 'bug') {
        currentPokedex.classList.add('bug');
    } else if (firstType == 'normal') {
        currentPokedex.classList.add('normal');
    } else if (firstType == 'poison') {
        currentPokedex.classList.add('poison');
    } else if (firstType == 'electric') {
        currentPokedex.classList.add('electric');
    }
}


function formatNumber(num) {
    let formattedNumber = num.toString();
    while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
    }
    return formattedNumber;
}