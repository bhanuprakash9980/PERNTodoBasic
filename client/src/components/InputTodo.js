import { Fragment, useState } from 'react';

const InputTodo = () => {
  const [description, setDescription] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      window.location = '/';
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <h1 className='text-center mt-5'>Pern Todo List</h1>
      <form className='d-flex mt-5' onSubmit={onSubmitForm}>
        <input
          type='text'
          name='description'
          className='form-control'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type='submit' className='btn btn-success ml-2' value='Add' />
      </form>
    </Fragment>
  );
};

export default InputTodo;
