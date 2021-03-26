'use strict';

import PopUp from './popup.js';
import Game from './game.js';

// const CARROT_COUNT = 5;
// const BUG_COUNT = 5;
// const GAME_DURATION_SEC = 5;
const gameFinishBanner = new PopUp();
const game = new Game(3, 2, 2);
game.setGameStopListener(reason => {
    console.log(reason);
    let message;
    switch (reason) {
        case 'canceel':
            message = 'REPLAY❓';
            break;
        case 'win':
            message = 'YOU WON👏';
            break;
        case 'lose':
            message = 'YOU LOST💩';
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListner(() => {
    game.startGame();
});



