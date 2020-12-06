import { useEffect, useReducer } from 'react';
import axios from 'axios';

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/app";

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      const dataArr = all.map((res) => res.data);
      const [days, appointments, interviewers] = dataArr;
      dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
    });

  }, []);

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview });
  };

  const cancelInterview = (id, interview = null) => {
    return axios.delete(`/api/appointments/${id}`, { data: { interview } });
  };

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    webSocket.onopen = event => {
      webSocket.send("ping");
    };
    webSocket.onmessage = event => {
    };
    webSocket.onmessage = event => {
      const message = JSON.parse(event.data);

      if (message.type === "SET_INTERVIEW") {
        const id = message.id;
        const interview = message.interview;
        dispatch({ type: SET_INTERVIEW, id, interview });
      }
    };
    //Cleanup 
    return () => webSocket.close();

  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};

export default useApplicationData;