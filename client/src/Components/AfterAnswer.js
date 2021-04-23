import React from 'react';

function AfterAnswer({setDisplayState, currentQuestion, isLastAnswerCorrect, timeToAnswer}) {
    return (
        <div>
            <h1>{isLastAnswerCorrect ? 'Correct! 🎊'  : 'Wrong! 😥'  }</h1>
            {console.log(timeToAnswer)}
            <h1>Took you {timeToAnswer[timeToAnswer.length -1]} seconds to answer the question</h1>
            <button onClick={() => setDisplayState(1)} > Continue ↪ </button>
        </div>
    );
}

export default AfterAnswer;