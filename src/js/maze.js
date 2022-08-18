const start = document.querySelector('.maze__button');
const mazeContent = document.querySelector('.maze__content');

let successfulAttempts = 0;

let field;
let x = 1;
    y = 1;


const randomCoordinate = () => {
    const posX = Math.round(Math.random() * (5 - 1) + 1);
    const posY = Math.round(Math.random() * (5 - 1) + 1);

    if (posX === 1 && posY === 1) {
        return randomCoordinate();
    }
    if (posX === 5 && posY === 5) {
        return randomCoordinate();
    }
    return `[posX="${posX}"][posY="${posY}"]`;
}

const miningField = (field, bombs = 0) => {
    const coordinateOfBomb = randomCoordinate();
    const bomb = document.querySelector(coordinateOfBomb);

    if (bomb.classList.contains('maze__square-bomb')) {
        bombs -= 1;
    }
    bomb.classList.add('maze__square-bomb');
   
    if (bombs === successfulAttempts) {
        return;
    }
    return miningField(field, bombs += 1);
}


const makeField = () => {
    x = 1;
    y = 1;
    
    field = document.createElement('div');
    mazeContent.appendChild(field);
    field.classList.add('maze__filed');

    for (let i = 0; i < 25; i += 1) {
        const square = document.createElement('div');
        square.classList.add('maze__square');
        square.setAttribute('posX', x);
        square.setAttribute('posY', y);

        field.appendChild(square);
        if (x === 5) {
            x =  0;
            y += 1;
        }
        x += 1;

        if (i === 0) {
            square.classList.add('maze__square-monkey');
            square.classList.add('maze__square-start');
        }
        if (i === 24) {
            square.classList.add('maze__square-finish');
        }
    }
    miningField();
}

const showResultGame = (result) => {
    const field = document.querySelector('.maze__filed');
    const wasted = document.createElement('div');

    wasted.classList.add('wasted');
    wasted.classList.add('maze__header');
    wasted.innerHTML = result;
    wasted.style.padding = '3rem';
    wasted.style.transition = '3s';

    mazeContent.replaceChild(wasted,field);
}

const toggleStart = () => {
    const wasted = document.querySelector('.wasted');
    start.classList.toggle('maze__button-active');
    
    if (wasted !== null) {
        mazeContent.removeChild(wasted);
        makeField();
    }
    if (field === undefined) {
        makeField();
    } else {
        mazeContent.removeChild(field);
        field = undefined;
    }
}

const arrow_keys_handler = (e) => {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}

const move = (event) => {
    const coordinateOfMonkey = document.querySelector('.maze__square-monkey');
    const tempY = coordinateOfMonkey.getAttribute('posY');
    const tempX = coordinateOfMonkey.getAttribute('posX');
    
    y =  Number(tempY);
    x =  Number(tempX);

    if (event.code === 'ArrowUp') {
        y -= 1;
    }
    if (event.code === 'ArrowDown') {
        y += 1;
    }
    if (event.code === 'ArrowLeft') {
        x -= 1;
    }
    if (event.code === 'ArrowRight') {
        x += 1;
    }
    if (y < 1 || y > 5 || x < 1 || x > 5) {
        showResultGame('Wasted!');
        successfulAttempts = 0;
        setTimeout(toggleStart, 1000);
        return;
    }
    if (x === 5 && y === 5) {
        showResultGame('Exellent!');
        successfulAttempts += 1;
        setTimeout(toggleStart, 1000);
        return;
    }

    const next = document.querySelector(`[posx="${x}"][posy="${y}"]`);
    if (next.classList.contains('maze__square-bomb')) {
        showResultGame('Wasted!');
        successfulAttempts = 0;
        setTimeout(toggleStart, 1000);
        return;
    }
    coordinateOfMonkey.classList.remove('maze__square-monkey');
    next.classList.add('maze__square-monkey');
}


window.addEventListener("keydown", arrow_keys_handler, false);
window.addEventListener("keydown", move);
start.addEventListener('click',  toggleStart);