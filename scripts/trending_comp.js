

//getting the gifs images
trendingGifs.addEventListener('scroll', event =>{
    let pos = event.target.scrollLeft - (254 * trendingCount);
    if (250 <= (pos) && (pos) <= 300) {
        trendingCount++;
        getTrendingGifs(`https://api.giphy.com/v1/gifs/trending?api_key=${trendingKey}&limit=${8*(trendingCount+1)}`);
    }
})


getTrendingGifs(`https://api.giphy.com/v1/gifs/trending?api_key=${trendingKey}&limit=${8*(trendingCount+1)}`);
// // Promise for trending themes
// function getTrendingThemes(url) {
//     fetch(url)
//         .then(response => response.json())
//         .then(json => {
//             for (let index = 0; index < 5; index++) {
//                 let theme = document.createElement('p');
//                 theme.textContent= "|  "+json.data[index][0].toUpperCase()+json.data[index].slice(1) +"  |";
//                 theme.addEventListener('click' , (event) => {
//                     document.getElementById('user_search').value = json.data[index];
//                     getGifs(event);
//                     btnCloseSearch.classList.add('displayed_btn');
//                 })
//                 trendingThemes.appendChild(theme);
//             }
//         }).catch(err => {
//             console.error('no hay trending themes en esta pagina', err);
//         });
// }

// getTrendingThemes(`https://api.giphy.com/v1/trending/searches?api_key=${trendingKey}`);


nextPage.addEventListener('mouseover', () => {
    nextPage.src = "./assets/Button-Slider-right-hover.svg";
});
nextPage.addEventListener('mouseleave', () => {
    if (localStorage.getItem('darkMode') == "true"){
        nextPage.src = "./assets/button-slider-right-md-noct.svg";
    }else{
        nextPage.src = "./assets/Button-Slider-right.svg";
    }
});
nextPage.addEventListener('click', () => {
    trendingGifs.scrollLeft += 255;
});


prevPage.addEventListener('mouseover', () => {
    prevPage.src = "./assets/button-slider-left-hover.svg";
});
prevPage.addEventListener('mouseleave', () => {
    if (localStorage.getItem('darkMode') == "true"){
        prevPage.src = "./assets/button-slider-left-md-noct.svg";
    }else{
        prevPage.src = "./assets/button-slider-left.svg";
    }
});
prevPage.addEventListener('click', () => {
    trendingGifs.scrollLeft -= 255;
});