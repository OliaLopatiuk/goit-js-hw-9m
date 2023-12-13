import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');

startBtn.addEventListener('click', timerStart);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] < Date.now()) {
        Notiflix.Notify.failure("Please choose a date in the future");
        startBtn.disabled = true;
      } else (startBtn.disabled = false)
    },
  };

flatpickr('#datetime-picker', options);

let intervalId = null;

function timerStart() {
     intervalId = setInterval(() => {const deltaTime = new Date(input.value) - Date.now();
        if (deltaTime <= 0) {
            timerStop();
            return;
        }
        const timerValues = convertMs(deltaTime);
        updateValues(timerValues);}, 1000)
};

function timerStop() {
    if (this.intevalID) clearInterval(this.intevalID);
    this.intevalID = null;
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  function updateValues({days, hours, minutes, seconds}) {
    daysValue.textContent = days;
    hoursValue.textContent = hours;
    minutesValue.textContent = minutes;
    secondsValue.textContent = seconds;
  }