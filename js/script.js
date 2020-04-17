const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lock = false;
let start = false;
let firstCard, secondCard;
let time = 0;

const step = () => {
    time = time + 1;
    document.querySelector('.timer').innerHTML = formatTime(time);
}

formatTime = (t) => {
    const minutes = Math.floor(t / 60) % 60;
    const seconds = (t % 60);
    let formatedTime = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    return formatedTime;
}

const startTimer = () => {
    id = setInterval(step, 1000);
}

const stopTimer = () => {
    clearInterval(id);
}

startTimer();

function flipCard() {
    if (lock) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
    if (document.querySelectorAll('.card.flip').length == 16) {
        setTimeout(function () {
            stopTimer();
            document.querySelector('.overlay').classList.add('display');
            document.querySelector('.playertime').innerHTML = formatTime(time);
        }, 500);
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    reset();
}

function unflipCards() {
    lock = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        reset();
    }, 1200);
}

function reset() {
    [hasFlippedCard, lock] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 16);
        card.style.order = ramdomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

document.querySelector('.restart').addEventListener('click', function () {
    window.location.reload(true);
});