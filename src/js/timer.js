import sound1 from '../audio/3164_call-sound.ru__.mp3'; 

const container = document.querySelector('.timer__content');
const btn = document.querySelector('.timer__button');
const timer = document.querySelector('.timer__time');

const setting = document.querySelector('.timer__item-setting');
const popUp = document.querySelector('.timer__pop-ups__content');
const popUpWindow = document.querySelector('.timer__pop-ups__block');

const range = document.querySelector('.timer__pop-ups__range');
const rangeNum = document.querySelector('.timer__pop-ups__range-num');

const timerStatusesWrapper = document.querySelector('.timer__statuses');
const timerStatusesColl = document.querySelectorAll('.timer__status');
const call = document.querySelector('.timer__call');

const longBreakAfterExercise = document.querySelector('.timer__pop-ups__long-break-after-count');
const timerCount = document.querySelector('.timer__count');

let interval;
let minutesValueForPrint;
let secondsValueForPrint;
let countExercise = 0;

const exerciseMin = document.querySelector('.timer__pop-ups-exercise-min');
const exerciseSec = document.querySelector('.timer__pop-ups-exercise-sec');

const shortBreakMin = document.querySelector('.timer__pop-ups-short-break-min');
const shortBreakSec = document.querySelector('.timer__pop-ups-short-break-sec');

const longBreakMin = document.querySelector('.timer__pop-ups-long-break-min');
const longBreakSec = document.querySelector('.timer__pop-ups-long-break-sec');

let data = timer.innerHTML.split(':');
let time = data[0]*60000 + data[1]*1000;

const changeStyleOfContainer = (item) => {
    timerStatusesColl.forEach((el) => el.classList.remove('timer__status-active'));

    if (item.classList.contains('timer__status-exercise')) {
        item.classList.add('timer__status-active')
        container.style.backgroundColor = 'rgb(217, 85, 80)';
        btn.style.color = 'rgb(217, 85, 80)';
        call.classList.remove('timer__call-active');
        minutesValueForPrint = exerciseMin.value < 10 ? `0${exerciseMin.value}` : exerciseMin.value;
        secondsValueForPrint = exerciseSec.value < 10 ? `0${exerciseSec.value}` : exerciseSec.value;
    }
    if (item.classList.contains('timer__status-short-break')) {
        item.classList.add('timer__status-active')
        container.style.backgroundColor = 'rgb(76, 145, 149)';
        btn.style.color = 'rgb(76, 145, 149)';
        call.classList.add('timer__call-active');
        minutesValueForPrint = shortBreakMin.value < 10 ? `0${shortBreakMin.value}` : shortBreakMin.value;
        secondsValueForPrint = shortBreakSec.value < 10 ? `0${shortBreakSec.value}` : shortBreakSec.value;
    }
    if (item.classList.contains('timer__status-long-break')) {
        item.classList.add('timer__status-active')
        container.style.backgroundColor = 'rgb(69, 124, 163)';
        btn.style.color = 'rgb(69, 124, 163)';
        call.classList.add('timer__call-active');
        minutesValueForPrint = longBreakMin.value < 10 ? `0${longBreakMin.value}` : longBreakMin.value;
        secondsValueForPrint = longBreakSec.value < 10 ? `0${longBreakSec.value}` : longBreakSec.value;
    }
    timer.innerHTML = `${minutesValueForPrint}:${secondsValueForPrint}`;
    data = timer.innerHTML.split(':');
    time = data[0]*60000 + data[1]*1000;
    clearInterval(interval);
    interval = null;
    btn.classList.remove('timer__button-active');
}

const activeStatus = (event) => {
    const current = event.target;
    if (current.classList.contains('timer__status')) {
        changeStyleOfContainer(current);
    }
} 

const nextStatus = () => {
  for (let i = 0; i < timerStatusesColl.length; i += 1) {

    const current = timerStatusesColl[i];
    let next = timerStatusesColl[i + 1];
    let last = timerStatusesColl[i - 1];
    
    timerCount.innerHTML = countExercise > 1 ? `#${countExercise}` : timerCount.innerHTML;
    console.log(countExercise)
    if ((countExercise + 1) % Number(longBreakAfterExercise.value) === 0 && countExercise > 1 && longBreakAfterExercise.value > 1) {
        next = timerStatusesColl[i + 2];
    }
    if (countExercise % Number(longBreakAfterExercise.value) === 0 && countExercise > 1 && longBreakAfterExercise.value > 1) {
        last = timerStatusesColl[i - 2];
    }

    if (current.classList.contains('timer__status-active') && current.classList.contains('timer__status-exercise')) {
        changeStyleOfContainer(next);
        countExercise += 1;
        interval = setInterval(timeReport, 1000);
        break;
    }
    if (current.classList.contains('timer__status-active') && current.classList.contains('timer__status-break')) {
        changeStyleOfContainer(last);
        interval = setInterval(timeReport, 1000);
        break;
    }
  }
}

const timeReport = () => {
    const audio = new Audio(sound1);
    audio.volume = range.value === 100 ? 1 : Number(`0.${range.value}`);

    const minutes = Math.floor(time / 1000 / 60) % 60;
    const seconds = Math.floor(time / 1000) % 60;

    const minutesForPrint = minutes < 10 ? `0${minutes}` : minutes;
    const secondsForPrint = seconds < 10 ? `0${seconds}` : seconds;
    time -= 1000;

    timer.innerHTML = `${minutesForPrint}:${secondsForPrint}`;
    if (time === 0) {
        audio.play();
        nextStatus();
    }
};

btn.addEventListener('click', () => {
    if (interval)  {
        clearInterval(interval);
        interval = null;
    } else {
      interval = setInterval(timeReport, 1000);
    } 
});

//popUp funtions
const toggleButton = () => {
    btn.classList.toggle('timer__button-active');
}

const timerPopUpToggleFunc = (e) => {
    const current = e.target;
    if (current.classList.contains('timer__pop-ups__toggle')) {
        current.classList.toggle('timer__pop-ups__toggle-active');
    }
}

const popUpToggle = (event) => {
    if (event.target.closest('.timer__pop-ups__close')) {
        popUp.classList.add('hidden');
    }
    if (event.target.closest('.timer__pop-ups__button')) {
        popUp.classList.add('hidden');
    }
    if (event.target.closest('.timer__pop-ups__block')) {
        return;
    }
    popUp.classList.toggle('hidden');
}

timerStatusesWrapper.addEventListener('click', activeStatus);

popUpWindow.addEventListener('click', timerPopUpToggleFunc);
popUp.addEventListener('click', popUpToggle);
setting.addEventListener('click', popUpToggle);

btn.addEventListener('click', toggleButton);
range.oninput = function() {
    rangeNum.innerHTML = this.value;
  }
