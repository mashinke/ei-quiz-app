/* eslint-disable no-console */
'use strict';

/**
 * Example store structure
 */
const STORE = {
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
  return '<button id="start-quiz">Start Quiz</button>';
}

function generateQuestionTemplate(index) {
  console.log('generate question template');
  let question = STORE.questions[index];
  let answers = question.answers.map(generateAnswerElement).join('');
  let submitButton =
    '<input type="submit" id="select-answer" value="Select Answer">';
  return `
  ${generateHeaderTemplate()}
  <form>
    ${answers}
    ${submitButton}
  </form>
  ${generateFooterTemplate()}
  `;
}

function generateAnswerElement(answer) {
  console.log('generate answer template');
  return `
    <p>
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
    ${generateFooterTemplate()};
  `;
}

function generateResultTemplate() {
  console.log('result template page ran');
  return `
  <h2>SCORE: </h2>
  <p>${STORE.state.score}/${STORE.questions.length}</p>
  <button id="start-over">Start Over</button>
  `;
}

function generateHeaderTemplate() {
  return `<header><h2>${STORE.questions[STORE.state.currentIndex].question}</h2></header>`;
}

function generateFooterTemplate() {
  let attempts = STORE.state.currentIndex;
  let currentQuestion = attempts;
  let message = STORE.state.message;
  console.log('answer ', STORE.state.answer);
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

/********** VIEW FUNCTION(S) **********/

// These functions will return the views to render

function welcomeView() {
  console.log('welcomeView has run');
  let welcomeViewTemplate = generateWelcomeViewTemplate();
  return welcomeViewTemplate;
}

function questionView() {
  console.log('questionView has run on question ', STORE.state.currentIndex);
  let questionTemplate = generateQuestionTemplate(STORE.state.currentIndex);
  return questionTemplate;
}

function feedbackView() {
  console.log('feedback view ran');
  console.log('state: ', STORE.state);
  let correctAnswer = STORE.questions[STORE.state.currentIndex].correctAnswer;
  let feedbackTemplate = '';
  if (STORE.state.answer === correctAnswer) {
    console.log('right answer');
    STORE.state.score++;
    feedbackTemplate = generateFeedbackTemplate('Correct!');
  } else {
    console.log('wrong answer');
    feedbackTemplate = generateFeedbackTemplate(`Wrong Answer. The correct answer is 
      ${correctAnswer}`);
  }
  STORE.state.currentIndex++;
  return feedbackTemplate;
}

function resultView() {
  console.log('results view ran');
  let resultTemplate = generateResultTemplate();
  return resultTemplate;
}
/********** RENDER FUNCTION(S) **********/

function render(currentView) {
  console.log('render has run');
  let html = currentView();
  $('main').html(html);
  STORE.state.message = '';
}

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

function handleStartQuiz() {
  console.log('handleStartQuiz has run');
  $('main').on('click', '#start-quiz', (event) => {
    console.log('start quiz click detected');
    event.preventDefault();
    render(questionView);
  });
}

function handleNextQuestion() {
  $('main').on('click', '#next-question', (event) => {
    console.log('next question click detected');
    event.preventDefault();
    STORE.state.answer = null;
    render(questionView);
  });
}

function handleSelectAnswer() {
  $('main').on('click', '#select-answer', (event) => {
    console.log('answer selected: ', $('input[name="answer"]:checked').val());
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
    console.log('results button works');
    event.preventDefault();
    render(resultView);
  });
}

function handleStartOverButton() {
  $('main').on('click', '#start-over', (event) => {
    console.log('start over button works');
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
// These functions handle events (submit, click, etc)

// main function will call render with the welcome view.

// render will render the current view.

// welcome view will render with start button.
// when start button is clicked, it will render questions view.

// Question view will have a select button which will re-render the question with feedback view.
// Feedback view will have a next question button and show user if the answer selected is the correct one.
// and a next question button that will render the next question.

// If no selection is made and the select answer button is clicked, an error message will pop up
// If question state is undefined, Question view will initialize it.

// When the last question is reached, there will be a submit button.

// The submit button, will render results view. Results view will receive an argument
// that will hold the final score.

// results view will have a start over button that will render the welcome view.

function main() {
  handleSelectAnswer();
  handleStartQuiz();
  handleNextQuestion();
  handleResultButton();
  handleStartOverButton();
  render(welcomeView);
}

$(main);
