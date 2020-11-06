import React, { useState, useEffect } from 'react';
import InterviewerList from '../InterviewerList/InterviewerList';
import Button from '../Button/Button';

const classNames = require('classnames');

export default function Form(props) {
  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const [error, setError] = useState('');
  const formClass = classNames(
    'appointment__card',
    'appointment__card--create',
  );

  function validate() {
    if (name === '') {
      setError('Student name cannot be blank');
      return;
    }
    if (interviewer === null) {
      setError('Interviewer must be selected');
      return;
    }
    props.onSave(name, interviewer);
  }

  function onSave(name, interviewer) {
    validate();
  }
  useEffect(() => {
    setName(name);
    setInterviewer(interviewer);
  }, [name, interviewer]);

  return (
    <main className={formClass}>
      <section className='appointment__card-left'>
        <form autoComplete='off' onSubmit={(event) => event.preventDefault()}>
          <input
            className='appointment__create-input text--semi-bold'
            name='name'
            value={name}
            type='text'
            placeholder='Enter Student Name'
            onChange={(event) => {
              setName(event.target.value);
            }}
            data-testid='student-name-input'
          />
        </form>
        <section className='appointment__validation'>{error}</section>
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
          <Button confirm onClick={() => onSave(name, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
