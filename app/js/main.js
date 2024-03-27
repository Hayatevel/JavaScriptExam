/*
"main.js"
Apply to "../index.html"
*/

// Get DOM Elements
let p = document.getElementById("text");
let err = document.getElementById("error");
let timer = document.getElementById("timer");
let correct = document.getElementById("correct");
let scoreLabel = document.getElementById("score");
let missLabel = document.getElementById("miss");
let currentYear = document.getElementById("current_year");

// Create array parameters
let textLists = [];
let checkTexts = [];

// Create game statuses
let score = 0;
let miss = 0;
let state = true;

// Create timer's number of seconds
let TIME = 60;

/*
AJAXの非同期通信でjsonファイルにある英単語の配列を取得する
@param none
@return Array
*/
const getJson = async () => {
    try {
        const response = await fetch("../json/words_test.json");
        const jsonData = await response.json();
        return jsonData.words;
    }
    catch(err) { // jsonファイルの取得に失敗したらhtmlとconsoleに出力
        console.log(err);
        err.innerHTML = `${err.message}`;
        return null;
    }
}

/*
非同期処理でJSONデータを取得し、textListsに格納
*/
getJson().then(data => {
    if(data) {
        textLists = data;
        console.log(textLists); // For debag
        createText(); // 最初のプログラム実行
    }
});

/*
カウントダウンタイマーの作成
@param none
@return void
*/
const countdown = setInterval(() => {
    timer.innerHTML = `Limit Time <span id="time">${--TIME}</span>sec.`;
    if(TIME <= 0) finish();
}, 1000);

/* 
カウントダウンタイマーの終了とキーボード入力を受け付けなくする
@param none
@return void
*/
const finish = () => {
    clearInterval(countdown);
    correct.innerHTML = `
        Corrected is ${score}!
        You want to play again? Let\'s play...
        and you need to reload this site.
    `;
    state = false;
}

/* 
画面上に出題する英単語の選択
@param none
@return string
*/
const createText = () => {
	let rnd = Math.floor(Math.random() * textLists.length); // 文字列をランダムに取得する
    console.log(`Random number: ${rnd}`);
	p.textContent = ""; // 前の文字列を削除してから次の文字列を表示する
    
	/* 
    文字列を1文字ずつに分解して、それぞれにspanタグを挿入する
    */
	checkTexts = textLists[rnd].split("").map(function(value) {
        console.log(`Text Content: ${textLists[rnd]}`);
		let span = document.createElement("span");
		span.textContent = value;
		p.appendChild(span);
		return span;
	});
}

/* 
メインストリーム
@param "keydown", e
@return void
*/
window.addEventListener("keydown", e => { // キーボードからの入力は「e.key」に格納されている
    if(e.key === checkTexts[0].textContent) {
        if(!state) return; // 制限時間切れしていないか
        checkTexts[0].className = "add_color"; // 正解した文字は"style.css"で色とサイズを変える
        score++;
        console.log(`Corrected: ${score}`)
        scoreLabel.textContent = score;
        checkTexts.shift(); // 0番目の配列要素を削除して次の1文字を比較対象にする
    }
    else {
        if(!state) return; // 制限時間切れしていないか
        let bool = event.shiftKey;
        if(bool == true){
        }
        else if(bool == false){
            miss++;
            console.log(`Missed: ${miss}`);
            missLabel.textContent = miss;
        }
    }
    // 配列要素が空っぽになったら次の問題を出す
    if(!checkTexts.length) {
        createText();
    }
});

/* 
For Footer year sets
*/
const setYear = () => {
    let thisYear = new Date().getFullYear(); // 現在の西暦を4桁で取得
    currentYear.innerHTML = thisYear;
}

setYear();