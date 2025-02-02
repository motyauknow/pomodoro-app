import '../scss/style.scss';

let timer;
let secs = 1500; //количество секунд для каждого из трёж промежутков
let startStopFlag = true;
let breakTime = false;

function countTime(time) {
    const counterElement = document.querySelector('#counter');
    let counter = time;

    timer = setInterval(function() {
        if (counter == 0) {
            clearInterval(timer);
            counterElement.innerText = '00:00';
        }
        else {
            const minutes = Math.floor(counter / 60);
            const seconds = counter % 60;

            const formatedMins = String(minutes).padStart(2, '0');
            const formatedSecs = String(seconds).padStart(2, '0');
            counterElement.innerText = `${formatedMins}:${formatedSecs}`;
            if (breakTime) {
                document.title = `${formatedMins}:${formatedSecs} - time for rest!`;
            }
            else {
                document.title = `${formatedMins}:${formatedSecs} - time for work!`;
            }
            counter--;
            secs = counter;
        }
    }, 1000);
}

function setPomodoro() {
    clearInterval(timer);
    secs = 1500;
    breakTime = false;
    document.title = 'Pomodoro';
    document.querySelector('.selected').classList.remove('selected');
    btnPomodoro.classList.add('selected');
    document.querySelector('#counter').innerText = '25:00';
    document.body.style.backgroundColor = '#ba4949';
    document.querySelector('#app').style.backgroundColor = '#c15c5c';
    //остальные кнопки
    btnLong.style.removeProperty('background-color')
    btnShort.style.removeProperty('background-color')
    //
    btnPomodoro.style.backgroundColor = '#a44e4e';
    btnStartStop.style.color = '#ba4949'
    startStopFlag = true;
    btnStartStop.innerText = 'START';
}

function setShort() {
    clearInterval(timer);
    secs = 3;
    breakTime = true;
    document.title = 'Short break';
    document.querySelector('.selected').classList.remove('selected');
    btnShort.classList.add('selected');
    document.querySelector('#counter').innerText = '05:00';
    document.body.style.backgroundColor = '#38858a';
    document.querySelector('#app').style.backgroundColor = '#4c9196';
    //остальные кнопки
    btnPomodoro.style.removeProperty('background-color');
    btnLong.style.removeProperty('background-color');
    //
    btnShort.style.backgroundColor = '#417b80';
    btnStartStop.style.color = '#38858a'
    startStopFlag = true;
    btnStartStop.innerText = 'START';
}

function setLong() {
    clearInterval(timer);
    secs = 900;
    breakTime = true;
    document.title = 'Long break';
    document.querySelector('.selected').classList.remove('selected');
    btnLong.classList.add('selected');
    document.querySelector('#counter').innerText = '15:00';
    document.body.style.backgroundColor = '#397097';
    document.querySelector('#app').style.backgroundColor = '#4d7fa2';
    //остальные кнопки
    btnPomodoro.style.removeProperty('background-color')
    btnShort.style.removeProperty('background-color')
    //
    btnLong.style.backgroundColor = '#426c8a';
    btnStartStop.style.color = '#397097'
    startStopFlag = true;
    btnStartStop.innerText = 'START';
}


//start/stop button
const btnStartStop = document.querySelector('.btn');
btnStartStop.addEventListener('click', function() {
    if (startStopFlag) {
        //start
        startStopFlag = !startStopFlag;
        countTime(secs);
        btnStartStop.innerText = "STOP";
        console.log('started');
    }
    else {
        //stop
        startStopFlag = !startStopFlag;
        clearInterval(timer);
        btnStartStop.innerText = 'START';
        console.log('paused');
    }
})

//pomodoro time
const btnPomodoro = document.querySelector('#pomodoro');
btnPomodoro.onclick = function () {
    setPomodoro();
}

//short break
const btnShort = document.querySelector('#short-break');
btnShort.onclick = function () {
    setShort();    
}

//long break
const btnLong = document.querySelector('#long-break');
btnLong.onclick = function () {
    setLong();
}