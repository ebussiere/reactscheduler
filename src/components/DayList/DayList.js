import React from 'react';
import DayListItem from 'components/DayListItem/DayListItem';

export default function DayList(props) {
  const DayListItems = props.days.map((dayItem) => (
    <DayListItem
      key={dayItem.id}
      name={dayItem.name}
      spots={dayItem.spots}
      selected={dayItem.name === props.day}
      setDay={props.setDay}
    />
  ));
  return <ul>{DayListItems}</ul>;
}
