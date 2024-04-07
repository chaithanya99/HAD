import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '/src/images/login/doctoravatar.png';
import {
  Dropdown,
  Popover,
  Whisper,
  WhisperInstance,
  Stack,
  Badge,
  Avatar,
  IconButton,
  List,
  Button
} from 'rsuite';
import NoticeIcon from '@rsuite/icons/Notice';
// import GearIcon from '@rsuite/icons/Gear';
import HelpOutlineIcon from '@rsuite/icons/HelpOutline';
import GithubIcon from '@rsuite/icons/legacy/Github';
// import HeartIcon from '@rsuite/icons/legacy/HeartO';
const renderAdminSpeaker = ({ onClose, left, top, className }: any, ref) => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const handleSelect = eventKey => {
    onClose();
    navigate('/');
    console.log(eventKey);
  };
  const renderHeading = () => {
    console.log(role);
    switch (role) {
      case '[ROLE_ADMIN]':
        return 'Administrator';
      case '[ROLE_USER]':
        return 'User';
      case '[ROLE_DOCTOR]':
        return 'Doctor';
      case '[ROLE_WORKER]':
        return 'Worker';
      default:
        return 'Logged In'; // Or any default text
    }
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
          <p>Signed in as</p>
          <strong>{renderHeading()}</strong>
        </Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item>Set status</Dropdown.Item>
        <Dropdown.Item>Profile & account</Dropdown.Item>
        <Dropdown.Item>Feedback</Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item  onSelect={handleSelect}>
          Sign out
        </Dropdown.Item>
        <Dropdown.Item
          icon={<HelpOutlineIcon />}
          href="https://rsuitejs.com"
          target="_blank"
          as="a"
        >
          Help{' '}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
};

const renderSettingSpeaker = ({ onClose, left, top, className }: any, ref) => {
  const handleSelect = eventKey => {
    onClose();
    console.log(eventKey);
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
          <strong>Settings</strong>
        </Dropdown.Item>
        <Dropdown.Item>Applications</Dropdown.Item>
        <Dropdown.Item>Projects</Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item>Members</Dropdown.Item>
        <Dropdown.Item>Teams</Dropdown.Item>
        <Dropdown.Item>Channels</Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item>Integrations</Dropdown.Item>
        <Dropdown.Item>Customize</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
};

const renderNoticeSpeaker = ({ onClose, left, top, className }: any, ref) => {
  const notifications = [
    [
      '2 hours ago',
      'New Appointment has been created for Dr.Jayesh!!'
    ]
  ];

  return (
    <Popover ref={ref} className={className} style={{ left, top, width: 300 }} title="Last updates">
      <List>
        {notifications.map((item, index) => {
          const [time, content] = item;
          return (
            <List.Item key={index}>
              <Stack spacing={4}>
                <Badge /> <span style={{ color: '#57606a' }}>{time}</span>
              </Stack>

              <p>{content}</p>
            </List.Item>
          );
        })}
      </List>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <Button onClick={onClose}>More notifications</Button>
      </div>
    </Popover>
  );
};

const Header = () => {
  const trigger = useRef<WhisperInstance>(null);

  return (
    <Stack className="header" spacing={8}>
      {/* <IconButton
        icon={<GithubIcon style={{ fontSize: 20 }} />}
        href="https://github.com/chaithanya99/HAD"
        target="_blank"
      /> */}

      <Whisper placement="bottomEnd" trigger="click" ref={trigger} speaker={renderNoticeSpeaker}>
        <IconButton
          icon={
            <Badge content={1}>
              <NoticeIcon style={{ fontSize: 20 }} />
            </Badge>
          }
        />
      </Whisper>

      {/* <Whisper placement="bottomEnd" trigger="click" ref={trigger} speaker={renderSettingSpeaker}>
        <IconButton icon={<GearIcon style={{ fontSize: 20 }} />} />
      </Whisper> */}

      <Whisper placement="bottomEnd" trigger="click" ref={trigger} speaker={renderAdminSpeaker}>
        <Avatar
          size="sm"
          circle
          src={loginImage}
          alt="@simonguo"
          style={{ marginLeft: 8 }}
        />
      </Whisper>
    </Stack>
  );
};

export default Header;
