const prev = document.querySelector('.slider__prev');
const next = document.querySelector('.slider__next');
const slides = document.querySelectorAll('.slider__item');

let index = 0;

const activeSlide = (index) => {
    for (let i = 0; i < slides.length; i += 1) {
        if (i === index) {
            slides[i].classList.add('slider__item-active');
        } else {
            slides[i].classList.remove('slider__item-active');
        }
    }
}

const disabledButton = (index) => {
    console.log(index)
    if (index === 0) {
        prev.setAttribute('disabled', true)
        prev.classList.add('slider__button-unactive');
    }
     if (index !== 0) {
        prev.setAttribute('disabled', false)
        prev.classList.remove('slider__button-unactive');
    }
     if (index === slides.length - 1) {
        next.setAttribute('disabled', true)
        next.classList.add('slider__button-unactive');
    }
    if (index !== slides.length - 1) {
        next.setAttribute('disabled', true)
        next.classList.remove('slider__button-unactive');
    }
}
const nextSlide = () => {
    if (index !== slides.length - 1) {
        index += 1;
        activeSlide(index);
    }
    disabledButton(index);
}

const prevSlide = () => {
    if (index !== 0) {
        index -= 1;
        activeSlide(index);
    }
    disabledButton(index);
}


prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);