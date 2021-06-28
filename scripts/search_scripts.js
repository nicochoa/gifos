
btnSearch.addEventListener('click', getGifs);
btnCloseSearch.addEventListener('click' , (event) => {
    event.preventDefault();// prevents the page to be reload on event
    document.getElementById('user_search').value = '';
    searchResults.classList.remove('onsight');
    btnCloseSearch.classList.remove('displayed_btn');
    suggestionsCont.classList.remove('diplayB');
    searchDivision.classList.remove('diplayB');
    searchLogo.forEach(element => {
        element.classList.remove('visible');
    });
    if (userSearch !== "" || userSearch.toLowerCase() === "lorem ipsum"){
        viewMore.classList.remove('onsight');
    }
    
    if (resultsContainer.children.length !== 0) {
        do {
            resultsContainer.removeChild(resultsContainer.lastElementChild);
        } while (resultsContainer.children.length > 0);
    }
})


userSearch.addEventListener('input', event => {
    if (suggestionsCont.children.length !== 0) {
        do {
            suggestionsCont.removeChild(suggestionsCont.lastElementChild);
        } while (suggestionsCont.children.length > 0);
    }
    if (document.getElementById('user_search').value !== "" ){
        suggestionsCont.classList.add('diplayB');
        searchDivision.classList.add('diplayB');
        suggestions(event.target).then(( jsonResults) =>{
            showSuggestions(jsonResults);
        })
        btnCloseSearch.classList.add('displayed_btn');
        searchLogo.forEach(element => {
            element.classList.add('visible');
        });
    }else{
        suggestionsCont.classList.remove('diplayB');
        searchDivision.classList.remove('diplayB');
        btnCloseSearch.classList.remove('displayed_btn');
        searchLogo.forEach(element => {
            element.classList.remove('visible');
        });
    }
})
userSearch.addEventListener('keydown' , (event) => {
    if (event.key == 'Enter') {
        event.preventDefault();
        btnSearch.click();
        suggestionsCont.classList.remove('diplayB');
        searchDivision.classList.remove('diplayB');

    }
})

// event for "Ver mas" button
viewMore.addEventListener('click', event => {
    resultsCount ++;
    let url = `http://api.giphy.com/v1/gifs/search?api_key=${searchKey}&q=`
    let userSearch = document.getElementById('user_search').value;
    url = url.concat(userSearch);
    resultCall(url).then( jsonResults => {
            showingResults(jsonResults , 12);
        })
        .catch ( error => {
            if (resultsContainer.children.length == 50) viewMore.classList.remove('onsight');
            console.error('no more GIFs ', error);
        })
})


