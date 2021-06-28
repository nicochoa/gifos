// Promise for trending themes
//let trendingThemes = document.getElementsByClassName('trending_themes_text')[0];
// let gifTrendingThemes ;
// let trending = new Promise ((resolve,reject) => {
//     for (let index = 0; index < 5; index++) {
//         const element = data[index].title;
//         resolve(trendingThemes.textContent = element);
//     }
//     reject("no llego nada");  
// })

hamMenu.addEventListener('click' , () => {
    menuContianer.classList.add('onsight');
    hamMenu.classList.add('not_displayed');
    closeMenu.classList.add('displayed_btn');
})
closeMenu.addEventListener('click', () => {
    menuContianer.classList.remove('onsight');
    closeMenu.classList.remove('displayed_btn');
    hamMenu.classList.remove('not_displayed');
})

if(! window.location.href.includes("/createGif.html")){
    createGif.addEventListener('mouseover', () => {
        if (localStorage.getItem('darkMode') == "true"){
            createGif.src = "./assets/CTA-crar-gifo-modo-noc.svg";
        }else{
            createGif.src = "./assets/CTA-crear-gifo-hover.svg";
        }
    });
    createGif.addEventListener('mouseleave', () => {
        if (localStorage.getItem('darkMode') == "true"){
            createGif.src = "./assets/CTA-crear-gifo-modo-noc.svg";
        }else{
            createGif.src = "./assets/button-crear-gifo.svg";
        }
    });
    createGif.addEventListener('click', () => {
        createGif.src = "./assets/CTA-crear-gifo-active-modo-noc.svg";
    });
}


// hamMenu.addEventListener('click' , (event) => {
//     if (event.target.src.indexOf("/assets/close.svg") !== -1) {
//         hamMenu.src = './assets/burger.svg';
//         menuContianer.classList.remove('onsight');
//     } else {
//         hamMenu.src = './assets/close.svg'
//         menuContianer.classList.add('onsight');
//     }
// })



