import React from 'react';
import { Icon } from '@rsuite/icons';
import { VscTable, VscCalendar } from 'react-icons/vsc';
import { MdFingerprint, MdDashboard, MdModeEditOutline } from 'react-icons/md';
import CubesIcon from '@rsuite/icons/legacy/Cubes';
import MemberIcon from '@rsuite/icons/Member';

export const appNavs = [
  {
    eventKey: 'dashboard',
    icon: <Icon as={MdDashboard} />,
    title: 'Dashboard',
    to: '/dashboard'
  },
  {
    eventKey: 'calendar',
    icon: <Icon as={VscCalendar} />,
    title: 'Calendar',
    to: '/calendar'
  },
  {
    eventKey: 'members',
    icon: <Icon as={MemberIcon} />,
    title: 'Patient Tracker',
    to: '/table-members'
  },
  {
    eventKey: 'tables',
    icon: <Icon as={VscTable} />,
    title: 'Tables',
    to: '/table-members',
    children: [
      {
        eventKey: 'members',
        title: 'Patients',
        to: '/table-members'
      },
      {
        eventKey: 'virtualized',
        title: 'Doctor list',
        to: '/table-virtualized'
      },
      {
        eventKey: 'virtualized2',
        title: 'Nurse list',
        to: '/table-virtualized2'
      },
      {
        eventKey: 'virtualized3',
        title: 'Patient list',
        to: '/table-virtualized3'
      },
      {
        eventKey: 'virtualized4',
        title: 'Consent Tracker',
        to: '/table-virtualized4'
      },
      {
        eventKey: 'virtualized5',
        title: 'Medical Records',
        to: '/table-virtualized5'
      }
    ]
  },
  {
    eventKey: 'forms',
    icon: <Icon as={MdModeEditOutline} />,
    title: 'Add User',
    to: '/form-basic',
    children: [
      {
        eventKey: 'form-basic',
        title: 'Add Doctor',
        to: '/form-basic'
      },
      {
        eventKey: 'form-basic2',
        title: 'Add Nurse',
        to: '/form-basic2'
      },
      {
        eventKey: 'Healthrec',
        title: 'Add health record',
        to: '/Healthrecord'
      },
      {
        eventKey: 'ABHA-Registration',
        title: 'ABHA Registration',
        to: '/ABHA-Registration'
      }
    ]
  },
  // {
  //   eventKey: 'authentication',
  //   title: 'Authentication',
  //   icon: <Icon as={MdFingerprint} />,
  //   children: [
  //     {
  //       eventKey: 'sign-in',
  //       title: 'Sign In',
  //       to: '/sign-in'
  //     },

  //     {
  //       eventKey: 'sign-up',
  //       title: 'Sign Up',
  //       to: '/sign-up'
  //     },
  //     {
  //       eventKey: 'error403',
  //       title: 'Error 403',
  //       to: '/error-403'
  //     },
  //     {
  //       eventKey: 'error404',
  //       title: 'Error 404',
  //       to: '/error-404'
  //     },
  //     {
  //       eventKey: 'error500',
  //       title: 'Error 500',
  //       to: '/error-500'
  //     },
  //     {
  //       eventKey: 'error503',
  //       title: 'Error 503',
  //       to: '/error-503'
  //     }
  //   ]
  // },

  // {
  //   eventKey: 'components',
  //   title: 'Components',
  //   icon: <CubesIcon />,
  //   href: 'https://rsuitejs.com/components/overview/',
  //   target: '_blank'
  // }
];
