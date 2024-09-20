let currentCardIndex = 1;
let cards = 10;
let MAX_CARDS = 100;
let allPokemons = [];
let currentPokemon;
let numbersStats = [];
let namesStats = [];


/**
 * This async function loads the pokemon from the pokemon-API.
 */
async function loadPokemon() {
    document.getElementById('btnLoadMore').style.display = 'none';
    try {
        await forLooploadCards();
    } catch (error) {
    }
    if (cards < MAX_CARDS) {
        document.getElementById('btnLoadMore').style.display = 'unset';
    }
}


/**
 * This function loads fetches the API and renders the cards.
 */
async function forLooploadCards() {
    for (let i = currentCardIndex; i <= cards; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemons.push(currentPokemon);
        renderPokemonInfo(i);
        currentCardIndex++;
    }
}


/**
 * This function loads 10 more cards.
 */
function loadMoreCards() {
    cards += 10;
    if (cards >= MAX_CARDS) {
        cards = MAX_CARDS;
        loadPokemon();
    } else {
        loadPokemon();
    }
}


/**
 * This runction renders a small pokemon-card.
 * @param {Number} i - The index of the card.
 */
function renderPokemonInfo(i) {
    document.getElementById('bodyPart').innerHTML += renderPokemonInfoTemplate(i);
    renderTypesSmall(i);
    backgroundColor(i);
}


/**
 * This function renders the types of the pokemon in the pokemon-card.
 * @param {Number} i - The index of the card.
 */
function renderTypesSmall(i) {
    let types = currentPokemon['types'];
    for (let j = 0; j < types.length; j++) {
        let type = types[j];
        document.getElementById(`typContainerSmall${i}`).innerHTML += /*html*/`
            <div class="btn-type">${type['type']['name']}</div>
        `;
    }
}


/**
 * This function renders the background color according to the type of the pokemon.
 * @param {Number} i - The index of the card.
 */
function backgroundColor(i) {
    let firstType = currentPokemon['types'][0]['type']['name'];
    let currentPokedex = document.getElementById(`pokedexSmall${i}`);
    currentPokedex.classList.add(`${firstType}`);
}


/**
 * This function formats the number to four digits.
 * @param {Number} num - The number of the pokemon.
 * @returns The formatted number to four digits.
 */
function formatNumber(num) {
    let formattedNumber = num.toString();
    while (formattedNumber.length < 4) {
        formattedNumber = '0' + formattedNumber;
    }
    return formattedNumber;
}


/**
 * This function filters the pokemons from the search-input in the input-field.
 */
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


/**
 * This function is invoked, when the search input is empty.
 */
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


/**
 * This function is invoked, when the search input is active.
 * @param {String} search - The value of the search-input.
 * @param {Number} foundPokemonIndex - The index of the found pokemons, currently -1.
 */
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


/**
 * This function shows the pokemon-card in big as a popup.
 * @param {Number} i - The index of the pokemon-card. 
 */
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


/**
 * This function shows the next pokemon, when you click on the specific sign.
 * @param {Number} i - The index of the current pokemon-card.
 */
function nextPokedex(i) {
    let index = i+1;
    pokedexBig(index);
}


/**
 * This function shows the previous pokemon, when you click on the specific sign.
 * @param {Number} i - The index of the current pokemon-card. 
 */
function prevPokedex(i) {
    let index = i-1;
    pokedexBig(index);

}


/**
 * This function updates the visibility of the next and previous button, if it's the first or last pokemon-card.
 * @param {Number} i - The index of the pokemon-card.
 */
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


/**
 * This function gets all the html-elements of the next and previous button, as well as the nextPrevContainer.
 */
function getButtonAndContainerVariable() {
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const nextPrevContainer = document.getElementById('nextPrevContainer');
}


/**
 * This function renders the types of the pokemon in the pokemon-popup-card.
 * @param {Number} i - The index of the pokemon.
 */
function renderTypesBig(i) {
    let types = currentPokemon['types'];
    for (let j = 0; j < types.length; j++) {
        let type = types[j];
        document.getElementById(`typeContainer${i}`).innerHTML += /*html*/`
            <div class="btn-type">${type['type']['name']}</div>
        `;
    }
}


/**
 * This function renders the background color of the pokemon-popup-card according to the types.
 * @param {Number} i - The index of the pokemon.
 */
function backgroundColorBig(i) {
    let firstType = currentPokemon['types'][0]['type']['name'];
    let currentPokedex = document.getElementById(`top${i}`);
    currentPokedex.classList.add(`${firstType}`);
}


/**
 * This function formats the numbers of the weight and height in the pokedex-popup-card.
 * @param {Number} num - The weigth or height. 
 * @returns The formatted weigth or height.
 */
function formatNumberWeightHeight(num) {
    let formattedNumber = num / 10;
    return formattedNumber;
}


/**
 * This function closes the pokedex-popup-card.
 */
function closePokedexBig() {
    let pokedexBig = document.getElementById('pokedexBig');
    pokedexBig.classList.add('d-none');
}


/**
 * This function stops the closing-event on the popup-card, so you can close the popup-card by clicking next to the card.
 * @param {Event} event - The event object.
 */
function doNotClose(event) {
    event.stopPropagation();
}


/**
 * This function loads the evolution chain of a pokeomn.
 * @param {Number} i - The number of the pokemon.
 */
async function loadEvolutionChain(i) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;
    let response = await fetch(url);
    let currentSpecie = await response.json();
    let evolutionURL = `${currentSpecie['evolution_chain']['url']}`;
    let responseEvolution = await fetch(evolutionURL);
    let evolutionChain = await responseEvolution.json();
    getEvolution(evolutionChain, i);
}


/**
 * This function loads each evolution.
 * @param {Object} evolutionChain - The response with the information of the evolution from the API
 * @param {Number} i - The index of the pokemon.
 */
async function getEvolution(evolutionChain, i) {
    await tryAndCatchEvolutionOne(evolutionChain, i);
    await tryAndCatchEvolutionTwo(evolutionChain, i);
    await tryAndCatchEvolutionThree(evolutionChain, i);
}


/**
 * This function loads the first evolution.
 * @param {Object} evolutionChain - The response with the information of the evolution from the API.
 * @param {Number} i - The index of the pokemon.
 */
async function tryAndCatchEvolutionOne(evolutionChain, i) {
    try {
        let evolutionOne = evolutionChain['chain']['species']['name'];
        await getImg(evolutionOne, i);
    } catch (error) {
    }
}


/**
 * This function loads the second evolution.
 * @param {Object} evolutionChain - The response with the information of the evolution from the API.
 * @param {Number} i - The index of the pokemon.
 */
async function tryAndCatchEvolutionTwo(evolutionChain, i) {
    try {
        let evolutionTwo = evolutionChain['chain']['evolves_to']['0']['species']['name'];
        await getImg(evolutionTwo, i);
    } catch (error) {
    }
}


/**
 * This function loads the third evolution.
 * @param {Object} evolutionChain - The response with the information of the evolution from the API.
 * @param {Number} i - The index of the pokemon.
 */
async function tryAndCatchEvolutionThree(evolutionChain, i) {
    try {
        let evolutionThree = evolutionChain['chain']['evolves_to']['0']['evolves_to']['0']['species']['name'];
        await getImg(evolutionThree, i);
    } catch (error) {

    }
}


/**
 * This function gets the image of the evolution.
 * @param {String} name - The name of the evolution.
 * @param {Number} i - The index of the pokemon.
 */
async function getImg(name, i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${name}/`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    let img = currentPokemon['sprites']['other']['dream_world']['front_default'];
    await renderEvolution(i, img, name);
}


/**
 * This function renders the different evolutions.
 * @param {Number} i - The index of the pokemon.
 * @param {String} img - The image-source of the evolution.
 * @param {String} name - The name of the evolution.
 */
async function renderEvolution(i, img, name) {
        document.getElementById(`evolutionChain${i}`).innerHTML += `
            <span class="evolution-name"><b>${name}</b></span>
            <img src=${img} class="evolution-img">
        `;
}


/**
 * This function shows the about part in the popup-card.
 * @param {Number} i - The index of the pokemon. 
 */
function showAbout(i) {
    let infoBottom = document.getElementById(`infoBottom${i}`);
    infoBottom.innerHTML = renderShowAboutTemplate(i);
    loadEvolutionChain(i);
    document.getElementById('about').classList.add('text-underline');
    document.getElementById('baseStats').classList.remove('text-underline');
    document.getElementById('moves').classList.remove('text-underline');
}


/**
 * This function shows the moves part  in the popup-card.
 * @param {Number} i - The index of the pokemon. 
 */
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


/**
 * This function does the for-loop through the array of the different moves.
 * @param {HTMLElement} moveContainer - The HTML-element for the moves.
 * @param {Array} moves - The array with the different moves. 
 */
function forLoopDifferentMoves(moveContainer, moves) {
    for (let j = 0; j < moves.length; j++) {
        moveContainer.innerHTML += /*html*/`
        <div class="move">${moves[j]['move']['name']}</div>
    `;
    }
}


/**
 * This function shows the base stats.
 * @param {Number} i - The index of the pokemon. 
 */
function showBaseStats(i) {
    let infoBottom = document.getElementById(`infoBottom${i}`);
    infoBottom.innerHTML = `<div class="charts-container" id="chartsContainer"></div>`
    let chartsContainer = document.getElementById('chartsContainer');
    chartsContainer.innerHTML = `<canvas class="base-state-container" id="myChart"></section>`;
    let stats = currentPokemon['stats'];
    numbersStats = [];
    namesStats = [];
    forLoopFillingArrayStats(stats);
    renderchart();
    document.getElementById('about').classList.remove('text-underline');
    document.getElementById('baseStats').classList.add('text-underline');
    document.getElementById('moves').classList.remove('text-underline');
}


/**
 * This function shows the different stats.
 * @param {Array} stats - The array with the different stats. 
 */
function forLoopFillingArrayStats(stats) {
    for (let j = 0; j < stats.length; j++) {
        let number = stats[j]['base_stat'];
        let name = stats[j]['stat']['name'];
        numbersStats.push(number);
        namesStats.push(name);
    }
}
