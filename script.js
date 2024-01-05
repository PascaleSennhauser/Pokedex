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
    document.getElementById('bodyPart').innerHTML += renderPokemonInfoTemplate(i);
    renderTypesSmall(i);
    backgroundColor(i);
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
    currentPokedex.classList.add(`${firstType}`);
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
        emptySearchInput();
    } else {
        activeSearchInput(search, foundPokemonIndex);
    }
}


function emptySearchInput() {
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
}


function activeSearchInput(search, foundPokemonIndex) {
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


function pokedexBig(i) {
    currentPokemon = allPokemons[i-1];
    let pokedexBig = document.getElementById('pokedexBig');
    pokedexBig.classList.remove('d-none');
    pokedexBig.innerHTML = renderPokedexBigTemplate(i);
    backgroundColorBig(i);
    updateButtonVisibility(i);
    renderTypesBig(i);
    showAbout(i);
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
    getButtonAndContainerVariable();
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


function getButtonAndContainerVariable() {
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const nextPrevContainer = document.getElementById('nextPrevContainer');
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
    currentPokedex.classList.add(`${firstType}`);
}


function formatNumberWeightHeight(num) {
    let formattedNumber = num / 10;
    return formattedNumber;
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
    let evolutionURL = `${currentSpecie['evolution_chain']['url']}`;
    let responseEvolution = await fetch(evolutionURL);
    let evolutionChain = await responseEvolution.json();
    getEvolution(evolutionChain, i);
}


async function getEvolution(evolutionChain, i) {
    tryAndCatchEvolutionOne(evolutionChain, i);
    tryAndCatchEvolutionTwo(evolutionChain, i);
    tryAndCatchEvolutionThree(evolutionChain, i);
}


async function tryAndCatchEvolutionOne(evolutionChain, i) {
    try {
        let evolutionOne = evolutionChain['chain']['species']['name'];
        console.log(evolutionOne);
        await getImg(evolutionOne, i);
    } catch (error) {
    }
}


async function tryAndCatchEvolutionTwo(evolutionChain, i) {
    try {
        let evolutionTwo = evolutionChain['chain']['evolves_to']['0']['species']['name'];
        console.log(evolutionTwo);
        await getImg(evolutionTwo, i);
    } catch (error) {
    }
}


async function tryAndCatchEvolutionThree(evolutionChain, i) {
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
    infoBottom.innerHTML = renderShowAboutTemplate(i);
    loadEvolutionChain(i);
    document.getElementById('about').classList.add('text-underline');
    document.getElementById('baseStats').classList.remove('text-underline');
    document.getElementById('moves').classList.remove('text-underline');
}


function showMoves(i) {
    let infoBottom = document.getElementById(`infoBottom${i}`);
    infoBottom.innerHTML = `<section class="move-container" id="moveContainer"></section>`;
    let moveContainer = document.getElementById('moveContainer');
    let moves = currentPokemon['moves'];
    forLoopDifferentMoves(moveContainer, moves);
    document.getElementById('about').classList.remove('text-underline');
    document.getElementById('baseStats').classList.remove('text-underline');
    document.getElementById('moves').classList.add('text-underline');
}


function forLoopDifferentMoves(moveContainer, moves) {
    for (let j = 0; j < moves.length; j++) {
        moveContainer.innerHTML += /*html*/`
        <div class="move">${moves[j]['move']['name']}</div>
    `;
    }
}


function showBaseStats(i) {
    let infoBottom = document.getElementById(`infoBottom${i}`);
    infoBottom.innerHTML = `<canvas class="base-state-container" id="myChart"></section>`;
    let stats = currentPokemon['stats'];
    numbersStats = [];
    namesStats = [];
    forLoopFillingArrayStats(stats);
    renderchart();
    document.getElementById('about').classList.remove('text-underline');
    document.getElementById('baseStats').classList.add('text-underline');
    document.getElementById('moves').classList.remove('text-underline');
}


function forLoopFillingArrayStats(stats) {
    for (let j = 0; j < stats.length; j++) {
        let number = stats[j]['base_stat'];
        let name = stats[j]['stat']['name'];
        numbersStats.push(number);
        namesStats.push(name);
    }
}
