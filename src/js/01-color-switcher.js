const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body')

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);

let timerId = null;


function onStartBtn() {
 timerId = setInterval(() => {changeColor()}, 1000);
 startBtn.disabled = true;
 stopBtn.disabled = false;
};

function onStopBtn() {
    clearInterval(timerId);
    startBtn.disabled = false;
 stopBtn.disabled = true;
};


function changeColor() {
     body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };

