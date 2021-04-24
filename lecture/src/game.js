'use strict';

import * as sound from'./sound.js';
import {Field, ItemType} from './field.js';

export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel',
});

export class GameBuilder {
    gameDuration (num){
        this.gameDuration = num;
        return this;
    }
    carrotCount (num) {
        this.carrotCount = num;
        return this;
    }
    bugCount(num) {
        this.bugCount = num;
        return this;
    }
    build() {
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        );
    }
}

class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        // const gameBtn = document.querySelector('.game__button');
        // const gameTimer = document.querySelector('.game__timer');
        // const gameScore = document.querySelector('.game__score');
        // let started = false;
        // let score = 0;
        // let timer = undefined;
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn = document.querySelector('.game__button');
        this.gameBtn.addEventListener('click', () => {
            if(this.started) {
                this.stop(Reason.cancel);             //started 변수가 true 이면 게임 스탑
            } else {
                this.start();            //started 변수가 false 이면 게임 시작
            }
        });

        // const gameField = new Field(CARROT_COUNT, BUG_COUNT);
        // 클릭이 되면 어떤 item이 클릭이 되었는지 field 클래스에서 받아온다.
        // gameField.setClickListner(onItemClick);
        // field.addEventListener('click', (event) => onFieldClick(event));
        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListner(this.onItemClick);

        this.started = false;
        this.score = 0;
        this.timer = undefined;

    }

    

    // function startGame() {
    //     started = true;
    //     initGame();                 //게임이 시작되었을 때 이미지들이 생성되어야 하기 때문에
    //     showStopButton();           //게임이 시작되면 stop 버튼이 보여야한다.
    //     showTimerAndScore();        //게임이 시작되면 timer와 score가 보여야 한다.
    //     startGameTimer();
    //     // playSound(bgSound);
    //     sound.playBackground();
    // }

    // function stopGame() {
    //     started = false;
    //     stopGameTimer();        //타이머를 멈추기 위한 함수
    //     hideGameButton();      // 플레이 버튼 사라짐
    //     gameFinishBanner.showWithText('REPLAY❓');      //팝업창 나타내기 위한 함수
    //     // playSound(alertSound);
    //     // stopSound(bgSound);
    //     sound.playAlert();
    //     sound.stopBackground();
    // }

    start() {
        this.started = true;
        this.initGame();                 
        this.showStopButton();         
        this.showTimerAndScore();    
        this.startGameTimer();
        sound.playBackground();
    }

    stop(reason) {
        this.started = false;
        this.stopGameTimer();       
        this.hideGameButton();      
        // this.gameFinishBanner.showWithText('REPLAY❓');   
        this.onGameStop && this.onGameStop(reason);   //사용자가 stop 버튼을 눌렀을때니까 cancle
        sound.playAlert();
        sound.stopBackground();
    }

    // function finishiGame(win) {
    //     started = false;
    //     hideGameButton();
    //     if(win) {
    //         // playSound(winSound);
    //         sound.playWin();
    //     } else {
    //         // playSound(bugSound);
    //         sound.playBug();
    //     }
    //     stopGameTimer(); 
    //     sound.stopBackground();
    //     gameFinishBanner.showWithText(win? 'YOU WON👏' : 'YOU LOST💩' );
    // }


    // finish(win) {
    //     this.started = false;
    //     this.hideGameButton();
    //     this.stopGameTimer(); 
    //     sound.stopBackground();
    //     // gameFinishBanner.showWithText(win? 'YOU WON👏' : 'YOU LOST💩' );
    //     this.onGameStop && this.onGameStop(win? Reason.win : Reason.lose);        // win이 true면 win 아니면 lose
    // }
    
        
    // 게임이 끝나면 main.js에 알려줄 수 있도로 하는 콜백함수를 새로 만든다.
    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }
    

    //기존 onFielcClick 함수명을 field 클래스의 onItemClick로 바꿔준다.
    // function onItemClick(item) {
    //     if(!started) {
    //         return;
    //         // started가 false이면, 즉 게임이 시작하지 않았으면 함수를 나갈 것이다.
    //     }
    //     if(item === 'carrot') {
    //         //당근!!
    //         score++;
    //         updateScoreBoard();
    //         if(score === CARROT_COUNT) {
    //             finishiGame(true);
    //         }
    //     } else if(item === 'bug') {
    //         //벌레!!
    //         finishiGame(false);
    //     }
    // }

    //기존 onFielcClick 함수명을 field 클래스의 onItemClick로 바꿔준다.
    onItemClick = (item) => {
        if(!this.started) {
            return;
        }
        if(item === ItemType.carrot) {
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.carrotCount) {
                // this.finish(true);
                this.stop(Reason.win);
            }
        } else if(item === ItemType.bug) {
            // this.finish(false);
            this.stop(Reason.lose);
        }
    }

    showStopButton() {
        const icon = this.gameBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }
    
    hideGameButton() {
        this.gameBtn.style.visibility = 'hidden';
    }
    
    showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    
    startGameTimer() {
        let remainingTimeSec = this.gameDuration;      //지정한 시간만 아래 setInterval 함수가 실행되어야 하기 때문에 
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval( ()=> {
            if(remainingTimeSec <=0) {
                clearInterval(this.timer);            //남은 시간이 없다면, 즉 0초라면 timer가 동작 되지 않아야 하기 때문에 clear
                // this.finish(this.carrotCount === this.score);        // 남은 시간이 0일 때도 게임이 끝난 것과 동일하게 동작해야한다.
                this.stop(this.carrotCount === this.score ? Reason.win: Reason.lose);   // 리팩토링 하는 과정에서 finish 함수를 제거하고 stop 함수로 통합하였기 때문에 
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000)
    }
    
    stopGameTimer() {
        clearInterval(this.timer);
    }
    
    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerText = `${minutes}:${seconds}`;
    }
    
    initGame() {
        this.score = 0;          //게임이 다시 시작될때 마다 score 초기화
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init();
    }
    
    updateScoreBoard() {
        this.gameScore.innerText = this.carrotCount - this.score;
    }
    
}