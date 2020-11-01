/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, fragment } from 'react';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
import useVisualMode from '../../hooks/useVisualMode';
import 'components/Appointment/styles.scss';
import Form from './Form';
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

export default function Appointment(props) {
  //const [emode, setEMode] = useState('EMPTY');
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY,
  );
  const createHandler = function () {
    transition(CREATE);
  };
  const cancelHandler = function () {
    back();
  };

  return (
    <>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => createHandler()} />}
      {mode === SHOW && <Show {...props} />}
      {mode === CREATE && <Form {...props} onCancel={() => cancelHandler()} />}
    </>
  );
}
