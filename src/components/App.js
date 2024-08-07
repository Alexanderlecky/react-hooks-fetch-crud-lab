import React, { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:4000/questions');
        const data = await response.json();
        if (isMounted) {
          setQuestions(data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();

    return () => {
      isMounted = false;
    };
  }, []);

  const addQuestion = async (newQuestion) => {
    try {
      const response = await fetch('http://localhost:4000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuestion)
      });
      const data = await response.json();
      setQuestions(prevQuestions => [...prevQuestions, data]);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const deleteQuestion = async (id) => {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'DELETE'
      });
      setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const updateQuestion = async (id, updatedData) => {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      setQuestions(prevQuestions => prevQuestions.map(question =>
        question.id === id ? { ...question, ...updatedData } : question
      ));
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  return (
    <div>
      <AdminNavBar showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <QuestionForm addQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          deleteQuestion={deleteQuestion}
          updateQuestion={updateQuestion}
        />
      )}
    </div>
  );
};

export default App;
