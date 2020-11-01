import React from 'react';
import Appointment from 'components/Appointment/index';

export default function AppointmentList(props) {
  function save(name, interviewer) {
    //console.log('saving');
    console.log(props.id);
    //console.log(name, interviewer);
    const interview = {
      student: name,
      interviewer,
    };
    props.bookInterview(interview);
  }

  const AppointmentItems = props.appointments.map((appointment) => (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={appointment.interview}
      interviewers={props.interviewers}
      bookInterview={props.bookInterview}
      save={save}
    />
  ));
  return <ul>{AppointmentItems}</ul>;
}
