import React, { useState, useRef, useEffect } from 'react';
import FullCalendar, { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import PageContent from '@/components/PageContent';
// import { INITIAL_EVENTS, otherfileevents, LoadEvents } from './event-utils';
import EventModal from './EventModal';
import EventEdit from './EventEdit';
import { uniqueId } from 'lodash';
import axios from 'axios';
import { setInterval } from 'timers';
// import EventEdit from './EventEdit';

const Calendar = () => {
  const [newAppointment, setNewAppointment] = useState(false);
  const [editAppointment, setEditAppointment] = useState(false);
  const calendarRef = useRef(null);
  const defaultForm = {
    id: '',
    patientId: '',
    title: 'Appointment',
    allDay: false,
    start: null,
    end: null,
  }
  const [formData, setFormData] = useState(defaultForm);
  const [selectedEvent, setSelectedEvent] = useState();
  const [doctorId, setDoctorId] = useState(-1);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEvents = async () => {
      let tempDoctorId = -1;
      try {
        const response = await axios.get("http://localhost:8080/doctor/Id", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        tempDoctorId = response.data;
        setDoctorId(response.data);
        console.log(response.data);
      } catch(error) {
        console.error('Error in Getting Doctor ID', error);
      }
      if(tempDoctorId != -1) {
        try {
          const response = await axios.get(`http://localhost:8080/appointments/doctor/${tempDoctorId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const events = response.data.map(event => {
            const startDate = event.startDateTime.map((value, index) => index === 1 ? value - 1 : value);
            const endDate = event.endDateTime.map((value, index) => index === 1 ? value - 1 : value);
            return {
              id: event.id,
              patientId: event.patient.abhaNumber,
              allDay: false,
              title: "Appointment",
              start: new Date(...startDate),
              end: new Date(...endDate),
            }
          });
          console.log(events);
          const calendarApi = calendarRef.current.getApi();
          calendarApi.addEventSource(events);
        } catch(error) {
          console.error('Get Existing Appointments Failed', error);
        }
      }
      else {
        console.log('Doctor Id is not set for some reason');
      }
    };

    fetchEvents();
  }, []);
  
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // console.log(formData)
    console.log(selectInfo.start, selectInfo.end)
    setFormData(prevFormData => ({
      ...prevFormData,
      start: selectInfo.start,
      end: selectInfo.start
    }));
    setNewAppointment(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const { patientId } = clickInfo.event.extendedProps;
    console.log(patientId, clickInfo.event.title, clickInfo.event.start, clickInfo.event.end, clickInfo.event.allDay);
    setSelectedEvent({
      title: clickInfo.event.title,
      patientId: patientId,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      allDay: clickInfo.event.allDay,
    })
  console.log(selectedEvent);
    // setSelectedEvent(clickInfo.event);
    // setEvents([...events, clickInfo]);
    // setNewAppointment(true);
    setEditAppointment(true);
  };

  const handleAddEvent = async (eventData, calendarApi) => {
    // console.log(newEvent)
    console.log(eventData)
    console.log(formData.patientId)
    // setEvents([...events, formData]);
    let patientId = -1;
    try {
      const response = await axios.post(`http://localhost:8080/patient/Id`,
        {
          "abhaNumber": `${formData.patientId}`
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
      patientId = response.data;
    } catch(error) {
      console.log('Patient Internal Id Get Failed', error.message);
    }
    if(patientId != -1) {
      try {
        console.log(formData.start.toISOString(), formData.end.toISOString());
        const offset = 330; // Indian Standard Time (IST) offset from UTC is +5:30 hours
// const utcDate = new Date(istDate.getTime() + (utcOffsetInMinutes * 60000));
        const newStart = new Date(formData.start.getTime() + (offset*60000));
        const newEnd = new Date(formData.end.getTime() + (offset*60000));
        const response = await axios.post('http://localhost:8080/appointments/create', {
            doctorId: doctorId,
            patientId: patientId,
            startDateTime: newStart,
            endDateTime: newEnd,
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setFormData(formData => ({
          ...formData,
          id: response.data.id,
        }));
      } catch(error) {
        console.log('Adding New Appointment Problem', error.message);
      }
      calendarApi.unselect();
      calendarApi.addEvent(formData);
    }
    else {
      console.log('Patient Id not assigned for some reason');
    }
    setFormData(defaultForm);
    setNewAppointment(false);
  };

  const handleEditEvent = () => {
    setEditAppointment(false);
  };

  const handleDeleteEvent = () => {
    setEditAppointment(false);
  };

  return (
    <PageContent className="calendar-app">
      {/* <LoadEvents></LoadEvents> */}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView="dayGridMonth"
        weekends
        editable
        selectable
        selectMirror
        dayMaxEvents
        nextDayThreshold={'09:00:00'}
        // initialEvents={initialEvents} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
      />
      <EventModal
        open={newAppointment}
        onClose={() => setNewAppointment(false)}
        onAddEvent={(eventData) => handleAddEvent(eventData, calendarRef.current.getApi())}
        formData={formData}
        setFormData={setFormData}
      />
      {/* <EventEdit
        open={editAppointment}
        appointment={selectedEvent}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      /> */}
    </PageContent>
  );
};

function renderEventContent(eventContent: EventContentArg) {
  const { timeText, event } = eventContent;
  return (
    <>
      {timeText && (
        <>
          <div className="fc-daygrid-event-dot"></div>
          <div className="fc-event-time">{eventContent.timeText}</div>
        </>
      )}
      <div className="fc-event-title">{event.title}</div>
    </>
  );
}

export default Calendar;
