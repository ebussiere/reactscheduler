import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'components/Application.scss';
//import DayList from './DayList/DayList';
//import Appointment from 'components/Appointment/index';

const useApplicationData = (initial) => {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    interviewers: {},
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });
  function bookInterview(id, newInterview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...newInterview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios({
      method: 'put',
      url: `/api/appointments/${id}`,
      data: {
        interview: { ...newInterview },
      },
    })
      .then((result) => {
        setState({
          ...state,
          appointments,
        });
        return result;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  }

  function cancelInterview(id) {
    console.log(id);
    console.log('Cancelling');
    const nullInterview = null;

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios({
      method: 'delete',
      url: `/api/appointments/${id}`,
    })
      .then((result) => {
        setState({
          ...state,
          appointments,
        });
        return result;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};
export default useApplicationData;
