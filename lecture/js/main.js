'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const carrotSound = new Audio('./sound/carrot_pull.mp3');     //HTML Audio element return
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);
// field.addEventListener('click', (event) => onFieldClick(event));
gameBtn.addEventListener('click', () => {
    if(started) {
        stopGame();             //started 변수가 true 이면 게임 스탑
    } else {
        startGame();            //started 변수가 false 이면 게임 시작
    }
});
popUpRefresh.addEventListener('click', ()=> {
    startGame();
    hidePopUp();
});

function startGame() {
    started = true;
    initGame();                 //게임이 시작되었을 때 이미지들이 생성되어야 하기 때문에
    showStopButton();           //게임이 시작되면 stop 버튼이 보여야한다.
    showTimerAndScore();        //게임이 시작되면 timer와 score가 보여야 한다.
    startGameTimer();
    playSound(bgSound);
}

function stopGame() {
    started = false;
    stopGameTimer();        //타이머를 멈추기 위한 함수
    hideGameButton();      // 플레이 버튼 사라짐
    showPopUpWithText('REPLAY❓');      //팝업창 나타내기 위한 함수
    playSound(alertSound);
    stopSound(bgSound);
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec =  GAME_DURATION_SEC;      //지정한 시간만 아래 setInterval 함수가 실행되어야 하기 때문에 
    updateTimerText(remainingTimeSec);
    timer = setInterval( ()=> {
        if(remainingTimeSec <=0) {
            clearInterval(timer);            //남은 시간이 없다면, 즉 0초라면 timer가 동작 되지 않아야 하기 때문에 clear
            finishiGame(CARROT_COUNT === score);        // 남은 시간이 0일 때도 게임이 끝난 것과 동일하게 동작해야한다.
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000)
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpWithText(text) {
    popUpText.innerText = text;
    popUp.classList.remove('pop-up--hide');
}

function hidePopUp() {
    popUp.classList.add('pop-up--hide');
}

function initGame() {
    score = 0;          //게임이 다시 시작될때 마다 score 초기화
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    addItem('carrot', 5, '/lecture/img/carrot.png');
    addItem('bug', 5, '/lecture/img/bug.png');
}

function onFieldClick(event) {
    if(!started) {
        return;
        // started가 false이면, 즉 게임이 시작하지 않았으면 함수를 나갈 것이다.
    }
    const target = event.target;
    if(target.matches('.carrot')) {
        //당근!!
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();
        if(score === CARROT_COUNT) {
            finishiGame(true);
        }
    } else if(target.matches('.bug')) {
        //벌레!!
        finishiGame(false);
    }
}

function playSound(sound) {
    sound.curretTime = 0;           //재생할 때는 항상 처음부터 재생되도록
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function finishiGame(win) {
    started = false;
    hideGameButton();
    if(win) {
        playSound(winSound);
    } else {
        playSound(bugSound);
    }
    stopGameTimer(); 
    stopSound(bgSound);
    showPopUpWithText(win? 'YOU WON👏' : 'YOU LOST💩' );
}


function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
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

