const btn = document.querySelector('.timer__button');
const timer = document.querySelector('.timer__time');

let min = 2;
let sec = 0;
let interval;

let time = min*60000 + sec*1000;

const timeReport = () => {
    const minutes = Math.floor(time / 1000 / 60) % 60;
    const seconds = Math.floor(time / 1000) % 60;

    const minutesForPrint = minutes < 10 ? `0${minutes}` : minutes;
    const secondsForPrint = seconds < 10 ? `0${seconds}` : seconds;
    time -= 1000;

    timer.innerHTML = `${minutesForPrint}:${secondsForPrint}`;
};

const toggleButton = () => {
    btn.classList.toggle('timer__button-active');
}

btn.addEventListener('click', () => {
    if (interval)  {
        clearInterval(interval);
        interval = null;
    } else {
      interval = setInterval(timeReport, 1000);
    } 
});

btn.addEventListener('click', toggleButton);