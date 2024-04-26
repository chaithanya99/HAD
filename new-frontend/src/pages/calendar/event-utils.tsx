import { useEffect } from 'react';
import { EventInput } from '@fullcalendar/react';
import uniqueId from 'lodash/uniqueId';
import { startOfMonth, addDays, format, endOfMonth } from 'date-fns';
import axios from 'axios';
import React from 'react';

const today = new Date();
const firstDay = startOfMonth(today);
const lastDay = endOfMonth(today);
const todayStr = format(today, 'yyyy-MM-dd');

console.log(todayStr);

// export let otherfileevents;

// const LoadEvents = () => {
//   useEffect(() => {
//     const fetchEvents = async () => {
//       const token = localStorage.getItem('token');
//       let doctorId = -1;
//       try {
//         const response = await axios.get("http://localhost:8080/doctor/Id", {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         doctorId = response.data;
//         console.log(doctorId);
//       } catch(error) {
//         console.error('Error in Getting Doctor ID', error);
//       }
//       try {
//         const response = await axios.get(`http://localhost:8080/appointments/doctor/${doctorId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         console.log(response.data);
//         initialEvents = response.data.map(event => ({
//           id: event.id,
//           patientId: event.patient.abhaNumber,
//           allDay: false,
//           title: "Appointment",
//           start: new Date(...event.startDateTime),
//           end: new Date(...event.endDateTime),
//         }));
//         // setInitialEvents(events);
//         console.log(initialEvents);
//       } catch(error) {
//         console.error('Get Appointments Failed', error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (<></>);
// }

// export default LoadEvents;

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: uniqueId(),
    title: 'Patient Appointment',
    allDay: true,
    start: format(today, 'yyyy-MM-dd HH:mm:ss'),
    end: format(today, 'yyyy-MM-dd HH:mm:ss')
  },
];
