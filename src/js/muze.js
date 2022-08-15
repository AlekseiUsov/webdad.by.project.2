const start = document.querySelector('.maze__button');
const mazeContent = document.querySelector('.maze__content')

let field;
let x = 1;
    y = 1;

const makeField = () => {
    
    field = document.createElement('div');
    mazeContent.appendChild(field);
    field.classList.add('maze__filed');

    for (let i = 0; i < 25; i += 1) {
        const square = document.createElement('div');
        square.classList.add('maze__square');
        field.appendChild(square);
        if (x > 5) {
            x =  1;
            y += 1;
        }
        square.setAttribute('posX', x);
        square.setAttribute('posY', y);
        x += 1;

        if (i === 0) {
            square.classList.add('maze__square-start');
        }
        if (i === 25) {
            square.style.backgroundImage = "url('../assert/muze/finish-svgrepo-com.svg')";
        }
    }
}

const toggleStart = () => {
    start.classList.toggle('maze__button-active');

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

window.addEventListener("keydown", arrow_keys_handler, false);
start.addEventListener('click',  toggleStart);