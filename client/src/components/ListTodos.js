import { Fragment, useEffect, useState } from 'react';

import EditTodo from './EditTodo';

const ListTodos = () => {
  const [Todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos');
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  //delete function

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.log(error.message);
    }
    setTodos(Todos.filter((todo) => todo.todo_id !== id));
  };

  return (
    <Fragment>
      <table className='table mt-5 text-center'>
        <thead>
          <tr>
            <th scope='col'>Description</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <input
                  type='button'
                  className='btn btn-danger'
                  value='Delete'
                  onClick={() => deleteTodo(todo.todo_id)}
                />
              </td>
            </tr>
          ))}
          {/* 
         <tr>
         <th scope='row'>1</th>
         <td>1</td>
         <td>1</td>
         <td>1</td>
         


         </tr>
          */}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
