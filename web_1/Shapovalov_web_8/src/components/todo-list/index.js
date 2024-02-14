import React from 'react';
import './style.css';
import ToDoItemComponent from './todo-item';

const ToDoListComponent = ({ todos, deleteTodo, editingIndex
}) => {
  const renderTodoItems = () =>
    todos.map((todo, index) => {
      const isEditing = index === editingIndex;

      return (
        <ToDoItemComponent
          key={index}
          text={todo.text}
          createdAt={todo.createdAt}
          deleteTodo={() => deleteTodo(index)}
        />
      );
    });

  return <div className='todo-list'>{renderTodoItems()}</div>;
};

export default ToDoListComponent;