document.addEventListener('DOMContentLoaded', function() {
    const cardDiv = document.getElementById('card');
    cardDiv.addEventListener('click', displayCardSets);
});
function displayCardSets() {
    document.getElementById('gameSelection').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex';
    document.getElementById('score').style.display = 'block';
    const set1 = document.getElementById('set1');
    const set2 = document.getElementById('set2');
    const cardImages = generateCardImages(); 
    const shuffledSet1 = shuffle([...cardImages]); 
    const shuffledSet2 = shuffle([...cardImages]); 
    createCards(set1, shuffledSet1);
    createCards(set2, shuffledSet2);
}
function generateCardImages() {
    const images = [];
    const imagePaths = [
        'A.avif', 'B.avif', 'C.avif', 'D.avif', 'E.avif',
        'F.avif', 'G.avif', 'H.avif', 'I.avif', 'J.avif',
        'K.avif', 'L.avif', 'M.avif', 'N.avif', 'O.avif'
    ];
    for (let i = 0; i < 15; i++) {
        const image = `images/${imagePaths[i]}`;
        images.push(image);
    }
    return images;
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function createCards(container, images) {
    images.forEach(image => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.image = image; 
        card.style.backgroundImage = `url('images/caback.avif')`; 
        card.addEventListener('click', handleCardClick);
        container.appendChild(card);
    });
}
let firstCard = null;
let secondCard = null;
let score = 0;
let set1CardSelected = false;
let set2CardSelected = false;
function handleCardClick(event) {
    const card = event.target;
    const parentSet = card.parentElement.id;
    if ((parentSet === 'set1' && set1CardSelected) || (parentSet === 'set2' && set2CardSelected)) {
        return;
    }
    if (parentSet === 'set1') set1CardSelected = true;
    if (parentSet === 'set2') set2CardSelected = true;

    if (card.classList.contains('flipped') || card === firstCard) return;

    card.style.backgroundImage = `url('${card.dataset.image}')`; 
    card.classList.add('flipped');
    if (!firstCard) {
        firstCard = card;
    } else if (!secondCard) {
        secondCard = card;
        if (firstCard.dataset.image === secondCard.dataset.image) {
            score++;
            firstCard.removeEventListener('click', handleCardClick);
            secondCard.removeEventListener('click', handleCardClick);
            firstCard = null;
            secondCard = null;
            set1CardSelected = false;
            set2CardSelected = false;
        } else {
            setTimeout(() => {
                firstCard.style.backgroundImage = `url('images/caback.avif')`; 
                secondCard.style.backgroundImage = `url('images/caback.avif')`;
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard = null;
                secondCard = null;
                set1CardSelected = false;
                set2CardSelected = false;
            }, 1000);
        }
        updateScore();
    }
}
function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.innerText = `Score: ${score}`;
}
