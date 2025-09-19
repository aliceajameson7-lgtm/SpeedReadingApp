const randomParagraph = document.querySelector('#randomParagraph');
const startBtn = document.querySelector('#startBtn');
const stopBtn = document.querySelector('#stopBtn');
const generateBtn = document.querySelector('#generateBtn');
const timeDisplay = document.querySelector('#timeDisplay');
const deleteTime = document.querySelector('#deleteTime');
const beginQuickReadBtn = document.querySelector('#beginQuickReadBtn');
const stopQuickReadBtn = document.querySelector('#stopQuickReadBtn');
const quickReader = document.querySelector('#quickReader');
const speed = document.querySelector('#speed');
const allTimes = document.querySelector('#allTimes');
const averageDisplay = document.querySelector('#averageDisplay');
const form = document.querySelector('#form');
let wordsPerSecond;
let startTime;
let seconds;
let paragraph;
async function fetchParagraph(){
    randomParagraph.textContent = "loading..."
    const res = await fetch('https://speedreadingapp.onrender.com/randomGeneration')
    paragraph = await res.json();
    paragraph = paragraph.answer;
    randomParagraph.textContent = paragraph;
    
}
async function stop() {
    const time = Date.now() - startTime;
    seconds = Math.floor(time / 1000);
    let words = paragraph.split(" ");
    wordsPerSecond = Math.round(words.length / seconds * 10) / 10;
    timeDisplay.textContent = `Time: ${seconds} Seconds | WPS: ${wordsPerSecond}`;
    const res = await fetch('https://speedreadingapp.onrender.com/times', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seconds }),
    });
    console.log(res);
    displayTime()
}
async function displayTime() {
    const allTimes = document.querySelector('#allTimes');
    const averageDisplay = document.querySelector('#averageDisplay');
    allTimes.innerHTML = '';
    averageDisplay.textContent = '';
    const res = await fetch('https://speedreadingapp.onrender.com/times');
    const timeData = await res.json();
    let total = await timeData.reduce((acc, curr) => acc + curr.time, 0);
    total = Math.floor(total / timeData.length);
    if(timeData.length === 0){
        averageDisplay.textContent = "No current times";
        allTimes.textContent = '';
    } else {
        averageDisplay.textContent = `Average Time (Seconds): ${total}`;
        allTimes.textContent = `Total Trys: ${timeData.length}`;
    }
}
async function clearDatabase() {
    const res = await fetch('https://speedreadingapp.onrender.com/times/Truncate');
    console.log('Database Cleared');
    displayTime()
}


function start( ) {
    startTime = Date.now();
    timeDisplay.textContent = '';

}
function startQuickRead() {
    readerIsRunning = true;
    let setSpeed = speed.value;
    const stop = () => {
        clearInterval(beginSpeedRead);
        quickReader.textContent = '';
        console.log(startPoint);
        console.log(arrayLengthMinus1);
    }
    stopQuickReadBtn.addEventListener('click', () => {
        stop();
        readerIsRunning = false;

    })
    let startPoint = 0;
    let arrayLengthMinus1 = 0;
    const words = paragraph.split(" ")
    arrayLengthMinus1 = words.length - 1
    startPoint = words.length - arrayLengthMinus1;
    quickReader.textContent = words[0]
    const beginSpeedRead = setInterval(() => {
        quickReader.textContent = words[startPoint];
        startPoint++;
        if (startPoint === words.length || readerIsRunning === false){
            stop()
            readerIsRunning = true;
        }
    }, setSpeed);
}
async function setGradeLevel(e) {
    e.preventDefault()
    const formData = new FormData(form);
    const selectedGrade = formData.get('gradeLevelInput');
    const res = await fetch('https://speedreadingapp.onrender.com/randomGeneration/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedGrade }),
    });
    console.log(res)
}

form.addEventListener('submit', setGradeLevel);
beginQuickReadBtn.addEventListener('click', startQuickRead);
deleteTime.addEventListener('click', clearDatabase);
startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);

generateBtn.addEventListener('click', fetchParagraph);

