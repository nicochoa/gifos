start.addEventListener('click', () => {

    start.classList.add("not_displayed");
    stepOne.classList.add("not_displayed");
    stepTwo.classList.add("onsight");
    stepNumbers[0].classList.add('on-step')
    getStreamAndRecord();
    
})

async function getStream(){
    let stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
       height: { max: 480 }
    }
    })
    return stream
}

function getStreamAndRecord () { 
    getStream()
    .then(successCallback)
    .catch((err)=>{ console.error("no nos diste permiso :(", err)})  
}


function successCallback (stream){
    video.srcObject = stream;
    video.play();
    console.log("hola");
    stepTwo.classList.add("not_displayed");
    record.classList.add("onsight");
    timer.classList.add('displayed_btn');
    stepNumbers[0].classList.remove('on-step');
    stepNumbers[1].classList.add('on-step');
    recorder = RecordRTC(stream, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: function() {
        console.log('started')
    },
    });
}



record.addEventListener('click', () => {
    console.log("escuchegrabar");
    stopRecording.classList.add('onsight');
    record.classList.remove('onsight');
    recorder.startRecording();
    timerCounter()
    
})

let blob;

stopRecording.addEventListener('click', async()=>{
    await recorder.stopRecording();
    blob = await recorder.getBlob();
    upload.classList.add('onsight');
    stopRecording.classList.remove('onsight');
    timer.classList.add('not_displayed');
    repeat.classList.add('displayed_btn');
    stepNumbers[1].classList.remove('on-step');
    stepNumbers[2].classList.add('on-step');
})

repeat.addEventListener('click', async ()=>{
    await recorder.reset();
    upload.classList.remove('onsight');
    record.classList.add("onsight");
    stepNumbers[1].classList.add('on-step');
    stepNumbers[2].classList.remove('on-step');
});

upload.addEventListener('click', async () => {
    let form = new FormData(); 
    form.append('file', blob, 'myGif.gif');
    console.log(form.get('file'));
    
    let loadScreen = document.createElement('div');
    loadScreen.className = ('on-top-recorder');
    let loadScreenImg = document.createElement('img')
    loadScreenImg.setAttribute('src' , './assets/loader.svg');
    let loadScreenPhrase = document.createElement('p');
    loadScreenPhrase.textContent = 'Estamos subiendo tu GIFO';
    loadScreen.appendChild(loadScreenImg);
    loadScreen.appendChild(loadScreenPhrase);
    loadScreen.classList.add('onsight');

    recStepContainer.appendChild(loadScreen);
    // loading.classList.add('onsight');
    upload.classList.remove('onsight');
    const myRequest = new Request(`https://upload.giphy.com/v1/gifs?api_key=${uploadKey}`, {method: 'POST', body: form});
    fetch(myRequest)
        .then(response => response.json())
        .then(json => {
            console.log 
            gifId = json.data.id;
            downloadRecordBtn.appendChild(downloadRecordImg);

            linkRecordBtn.appendChild(linkRecordImg);
            
            recordBtns.appendChild(downloadRecordBtn);
            recordBtns.appendChild(linkRecordBtn);
            loadScreen.insertBefore(recordBtns, loadScreen.firstChild);

            loadScreenImg.setAttribute('src' , './assets/check.svg');
            loadScreenPhrase.textContent = 'GIFO subido con éxito';

            let MyGifsIds = JSON.parse(localStorage.getItem('misgifos')) || [];
            MyGifsIds.push(gifId);
            localStorage.setItem('misgifos' , JSON.stringify(MyGifsIds));
        })
    
})

let gifId;
let recordBtns = document.createElement('div');
recordBtns.className ='record-btns';
let downloadRecordBtn = document.createElement('button');
let downloadRecordImg = document.createElement('img');
downloadRecordImg.src = './assets/icon-download.svg';

downloadRecordImg.addEventListener('mouseover', () => {
    downloadRecordImg.src = "./assets/icon-download-hover.svg";
});
downloadRecordImg.addEventListener('mouseleave', () => {
    downloadRecordImg.src = "./assets/icon-download.svg";
});

downloadRecordImg.addEventListener('click', () => {
    loadGifs(uploadKey , gifId)
    .then(json => {
        console.log(json);
        download( json.data[0].images.original.url , 'myGif.gif')

    })
})

let linkRecordBtn = document.createElement('button');
let linkRecordLink = document.createElement('a');

let linkRecordImg = document.createElement('img');
linkRecordImg.src = './assets/icon-link-normal.svg';

linkRecordImg.addEventListener('mouseover', () => {
    linkRecordImg.src = "./assets/icon-link-hover.svg";
});
linkRecordImg.addEventListener('mouseleave', () => {
    linkRecordImg.src = "./assets/icon-link-normal.svg";
});

linkRecordBtn.addEventListener('click', () => {
    loadGifs(uploadKey , gifId)
    .then(json => {
        location.href = json.data[0].images.original.url;
    })
})


let recorder;
let secondsCounter = 0;
let minutesCounter = 0;
let hoursCounter = 0;
console.log(seconds);
function timerCounter(){    
    setInterval(() => {
        if (secondsCounter<100){
            secondsCounter++
            seconds.textContent = secondsCounter;
        } else{secondsCounter = 0;}
    }, 10);
    setInterval(() => {
        if (minutesCounter<100){
            minutesCounter++
            minutes.textContent = minutesCounter;
        } else{minutesCounter = 0;}
    }, 100);
    setInterval(() => {
        hoursCounter++
        hours.textContent = hoursCounter;
    }, 1000);
}

