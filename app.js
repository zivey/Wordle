// Aa, Bb, Cc, Dd, Ee, Ff, Gg, Hh, Ii, Jj, Kk, Ll, Mm, Nn, Oo, Pp, Qq, Rr, Ss, Šš, Zz, Žž, Tt, Uu, Vv, Ww, Õõ, Ää, Öö, Üü, Xx, Yy
const EE = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'Š', 'Z', 'Ž', 'T', 'U', 'V', 'W', 'Õ', 'Ä', 'Ö', 'Ü', 'X', 'Y']



const Firstcell = document.querySelector('#cell');
console.log(Firstcell);
let nextCell = [0, 0];
let words = [];
let PlayerWord = '';
let currentWord = '';
let isGameOver = false;

fetch('words.txt')
.then(response => response.text())
.then(data => {
    words = data.split('\n');

    currentWord = words[Math.floor(Math.random() * words.length)];
    console.log(currentWord);

    document.addEventListener('keydown', e => {
        console.log(e.key);
    

        if( !isGameOver ) {

            let nextCellEl = document.querySelector(`.letter[data-x="${nextCell[0]}"][data-y="${nextCell[1]}"]`);
            const key = e.key.toUpperCase()
            if ( EE.includes(key) && nextCell[0] <= 4 ){
                nextCellEl.innerText = key;
                PlayerWord += key;
                nextCell[0]++;
            } else if ( key == "BACKSPACE" && nextCell[0] > 0 ){
                nextCell[0]--;
                PlayerWord = PlayerWord.slice(0, -1);
                nextCellEl = document.querySelector(`.letter[data-x="${nextCell[0]}"][data-y="${nextCell[1]}"]`);
                nextCellEl.innerText = '';
            } else if( key == 'ENTER'  && nextCell[0] == 5){
                
                testword();

            } else{

                console.log('Mäng läbi');

            }

        }

        
        
    });
});



function testword() {

    isGameOver = true;
    console.log(PlayerWord);

    for (let i = 0; i < PlayerWord.length; i++) {
        let letter = PlayerWord.charAt(i).toLowerCase();
        console.log(letter);
        
        const currentCellEl = document.querySelector(`.letter[data-x="${i}"][data-y="${nextCell[1]}"]`)
        if(letter == currentWord.charAt(i)){
            currentCellEl.classList.add('correctLetter')
        } else if ( currentWord.includes(letter) ){
            currentCellEl.classList.add('presentLetter')
            isGameOver = false;
        } else{
            currentCellEl.classList.add('missingLetter')
            isGameOver = false;
        }

        
    }

    nextCell[0] = 0;
    nextCell[1]++;
    PlayerWord = '';

}

