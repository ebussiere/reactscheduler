import React, { fragment } from 'react';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
import 'components/Appointment/styles.scss';

export default function Appointment(props) {
  return (
    <>
      <Header time={props.time} />
      {props.interview ? <Show {...props} /> : <Empty />}
      {/* <article className='appointment'>{props.time}</article> */}
    </>
  );
}
