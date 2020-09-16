/* eslint-disable no-console */
'use strict';

/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'Which animal does not appear in the Chinese zodiac?',
      answers: [
        'Dragon',
        'Rabbit',
        'Dog',
        'Hummingbird'
      ],
      correctAnswer: 'Hummingbird'
    },
    {
      question: 'Which Olympic sport is Michael Phelps known for?',
      answers: [
        'Snowboarding',
        'Skiing',
        'Running',
        'Swimming'
      ],
      correctAnswer: 'Swimming'
    },
    {
      question: '"I see dead people," is a line from which horror film…',
      answers: [
        'The Sixth Sense',
        'The Grudge',
        'The Shining',
        'The Exorcist'
      ],
      correctAnswer: 'The Exorcist'
    },
    {
      question: 'Which one of these characters aren\'t a part of the Friends group?',
      answers: [
        'Rachel',
        'Joey',
        'Gunther',
        'Monica'
      ],
      correctAnswer: 'Gunther'
    },
    {
      question: 'Fe is the chemical symbol for..',
      answers: [
        'Zinc',
        'Hydrogen',
        'Fluorine',
        'Iron'
      ],
      correctAnswer: 'Iron'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
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

/********** RENDER FUNCTION(S) **********/

// These functions will return the views to render

function welcomeView(){
  console.log('welcomeView has run');
  return `
  <button id="start-quiz">Start Quiz</button>
  `;
}

/********** RENDER FUNCTION(S) **********/

function render(currentView){
  console.log('render has run');
  let html = currentView();
  $('main').html(html);
}

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

// main function will call render with the welcome view.

// render will render the current view.

// welcome view will render with start button. 
// when start button is clicked, it will render questions view.

// Question view will have a select button which will re-render the question with feedback
// and a next question button that will render the next question. 

// Question view will receive an argument holding the current question index and cumulative score, and
// whether the question has been answered and feedback should be shown.

// When the last question is reached, there will be a submit button. 

// The submit button, will render results view. Results view will receive an argument
// that will hold the final score.

// results view will have a start over button that will render the welcome view.

function main(){
  render(welcomeView);
}

$(main)