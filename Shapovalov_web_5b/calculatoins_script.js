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

function calcAreaTwoSides(a, b, g) {
    console.log(a, b, g);
    area = a*b*(Math.sin(Math.PI * (g/180)) / 2);  //Math.PI * (g/180) converts degrees into radians
    console.log()
    console.log(area)
    return Math.round((area + Number.EPSILON) * 100) / 100;  //(area + Number.EPSILON) makes sure that things like 1.005 round correctly
}

function calcAreaHeight(b, h) {
    console.log(b, h)
    area = (b*h)/2
    console.log(area)
    return Math.ceil(area)
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
            document.getElementById('result-field').innerText = calcAreaTwoSides(a, b, g).toString();
            break;

        case 'task3-button':
            b = parseInt(document.getElementById('base').value);
            h = parseInt(document.getElementById('height').value);
            document.getElementById('result-field').innerText = calcAreaHeight(b, h).toString();
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
            <button class="calc-button" id='calc-button' onclick="calculate()">Calculate</button>`;
        break; 
    }
    document.getElementById('calc-button').addEventListener('click', function () { calculate})
}




document.querySelectorAll('input[name=menu-button]').forEach(element => {
    element.addEventListener('click', () => {
        calcChoice(document.querySelector('input[name=menu-button]:checked').id)
    })
}); 