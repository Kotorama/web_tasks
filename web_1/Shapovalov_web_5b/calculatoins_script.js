function calcHeron(a, b, c) {
    if (a+b<= c || b+c<=a || c+a<=b){
        return 'Triangle doesnt exist!'
    }
    console.log(a, b, c) ;
    s = (a + b + c) / 2,
    area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    console.log(s)
    console.log('area is ' + area);
    return Math.ceil(area);
}

function calcAreaByTwoSidesAndAngle(a, b, g) {
    console.log(a, b, g);
    area = a*b*(Math.sin(Math.PI * (g/180)) / 2);  //Math.PI * (g/180) converts degrees into radians
    console.log()
    console.log(area)
    return Math.round((area + Number.EPSILON) * 100) / 100;  //(area + Number.EPSILON) makes sure that things like 1.005 round correctly
}

function calcAreaByHeight(b, h) {
    console.log(b, h)
    area = (b*h)/2
    console.log(area)
    return Math.ceil(area)
}

function calcAreaByThreeSidesAndRadius(a, b, c, r) {
    area = (a*b*c)/(4*r)
    return Math.ceil(area);
}

function reverse(s){
    return s.split("").reverse().join("");
}

function isPalindrome(string) {
    if (string.toLowerCase() === reverse(string).toLowerCase()) {
        return 'True'
    }
    else {
        return 'False'
    }
}

function isAnagram(word1, word2) {
    if (word1.split("").sort().join("").toLowerCase() === word2.split("").sort().join("").toLowerCase()) {
        return 'True'
    }
    else {
        return 'False'
    }
}

function fibonacciByIndex(index) {
    fib = [0, 1]
    for (let i = 1; i < index; i++) {
        fib.push(fib[fib.length - 1] + fib[fib.length - 2])
      }
    return fib[index]
}

function isFibonacci(c) {
    a = 0;
    b = 1;

    while(c > b) {
        console.log(a, b)
        a = a + b
        b = [a, a = b][0]; 
    }

    if (c == b || c == 0) {
        return 'True'
    }

    else {
        return 'False'
    }
}

function calculate() {
    console.log('calculate works')
    switch (document.querySelector('input[name=menu-button]:checked').id) {
        case 'task1-button':
            a = parseInt(document.getElementById('edge1').value);
            b = parseInt(document.getElementById('edge2').value);
            c = parseInt(document.getElementById('edge3').value);
            document.getElementById('result-field').innerText = calcHeron(a, b, c).toString();
            break;

        case 'task2-button':
            a = parseInt(document.getElementById('side1').value);
            b = parseInt(document.getElementById('side2').value);
            g = parseInt(document.getElementById('angle').value);
            document.getElementById('result-field').innerText = calcAreaByTwoSidesAndAngle(a, b, g).toString();
            break;

        case 'task3-button':
            b = parseInt(document.getElementById('base').value);
            h = parseInt(document.getElementById('height').value);
            document.getElementById('result-field').innerText = calcAreaByHeight(b, h).toString();
            break;

        case 'task4-button':
            a = parseInt(document.getElementById('edge1').value);
            b = parseInt(document.getElementById('edge2').value);
            c = parseInt(document.getElementById('edge3').value);
            r = parseInt(document.getElementById('radius').value);
            document.getElementById('result-field').innerText = calcAreaByThreeSidesAndRadius(a, b, c, r).toString();
            break;

        case 'task5-button':
            number = document.getElementById('number').value.toString();
            document.getElementById('result-field').innerText = isPalindrome(number);
            break;

        case 'task6-button':
            word1 = document.getElementById('word1').value.toString();
            word2 = document.getElementById('word2').value.toString();
            document.getElementById('result-field').innerText = isAnagram(word1, word2);
            break;

        case 'task7-button':
            index = document.getElementById('index').value;
            document.getElementById('result-field').innerText = fibonacciByIndex(index);
            break;

        case 'task8-button':
            number = document.getElementById('number').value;
            document.getElementById('result-field').innerText = isFibonacci(number);
            break;
    }
}

function calcChoice(elementId) {
    switch (elementId) {
        case 'task1-button' :
            console.log('it happened')
            document.getElementById('calc-cont').innerHTML = ' ';
            document.getElementById('calc-cont').innerHTML = ` 
                <div class="input-wrapper">
                    <p class="input-title">AB</p>
                    <input type="number" min="0" step="1" id="edge1"/>
                </div>
                <div class="input-wrapper">
                    <p class="input-title">BC</p>
                    <input type="number" min="0" step="1" id="edge2"/>
                </div>
                <div class="input-wrapper">
                    <p class="input-title">CD</p>
                    <input type="number" min="0" step="1" id="edge3"/>
                </div>
                <div class="calc-result">
                    <p class='result-title'>Result:</p>
                    <p id="result-field"> </p>
                </div>
                <button class="calc-button" id='calc-button' onclick="calculate()">Calculate</button>
                `;
        break;

        case 'task2-button' :
            document.getElementById('calc-cont').innerHTML = ' ';
        document.getElementById('calc-cont').innerHTML = ` 
            <div class="input-wrapper">
            <p class="input-title">Side A</p>
            <input type="number" min="0" step="1" id="side1"/>
            </div>
            <div class="input-wrapper">
                <p class="input-title">Base B</p>
                <input type="number" min="0" step="1" id="side2"/>
            </div>
            <div class="input-wrapper">
                <p class="input-title">Angle G</p>
                <input type="number" min="0" step="1" id="angle"/>
            </div>
            <div class="calc-result">
                <p class='result-title'>Result:</p>
                <p id="result-field"> </p>
            </div>
            <button class="calc-button" id='calc-button' onclick="calculate()">Calculate</button>
            `;
        break;

        case 'task3-button' :
            document.getElementById('calc-cont').innerHTML = ' ';
            document.getElementById('calc-cont').innerHTML = ` 
            <div class="input-wrapper">
                <p class="input-title">Base B</p>
                <input type="number" min="0" step="1" id="base"/>
            </div>
            <div class="input-wrapper">
                <p class="input-title">Height H</p>
                <input type="number" min="0" step="1" id="height"/>
            </div>
            <div class="calc-result">
                    <p class='result-title'>Result:</p>
                    <p id="result-field"> </p>
            </div>
            <button class="calc-button" id='calc-button' onclick="calculate()">Calculate</button>
            `;
        break; 

        case 'task4-button' :
            document.getElementById('calc-cont').innerHTML = ' ';
            document.getElementById('calc-cont').innerHTML = ` 
            <div class="input-wrapper">
                <p class="input-title">AB</p>
                <input type="number" min="0" step="1" id="edge1"/>
            </div>
            <div class="input-wrapper">
                <p class="input-title">BC</p>
                <input type="number" min="0" step="1" id="edge2"/>
            </div>
            <div class="input-wrapper">
                <p class="input-title">CD</p>
                <input type="number" min="0" step="1" id="edge3"/>
            </div>
            <div class="input-wrapper">
                <p class="input-title">Radius</p>
                <input type="number" min="0" step="1" id="radius"/>
            </div>
            <div class="calc-result">
                <p class='result-title'>Result:</p>
                <p id="result-field"> </p>
            </div>
            <button class="calc-button" id='calc-button' onclick="calculate()">Calculate</button>
            `;
        break;

        case 'task5-button' :
            document.getElementById('calc-cont').innerHTML = ' ';
            document.getElementById('calc-cont').innerHTML = ` 
            <div class="input-wrapper">
                <p class="input-title">Number</p>
                <input type="number" min="0" step="1" id="number"/>
            </div>
            <div class="calc-result">
                <p class='result-title'>Is palindrome:</p>
                <p id="result-field"> </p>
            </div>
            <button class="calc-button" id='calc-button' onclick="calculate()">Calculate</button>
            `;
        break;

        case 'task6-button' :
            document.getElementById('calc-cont').innerHTML = ' ';
            document.getElementById('calc-cont').innerHTML = ` 
            <div class="input-wrapper">
                <p class="input-title">Word 1</p>
                <input type="text" onkeydown="return /[a-z]/i.test(event.key)" id="word1"/>
            </div>
            <div class="input-wrapper">
                <p class="input-title">Word 2</p>
                <input type="text" onkeydown="return /[a-z]/i.test(event.key)" id="word2"/>
            </div>
            <div class="calc-result">
                <p class='result-title'>Is anagram:</p>
                <p id="result-field"> </p>
            </div>
            <button class="calc-button" id='calc-button' onclick="calculate()">Calculate</button>
            `;
        break;

        case 'task7-button' :
            document.getElementById('calc-cont').innerHTML = ' ';
            document.getElementById('calc-cont').innerHTML = ` 
            <div class="input-wrapper">
                <p class="input-title">Fibonacci index</p>
                <input type="number" min="0" step="1" id="index"/>
            </div>
            <div class="calc-result">
                <p class='result-title'>Fibonacci number:</p>
                <p id="result-field"> </p>
            </div>
            <button class="calc-button" id='calc-button' onclick="calculate()">Calculate</button>
            `;
        break;

        case 'task8-button' :
            document.getElementById('calc-cont').innerHTML = ' ';
            document.getElementById('calc-cont').innerHTML = ` 
            <div class="input-wrapper">
                <p class="input-title">Number</p>
                <input type="number" min="0" step="1" id="number"/>
            </div>
            <div class="calc-result">
                <p class='result-title'>Is Fibonacci:</p>
                <p id="result-field"> </p>
            </div>
            <button class="calc-button" id='calc-button' onclick="calculate()">Calculate</button>
            `;
        break;
    }
    document.getElementById('calc-button').addEventListener('click', function () { calculate})
}




document.querySelectorAll('input[name=menu-button]').forEach(element => {
    element.addEventListener('click', () => {
        calcChoice(document.querySelector('input[name=menu-button]:checked').id)
    })
}); 