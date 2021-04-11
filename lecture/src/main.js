'use strict';

import PopUp from './popup.js';
import {GameBuilder, Reason} from './game.js';

// const CARROT_COUNT = 5;
// const BUG_COUNT = 5;
// const GAME_DURATION_SEC = 5;
const gameFinishBanner = new PopUp();
const game = new GameBuilder()
.gameDuration(5)
.carrotCount(5)
.bugCount(5)
.build();

game.setGameStopListener(reason => {
    console.log(reason);
    let message;
    switch (reason) {
        case Reason.cancel:
            message = 'REPLAY❓';
            break;
        case Reason.win:
            message = 'YOU WON👏';
            break;
        case Reason.lose:
            message = 'YOU LOST💩';
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
    game.start();
    console.log('clicked start');
});



