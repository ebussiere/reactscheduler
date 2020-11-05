export function getAppointmentsForDay(state, day) {
  const { appointments } = state;
  //console.log(appointments);

  let result = [];
  if (!state.days.find((d) => d.name === day)) {
    return result;
  }
  if (state.days.length > 0) {
    let filteredDay = state.days.filter((d) => d.name === day);
    const appointmentIdsToSearch = filteredDay[0]['appointments'];
    for (let i = 0; i < appointmentIdsToSearch.length; i++) {
      for (const apptId in appointments) {
        if (appointments.hasOwnProperty(apptId)) {
          const apptItem = appointments[apptId];
          if (apptItem.id === parseInt(appointmentIdsToSearch[i])) {
            result.push(apptItem);
          }
        }
      }
    }
    return result;
  }
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  const interviewerId = interview.interviewer;
  const { interviewers } = state;
  if (interviewers.hasOwnProperty(interviewerId)) {
    const interviewerItem = interviewers[interviewerId];
    interview.interviewer = interviewerItem;
  }
  return interview;
}

export function getInterviewersForDay(state, day) {
  const { interviewers } = state;
  let result = [];
  if (!state.days.find((d) => d.name === day)) {
    return result;
  }
  if (state.days.length > 0) {
    let filteredDay = state.days.filter((d) => d.name === day);

    const interviewerIdsToSearch = filteredDay[0]['interviewers'];

    for (let i = 0; i < interviewerIdsToSearch.length; i++) {
      for (const intId in interviewers) {
        if (interviewers.hasOwnProperty(intId)) {
          const intItem = interviewers[intId];
          if (intItem.id === parseInt(interviewerIdsToSearch[i])) {
            result.push(intItem);
          }
        }
      }
    }

    return result;
  }
}
