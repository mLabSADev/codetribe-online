import React from 'react'
import Quiz from 'react-quiz-component';

export const quiz =  {
    "quizTitle": "Firebase Quiz",
    "quizSynopsis": "Test your knowledge and see how well you've learned from this course. Hit the start quiz button when you're ready",
    "questions": [
      {
        "question": "Which of the following filenames is the extension for typescript?",
        "questionType": "text",
        "answerSelectionType": "single",
        "answers": [
          ".tt",
          ".ts",
          ".txt"
        ],
        "correctAnswer": "2",
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "point": "20"
      },
      {
        "question": "Which of the computer programming languages below has influenced the creation of typescript?",
        "questionType": "text",
        "answerSelectionType": "single",
        "answers": [
          "JavaScript",
          "Java",
          "C#"
        ],
        "correctAnswer": "1",
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "point": "20"
      },
      {
        "question": "The different Data Types supported by Typescript are______",
        "questionType": "text",
        "answerSelectionType": "single",
        "answers": [
          "Boolean let bValue: boolean = false;",
          "String let name: string = \"Candace\";",
          "All of the above"
        ],
        "correctAnswer": "3",
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "point": "10"
      },
      {
        "question": "Which two configuration properties does the tool expect to be configured after installing Git and prior to issuing the first commit?",
        "questionType": "text",
        "answerSelectionType": "single",
        "answers": [
          "email address and password",
          "username and password",
          "username and email address",
        ],
        "correctAnswer": "1",
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "point": "30"
      },
      {
        "question": "After initializing a new Git repository and creating a file named git_file.html, which of the following commands will not work if issued?",
        "questionType": "text",
        "answerSelectionType": "single",
        "answers": [
          "git add git_file.html",
          "git commit -m “first commit”",
          "git add .",
        ],
        "correctAnswer": "2",
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "point": "30"
      },
      {
        "question": "How can you create a branch and switch to it directly?",
        "questionType": "text",
        "answerSelectionType": "single",
        "answers": [
          "git checkout -b <branch-name>",
          "git branch --checkout <branch-name>",
          "git checkout --create-branch <branch-name>",
        ],
        "correctAnswer": "3",
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "point": "30"
      },
    
    ]
  } 

const QuizPage = () => {
    return (
        <div>
            {/* <p style={{color: '#97CA42', fontSize: '0.9em', marginBottom: 20}}>4 questions</p> */}
            <Quiz continueTillCorrect={false} quiz={quiz} />
        </div>
    )
}

export default QuizPage