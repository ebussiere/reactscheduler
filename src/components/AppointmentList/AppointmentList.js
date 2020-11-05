import React from 'react';
import Appointment from 'components/Appointment/index';

export default function AppointmentList(props) {
  function onSave(id, interview) {
    props.bookInterview(id, interview);
  }

  const AppointmentItems = props.appointments.map((appointment) => (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={appointment.interview}
      interviewers={props.interviewers}
      bookInterview={props.bookInterview}
      onSave={onSave}
    />
  ));
  return <ul>{AppointmentItems}</ul>;
}
