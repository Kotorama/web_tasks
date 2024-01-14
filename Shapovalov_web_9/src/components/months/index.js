import { useContext, useState } from 'react';
import './style.css';
import CalendarContext from '../../context/calendar.context';
import { MONTHS } from '../shared/months';

const MonthsComponent = () => {

  const { setCurrentDate, currentDate, events } = useContext(CalendarContext);

  const click = (index) => {
    setCurrentDate((preCurrentDate) => {
      const newDate = new Date(preCurrentDate);
      newDate.setMonth(index);
      return newDate;
    });
  };
  const key = (month) => {
    return `${currentDate.getFullYear()}-${month}-${currentDate.getDate()}`;
  };
  return (
    <div className='months-wrapper content-wrapper'>
      <div className='header'>{MONTHS[currentDate.getMonth()]}</div>
      {
        MONTHS.map((month, i) => (<div
          className={`month content-item ${events[key(i)] ? 'selected' : ''}`}
          onClick={() => click(i)}
        >{month}
        </div>))
      }
    </div >
  );
};

export default MonthsComponent;