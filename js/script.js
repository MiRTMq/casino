
const easyWords = [
    { word: 'Hello', translation: 'Привіт' },
    {word: 'Sun', translation: 'Сонце'},
    {word: 'Book', translation: 'Книга'},
    {word: 'Air', translation: "Повітря"},
    {word: 'Water', translation: 'Вода'},
    {word: 'Tree', translation: 'Дерево'},
    {word: 'Friend', translation: 'Друг'},
    {word: 'Table', translation: 'Стіл'},
    {word: 'Home', translation: 'Дім'},
    {word: 'Orange', translation: 'Апельсин'}
   
];

const mediumWords = [
    { word: 'Guitar', translation: 'Гітара' },
    { word: 'Mountain', translation: 'Гора' },
    { word: 'Book', translation: 'Книга' },
    { word: 'River', translation: 'Ріка' },
    { word: 'City', translation: 'Місто' },
    { word: 'Adventure', translation: 'Пригода' },
    { word: 'Ocean', translation: 'Океан' },
    { word: 'Camera', translation: 'Камера' },
    { word: 'Music', translation: 'Музика' },
    { word: 'Movie', translation: 'Фільм' }
    // Додайте інші слова за аналогією
];

const hardWords = [
    { word: 'Chandelier', translation: 'Люстра' },
    { word: 'Hieroglyphics', translation: 'Ієрогліфи' },
    { word: 'Extraterrestrial', translation: 'Позаземний' },
    { word: 'Psychiatrist', translation: 'Психіатр' },
    { word: 'Anesthesiology', translation: 'Анестезіологія' },
    { word: 'Pharmaceutical', translation: 'Фармацевтичний' },
    { word: 'Entrepreneurship', translation: 'Підприємництво' },
    { word: 'Surreptitious', translation: 'Таємничий' },
    { word: 'Ubiquitous', translation: 'Всюдисущий' },
    { word: 'Quizzaciously', translation: 'Загадково' }
];



$(document).ready(function () {

    let currentStep = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let selectedDifficulty = $('#difficultySelect').val();
    let randWords;

    //першу картку 
    setDifficulty();
    displayFlashcard();

    $('#difficultySelect').on('change', function () { 
        
        selectedDifficulty = $('#difficultySelect').val();
        setDifficulty();
       
        currentStep = 0;
        correctCount = 0;
        incorrectCount = 0;
        $("#incorrectCount").text(incorrectCount);
        $("#correctCount").text(correctCount);
        $("#current").text(currentStep);
        displayFlashcard();
    });
    
    $("#left").text(randWords.length);
    

    console.log(randWords);
    // Кнопка і Enter
    $('#checkAnswersBtn').on('click', function (){inputHandler()});
    $(document).on('keydown','.translation-input', function (e) {if (e.which === 13) {     
        inputHandler();}});
        
    function inputHandler(){
        const userTranslation = $('.translation-input').val().trim().toLowerCase();
        const correctTranslation = randWords[currentStep].translation.toLowerCase();

        console.log(correctTranslation+ " = "+ userTranslation);
        if (userTranslation === correctTranslation) {
            correctCount++;
        } else {
            incorrectCount++;
        }
        $("#incorrectCount").text(incorrectCount);
        $("#correctCount").text(correctCount);
        $("#current").text(currentStep+1);
        
        
        currentStep++;
        
        if (currentStep < randWords.length) {
            // наступну картку
            
            displayFlashcard();
            $('.translation-input').focus();
        } else {
           
            showModal();
        }
}
    
    function setDifficulty(){
        switch(selectedDifficulty){
        case 'easy':
            randWords = shuffleArray(easyWords);
        break;
        case 'medium':
            randWords = shuffleArray(mediumWords); 
        break;
        case 'hard':
            randWords = shuffleArray(hardWords); 
        break;
        default:
            randWords = shuffleArray(easyWords);
        break;
    }

    }

    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    function displayFlashcard() {
       
        const card = `
            <div class="col-md-12">
                <div class="card text-center bg-dark text-light">
                    <div class="card-body">
                        <h5 class="card-title">${randWords[currentStep].word}</h5>
                        <input type="text" class="form-control translation-input" placeholder="Введіть переклад">
                    </div>
                </div>
            </div>
        `;

        $('#flashcards').html(card);
    }

    //modal
    function showModal() {
  
        const levelResult = `
            Ваш рівень знань мови:<br>
            Вибрано рівень складності: ${selectedDifficulty}<br>
            Правильно: ${correctCount}<br>
            Неправильно: ${incorrectCount}<br>
            Успішність ${Math.round((correctCount / easyWords.length)*100, 2)+'%'}
        `;
        $('#levelResult').html(levelResult);
        $('#levelModal').modal('show');
    }

     $('#levelModal').on('hidden.bs.modal', function () {
        location.reload(true); 
    });

     
});
