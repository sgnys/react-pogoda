import React from 'react';
import './Form.css'
const Form = (props) => {
  return (
    <form onSubmit={props.submit}>
      <input value={props.value}
        onChange={props.change}
        type="text"
        placeholder=" Wpisz miasto..."
      />
      <button type="submit">Wyszukaj miasto</button>
    </form>

  );
}
export default Form;