import React, { useState, useEffect } from 'react';
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
const EDIT = 'EDIT';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const STATUS = 'STATUS';
const CONFIRM = 'CONFIRM';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';
let statusMessage = 'Saving';
let deleteMessage = 'Are you sure?';

export default function Appointment(props) {
  console.log(props);

  const [state, setState] = useState(props);

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY,
  );

  // useEffect(() => {
  //   if (props.interview && mode === EMPTY) {
  //     transition(SHOW);
  //   }
  //   // if (props.interview === null && mode === SHOW) {
  //   //   transition(EMPTY);
  //   // }
  // }, [props.interview, transition, mode]);


  function onSave(name, interviewer) {
    statusMessage = 'Saving';
    transition(STATUS);
    const interview = {
      student: name,
      interviewer,
    };
    console.log('props :', props);
    props
      .bookInterview(props.id, interview)
      .then((result) => {
        transition(SHOW);
        //return result;
      })
      .catch((err) => {
        transition(ERROR_SAVE, true);
        return err;
      });
  }

  function onConfirmDelete(id) {
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

  const onCreate = function() {
    transition(CREATE);
  };

  const onEdit = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer,
    };
    setState(state, interview);
    transition(EDIT);
  };
  const onDelete = function() {
    transition(CONFIRM);
  };

  return (
    <article className='appointment' data-testid='appointment'>
      <Header time={props.time} />
      {/* Empty Timeslot */}
      {mode === EMPTY && <Empty onAdd={() => onCreate()} />}
      {/* Show Timeslot Data */}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}

      {/* Create New Interview in empty timeslot uses Form */}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={onSave}
        />
      )}

      {/* Modify Existing Interview in empty timeslot uses Form */}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onCancel={() => back()}
          onSave={onSave}
        />
      )}

      {/* Show Status passing appropriate message */}
      {mode === STATUS && <Status message={statusMessage} />}

      {/* Confirm Delete Action */}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={onConfirmDelete}
          id={props.id}
          back={() => back()}
          message={deleteMessage}
        />
      )}

      {/* Show Save Error */}
      {mode === ERROR_SAVE && (
        <Error message={'Could not save'} back={() => back()} />
      )}
      {/* Show Delete Error */}
      {mode === ERROR_DELETE && (
        <Error message={'Could not delete'} back={() => back()} />
      )}
    </article>
  );
}
