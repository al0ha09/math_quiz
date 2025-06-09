document.getElementById('startButton').addEventListener('click', startQuiz);
document.getElementById('submitAnswer').addEventListener('click', submitAnswer);
document.getElementById('answerInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        submitAnswer();
    }
});

let examples = [];
let currentExampleIndex = 0;
let solvedExamples = [];
let errors = [];
let totalExamplesShown = 0; // Счетчик общего количества примеров

function startQuiz() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    generateExamples();
    displayExample();
}

function generateExamples() {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let i = 0; i < 10; i++) {
        let addend1 = getRandomInt(0, 100);
        let addend2 = getRandomInt(0, 100);
        examples.push({ id: examples.length + 1, question: `${addend1} + ${addend2}`, answer: addend1 + addend2 });

        let minuend = getRandomInt(0, 100);
        let subtrahend = getRandomInt(0, 100);
        examples.push({ id: examples.length + 1, question: `${minuend} - ${subtrahend}`, answer: minuend - subtrahend });
    }

    for (let i = 0; i < 5; i++) {
        let factor1 = getRandomInt(5, 10);
        let factor2 = getRandomInt(5, 10);
        examples.push({ id: examples.length + 1, question: `${factor1} * ${factor2}`, answer: factor1 * factor2 });

        let dividend, divisor;
        do {
            dividend = getRandomInt(5, 10) * getRandomInt(5, 10);
            divisor = getRandomInt(5, 10);
        } while (dividend % divisor !== 0);
        examples.push({ id: examples.length + 1, question: `${dividend} / ${divisor}`, answer: dividend / divisor });
    }

    for (let i = 0; i < 7; i++) {
        let addend1 = getRandomInt(100, 150);
        let addend2 = getRandomInt(100, 150);
        examples.push({ id: examples.length + 1, question: `${addend1} + ${addend2}`, answer: addend1 + addend2 });

        let minuend = getRandomInt(100, 150);
        let subtrahend = getRandomInt(100, 150);
        examples.push({ id: examples.length + 1, question: `${minuend} - ${subtrahend}`, answer: minuend - subtrahend });
    }

    for (let i = 0; i < 4; i++) {
        let factor1 = getRandomInt(10, 15);
        let factor2 = getRandomInt(10, 15);
        examples.push({ id: examples.length + 1, question: `${factor1} * ${factor2}`, answer: factor1 * factor2 });

        let dividend, divisor;
        do {
            dividend = getRandomInt(10, 15) * getRandomInt(10, 15);
            divisor = getRandomInt(10, 15);
        } while (dividend % divisor !== 0);
        examples.push({ id: examples.length + 1, question: `${dividend} / ${divisor}`, answer: dividend / divisor });
    }

    for (let i = 0; i < 4; i++) {
        let addend1 = getRandomInt(150, 200);
        let addend2 = getRandomInt(150, 200);
        examples.push({ id: examples.length + 1, question: `${addend1} + ${addend2}`, answer: addend1 + addend2 });

        let minuend = getRandomInt(150, 200);
        let subtrahend = getRandomInt(150, 200);
        examples.push({ id: examples.length + 1, question: `${minuend} - ${subtrahend}`, answer: minuend - subtrahend });
    }

    for (let i = 0; i < 2; i++) {
        let factor1 = getRandomInt(15, 20);
        let factor2 = getRandomInt(15, 20);
        examples.push({ id: examples.length + 1, question: `${factor1} * ${factor2}`, answer: factor1 * factor2 });

        let dividend, divisor;
        do {
            dividend = getRandomInt(15, 20) * getRandomInt(15, 20);
            divisor = getRandomInt(15, 20);
        } while (dividend % divisor !== 0);
        examples.push({ id: examples.length + 1, question: `${dividend} / ${divisor}`, answer: dividend / divisor });
    }
}

function displayExample() {
    if (currentExampleIndex < examples.length) {
        document.getElementById('exampleContainer').innerText = examples[currentExampleIndex].question;
        totalExamplesShown++; // Увеличиваем счетчик общего количества примеров
        document.getElementById('totalExamples').innerText = totalExamplesShown; // Обновляем отображение
    } else {
        endQuiz();
    }
}

function submitAnswer() {
    let userAnswer = document.getElementById('answerInput').value;
    if (userAnswer.trim() === '') {
        alert('Пожалуйста, введите ответ.');
        return;
    }

    let correctAnswer = examples[currentExampleIndex].answer;

    if (parseInt(userAnswer) === correctAnswer) {
        solvedExamples.push(examples[currentExampleIndex]);
    } else {
        errors.push(examples[currentExampleIndex]);
    }

    document.getElementById('errors').innerText = errors.length;
    document.getElementById('solvedCount').innerText = solvedExamples.length;

    document.getElementById('answerInput').value = '';
    currentExampleIndex++;
    displayExample();
}

emailjs.init("0QlCTaHzCBhXalJZX");

function endQuiz() {
    let now = new Date();
    let date = now.toLocaleDateString();
    let time = now.toLocaleTimeString();

    let result = {
        date: date,
        time: time,
        correctCount: solvedExamples.length,
        incorrectCount: errors.length,
        incorrectExamples: errors.map(e => e.question)
    };

    sendEmail(result);
}

function sendEmail(result) {
    emailjs.send("service_4f4s5al", "template_zxutgmf", {
        "to_email": "aleksey03012012@gmail.com",
        "date": result.date,
        "time": result.time,
        "correctCount": result.correctCount,
        "incorrectCount": result.incorrectCount,
        "incorrectExamples": result.incorrectExamples.join("\n")
    }).then(function (response) {
        console.log("Email sent successfully!", response);
    }, function (error) {
        console.error("Error sending email:", error);
    });
}
