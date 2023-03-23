import logo from './logo.svg';
import './App.css';
//import { useState } from "react";

import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  // Fonction pour ajouter une tâche dans la liste
  const handleNewTodoAdd = () => {
    setTodos([...todos, { text: newTodo, isChecked: false }]);
    setNewTodo('');
    setShowModal(false);
  };

  // Fonction pour supprimer une tâche de la liste
  const handleTodoDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // Fonction pour compter le nombre de case cocher dans la liste
  const handleTodoCheck = (index) => {
    const newTodos = [...todos];
    newTodos[index].isChecked = !newTodos[index].isChecked;
    setTodos(newTodos);
  };


  // Fonction pour monter la tâche d'un cran dans la liste
  const handleTodoMoveUp = (index) => {
    if (index > 0) {
      const newTodos = [...todos];
      const currentTodo = newTodos[index];
      newTodos[index] = newTodos[index - 1];
      newTodos[index - 1] = currentTodo;
      setTodos(newTodos);
    }
  };

  // Fonction pour descendre la tâche d'un cran dans la liste
  const handleTodoMoveDown = (index) => {
    if (index < todos.length - 1) {
      const newTodos = [...todos];
      const currentTodo = newTodos[index];
      newTodos[index] = newTodos[index + 1];
      newTodos[index + 1] = currentTodo;
      setTodos(newTodos);
    }
  };

  //Fonction qui permet de trier en fonction du texte saisi dans la barre de recherche (en fonction du title)
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Variable du nombre total de tâches dans la liste et du nombre de tâches validées
  const totalTodos = todos.length;
  const numChecked = todos.filter((todo) => todo.isChecked).length;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <p>
          <span>
            {numChecked}/{totalTodos} tasks completed
          </span>
        </p>
        <p>
          Search:
          <input value={searchTerm} onChange={handleSearchTermChange} />
        </p>
        <ol>
          {filteredTodos.map((todo, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={todo.isChecked}
                onChange={() => handleTodoCheck(index)}
              />
              <span style={{ textDecoration: todo.isChecked ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
              <button onClick={() => handleTodoDelete(index)}>Delete</button>
              <button onClick={() => handleTodoMoveUp(index)}>^</button>
              <button onClick={() => handleTodoMoveDown(index)}>v</button>
            </li>
          ))}
        </ol>
        <p>
          <button onClick={() => setShowModal(true)}>Add</button>
        </p>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
              <p>
                <input value={newTodo} onChange={handleNewTodoChange} />
                <button onClick={handleNewTodoAdd}>Add</button>
              </p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
