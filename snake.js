document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('snakeGameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('snakeScore');
    const gridSize = 20; 
    const snakeImage = new Image();
    const foodImage = new Image();
    snakeImage.src = 'snake.jpg'; 
    foodImage.src = 'rabbit.jpg'; 
    const imageSize = 35; 
    let snake = [{ x: 5, y: 5 }];
    let direction = { x: 0, y: 0 };
    let food = { x: 10, y: 10 };
    let score = 0;
    canvas.width = 400;
    canvas.height = 400;
    snakeImage.onload = () => {
        foodImage.onload = () => {
            gameLoop();
        };
    };
    function gameLoop() {
        update();
        draw();
        setTimeout(gameLoop, 1000); 
    }
    function update() {
        const head = { ...snake[0] };
        head.x += direction.x;
        head.y += direction.y;
        if (head.x === food.x && head.y === food.y) {
            snake.push({});
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
            generateFood();
        } else {
            snake.pop();
        }
        snake.unshift(head);
        if (
            head.x < 0 || head.x >= canvas.width / imageSize ||
            head.y < 0 || head.y >= canvas.height / imageSize ||
            snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
        ) {
            resetGame();
        }
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.forEach(segment => {
            ctx.drawImage(snakeImage, segment.x * imageSize, segment.y * imageSize, imageSize, imageSize);
        });

        ctx.drawImage(foodImage, food.x * imageSize, food.y * imageSize, imageSize, imageSize);
    }
    function generateFood() {
        food.x = Math.floor(Math.random() * canvas.width / imageSize);
        food.y = Math.floor(Math.random() * canvas.height / imageSize);
    }
    function resetGame() {
        snake = [{ x: 5, y: 5 }];
        direction = { x: 0, y: 0 };
        score = 0;
        scoreDisplay.innerText = `Score: ${score}`;
        generateFood();
    }
    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (direction.y === 0) direction = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                if (direction.y === 0) direction = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                if (direction.x === 0) direction = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                if (direction.x === 0) direction = { x: 1, y: 0 };
                break;
        }
    });
});
