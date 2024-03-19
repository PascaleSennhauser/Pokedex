/**
 * This function renders the html-template of the small pokedex-card.
 * @param {Number} i - The index of the pokemon.
 * @returns The html-template of the pokedex-card gets returned.
 */
function renderPokemonInfoTemplate(i) {
    return /*html*/`
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
}


/**
 * This function renders the html-template of the big pokedex-popup-card.
 * @param {Number} i - The index of the pokemon.
 * @returns The html-template of the pokedex-popup-card gets returned.
 */
function renderPokedexBigTemplate(i) {
    return /*html*/`
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
                <img src="./img/circle-xmark-regular.svg" class="close-btn" onclick="closePokedexBig()">
            </div>
            <div class="top" id="top${i}">
                <div class="top-info">
                    <div class="number-name-container">
                        <span class="number-big">Nr. ${formatNumber(currentPokemon['id'])}</span>
                        <span class="name-big">${currentPokemon['name']}</span>
                    </div>
                    <div class="type-container" id="typeContainer${i}">
                    </div>
                </div>
                <img class="top-img" src=${currentPokemon['sprites']['other']['dream_world']['front_default']}>
            </div>

            <div class="bottom">
                <div class="header-bottom">
                    <span id="about" onclick="showAbout(${i})">About</span>
                    <span id="baseStats" onclick="showBaseStats(${i})">Base Stats</span>
                    <span id="moves" onclick="showMoves(${i})">Moves</span>
                </div>
                <section class="info-bottom" id="infoBottom${i}">
                </section>
            </div>
        </div>
    `;
}


/**
 * This function renders the html-template for the about-part in the pokedex-popup-card.
 * @param {Number} i - The index of the pokemon.
 * @returns The html-template for the about-part.
 */
function renderShowAboutTemplate(i) {
    return /*html*/`
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
}