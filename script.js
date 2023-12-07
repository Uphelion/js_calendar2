// Selecting various elements from the HTML document using class names
const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");

// Initializing variables for the current date, active day, month, and year
let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

// Array representing the names of months
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Array to store events
const eventsArr = [];
// Retrieving events from local storage and logging them
getEvents();
console.log(eventsArr);

// Function to initialize the calendar, setting up the structure of days
function initCalendar() {
  // Calculating various properties of the current month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  // Updating the displayed month and year
  date.innerHTML = months[month] + " " + year;

  let days = "";

  // Creating HTML for previous month's days
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  // Creating HTML for current month's days
  for (let i = 1; i <= lastDate; i++) {
    let event = false;
    // Checking if an event is present on the current day
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    // Building HTML for the day and marking it as active if it's today
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      // Building HTML for other days
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  // Creating HTML for next month's days
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  // Updating the days container with the generated HTML
  daysContainer.innerHTML = days;
  // Adding event listeners to the days
  addListner();
}

// Function to move to the previous month
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

// Function to move to the next month
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

// Adding click event listeners to the previous and next buttons
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

// Initializing the calendar
initCalendar();

// Function to add click event listeners to each day
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      // Setting the active day and updating events for that day
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      // Removing the "active" class from all days
      days.forEach((day) => {
        day.classList.remove("active");
      });
      // If clicked on a previous or next date, switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        // Adding "active" to the clicked day after the month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        // Adding "active" to the clicked day after the month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        // Adding "active" class to the clicked day
        e.target.classList.add("active");
      }
    });
  });
}

// Adding click event listener to the "Today" button
todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

// Adding input event listener to the date input field
dateInput.addEventListener("input", (e) => {
  // Formatting the input value as MM/YYYY
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

// Adding click event listener to the "Today" button
todayBtn.addEventListener("click", () => {
  // Set the date to today's date
  today = new Date();
  // Update the month and year variables
  month = today.getMonth();
  year = today.getFullYear();
  // Initialize the calendar with the updated date
  initCalendar();
});

// Adding input event listener to the date input field
dateInput.addEventListener("input", (e) => {
  // Remove non-numeric and non-slash characters from the input
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  // Add a slash after the second digit if not present
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  // Limit the input to MM/YYYY format
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  // Handle backspace to remove the slash when needed
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

// Adding click event listener to the "Go to Date" button
gotoBtn.addEventListener("click", gotoDate);

// Function to navigate to the specified date
function gotoDate() {
  console.log("here");
  // Split the input value into an array using "/"
  const dateArr = dateInput.value.split("/");
  // Check if the array has two elements (month and year)
  if (dateArr.length === 2) {
    // Validate the month and year
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      // Update the month and year variables
      month = dateArr[0] - 1;
      year = dateArr[1];
      // Reinitialize the calendar with the updated date
      initCalendar();
      return;
    }
  }
  // Display an alert for an invalid date
  alert("Invalid Date");
}

// Function to get active day details and update UI elements
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  // Update the UI with the active day details
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

// Function to update events displayed on the UI for the active day
function updateEvents(date) {
  let events = "";
  // Iterate through eventsArr to find events for the specified date
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      // Display each event in the events container
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  // Display "No Events" if there are no events for the active day
  if (events === "") {
    events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
  }
  // Update the events container with the generated HTML
  eventsContainer.innerHTML = events;
  // Save the events to local storage
  saveEvents();
}

// Adding click event listener to the "Add Event" button
addEventBtn.addEventListener("click", () => {
  // Toggle the "active" class for the addEventWrapper
  addEventWrapper.classList.toggle("active");
});

// Adding click event listener to the close button in the add event form
addEventCloseBtn.addEventListener("click", () => {
  // Remove the "active" class from the addEventWrapper
  addEventWrapper.classList.remove("active");
});

// Adding click event listener to close the add event form if clicked outside
document.addEventListener("click", (e) => {
  // Check if the click is not on the addEventBtn or within addEventWrapper
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    // Remove the "active" class from the addEventWrapper
    addEventWrapper.classList.remove("active");
  }
});

// Allow up to 50 characters in the event title
addEventTitle.addEventListener("input", (e) => {
  // Limit the input length to 50 characters
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

// Allow only time input in event time fields
addEventFrom.addEventListener("input", (e) => {
  // Remove non-numeric and non-colon characters from the input
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  // Add a colon after the second digit if not present
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  // Limit the input length to 5 characters
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", (e) => {
  // Remove non-numeric and non-colon characters from the input
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  // Add a colon after the second digit if not present
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  // Limit the input length to 5 characters
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

// Adding click event listener to submit the add event form
addEventSubmit.addEventListener("click", () => {
  // Retrieve values from the add event form
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  // Validate form fields
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

  // Check correct time format (24-hour)
  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Invalid Time Format");
    return;
  }

  // Convert time to 12-hour format
  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  // Check if the event is already added
  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("Event already added");
    return;
  }
  // Create a new event object
  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
  };
  // Add the new event to the events array
  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  // Clear the add event form fields and close the form
  addEventWrapper.classList.remove("active");
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  // Update the events for the active day
  updateEvents(activeDay);
  // Select the active day and add the "event" class if not added
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});

// Adding click event listener to delete an event when clicked on it
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    // Confirm deletion and remove the event
    if (confirm("Are you sure you want to delete this event?")) {
      const eventTitle = e.target.children[0].children[1].innerHTML;
      eventsArr.forEach((event) => {
        if (
          event.day === activeDay &&
          event.month === month + 1 &&
          event.year === year
        ) {
          event.events.forEach((item, index) => {
            if (item.title === eventTitle) {
              event.events.splice(index, 1);
            }
          });
          // If no events left in a day, remove that day from eventsArr
          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            // Remove the "event" class from the day
            const activeDayEl = document.querySelector(".day.active");
            if (activeDayEl.classList.contains("event")) {
              activeDayEl.classList.remove("event");
            }
          }
        }
      });
      // Update the events for the active day
      updateEvents(activeDay);
    }
  }
});

// Function to save events in local storage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

// Function to get events from local storage
function getEvents() {
  // Check if events are already saved in local storage, then return events; otherwise, return nothing
  if (localStorage.getItem("events") === null) {
    return;
  }
  // Merge existing events with events from local storage
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

// Function to convert time to 12-hour format
function convertTime(time) {
  // Convert time to 24-hour format
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}
