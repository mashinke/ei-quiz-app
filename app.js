'use strict';

/**
 * Example store structure
 */
const STORE = {
  title: 'Random Trivia Quiz',
  welcomeText: 'Can you answer some totally unexpected questions?',
  questions: [
    {
      question: 'Which animal does not appear in the Chinese zodiac?',
      answers: ['Dragon', 'Rabbit', 'Dog', 'Hummingbird'],
      correctAnswer: 'Hummingbird',
    },
    {
      question: 'Which Olympic sport is Michael Phelps known for?',
      answers: ['Snowboarding', 'Skiing', 'Running', 'Swimming'],
      correctAnswer: 'Swimming',
    },
    {
      question: '"I see dead people," is a line from which horror film…',
      answers: ['The Sixth Sense', 'The Grudge', 'The Shining', 'The Exorcist'],
      correctAnswer: 'The Sixth Sense',
    },
    {
      question:
        'Which one of these characters aren\'t a part of the Friends group?',
      answers: ['Rachel', 'Joey', 'Gunther', 'Monica'],
      correctAnswer: 'Gunther',
    },
    {
      question: 'Fe is the chemical symbol for..',
      answers: ['Zinc', 'Hydrogen', 'Fluorine', 'Iron'],
      correctAnswer: 'Iron',
    },
  ],
  state: {
    score: 0,
    currentIndex: 0,
    answer: '',
    message: ''
  },
};
/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
function generateWelcomeViewTemplate() {
  return `
  <p>${STORE.welcomeText}</p>
  <button id="start-quiz">Start Quiz</button>`;
}

function generateQuestionTemplate(index) {
  let question = STORE.questions[index];
  let answers = question.answers.map(generateAnswerElement).join('');
  let submitButton =
    '<input type="submit" id="select-answer" value="Select Answer" class="submit-button">';
  return `
  ${generateHeaderTemplate()}
  <form>
    <div class="choices">
      ${answers}
    </div>
    ${submitButton}
  </form>
  ${generateFooterTemplate()}
  `;
}

function generateAnswerElement(answer) {
  return `
    <p class="answer-item">
      <input type="radio" id="${answer}" name="answer" value="${answer}"> 
      <label for="${answer}">${answer}</label>
    </p>
  `;
}

function generateFeedbackTemplate(feedback) {
  let button = '<button id="next-question">Next Question</button>';
  if (STORE.state.currentIndex + 1 === STORE.questions.length) {
    button = '<button id="results">Results</button>';
  }
  return `
  ${generateHeaderTemplate()}
    <p>${feedback}</p>
    <p>${button}</p>
    ${generateFooterTemplate()}
  `;
}

function generateResultTemplate() {
  let finalScore = STORE.state.score;
  let totalQuestions = STORE.questions.length;
  return `
  <header><h2>Final Score</h2></header>
  <p>${finalScore / totalQuestions > .5 ? 'Congratulations! ' : '' }You answered ${finalScore} questions out of ${totalQuestions} correctly!</p>
  <button id="start-over">Start Over</button>
  `;
}

function generateHeaderTemplate() {
  return `<header><h2>${STORE.questions[STORE.state.currentIndex].question}</h2></header>`;
}

function generateFooterTemplate() {
  let attempts = STORE.state.currentIndex;
  let currentQuestion = attempts + 1;
  let message = STORE.state.message;
  if (STORE.state.answer) {
    attempts++;
  }
  return `
  <footer>
    ${message ? `<p class="message">${message}</p>` : ''}
    <p>Current score: ${STORE.state.score} corrent answers out of ${attempts} attempted</p>
    <p>Current question: ${currentQuestion} out of ${STORE.questions.length}</p>
  </footer>`;
}

/********** VIEW FUNCTION **********/

// These functions will return the views to render

function welcomeView() {
  let welcomeViewTemplate = generateWelcomeViewTemplate();
  return welcomeViewTemplate;
}

function questionView() {
  let questionTemplate = generateQuestionTemplate(STORE.state.currentIndex);
  return questionTemplate;
}

function feedbackView() {
  let correctAnswer = STORE.questions[STORE.state.currentIndex].correctAnswer;
  let feedbackTemplate = '';
  if (STORE.state.answer === correctAnswer) {
    STORE.state.score++;
    feedbackTemplate = generateFeedbackTemplate(`${correctAnswer} is correct!`);
  } else {
    feedbackTemplate = generateFeedbackTemplate(`Wrong Answer. The correct answer is 
      ${correctAnswer}`);
  }
  STORE.state.currentIndex++;
  return feedbackTemplate;
}

function resultView() {
  let resultTemplate = generateResultTemplate();
  return resultTemplate;
}
/********** RENDER FUNCTION(S) **********/

function render(currentView) {
  $('h1, title').html(STORE.title);
  let html = currentView();
  $('main').html(html);
  STORE.state.message = '';
}

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

function handleStartQuiz() {
  $('main').on('click', '#start-quiz', (event) => {
    event.preventDefault();
    render(questionView);
  });
}

function handleNextQuestion() {
  $('main').on('click', '#next-question', (event) => {
    event.preventDefault();
    STORE.state.answer = null;
    render(questionView);
  });
}

function handleSelectAnswer() {
  $('main').on('click', '#select-answer', (event) => {
    event.preventDefault();
    let answer = $('input[name="answer"]:checked').val();
    if (answer) {
      STORE.state.answer = answer;
      render(feedbackView);
    } else {
      STORE.state.message = 'Please select an answer';
      render(questionView);
    }
  });
}

function handleResultButton() {
  $('main').on('click', '#results', (event) => {
    event.preventDefault();
    render(resultView);
  });
}

function handleStartOverButton() {
  $('main').on('click', '#start-over', (event) => {
    event.preventDefault();
    STORE.state = {
      score: 0,
      currentIndex: 0,
      answer: '',
      message: ''
    };
    render(welcomeView);
  });
}

function main() {
  handleSelectAnswer();
  handleStartQuiz();
  handleNextQuestion();
  handleResultButton();
  handleStartOverButton();
  render(welcomeView);
}

$(main);