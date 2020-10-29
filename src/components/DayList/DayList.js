import React from 'react';
import DayListItem from 'components/DayListItem/DayListItem';

export default function DayList(props) {
  const DayListItems = props.days.map((dayItem) => (
    <DayListItem
      key={dayItem.id}
      name={dayItem.name}
      spots={dayItem.spots}
      selected={dayItem.id === props.value}
      setDay={(event) => props.onChange(dayItem.id)}
    />
  ));
  return <ul>{DayListItems}</ul>;
}
