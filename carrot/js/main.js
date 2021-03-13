const field = document.querySelector('.game__field');
const timer = document.querySelector('.game__timer');
const score = document.querySelector('.game__score');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const level = 5;
const CARROT_SIZE = 80;

function initGame(level) {
    imgMake('carrot', level, '/carrot/img/carrot.png');
    imgMake('bug', level, '/carrot/img/bug.png');
}

function imgMake( className, count, imgPath ) {
    const x1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y1 = 0;
    const y2 = fieldRect.height - CARROT_SIZE;
    
    for ( let i = 0; i < count; i++) {
        const img = document.createElement('img');
        img.setAttribute('class', className);
        img.setAttribute('src', imgPath);
        img.style.position = 'absolute';
        
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);

        img.style.transform = `translateX(${x}px) translateY(${y}px)`;

        field.appendChild(img);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

gameBtn.addEventListener('click', ()=> {
    timer.classList.remove('stand-by');
    score.classList.remove('stand-by');
    field.classList.remove('stand-by');
})

initGame(level);