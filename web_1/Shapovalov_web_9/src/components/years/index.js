import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import CalendarContext from '../../context/calendar.context';

const YearsComponent = () => {

  const { currentDate, setCurrentDate, events } = useContext(CalendarContext);

  const [year, setYear] = useState(currentDate.getFullYear());

  const halfCount = 12;


  /**
   * 2011 2012  2013  2014 2015
   * 2016 2017  2018  2019 2020
   * 2021 2022 *2023* 2024 2025
   * 2026 2027  2028  2029 2030
   * ...
  */
  // const years = [];
  // for (let i = year; i >= (year - halfCount); i -= 1) {
  //   years.push(i);
  // }
  // for (let i = year; i < (year + halfCount); i += 1) {
  //   years.push(i);
  // }
  // => [2023, 2024, ...]

  const nextPage = () => {
    setYear((prevYear) => prevYear + 25);
  };
  const prevPage = () => {
    setYear((prevYear) => prevYear - 25);
  };

  const click = (year) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(year);
      console.log(events)
      return newDate;
    });
  };

  let keys = Object.keys(events);
  let years = [];

  return (
    <div className='years-wrapper content-wrapper'>
      <div className='header'>
        <FontAwesomeIcon icon={faArrowLeft} className='arrow-left' onClick={prevPage} />
        {year}
        <FontAwesomeIcon icon={faArrowRight} className='arrow-right' onClick={nextPage} />
      </div>
      {
        Array(halfCount)
          .fill(null)
          .map((_el, index) => {
            const showYear = year - halfCount + index;
            for (let i = 0; i < String(keys).length; i = i + 9) {
              years.push(String(keys).slice(i, i + 4))
            }
            return (<div
              className={`year content-item ${years.includes(String(showYear)) == true ? 'selected' : ""}`}
              onClick={() => click(showYear)}
            >{showYear}</div>);

          })
      }
      <div className={`year content-item ${years.includes(String(year)) == true ? 'selected' : ""}`} onClick={() => click(year)} >{year}</div>
      {
        Array(halfCount)
          .fill(null)
          .map((_el, index) => {
            const showYear = year + index + 1;
            return (
              <div className={`year content-item ${years.includes(String(showYear)) == true ? 'selected' : ""}`} >
                {showYear}
              </div>);
          })
      }
    </div>
  );
};

export default YearsComponent;