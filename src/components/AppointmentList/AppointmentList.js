import React from 'react';
import Appointment from 'components/Appointment/index';

export default function AppointmentList(props) {
  const AppointmentItems = props.appointments.map((appointment) => (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={appointment.interview}
    />
  ));
  return <ul>{AppointmentItems}</ul>;
}
