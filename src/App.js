import { useEffect } from "react";
import "./App.css";
import Calendar from "./Calendar";
import day from "./day";
import Api from "./Api";
function App() {
  const dataBasedOnTime = [
    { interval: "1", events: [] },
    { interval: "2", events: [] },
    { interval: "3", events: [] },
    { interval: "4", events: [] },
    { interval: "5", events: [] },
    { interval: "6", events: [] },
    { interval: "7", events: [] },
    { interval: "8", events: [] },
    { interval: "9", events: [] },
    { interval: "10", events: [] },
    { interval: "11", events: [] },
    { interval: "12", events: [] },
    { interval: "13", events: [] },
    { interval: "14", events: [] },
    { interval: "15", events: [] },
    { interval: "16", events: [] },
    { interval: "17", events: [] },
    ,
    { interval: "18", events: [] },
    ,
    { interval: "19", events: [] },
    ,
    { interval: "20", events: [] },
    { interval: "21", events: [] },
    { interval: "22", events: [] },
    {
      interval: "23",
      events: [],
    },
  ];

  const injectEvent = (
    startMinute,
    needDisplay,
    minutesRemaining,
    interval,
    element
  ) => {
    const currDur = 60 - startMinute;
    const remainDur = minutesRemaining - currDur;
    if (currDur < minutesRemaining) {
      dataBasedOnTime[interval].events.push({
        needDisplay,
        duration: currDur,
        startMinute,
        element,
      });
      const nextInterval = (interval + 1) % 24;
      injectEvent(0, false, remainDur, nextInterval, element);
    } else {
      dataBasedOnTime[interval].events.push({
        needDisplay,
        duration: currDur,
        startMinute,
        element,
      });
    }
  };

  const filterData = (rawData) => {
    // console.log(rawData);
    rawData.forEach((element) => {
      const timeStart = element.startTime.split(":");
      const timeEnd = element.endTime.split(":");
      const startHr = parseInt(timeStart[0]);
      const endHr = parseInt(timeEnd[0]);
      const startMin = parseInt(timeStart[1].split(" ")[0]);
      const endMin = parseInt(timeEnd[1].split(" ")[0]);
      const isStartAm = timeStart[1].split(" ")[1] === "AM";
      const isEndAm = timeEnd[1].split(" ")[1] === "AM";

      //need to handle am and pm

      const duration = endHr * 60 + endMin - (startHr * 60 + startMin);
      const interval = startMin > 0 ? startHr + 1 : startHr;
      injectEvent(startMin, true, duration, interval, element);
    });

    dataBasedOnTime.forEach((element) => {
      element.events.sort(function (a, b) {
        if (a.startMin < b.startMin) return a.startMin - b.startMin;
        else return a.duration - b.duration;
      });
    });
  };
  useEffect(() => {
    filterData(Api);
  }, []);

  // console.log(day);
  return (
    <div className="App">
      {day.map((item, index) => {
        return (
          <Calendar
            time={index + 1}
            isAm={true}
            events={dataBasedOnTime[index].events}
          />
        );
      })}

      {/* {day.map((item, index) => {
        return (
          <Calendar
            time={index + 1}
            isAm={false}
            events={dataBasedOnTime[index].events}
          />
        );
      })} */}
    </div>
  );
}

export default App;
