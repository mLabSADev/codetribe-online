import { Button, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import Quiz from 'react-quiz-component';
import { LessonService } from '../services/lesson-service';

const QuizPage = ({
  quiz,
  chapter,
  lessonId,
  showResult,
  onNext
}) => {
    const [loading, setLoading] = useState()
    const [result, setResult] = useState()

    const onComplete = data => {
      LessonService.saveQuiz(lessonId, chapter, data).then(() => {
        console.log(`Lesson Saved`);
      })
    }

    useEffect(() => {
      console.log(`Quiz`);
      console.log(quiz);
      setLoading(true)
      LessonService.getQuizResults(lessonId, chapter).then(results => {
        setResult(results)
      }).finally(() => {
        setLoading(false)
      })
    }, [])

    const ShowQuiz = () => {
      return (
        quiz && <Quiz shuffle={true} continueTillCorrect={false} quiz={{
          "quizTitle": "",
          "quizSynopsis": "Test your knowledge and see how well you've learned from this lesson. Hit the start quiz button when you're ready",
          questions: quiz
        }} onComplete={onComplete} />
      )
    }

    const ShowResult = () => {
      return <div style={{
        textAlign: 'center',
        marginTop: 40,
        fontSize: '2em',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <div>You have already completed this quiz</div>
        <Button onClick={onNext}>Next</Button>
      </div>
    }

    return (
        <div>
            {!loading ? <div>
              {result ? <ShowResult /> : <ShowQuiz />}
            </div> : <div><Spin /></div>}
        </div>
    )
}

export default QuizPage