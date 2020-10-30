export function getAppointmentsForDay(state, day) {
  let result = [];
  if (!state.days.find((d) => d.name === day)) {
    console.log('Failed');
    return result;
  }
  const { appointments } = state;
  console.log(appointments);
  console.log(state.appointments);

  if (state.days.length > 0) {
    let filteredDay = state.days.filter((d) => d.name === day);
    //console.log(filteredDay[0]['appointments']);
    result = filteredDay[0]['appointments'];
    const filteredDayAppointmentIds = filteredDay[0]['appointments'];
    for (const number of filteredDayAppointmentIds) {
      for (const appt in state.appointments) {
        const item = state.appointments[appt];

        if (item.id === number) {
          result.push(item);
          //console.log(item);
        }
      }
    }
    //console.log(result);
    return result;
  }
}
