import React, { useState } from 'react';
import InterviewerList from '../InterviewerList/InterviewerList';
import Button from '../Button/Button';
//import useVisualMode from '../../hooks/useVisualMode';
const classNames = require('classnames');

export default function Form(props) {
  console.log(props);
  const [name, setName] = useState(
    props.interview ? props.interview.student : '',
  );
  const [interviewer, setInterviewer] = useState(
    props.interview ? props.interview.interviewer.id : '',
  );
  const formClass = classNames(
    'appointment__card',
    'appointment__card--create',
  );
  const reset = function () {
    setInterviewer(null);
  };

  return (
    <main className={formClass}>
      <section className='appointment__card-left'>
        <form autoComplete='off' onSubmit={(event) => event.preventDefault()}>
          <input
            className='appointment__create-input text--semi-bold'
            value={name}
            type='text'
            placeholder='Enter Student Name'
            onChange={(event) => {
              setName(event.target.value);
              //reset();
            }}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button danger onClick={() => props.onCancel(name, interviewer)}>
            Cancel
          </Button>
          <Button confirm onClick={() => props.onSave(name, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
