import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Appointment from 'components/Appointment/index';

export default function AppointmentList(props) {
  const [appointments, setAppointments] = useState(props.appointments);
  ///console.log(props);

  // axios.get('/api/appointments').then((response) => {
  //   console.log(response);
  // });

  const AppontmentItems = props.appointments.map((appointment) => (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={appointment.interview}
    />
  ));
  return <ul>{AppontmentItems}</ul>;
}
