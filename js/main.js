async function getWords() {
    const wordsResponse = await fetch(`../json/words.json`);
    return await wordsResponse.json();
}

async function selectingWord() {
    const getWords = await getWords().value;
    const wordsArray = ["a", "b", "c", "d", "e", "f",];
    let wordsArrayLengthValue = wordsArray.length;
    let randomNumber = Math.floor(Math.random() * (wordsArrayLengthValue) + 0);
    console.log(`randomNumber: ${randomNumber}`);
    let word = wordsArray[randomNumber];
    console.log(`word: ${word}`);
    selectedWord = document.getElementById("selected_word");
    selectedWord.innerHTML = word;
}

function typingText() {
    let typingText = document.getElementById("typed_text");
    let typingTextValue = typingText.value;
    console.log(typingTextValue);
    let isTrue = isTrue(word, typingTextValue);
    console.log(isTrue);
    let displayText = document.getElementById("display_text");
    if (isTrue) {
        displayText.innerHTML = "You are Right!"
    }
    else {
        displayText.innerHTML = "You are not Right!";
    }
}

function isTrue(word, typingTextValue) {
    if (word === typingTextValue) {
        return true;
    }
    else {
        return false;
    }
}

selectingWord();