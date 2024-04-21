import { EventInput } from '@fullcalendar/react';
import uniqueId from 'lodash/uniqueId';
import { startOfMonth, addDays, format, endOfMonth } from 'date-fns';

const today = new Date();
const firstDay = startOfMonth(today);
const lastDay = endOfMonth(today);
const todayStr = format(today, 'yyyy-MM-dd');

console.log(todayStr);

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: uniqueId(),
    title: 'Patient Appointment',
    allDay: true,
    start: format(today, 'yyyy-MM-dd HH:mm:ss'),
    end: format(today, 'yyyy-MM-dd HH:mm:ss')
  },
];
