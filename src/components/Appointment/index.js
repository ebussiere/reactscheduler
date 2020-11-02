/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
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
const STATUS = 'STATUS';
const CONFIRM = 'CONFIRM';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';
let statusMessage = 'Saving';
let deleteMessage = 'Are you sure?';

export default function Appointment(props) {
  const [state, setState] = useState(props);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY,
  );

  function onSave(name, interviewer) {
    transition(STATUS);
    const interview = {
      student: name,
      interviewer,
    };
    const sp = props.bookInterview(props.id, interview);
    sp.then((result) => {
      transition(SHOW);
      return result;
    });
    sp.catch((err) => {
      transition(ERROR_SAVE, true);
      return err;
    });
  }

  function onCancel() {
    transition(CONFIRM);
  }
  function onFormCancel(name, interviewer) {
    name && interviewer ? transition(SHOW) : back();
  }

  function onConfirm(id) {
    statusMessage = 'Deleting';
    transition(STATUS);
    //after successful delete

    const sp = props.cancelInterview(id);

    sp.then((result) => {
      transition(EMPTY);
      return result;
    });
    sp.catch((err) => {
      transition(ERROR_DELETE, true);
      return err;
    });
  }

  const onCreate = function () {
    transition(CREATE);
  };

  const onEdit = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer,
    };
    setState(state, interview);
    transition(CREATE);
  };

  return (
    <>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => onCreate()} />}
      {mode === SHOW && (
        <Show {...props} onEdit={onEdit} onCancel={() => onCancel()} />
      )}
      {mode === CREATE && (
        <Form {...props} onSave={onSave} onCancel={() => onFormCancel()} />
      )}
      {mode === STATUS && <Status message={statusMessage} />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={onConfirm}
          id={props.id}
          back={() => back()}
          message={deleteMessage}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={'Could not save'} back={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={'Could not delete'} back={() => back()} />
      )}
    </>
  );
}
