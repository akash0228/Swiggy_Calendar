import React from "react";
import "./style.css";

const Calendar = ({ time, isAm, events }) => {
  console.log(events);
  return (
    <div class="calendar">
      
      <div className="calendar__time">
        {time > 9 ? time : "0" + time + " "}
        {isAm ? "AM " : "PM "}
      </div>

      <div className="calendar__time--event">
        {events.map((event) => {
          <div className="calendar__time--item">
            <div>
              <p>{event.element.title}</p>
            </div>
          </div>;
        })}
      </div>
      
    </div>
  );
};

export default Calendar;
