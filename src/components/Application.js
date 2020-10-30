import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'components/Application.scss';
import DayList from './DayList/DayList';
import AppointmentList from './AppointmentList/AppointmentList';
import { getAppointmentsForDay } from '../helpers/selectors';

const appointments = [
  {
    id: 1,
    time: '12pm',
    interview: {
      student: 'Bubbles',
      interviewer: {
        id: 2,
        name: 'Ricky & Julian',
        avatar: 'https://i.imgur.com/Nmx0Qxo.png',
      },
    },
  },
  {
    id: 2,
    time: '1pm',
  },
  {
    id: 3,
    time: '2pm',
    interview: {
      student: 'Eddy B.',
      interviewer: {
        id: 2,
        name: 'Tori Malcolm',
        avatar: 'https://i.imgur.com/Nmx0Qxo.png',
      },
    },
  },
  {
    id: 4,
    time: '3pm',
  },
  {
    id: 5,
    time: '4pm',
    interview: {
      student: 'Mr T.',
      interviewer: {
        id: 4,
        name: 'Cohana Roy',
        avatar: 'https://i.imgur.com/FK8V841.jpg',
      },
    },
  },
  {
    id: 6,
    time: '5pm',
    interview: {
      student: 'Donald Tramp',
      interviewer: {
        id: 5,
        name: 'Sven Jones',
        avatar: 'https://i.imgur.com/twYrpay.jpg',
      },
    },
  },
];

let seeddays = [
  {
    id: 1,
    name: 'Monday',
    spots: 2,
  },
  {
    id: 2,
    name: 'Tuesday',
    spots: 5,
  },
  {
    id: 3,
    name: 'Wednesday',
    spots: 0,
  },
  {
    id: 4,
    name: 'Thursday',
    spots: 0,
  },
  {
    id: 5,
    name: 'Friday',
    spots: 4,
  },
];

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: [],
  });
  const dailyAppointments = [];
  const setDay = (day) => setState({ ...state, day });
  useEffect(() => {
    Promise.all([axios.get('/api/days'), axios.get('/api/appointments')]).then(
      (all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
        }));
      },
    );
  }, []);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      appointments: getAppointmentsForDay(state, state.day),
    }));
  }, [state.day]);

  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        <AppointmentList appointments={appointments} />
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
