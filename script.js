let currentCardIndex = 1;
let cards = 10;
let MAX_CARDS = 100;
let allPokemons = [];

async function loadPokemon() {
        for (let i = currentCardIndex; i <= cards; i++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
            let response = await fetch(url);
            let currentPokemon = await response.json();
            allPokemons.push(currentPokemon);      
            renderPokemonInfo(i, currentPokemon);
            currentCardIndex++;
            console.log(currentPokemon);
        }
}


function loadMoreCards() {
    cards += 10;
    if (cards >= MAX_CARDS) {
        cards = MAX_CARDS;
        loadPokemon();
        document.getElementById('btnLoadMore').style.display = 'none';
    } else {
        loadPokemon();
    }
}


function renderPokemonInfo(i, currentPokemon) {
    document.getElementById('bodyPart').innerHTML += /*html*/`
    <div class="pokedex-small" id="pokedexSmall${i}" onclick="pokedexBig()">
        <div class="name-number-container">
            <h1 id="pokemonName" class="pokemon-name-small">${currentPokemon['name']}</h1>
            <span id="number" class="number-small">Nr. ${formatNumber(currentPokemon['id'])}</span>
        </div>
        <img src=${currentPokemon['sprites']['other']['dream_world']['front_default']} class="img-small">
        <div class="typ-container-small" id="typContainerSmall${i}">
        </div>
    </div>
    `;
    renderTypes(i, currentPokemon);
    backgroundColor(i, currentPokemon);
}


function renderTypes(i, currentPokemon) {
    let types = currentPokemon['types'];
    for (let j = 0; j < types.length; j++) {
        let type = types[j];
        document.getElementById(`typContainerSmall${i}`).innerHTML += /*html*/`
            <div class="btn-type">${type['type']['name']}</div>
        `;
    }
}


function backgroundColor(i, currentPokemon) {
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
    } else if (firstType == 'ground') {
        currentPokedex.classList.add('ground');
    } else if (firstType == 'fairy') {
        currentPokedex.classList.add('fairy');
    } else if (firstType == 'fighting') {
        currentPokedex.classList.add('fighting');
    } else if (firstType == 'psychic') {
        currentPokedex.classList.add('psychic');
    } else if (firstType == 'rock') {
        currentPokedex.classList.add('rock');
    } else if (firstType == 'ghost') {
        currentPokedex.classList.add('ghost');
    }
}


function formatNumber(num) {
    let formattedNumber = num.toString();
    while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
    }
    return formattedNumber;
}


function filterNames() {
    let search = document.getElementById('pokemonInput').value.toLowerCase();
    let bodyPart = document.getElementById('bodyPart');
    bodyPart.innerHTML = '';

    let foundPokemonIndex = -1;

    if (search == '') {
        for (let i = 0; i < allPokemons.length; i++) {
            renderPokemonInfo(i, allPokemons[i]);
        }
        document.getElementById('btnLoadMore').style.display = 'unset';
    } else {
        for (let i = 0; i < allPokemons.length; i++) {
            if (allPokemons[i]['name'].toLowerCase().includes(search)) {
                renderPokemonInfo(i, allPokemons[i]);
                foundPokemonIndex = i;
            }
        }
        if (foundPokemonIndex == -1) {
            bodyPart.innerHTML = `<span class="no-search"><b>Es git kein Pokémon mit diesem/n Buchstabe/n...</b></span>`;
        }
        document.getElementById('btnLoadMore').style.display = 'none';
    }
}


function pokedexBig() {

}