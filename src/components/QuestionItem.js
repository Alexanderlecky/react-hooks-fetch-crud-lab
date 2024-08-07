import React from 'react';

const QuestionItem = ({ question, deleteQuestion, updateQuestion }) => {
  const handleChange = (event) => {
    const newIndex = parseInt(event.target.value, 10);
    updateQuestion(question.id, { correctIndex: newIndex });
  };

  return (
    <div>
      <p>{question.prompt}</p>
      <select
        value={question.correctIndex}
        onChange={handleChange}
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
  );
};

export default QuestionItem;
