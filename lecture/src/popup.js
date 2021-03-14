'use strict';

export default class PopUp {              //export는 외부에서도 클래스를 사용할 수 있도록 노출 시키는 것이다.
    constructor() {                 //constructor은 생성자 함수
        // const popUp = document.querySelector('.pop-up');
        // const popUpText = document.querySelector('.pop-up__message');
        // const popUpRefresh = document.querySelector('.pop-up__refresh');
        this.popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up__message');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');

        // popUpRefresh.addEventListener('click', ()=> {
        //     startGame();
        //     hidePopUp();
        // });
        this.popUpRefresh.addEventListener('click', () => {
            this.onClick && this.onClick();
            hide();
        });
    }

    setClickListner(onClick) {
        this.onclick = onClick;         // onClick 멤버변수에 onclick 인자를 할당한다.
    }

    // function showPopUpWithText(text) {
    //     popUpText.innerText = text;
    //     popUp.classList.remove('pop-up--hide');
    // }
    showWithText(text) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up--hide');
    }
    
    // function hidePopUp() {
    //     popUp.classList.add('pop-up--hide');
    // }    
    hide() {
        this.popUp.classList.add('pop-up--hide');
    }
}