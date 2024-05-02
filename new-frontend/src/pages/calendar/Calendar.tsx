import React, { useState, useRef, useEffect } from 'react';
import FullCalendar, { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import PageContent from '@/components/PageContent';
// import { INITIAL_EVENTS, otherfileevents, LoadEvents } from './event-utils';
import EventAdd from './EventAdd';
import EventEdit from './EventEdit';
import axios, { formToJSON } from 'axios';
import { error } from 'console';
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
    notes: '',
  }
  const [formData, setFormData] = useState(defaultForm);
  const [selectedEvent, setSelectedEvent] = useState();
  const [doctorId, setDoctorId] = useState(-1);
  const [patientList, setPatientList] = useState([]);
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
              notes: event.notes,
              patientName: event.patient.name,
              patientMobile: event.patient.mobile,
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

    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/patients', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        setPatientList(response.data);
      } catch(error) {
        console.error('Fetching Patients Failed: ', error.message);
      }
    };

    fetchEvents();
    fetchPatients();
  }, []);

  const resetValues = () => {
    setFormData(defaultForm);
  }
  
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
    const { patientId, notes, patientName, patientMobile } = clickInfo.event.extendedProps;
    console.log(clickInfo.event);
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      patientId: patientId,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      allDay: clickInfo.event.allDay,
      notes: notes,
      patientName: patientName,
      patientMobile: patientMobile,
    })
    console.log({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      patientId: patientId,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      allDay: clickInfo.event.allDay,
      notes: notes,
      patientName: patientName,
      patientMobile: patientMobile,
    });
    // setSelectedEvent(clickInfo.event);
    // setEvents([...events, clickInfo]);
    // setNewAppointment(true);
    setEditAppointment(true);
  };

  const addValidation = () => {
    if(formData.patientId === null) {
      console.error('Patient Not Selected');
      return false;
    }
    else if(formData.start === null || formData.end === null) {
      console.error('Appointment Dates are Not Filled');
      return false;
    }
    else if(formData.start >= formData.end) {
      console.error('Appointment End Time must be after Start Time');
      return false;
    }
    return true;
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
    console.log(formData);
    if(patientId != -1 && addValidation()) {
      let updatedForm;
      if(!checkEventOverlap(formData)) {
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
              notes: formData.notes,
            }, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          );
          console.log(response.data.id);
          updatedForm = {
            ...formData,
            id: response.data.id,
            patientName: response.data.patient.name,
            patientMobile: response.data.patient.mobile,
          }
        } catch(error) {
          if(error.response && error.response.status === 400) {
            alert("New Appointment Overlapping with Existing Appointment");
          }
          else {
            console.log('Adding New Appointment Problem', error.message);
          }
        }
        console.log(updatedForm);
        calendarApi.unselect();
        calendarApi.addEvent(updatedForm);
        setFormData(defaultForm);
        setNewAppointment(false);
      }
      else {
        alert('New Appointment Overlapping with Existing Appointment');
      }
    }
    else {
      if(patientId === -1)
        console.error('Patient Id not assigned for some reason');
    }
  };

  const checkEventOverlap = (current) => {
    const calendarApi = calendarRef.current.getApi();
    const events = calendarApi.getEvents();
    return events.some(event => {
      return (event.id != current.id && event.end >= current.start && event.start <= current.end);
    });
  }

  const editValidation = (appointment) => {
    if(appointment.start === null || appointment.end === null) {
      console.error('Appointment Dates are Not Filled');
      return false;
    }
    else if(appointment.start >= appointment.end) {
      console.error('Appointment End Time must be after Start Time');
      return false;
    }
    return true;
  };

  const handleEditEvent = async (newAppointment) => {
    console.log(newAppointment);
    let overlap = checkEventOverlap(newAppointment);
    if(!overlap && editValidation(newAppointment)) {
      try {
        const offset = 330;
        const newStart = new Date(newAppointment.start.getTime() + (offset*60000));
        const newEnd = new Date(newAppointment.end.getTime() + (offset*60000));
        const response = await axios.put('http://localhost:8080/appointments/reschedule', {
          appointmentId: newAppointment.id,
          doctorId: doctorId,
          startDateTime: newStart,
          endDateTime: newEnd,
          notes: newAppointment.notes,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if(response.status === 200) {
          const calendarApi = calendarRef.current.getApi();
          const event = calendarApi.getEventById(newAppointment.id);
          event.setDates(newAppointment.start, newAppointment.end);
          event.setExtendedProp('notes', newAppointment.notes);
          event.update();
          setEditAppointment(false);
        }
      } catch(error) {
        if(error.response && error.response.status === 400) {
          console.error('HTTP Error:400 - Editing Appointment Failed in Backend');
        }
        else {
          console.error('Edit Appointment Not Working: ', error.message);
        }
      }
    }
    else {
      alert('Overlapping Appointments');
    }
  };

  const handleDeleteEvent = async (eventData) => {
    console.log(selectedEvent);
    try {
      const response = await axios.delete(`http://localhost:8080/appointments/delete/${selectedEvent.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const calendarApi = calendarRef.current.getApi();
      calendarApi.getEventById(selectedEvent.id).remove();
    } catch(error) {
      console.error('Deleting Appointments Failed: ', error.message);
    }
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
        editable={false}
        selectable
        selectMirror
        dayMaxEvents
        nextDayThreshold={'09:00:00'}
        // initialEvents={initialEvents} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
      />
      <EventAdd
        open={newAppointment}
        onClose={() => setNewAppointment(false)}
        onAddEvent={(eventData) => handleAddEvent(eventData, calendarRef.current.getApi())}
        formData={formData}
        setFormData={setFormData}
        patientList={patientList}
        formDataReset={resetValues}
      />
      { editAppointment && (
        <EventEdit
          open={editAppointment}
          appointment={selectedEvent}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
          onClose={() => setEditAppointment(false)}
        />
      )}
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
