'use strict';

const carrotSound = new Audio('./sound/carrot_pull.mp3');     //HTML Audio element return
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

/* 어떤 사운드를 재생해야 하는지 일일이 인자를 전달하지 않아도 되도록 */
/* 조금 유용한 함수 */
export function playCarrot() {
    playSound(carrotSound);
}

export function playBug() {
    playSound(bugSound);
}

export function playAlert() {
    playSound(alertSound);
}

export function playWin() {
    playSound(winSound);
}

export function playBackground() {
    playSound(bgSound);
}

export function stopBackground() {
    stopSound(bgSound);
}

/* 아래 playSound와 stopSound는 굳이 클래스로 만들지 않고 공통적으로 쓸 수 있게 이렇게 빼 놓는다.*/
function playSound(sound) {
    sound.curretTime = 0;           //재생할 때는 항상 처음부터 재생되도록
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}