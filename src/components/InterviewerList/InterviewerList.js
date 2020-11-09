import React from 'react';
import PropTypes from 'prop-types';
import 'components/InterviewerList/InterviewerList.scss';
import InterviewerListItem from '../InterviewerListItem/InterviewerListItem';
const classNames = require('classnames');

export default function InterviewerList(props) {
  const allProps = [...props.interviewers];
  //const allProps = [];

  const interviewerListClass = classNames('interviewers__list', {
    'interviewers__item--selected': props.selected,
  });
  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className={interviewerListClass}>
        {allProps.map((interviewerListItem) => (
          <InterviewerListItem
            key={interviewerListItem.id}
            name={interviewerListItem.name}
            avatar={interviewerListItem.avatar}
            interviewer={props.interviewer}
            selected={interviewerListItem.id === props.value}
            setInterviewer={(event) => props.onChange(interviewerListItem.id)}
          />
        ))}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
