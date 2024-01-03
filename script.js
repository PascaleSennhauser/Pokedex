let currentCardIndex = 1;
let cards = 10;
let MAX_CARDS = 100;
let allPokemons = [];
let currentPokemon;
let evolutionImgArray = [];


async function loadPokemon() {
    for (let i = currentCardIndex; i <= cards; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        currentPokemon = await response.json();
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
    <div class="pokedex-small" id="pokedexSmall${i}" onclick="pokedexBig(${i})">
        <div class="name-number-container">
            <h1 id="pokemonName" class="pokemon-name-small">${currentPokemon['name']}</h1>
            <span id="number" class="number-small">Nr. ${formatNumber(currentPokemon['id'])}</span>
        </div>
        <img src=${currentPokemon['sprites']['other']['dream_world']['front_default']} class="img-small">
        <div class="typ-container-small" id="typContainerSmall${i}">
        </div>
    </div>
    `;
    renderTypesSmall(i, currentPokemon);
    backgroundColor(i, currentPokemon);
    console.log(i);
}


function renderTypesSmall(i, currentPokemon) {
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
        if (cards == MAX_CARDS) {
            document.getElementById('btnLoadMore').style.display = 'none';
        } else {
            document.getElementById('btnLoadMore').style.display = 'unset';
        }
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


function pokedexBig(i) {
    currentPokemon = allPokemons[i-1];
    let pokedexBig = document.getElementById('pokedexBig');
    pokedexBig.classList.remove('d-none');
    pokedexBig.innerHTML = /*html*/`
        <div class="pokedex-card" onclick="doNotClose(event)">
            <div class="card-header">
                <div class="btn-next-prev">
                    <img src="./img/chevron-left-solid.svg">
                </div>
                <span class="number-big">Nr. ${formatNumber(currentPokemon['id'])}</span>
                <div class="btn-next-prev">
                    <img src="./img/chevron-right-solid.svg">
                </div>
            </div>
            <div class="top" id="top${i}">
                <div class="top-info">
                    <span class="name-big">${currentPokemon['name']}</span>
                    <div class="type-container" id="typeContainer${i}">
                    </div>
                </div>
                <img class="top-img" src=${currentPokemon['sprites']['other']['dream_world']['front_default']}>
            </div>

            <div class="bottom">
                <div class="header-bottom">
                    <span>About</span>
                    <span>Base State</span>
                    <span>Moves</span>
                </div>
                <section class="info-bottom">
                    <div class="description">
                        <h2>Evolution</h2>
                        <div class="evolution-chain-container" id="evolutionChain${i}">
                        </div>
                    </div>
                    <div class="w-h-center">
                        <div class="weight-height">
                            <div class="w-h-container">
                                <span class="w-h-title">Weigth</span>
                                <span>2.5 lbs (10 kg)</span>
                            </div>
                            <div class="w-h-container">
                                <span class="w-h-title">Height</span>
                                <span>2.5 inch (10cm)</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `;

    renderTypesBig(i, currentPokemon);
    backgroundColorBig(i, currentPokemon);
    loadEvolutionChain(i);
}


function renderTypesBig(i, currentPokemon) {
    let types = currentPokemon['types'];
    for (let j = 0; j < types.length; j++) {
        let type = types[j];
        document.getElementById(`typeContainer${i}`).innerHTML += /*html*/`
            <div class="btn-type">${type['type']['name']}</div>
        `;
    }
}


function backgroundColorBig(i, currentPokemon) {
    let firstType = currentPokemon['types'][0]['type']['name'];
    let currentPokedex = document.getElementById(`top${i}`);
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


function closePokedexBig() {
    let pokedexBig = document.getElementById('pokedexBig');
    pokedexBig.classList.add('d-none');
}

function doNotClose(event) {
    event.stopPropagation();
}

async function loadEvolutionChain(i) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;
    let response = await fetch(url);
    let currentSpecie = await response.json();
    console.log(currentSpecie);
    let evolutionURL = `${currentSpecie['evolution_chain']['url']}`;
    let responseEvolution = await fetch(evolutionURL);
    let evolutionChain = await responseEvolution.json();
    console.log(evolutionChain);
    getEvolution(evolutionChain, i);
}


async function getEvolution(evolutionChain, i) {
    evolutionImgArray = [];
    let evolutionOne = evolutionChain['chain']['species']['name'];
    console.log(evolutionOne);
    await getImg(evolutionOne);
    let evolutionTwo = evolutionChain['chain']['evolves_to']['0']['species']['name'];
    console.log(evolutionTwo);
    await getImg(evolutionTwo);
    let evolutionThree = evolutionChain['chain']['evolves_to']['0']['evolves_to']['0']['species']['name'];
    console.log(evolutionThree);
    await getImg(evolutionThree);

    renderEvolution(i);
}


async function getImg(name) {
    let url = `https://pokeapi.co/api/v2/pokemon/${name}/`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    let img = currentPokemon['sprites']['other']['dream_world']['front_default'];
    evolutionImgArray.push(img);
    return img;
}


function renderEvolution(i) {
    for (let j = 0; j < evolutionImgArray.length; j++) {
        const img = evolutionImgArray[j];
        document.getElementById(`evolutionChain${i}`).innerHTML += `
            <img src=${img} class="evolution-img">
        `;
    }
}
