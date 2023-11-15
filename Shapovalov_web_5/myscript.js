let smallLetters = /^[a-z]+$/;
let capitalLetters = /^[A-Z]+$/

var animDelay = 0.25

function letterTranslation(letter) {
    if(smallLetters.test(letter) || capitalLetters.test(letter)) {
        letterImage = document.createElement('img')
        letterImage.setAttribute('style', '--anim-delay:' + animDelay + 's')
        document.getElementById('result-text').appendChild(letterImage)
    if(smallLetters.test(letter)) {
        letterImage.src = './images/small_' + letter + '.png'
    }
    if(capitalLetters.test(letter)) {
        letterImage.src = './images/' + letter + '.png'
    }
    }
    if(letter == ' ') {
        emptySpan = document.createElement('span')
        emptySpan.setAttribute('style', '--anim-delay:' + animDelay + 's')
        document.getElementById('result-text').appendChild(emptySpan)
    }
    animDelay += 0.25
}

function animationTimer() {
    for (let i = 0; i <= document.getElementById('result-text').innerHTML.length; i++) {
        
     }
}

function clearText(element) {
    element.remove 
}


function letterConversion(input) {
    input = document.getElementById('source-text').value
    const myArray = input.split("");
    animDelay = 0.25
    document.getElementById('result-text').innerHTML = ''
    myArray.map(letterTranslation)
    animationTimer
}