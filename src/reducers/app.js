const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW: {
      const id = action.id;
      const interview = action.interview ? { ...action.interview } : null;

      const appointment = {
        ...state.appointments[id],
        interview
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const countDaySpotsAvailable = (dayObj) => {
        let output = 0;
        for (let apptId of dayObj.appointments) {
          if (appointments[apptId].interview === null) {
            output++;
          }
        }
        return output;
      };

      const days = state.days.map(day => {
        let updatedCount = countDaySpotsAvailable(day);
        return { ...day, spots: updatedCount };
      });

      return {
        ...state,
        appointments,
        days
      };
    }
    default:
      throw new Error(
        `Error not action type: ${action.type}`
      );
  }
};

export default reducer;
export { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW };