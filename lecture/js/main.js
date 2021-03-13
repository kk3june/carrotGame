'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
    if(started) {
        stopGame();             //started 변수가 true 이면 게임 스탑
    } else {
        startGame();            //started 변수가 false 이면 게임 시작
    }
    started = !started;         //버튼이 클릭되고 나면 상태가 바뀌었으니 started도 반대로 할당될 수 있도록
});

function startGame() {
    initGame();                 //게임이 시작되었을 때 이미지들이 생성되어야 하기 때문에
    showStopButton();           //게임이 시작되면 stop 버튼이 보여야한다.
    showTimerAndScore();        //게임이 시작되면 timer와 score가 보여야 한다.
}

function stopGame() {

}

function showStopButton() {
    const  icon = gameBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remopve('fa-play');
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function initGame() {
    console.log(fieldRect);
    addItem('carrot', 5, '/lecture/img/carrot.png');
    addItem('bug', 5, '/lecture/img/bug.png');
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

