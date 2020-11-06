import React from 'react';
//import useVisualMode from '../../hooks/useVisualMode';
export default function Empty(props) {
  return (
    <main className='appointment__add'>
      <img
        className='appointment__add-button'
        src='images/add.png'
        alt='add'
        onClick={props.onAdd}
        data-testid='add-appointment'
      />
    </main>
  );
}
