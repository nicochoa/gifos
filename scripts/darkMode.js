
darkModeBtn.addEventListener('click' , (event) => {
    event.preventDefault();
    if(localStorage.getItem('darkMode') == "true"){
        localStorage.setItem('darkMode', 'false' );
        removeDarkMode();
        darkModeBtn.textContent = 'MODO NOCTURNO';
    } else {
        localStorage.setItem('darkMode', 'true' );
        setDarkMode();
        darkModeBtn.textContent = 'MODO DIURNO';
    }
})


window.onload = isDark();



