import React from 'react';
import 'components/InterviewerListItem/InterviewerListItem.scss';
import '../application';
const classNames = require('classnames');

export default function InterviewerListItem(props) {
  const interviewerListItemClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });
  const interviewerListItemImageClass = classNames('interviewers__item-image');
  return (
    <li
      className={interviewerListItemClass}
      onClick={(event) => {
        props.setInterviewer(props.id);
      }}
      data-testid='interviewer-item'
    >
      <img
        className={interviewerListItemImageClass}
        src={props.avatar}
        alt={props.name}
      />

      <h4>{props.selected && props.name}</h4>
    </li>
  );
}
