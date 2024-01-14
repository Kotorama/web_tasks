import React, { useState } from 'react';
import './style.css';

const ToDoInputComponent = ({ addTodo, searchTodo, clearSearch }) => {
  const [inputText, setInputText] = useState('');

  const handleAction = (action) => {
    switch (action) {
      case 'add':
        if (inputText.trim()) {
          addTodo(inputText);
          setInputText('');
        }
        break;
      case 'search':
        searchTodo(inputText);
        break;
      case 'clearSearch':
        clearSearch();
        setInputText('');
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className='todo-input'>
      <input
        type="text"
        placeholder="Add item..."
        value={inputText}
        onChange={handleInputChange}
      />
      <button type="button" onClick={() => handleAction('add')} className="add">
        Add
      </button>
      <button type="button" className="add hide">
        Update
      </button>
      <div id="search">
        <input
          type="text"
          placeholder="Search"
          value={inputText}
          onChange={handleInputChange}
        />
        <span onClick={() => handleAction('clearSearch')}>X</span>
      </div>
      <button type="button" onClick={() => handleAction('search')}>
        Search
      </button>
    </div>
  );
};

export default ToDoInputComponent;