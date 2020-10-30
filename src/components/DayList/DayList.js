import React, { useState, useEffect } from 'react';
import DayListItem from 'components/DayListItem/DayListItem';

export default function DayList(props) {
  //const [days, setDays] = useState([]);
  const DayListItems = props.days.map((dayItem) => (
    <DayListItem
      key={dayItem.id}
      name={dayItem.name}
      spots={dayItem.spots}
      selected={dayItem.name === props.value}
      setDay={(event) => props.onChange(dayItem.name)}
    />
  ));
  return <ul>{DayListItems}</ul>;
}
