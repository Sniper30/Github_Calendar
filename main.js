document.addEventListener("DOMContentLoaded", () => {
  const CalendarContainer = document.getElementById("calendarContainer");
  function paintCalendar(yearToLock){
    let str = yearToLock + 'Jan 01' // you can change the year (just the year) to see the lasts commits of {commits[]}
    let year = new Date(str).getFullYear();
    let startDay = new Date(str).getDay();
    for (let k = 0; k < startDay; k++) createElement(CalendarContainer, '', "empty");
    
    for (let i = 0; i < days.length; i++) {
      let day = days[i];
      for (let j = 0; j < day.length; j++) {
        let str = year + " " + months[i] + " " + day[j];
        let date = new Date(str);
        if (date.toString() === "Invalid Date") continue;
        if (j >=28 && date.getDate() < 4) continue;
        let element = createElement(CalendarContainer, '', "day",months[i] + day[j]);
        tippy('.'+months[i] + day[j], {
          content: date.toISOString(),
        });//tooltip
        if (date.getDate() === 1) {
          element.classList.add("first");
          let month = createElement(element, months[i], "months");
          month.style.top = '-'+(CalendarContainer.scrollTop)+ "px";
        }
      } //creating nodes in the document
    }
  
    for (const key in commits) {
        let _year = new Date(commits[key].date).getFullYear();
        if(_year !== year ) continue
        let month = new Date(commits[key].date).getMonth() ;
        let day = new Date(commits[key].date).getDate();
        let inputsDate = document.querySelector(`#calendarContainer > div.day.${months[month] + '' +day}`);
        inputsDate.classList.add(commits[key].type)
      }

  }
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let commits = [{date: '2022 Jan 08', type:'low'},{date:'2023 April 23', type:'mid'},{date:'2024 Jan 01',type:'low'},{date:'2024 Jan 09',type:'hight'}]
  let days = fillDays(months);
  let year = 2024
  paintCalendar(year)


function fillDays(array) {
  const toFill = [];
  for (let i = 0; i < array.length; i++) {
    let temp = [];
    for (let k = 0; k < 32; k++) temp.push(k);

    toFill.push(temp);
  }
  return toFill;
}

function createElement(parent, text, classname,exactDay) {
  let e = document.createElement("div");
  e.classList.add(classname);
  e.classList.add(exactDay);

  e.textContent = text;
  parent.appendChild(e);
  return e;
}

let leftArrow = document.getElementById('leftArrow');
let rightArrow = document.getElementById('rightArrow');
let yearPreviw = document.getElementById('year');
leftArrow.onclick = ()=>{
  yearPreviw.innerHTML = ''
  CalendarContainer.innerHTML = '';
  year--
  yearPreviw.innerHTML = year
  paintCalendar(year)
}
rightArrow.onclick = ()=>{
  yearPreviw.innerHTML = ''
  CalendarContainer.innerHTML = '';
  year++
  yearPreviw.innerHTML = year
  paintCalendar(year)
}
})
