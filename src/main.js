// async function getJson() {
//     try {
//         const response = await fetch(`./json/words.json`);
//         return response.json();
//     }
//     catch(err) {
//         console.log(err);
//         err.innerHTML = `${err.message}`;
//         return null;
//     }
// }


let p = document.getElementById('text');
let err = document.getElementById('error');
//タイピングする文字列をここで用意しておく

const textLists = [
    "apple",
    "banana",
    "chocolate",
    "django",
    "elephant",
    "facebook",
    "google",
    "honeycomb",
    "instagram",
    "jingle",
    "knockout",
    "linkedin",
    "museum",
    "newsletter",
    "open",
    "question",
    "reddit",
    "seattle",
    "telescope",
    "unicode",
    "vimeo",
    "watch",
    "xing",
    "youtube",
    "zoom"
];

let checkTexts = [];

createText();

const timer = document.getElementById('timer');
let TIME = 60;
const correct = document.getElementById('correct');

const countdown = setInterval(() => {
    timer.innerHTML = `Limit Time <span id="time">${--TIME}</span>sec.`;
    if(TIME <= 0) finish();
}, 1000);

function finish() {
    clearInterval(countdown);
    correct.innerHTML = `
        Corrected is ${score}!
        You want to play again? Let\'s play...
        and you need to reload this site.
    `;
    state = false;
}

function createText() {
	//文字列をランダムに取得する
	let rnd = Math.floor(Math.random() * textLists.length);
	//前の文字列を削除してから次の文字列を表示する
	p.textContent = '';
	//文字列を1文字ずつに分解して、それぞれにspanタグを挿入する
	checkTexts = textLists[rnd].split('').map(function(value) {
		let span = document.createElement('span');
		span.textContent = value;
		p.appendChild(span);
		return span;
	});
}

const scoreLabel = document.getElementById("score");
const missLabel = document.getElementById("miss");
let score = 0;
let miss = 0;
let state = true;

//キーボードからの入力は「e.key」に格納されている
window.addEventListener('keydown', e => {
    if(e.key === checkTexts[0].textContent) {
        if(!state) return;
        console.log("score");
        checkTexts[0].className = 'add_color';
        score++;
        scoreLabel.textContent = score;
        //0番目の配列要素を削除して、次の1文字を比較対象にする
        checkTexts.shift();
    }
    else {
        if(!state) return;
        let bool = event.shiftKey;
        if(bool == true){
        }
        else if(bool == false){
            miss++;
            missLabel.textContent = miss;
        }
    }
    //配列要素が空っぽになったら次の問題を出す
    if(!checkTexts.length) {
        createText();
    }
});

// footer set
const setYear = function () {
    let yearElement = document.getElementById("current_year");
    let thisYear = new Date().getFullYear();
    yearElement.innerHTML = thisYear;
}

setYear();