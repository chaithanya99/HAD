import React from 'react';
import { useState, useRef } from 'react';
import FullCalendar, { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import PageContent from '@/components/PageContent';
import { INITIAL_EVENTS } from './event-utils';
import EventModal from './EventModal';
import { uniqueId } from 'lodash';
// import EventEdit from './EventEdit';

const Calendar = () => {
  const [newAppointment, setNewAppointment] = useState(false);
  const [editAppointment, setEditAppointment] = useState(false);
  const calendarRef = useRef(null);
  const defaultForm = {
    id: uniqueId(),
    title: 'Appointment',
    allDay: false,
    start: null,
    end: null,
  }
  const [formData, setFormData] = useState(defaultForm);
  const [selectedEvent, setSelectedEvent] = useState();
  
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
    console.log(clickInfo.event);
    // setSelectedEvent(clickInfo.event);
    // setEvents([...events, clickInfo]);
    // setNewAppointment(true);
    setEditAppointment(true);
  };

  const handleAddEvent = (eventData, calendarApi) => {
    // console.log(newEvent)
    console.log(eventData)
    console.log(formData)
    // setEvents([...events, formData]);
    calendarApi.unselect();
    calendarApi.addEvent(formData);
    setFormData(defaultForm);
    setNewAppointment(false);
  };

  // const handleEditEvent = () => {
  //   setEditAppointment(false);
  // };

  // const handleDeleteEvent = () => {

  // };

  return (
    <PageContent className="calendar-app">
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
        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
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
