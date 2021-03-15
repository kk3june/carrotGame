'use strict';

// playSound와 carrotSound는 main.js와 중복되긴 하지만 일단 field.js에도 가져온다.
const carrotSound = new Audio('./sound/carrot_pull.mp3'); 
const CARROT_SIZE = 80;

export default class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        // const field = document.querySelector('.game__field');
        // const fieldRect = field.getBoundingClientRect();
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        // field.addEventListener('click', onFieldClick);
        this.field.addEventListener('click', this.onClick);
    }
    
    //콜백을 등록할 수 있도록 setClickListner 함수 생성
    setClickListner(onItemClick) {
        this.onItemClick = onItemClick;
    }

    init() {
        // ***** main.js 의 initGmae() 함수에서 field와 연관된 것들만 가져왔다. *****
        // field.innerHTML = '';
        // addItem('carrot', CARROT_COUNT, '/lecture/img/carrot.png');
        // addItem('bug', BUG_COUNT, '/lecture/img/bug.png');
        this.field.innerHTML = '';
        this._addItem('carrot', this.carrotCount, '/lecture/img/carrot.png');
        this._addItem('bug', this.bugCount, '/lecture/img/bug.png');
    }

    //addItem은 Field 클래스 내부에서만 사용되는 함수인데, 이를 프라이빗 멤버변수라고 한다.
    //타입스크립트에서는 프라이빗 멤버변수를 만들 수 있는데
    //자바스크립트에서는 아직 프라이빗이 통용적으로 쓰이지 않기 때문에 _언더스코어로 대신 한다.
    _addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - this.carrotCount;
        const y2 = this.fieldRect.height - this.carrotCount;
    
        for (let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }

    onClick(event) {
        //  *****  main.js의 onFieldClick 함수에서 가져왔다.  *****
        // 여기서 field 클래스와 관계없는 것들은 모두 지워준다.

        // const target = event.target;
        // if(target.matches('.carrot')) {
        //     //당근!!
        //     target.remove();
        //     score++;
        //     playSound(carrotSound);
        //     updateScoreBoard();
        //     if(score === CARROT_COUNT) {
        //         finishiGame(true);
        //     }
        // } else if(target.matches('.bug')) {
        //     //벌레!!
        //     finishiGame(false);
        // }
        const target = event.target;
        if(target.matches('.carrot')) {
            //당근!!
            target.remove();
            playSound(carrotSound);
            this.onItemClick && this.onItemClick('carrot');
            // 사용자가 당근이 선택되었는지 벌레가 선택되었는지 알아야 하기 때문에 type까지 전달
        } else if(target.matches('.bug')) {
            //벌레!!
            this.onItemClick && this.onItemClick('bug');
            // 사용자가 당근이 선택되었는지 벌레가 선택되었는지 알아야 하기 때문에 type까지 전달
        }
        
    }
}

// 중복되기는 하지만 일단은 main.js에서 가져온다.
function playSound(sound) {
    sound.curretTime = 0;           //재생할 때는 항상 처음부터 재생되도록
    sound.play();
}

// randomNumber 함수는 Field 안에 있는 데이터와 무관하게 공통적으로 쓸 수 있는 것
// class는 템플릿 같은 것인데, 클래스에 포함되지 않는 함수는 이렇게 템플릿에 포함되지 않는 것이
// 반복적인 생성을 막기 때문에 더 효율적이다.
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}