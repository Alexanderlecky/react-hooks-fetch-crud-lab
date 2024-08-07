import React from 'react';

const QuestionList = ({ questions, deleteQuestion, updateQuestion }) => {
  const handleChange = (id, event) => {
    const newIndex = parseInt(event.target.value, 10);
    updateQuestion(id, { correctIndex: newIndex });
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.prompt}</p>
          <select
            value={question.correctIndex}
            onChange={(event) => handleChange(question.id, event)}
          >
            {question.answers.map((answer, index) => (
              <option key={index} value={index}>
                {answer}
              </option>
            ))}
          </select>
          <button onClick={() => deleteQuestion(question.id)}>
            Delete Question
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
