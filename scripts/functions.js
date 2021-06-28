// darck mode funtions

function setDarkMode(){
    try {
        if(window.location.pathname !== "/pages/createGif.html"){
            createGif.src = "./assets/CTA-crear-gifo-modo-noc.svg";
        }
        darkModeBtn.textContent = 'MODO DIURNO';
        page.classList.add('darkModeClass');
        gifosLogo.src = "./assets/logo-mobile-modo-noct.svg";
        hamMenu.src = "./assets/burger-modo-noct.svg"
        closeMenu.src = "./assets/close-modo-noct.svg"
        close.src = "./assets/Button-close-modo-noc.svg";
        nextPage.src = "./assets/button-slider-right-md-noct.svg";
        prevPage.src = "./assets/button-slider-left-md-noct.svg";   
    } catch (error) {
        console.log('Algunos elementos a cambiar no se encuentran en esta pagina 😱', error)
    }
}

function removeDarkMode(){
    try {
        if(window.location.pathname !== "/pages/createGif.html"){
            createGif.src = "./assets/button-crear-gifo.svg";
        }
        darkModeBtn.textContent = 'MODO NOCTURNO';
        page.classList.remove('darkModeClass');
        gifosLogo.src = "./assets/logo-mobile.svg";
        hamMenu.src = "./assets/burger.svg";
        closeMenu.src = "./assets/close.svg";
        close.src = "./assets/close.svg";
        nextPage.src = "./assets/Button-Slider-right.svg";
        prevPage.src = "./assets/button-slider-left.svg";
        
    } catch (error) {
        console.log('Algunos elementos a cambiar no se encuentran en esta pagina 😱', error);
    }
}

function isDark (){
    if( localStorage.getItem('darkMode') == 'true'){
        setDarkMode();
    }else{
        localStorage.setItem('darkMode' , 'false')
    }
}

// fav funtions

let loadGifs = async (key , gifIds) => {
    try{
        let url = `https://api.giphy.com/v1/gifs?api_key=${key}&ids=${gifIds}`;
        const response = await fetch(url);
        const data = await response.json();
        return data ;
    }catch(err){
        console.log(err)
    }
}

function showStorage(section , container , viewMoreBtn){  
    
    for (let index = (12*(resultsCount+1))-12; index < 12*(resultsCount+1) && index<JSON.parse(localStorage.getItem(section)).length; index++) {
        
        let element = JSON.parse(localStorage.getItem(section))[index]
        loadGifs(searchKey, element).then((jsonResults) => {
            let result = document.createElement('div');
            result.className = "gif_results";
            container.appendChild(creatingGifContainer(jsonResults, 0, result , section));
            enoughForViewMore(section , container , viewMoreBtn);
        });    
    }

}

function enoughForViewMore (section , container, viewMoreBtn){
    if (JSON.parse(localStorage.getItem(section)).length == container.childNodes.length || JSON.parse(localStorage.getItem(section)).length <= 12){
        viewMoreBtn.classList.remove('onsight');
    } else{
        viewMoreBtn.classList.add('onsight');
    }
}




// pop up scripts

function popGif (jsonResults , index){
    let popUp = document.createElement('div');
    popUp.className= 'pop_img';
    
    let close = document.createElement('img');
    close.id = "close";
    close.className = 'icon'
    close.src = "./assets/close.svg";
    popUp.appendChild(close);
    closeGif(close);
    
    let openGif = document.createElement('img');
    openGif.className = "open-gif"
    openGif.src = jsonResults.data[index].images.downsized.url;
    popUp.appendChild(openGif);
    
    popUp.appendChild(userTitleGif(jsonResults, index));

    popUp.appendChild(buttonsGif (jsonResults, index));

    document.body.insertBefore(popUp , document.body.childNodes[0]);

    popUp.classList.toggle('show-pop-up')
}

function buttonsGif (jsonResults, index , section=null){
    let gifBtns = document.createElement('div');
    gifBtns.className = "gif-btns";
    if (section == 'misgifos'){
        let btnTrash = document.createElement('img');
        btnTrash.src = "./assets/icon-trash-normal.svg";
        btnTrash.className = "icon";
        btnTrash.addEventListener('mouseover', () => {
            btnTrash.src = "./assets/icon-trash-hover.svg";
        });
        btnTrash.addEventListener('mouseleave', () => {
            btnTrash.src = "./assets/icon-trash-normal.svg";
        });
        btnTrash.addEventListener('click' , () => {
            let myGifosIds = JSON.parse(localStorage.getItem('misgifos')) || [];
            myGifosIds.splice(myGifosIds.indexOf(`${jsonResults.data[index].id}`) , 1)
            localStorage.setItem('misgifos' , JSON.stringify(myGifosIds));
            checkingStorage ('misgifos');
            resetContainer(myGifosContainer);
            showStorage('misgifos' , myGifosContainer);
        });
        gifBtns.appendChild(btnTrash);
    } else {
        
        let btnFav = document.createElement('img');
        btnFav.src = "./assets/icon-fav.svg";
        let  favoIds = JSON.parse(localStorage.getItem('favorito')) || []
        if(favoIds.includes(jsonResults.data[index].id)){
            btnFav.src = "./assets/icon-fav-active.svg";
        }else{
            btnFav.src = "./assets/icon-fav.svg";
        }
        btnFav.className = "icon";
        addFav(btnFav , jsonResults , index);
        
        gifBtns.appendChild(btnFav);
    }
    
    let btnDownload = document.createElement('img');
    btnDownload.src = "./assets/icon-download.svg";
    btnDownload.className = "icon";
    btnDownload.addEventListener('click' , () => {download(jsonResults.data[index].images.downsized.url , jsonResults.data[index].title)});
    btnDownload.addEventListener('mouseover', () => {
        btnDownload.src = "./assets/icon-download-hover.svg";
    });
    btnDownload.addEventListener('mouseleave', () => {
        btnDownload.src = "./assets/icon-download.svg";
    });

    gifBtns.appendChild(btnDownload);
    return gifBtns;
}
function checkingStorage (section , container , viewmore){
    if (JSON.parse(localStorage.getItem(section)) == null || JSON.parse(localStorage.getItem(section)).length == 0 ){
        emptyContainer.classList.add('onsight');
    } else{
        emptyContainer.classList.remove('onsight');
        showStorage(section , container , viewmore)
    }
}
function userTitleGif(jsonResults, index){
    let gifInfo = document.createElement('div');
    gifInfo.className = "gif-info";
    let user = document.createElement('p');
    user.textContent = jsonResults.data[index].username;
    let gifoTitle = document.createElement('p');
    gifoTitle.className = "gifo-title"
    gifoTitle.textContent = jsonResults.data[index].title;
    gifInfo.appendChild(user);
    gifInfo.appendChild(gifoTitle);
    return gifInfo;
}


function closeGif (close){
    close.addEventListener('click' , (event) => {
        event.target.parentElement.remove();
    })
}

function addFav (btnFav , jsonResults , index){
    
    btnFav.addEventListener('mouseover', () => {
        if(btnFav.src.includes("/assets/icon-fav.svg")){
            btnFav.src = "./assets/icon-fav-hover.svg";
        }
    });
    btnFav.addEventListener('mouseleave', () => {
        if(btnFav.src.includes("/assets/icon-fav-hover.svg")){
            btnFav.src = "./assets/icon-fav.svg";
        }
    });

    
    btnFav.addEventListener('click' , (event) => {
        try{

            let favIds = JSON.parse(localStorage.getItem('favorito')) || [];
            if(btnFav.src.includes("/assets/icon-fav-hover.svg")){
                btnFav.src = "./assets/icon-fav-active.svg";
                favIds.push(`${jsonResults.data[index].id}`);
                localStorage.setItem('favorito' , JSON.stringify(favIds));
                // localStorage.setItem( `${jsonResults.data[index].id}` , 'favorito');
                resetContainer(favContainer);
                resultsCount = 0;
                checkingStorage('favorito', favContainer , viewMoreFav);
            }else {
                favIds.splice(favIds.indexOf(`${jsonResults.data[index].id}`) , 1)
                localStorage.setItem('favorito' , JSON.stringify(favIds));
                btnFav.src = "./assets/icon-fav-hover.svg";
                resetContainer(favContainer);
                checkingStorage('favorito', favContainer , viewMoreFav);
            } 
        }catch(err){
            console.log ('no estas en Favoritos 😵' , err)
        }
    })
}



function resetContainer (container){
        if (container.children.length !== 0) {
            do {
                container.removeChild(container.lastElementChild);
            } while (container.children.length > 0);
        }
}


async function download ( file , fileName){
        const image = await fetch(file);
        const imageBlob = await image.blob();
        const imageURL = URL.createObjectURL(imageBlob);

        const link = document.createElement('a');
        link.href = imageURL;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
}

// search scripts

let suggestions = async (search) => {
    try{
        let url = `https://api.giphy.com/v1/tags/related/{${search.value}}?api_key=${searchKey}`;
        const response = await fetch(url);
        const data = await response.json();
        return data ;
    }catch(err){
        console.log(err)
    }
}

function showSuggestions (jsonResults){
    for (let index = 0; index < 4; index++) {
        let searchSuggestion = document.createElement('div');
        searchSuggestion.className = "search-suggestion";
        let img = document.createElement('img');
        img.className = "search-bar-logo visible";
        img.src  = "./assets/icon-search-grey.svg";
        let span = document.createElement('span');
        span.textContent = jsonResults.data[index].name;
        searchSuggestion.appendChild(img);
        searchSuggestion.appendChild(span);
        suggestionsCont.appendChild(searchSuggestion);

        searchSuggestion.addEventListener('click', (event) => {
            document.getElementById('user_search').value = jsonResults.data[index].name;
            getGifs(event);
            btnCloseSearch.classList.add('displayed_btn');
            suggestionsCont.classList.remove('diplayB');
            searchDivision.classList.remove('diplayB');
        })
    }
}

function getGifs(event) {
    searchResults.classList.add('onsight');
    console.log("btn Search clicked");
    suggestionsCont.classList.remove('diplayB');
    searchDivision.classList.remove('diplayB');
    resultsCount = 0;
    event.preventDefault();
    if (resultsContainer.children.length !== 0) {
        do {
            resultsContainer.removeChild(resultsContainer.lastElementChild);
        } while (resultsContainer.children.length > 0);
    }
    
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${searchKey}&q=`
    userSearch = document.getElementById('user_search').value;
    url = url.concat(userSearch);
    let resultTitle = document.getElementsByClassName('result_title')[0];
    resultTitle.textContent = userSearch;
    // evaluating input of the search  to determine action over input
    if (userSearch.toLowerCase() == "lorem ipsum" || userSearch == "") {
        loremIpsum(userSearch);
    } else {
        viewMore.classList.toggle('onsight'); 
        resultCall(url).then( jsonResults => {
            showingResults(jsonResults, 12);
            search = jsonResults;
        })
        
    }  
}


// special result for lorem ipsum and blank/empty inputs
function loremIpsum (loremText) {
    let searchResult = document.createElement('img');
    searchResult.src = './assets/icon-busqueda-sin-resultado.svg';
    searchResult.className = "gif_results";
    let loremDescription = document.createElement('p');
    loremDescription.textContent = "Intenta con otra búsqueda.";
    loremDescription.className = "lorem-ipsum";
    resultsContainer.appendChild(searchResult);
    resultsContainer.appendChild(loremDescription);
}


// Promise for API search call 
let resultCall = async (url) => {
    try{
        let response = await fetch(url);
        let jsonResults = response.json();
        return jsonResults;
        
    } catch (err) {
        console.error(err)
    }
}

// making visible in the DOM de call results 
function showingResults (jsonResults , packets){
    for (let index = (packets*(resultsCount+1))-packets; index < packets*(resultsCount+1); index++) {
        let result = document.createElement('div');
        result.className = "gif_results";
        resultsContainer.appendChild(creatingGifContainer(jsonResults, index, result));
    }
}
function creatingGifContainer (jsonResults, index, container, section=null){
    let gifImg = document.createElement('img');
    gifImg.src = jsonResults.data[index].images.downsized.url;
    
    let hovImg = document.createElement('div');
    hovImg.className = "over-gifs";
    let btnsDiv = buttonsGif (jsonResults, index , section);
    btnsDiv.classList.add('over-gifs-btns');
    let gifInfo = userTitleGif(jsonResults, index);
    gifInfo.className='over-gifs-info';//// cambie esto , antes era classList envez de className
    let expandGif = document.createElement('img');
    expandGif.className = "icon";
    expandGif.src = "./assets/icon-max-normal.svg";

    btnsDiv.appendChild(expandGif);
    hovImg.appendChild(btnsDiv);
    hovImg.appendChild(gifInfo);

    expandGif.addEventListener('mouseover', () => {
        expandGif.src = "./assets/icon-max-hover.svg";
    });
    expandGif.addEventListener('mouseleave', () => {
        expandGif.src = "./assets/icon-max-normal.svg";
    });
    expandGif.addEventListener('click', () =>popGif(jsonResults, index));

    container.appendChild(gifImg);
    container.appendChild(hovImg);

    gifImg.addEventListener('click' , (event) => {
        event.stopPropagation();
        popGif(jsonResults, index)
    }, true)
    
    container.addEventListener('mouseenter', () => {
        if (window.matchMedia('(pointer : fine)').matches){
            hovImg.classList.add("onsight");
        }
    });
    container.addEventListener('mouseleave', () => {
        hovImg.classList.remove("onsight");;
    });
    return container;
    
    
}


// trending scripts

//get Trending Gifs
function getTrendingGifs(url) {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            showingTrending(json , 8 , trendingCount);
        }).catch(err => {
            console.error('no hay trending', err);
        });
}



function showingTrending (json , packets , resultsCount){
    for (let index = (packets*(resultsCount+1))-packets; index < packets*(resultsCount+1); index++) {
        let newGifResult = document.createElement('div');
        // newGifResult.src = json.data[index].images.downsized.url;
        newGifResult.className = "trending_gif_container";
        trendingGifs.appendChild(creatingGifContainer(json, index, newGifResult)); 
        // newGifResult.addEventListener('click' , () => popGif(json, index))
    }
}

// Promise for trending themes
function getTrendingThemes(url) {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            for (let index = 0; index < 5; index++) {
                let theme = document.createElement('p');
                theme.textContent= "|  "+json.data[index][0].toUpperCase()+json.data[index].slice(1) +"  |";
                theme.addEventListener('click' , (event) => {
                    document.getElementById('user_search').value = json.data[index];
                    getGifs(event);
                    btnCloseSearch.classList.add('displayed_btn');
                })
                trendingThemes.appendChild(theme);
            }
        }).catch(err => {
            console.error('no hay trending themes en esta pagina', err);
        });
}

