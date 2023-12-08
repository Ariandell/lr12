$(document).ready(function() {
    let easyWords = [
        { word: 'Castle', translation: 'замок', image: './easy_words/bonfire.png' },
        { word: 'Dog', translation: 'собака', image: './easy_words/dog.png' },
        { word: 'Cat', translation: 'кіт', image: './easy_words/cat.png' },
        { word: 'Horse', translation: 'кінь', image: './easy_words/horse.png' },
        { word: 'Tree', translation: 'дерево', image: './easy_words/tree.png' },
        { word: 'Book', translation: 'книга', image: './easy_words/book.png' },
        { word: 'Chair', translation: 'стілець', image: './easy_words/chair.png' },
        { word: 'House', translation: 'будинок', image: './easy_words/house.png' },
        { word: 'Bonfire', translation: 'багаття', image: './easy_words/bonfire.png' },
        { word: 'Flower', translation: 'квітка', image: './easy_words/flower.png' },
    ];
    
    let mediumWords = [
        { word: 'Mountain', translation: 'гора', image: './medium_words/mountain.jfif' },
        { word: 'River', translation: 'ріка', image: './medium_words/river.jfif' },
        { word: 'Sunset', translation: 'захід сонця', image: './medium_words/sunset.jfif' },
        { word: 'Ocean', translation: 'океан', image: './medium_words/ocean.jfif' },
        { word: 'City', translation: 'місто', image: './medium_words/сity.jfif' },
        { word: 'Bridge', translation: 'міст', image: './medium_words/bridge.jfif' },
        { word: 'Dolphin', translation: 'дельфін', image: './medium_words/dolphin.jfif' },
        { word: 'Fireworks', translation: 'феєрверки', image: './medium_words/fireworks.jfif' },
        { word: 'Rainbow', translation: 'веселка', image: './medium_words/rainbow.jfif' },
        { word: 'Snowflake', translation: 'сніжинка', image: './medium_words/snowflake.jfif' },
    ];
    let hardWords = [
        { word: 'Nebula', translation: 'туманність', image: './hard_words/nebula.jfif' },
        { word: 'Quasar', translation: 'квазар', image: './hard_words/quasar.jfif' },
        { word: 'Galaxy', translation: 'галактика', image: './hard_words/galaxy.jfif' },
        { word: 'Nanotechnology', translation: 'нанотехнології', image: './hard_words/nano.jfif' },
        { word: 'Alien', translation: 'інопланетянин', image: './hard_words/alien.jfif' },
        { word: 'Asteroid', translation: 'астероїд', image: './hard_words/asteroid.jfif' },
        { word: 'Atom', translation: 'атом', image: './hard_words/atom.jfif' },
        { word: 'Black Hole', translation: 'чорна діра', image: './hard_words/black.jfif' },
        { word: 'Train', translation: 'потяг', image: './hard_words/train.jfif' },
        { word: 'Airplane', translation: 'літак', image: './hard_words/airplane.jfif' },
    ];
    

    let words = [];
    let currentLevel = null;

    document.getElementById('background-music').volume = 0.02;
    var totalWords = words.length;
    var currentWord = null;
    var correctCount = 0;
    var incorrectCount = 0;
    var timeLeft = 5 * 60;

    function updateTimer() {
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;
        $('#timer').text(minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
        timeLeft--;
        if (timeLeft < 0) {
            endGame();
        }
    }

    function endGame() {
        $('#word').text('Кінець!');
        $('#image').hide();
        $('#translation').hide();
        $('#correct').text(correctCount);
        $('#incorrect').text(incorrectCount);
        $('#result').show();
        clearInterval(timer);
    }

    function nextWord() {
        if (words.length === 0) {
            endGame();
            return;
        }
        currentWord = words.splice(Math.floor(Math.random() * words.length), 1)[0];
        $('#word').text(currentWord.word);
        $('#image').attr('src', currentWord.image);
        $('#translation').val('').focus();
        $('#translation').removeClass('correct incorrect');

        let progress = ((totalWords - words.length) / totalWords) * 100;
        $('#progress').css('width', progress + '%');
    }

    $('#translation').on('keydown', function(e) {
        if (e.keyCode === 13) {
            $('#back-cover').css('opacity', '1');
            $('.flip-card-inner').css('transform', 'rotateY(180deg)');
            if ($(this).val().trim().toLowerCase() === currentWord.translation) {
                correctCount++;
                $(this).addClass('correct');
                document.getElementById('correct-sound').play();
            } else {
                incorrectCount++;
                $(this).addClass('incorrect');
                document.getElementById('incorrect-sound').play();
            }
            setTimeout(function() {
                $('.flip-card-inner').css('transform', '');
                $('#back-cover').css('opacity', '0');
                nextWord();
            }, 3000);
        }
    });

    var timer = setInterval(updateTimer, 1000);

    $('#easy-level').on('click', function() {
        currentLevel = easyWords;
        startGame();
    });

    $('#medium-level').on('click', function() {
        currentLevel = mediumWords;
        startGame();
    });

    $('#hard-level').on('click', function() {
        currentLevel = hardWords;
        startGame();
    });

    function startGame() {
        words = currentLevel.slice();
        totalWords = words.length;
        $('#start-screen').hide();
        $('#app').show();
        document.getElementById('background-music').play();
        nextWord();
    }
});
