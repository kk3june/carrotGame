const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const level = 5;

function initGame(level) {
    imgMake('carrot', level, '/carrot/img/carrot.png');
    imgMake('bug', level, '/carrot/img/bug.png');
}

function imgMake( className, num, imgPath ) {
    
    for ( let i = 0; i < num; i++) {
        const img = document.createElement('img');
        img.setAttribute('class', className);
        img.setAttribute('src', imgPath);
        
        field.appendChild(img);

        console.log(`for sentence ${i}`);
    }

}

initGame(level);