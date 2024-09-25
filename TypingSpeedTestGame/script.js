const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");
    
let timer,
maxTime = 120,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;


function randomParagraph() {
    //getting randam number and it will always less than the paragraphs length
    let randIndex = Math.floor(Math.random() * paragraphs.length);

             typingText.innerHTML = "";
    //getting the randim items from the paragraphs  array, splitting all characters of it , adding each character inside span and then adding this span inside p tag.
    paragraphs[randIndex].split("").forEach(span => {
         let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    //focusing input field on keydown or event
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());


}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length-1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000),
            isTyping  = true;
        }

    //if user hasn't entered any character or pressed backspace
    
    if(typedChar == null){
        if(charIndex >0 ) {
         charIndex--;
       if(characters[charIndex].classList.contains("incorrecrt")){
        mistakes--;
       }
       characters[charIndex].classList.remove("correct", "incorrect");

    }
}
    else {
         if (characters[charIndex].innerText === typedChar) {
        //if typed user characters and shown character matched then add the 
        //correct class else add the incorrect class
        characters[charIndex].classList.add("correct");
    } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");

    }
    charIndex++;    // increment charIndex either user typed correct or incorrect character
}
    characters.forEach(span  => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    let wpm = Math.round(((charIndex - mistakes)  /5) / (maxTime - timeLeft) * 120);
    wpm = wpm < 0 || !wpm  || wpm === infinity ? 0 : wpm;

    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;

}
else {
    clearInterval(timer);
    inpField.value = "";
    }
}

function initTimer () {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  /5) / (maxTime - timeLeft) * 120);
        wpmTag.innerText = wpm;
    }
    else {
        clearInterval(timer);
    }
}

function resetGame () {
    randomParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value =  "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}






randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame)





