let currentCardIndex = 1;
let cards = 10;
let MAX_CARDS = 100;
let allPokemons = [];
let currentPokemon;
let numbersStats = [];
let namesStats = [];


async function loadPokemon() {
    for (let i = currentCardIndex; i <= cards; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemons.push(currentPokemon);
        renderPokemonInfo(i);
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


function renderPokemonInfo(i) {
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
    renderTypesSmall(i);
    backgroundColor(i);
    console.log(i);
}


function renderTypesSmall(i) {
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
            currentPokemon = allPokemons[i];
            let index = i+1;
            renderPokemonInfo(index);
        }
        if (cards == MAX_CARDS) {
            document.getElementById('btnLoadMore').style.display = 'none';
        } else {
            document.getElementById('btnLoadMore').style.display = 'unset';
        }
    } else {
        for (let i = 0; i < allPokemons.length; i++) {
            if (allPokemons[i]['name'].toLowerCase().includes(search)) {
                currentPokemon = allPokemons[i];
                let index = i+1;
                renderPokemonInfo(index);
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
                <div class="next-prev-container" id="nextPrevContainer">
                    <div class="btn-next-prev" id="btnPrev" onclick="prevPokedex(${i})">
                        <img src="./img/chevron-left-solid.svg">
                    </div>
                    <div class="btn-next-prev" id="btnNext" onclick="nextPokedex(${i})">
                        <img src="./img/chevron-right-solid.svg">
                    </div>
                </div>
                <span class="number-big">Nr. ${formatNumber(currentPokemon['id'])}</span>
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
                    <span onclick="showAbout(${i})">About</span>
                    <span onclick="showBaseState(${i})">Base State</span>
                    <span onclick="showMoves(${i})">Moves</span>
                </div>
                <section class="info-bottom" id="infoBottom${i}">
                </section>
            </div>
        </div>
    `;
    showAbout(i);
    updateButtonVisibility(i);
    renderTypesBig(i);
    backgroundColorBig(i);
}


function nextPokedex(i) {
    let index = i+1;
    pokedexBig(index);
}


function prevPokedex(i) {
    let index = i-1;
    pokedexBig(index);

}


function updateButtonVisibility(i) {
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const nextPrevContainer = document.getElementById('nextPrevContainer');
    btnPrev.classList.remove('d-none');
    btnNext.classList.remove('d-none');
    nextPrevContainer.style.justifyContent = 'space-between';
    if (i <= 1) {
        btnPrev.classList.add('d-none');
        nextPrevContainer.style.justifyContent = 'flex-end';
    }
    if (i == (currentCardIndex-1)) {
        btnNext.classList.add('d-none');
    }
}


function formatNumberWeightHeight(num) {
    let formattedNumber = num / 10;
    return formattedNumber;
}


function renderTypesBig(i) {
    let types = currentPokemon['types'];
    for (let j = 0; j < types.length; j++) {
        let type = types[j];
        document.getElementById(`typeContainer${i}`).innerHTML += /*html*/`
            <div class="btn-type">${type['type']['name']}</div>
        `;
    }
}


function backgroundColorBig(i) {
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
    try {
        let evolutionOne = evolutionChain['chain']['species']['name'];
        console.log(evolutionOne);
        await getImg(evolutionOne, i);
    } catch (error) {

    }

    try {
        let evolutionTwo = evolutionChain['chain']['evolves_to']['0']['species']['name'];
        console.log(evolutionTwo);
        await getImg(evolutionTwo, i);
    } catch (error) {

    }

    try {
        let evolutionThree = evolutionChain['chain']['evolves_to']['0']['evolves_to']['0']['species']['name'];
        console.log(evolutionThree);
        await getImg(evolutionThree, i);
    } catch (error) {

    }
}


async function getImg(name, i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${name}/`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    let img = currentPokemon['sprites']['other']['dream_world']['front_default'];
    renderEvolution(i, img, name);
}


function renderEvolution(i, img, name) {
        document.getElementById(`evolutionChain${i}`).innerHTML += `
            <span class="evolution-name"><b>${name}</b></span>
            <img src=${img} class="evolution-img">
        `;
}


function showAbout(i) {
    let infoBottom = document.getElementById(`infoBottom${i}`);
    infoBottom.innerHTML = /*html*/`
        <div class="description">
            <h2>Evolution</h2>
            <div class="evolution-chain-container" id="evolutionChain${i}">
        </div>
        </div>
            <div class="w-h-center">
            <div class="weight-height">
                <div class="w-h-container">
                    <span class="w-h-title">Weigth</span>
                    <span>${formatNumberWeightHeight(currentPokemon['weight'])} kg</span>
                </div>
                <div class="w-h-container">
                    <span class="w-h-title">Height</span>
                    <span>${formatNumberWeightHeight(currentPokemon['height'])} m</span>
                </div>
            </div>
        </div>
    `;
    loadEvolutionChain(i);
}

function showMoves(i) {
    let infoBottom = document.getElementById(`infoBottom${i}`);
    infoBottom.innerHTML = `<section class="move-container" id="moveContainer"></section>`;
    let moveContainer = document.getElementById('moveContainer');
    let moves = currentPokemon['moves'];
    console.log(moves);
    for (let j = 0; j < moves.length; j++) {
        moveContainer.innerHTML += /*html*/`
        <div class="move">${moves[j]['move']['name']}</div>
    `;
    }
}


function showBaseState(i) {
    let infoBottom = document.getElementById(`infoBottom${i}`);
    infoBottom.innerHTML = `<canvas class="base-state-container" id="myChart"></section>`;
    let myChart = document.getElementById('myChart');
    let stats = currentPokemon['stats'];
    console.log(stats);
    numbersStats = [];
    namesStats = [];
    for (let j = 0; j < stats.length; j++) {
        let number = stats[j]['base_stat'];
        let name = stats[j]['stat']['name'];
        console.log(number);
        console.log(name);
        numbersStats.push(number);
        namesStats.push(name);
    }
    renderchart();
}