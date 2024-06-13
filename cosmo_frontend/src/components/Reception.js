import React, { useState, useEffect, useRef } from 'react';
import { Button, Container, ListGroup, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';

const generateTimeSlots = (startTime, endTime, interval) => {
  const slots = [];
  let current = startTime;
  while (current < endTime) {
    const next = new Date(current.getTime() + interval * 60000);
    slots.push(`${current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${next.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    current = next;
  }
  return slots;
};

const getTodayTimeSlots = (interval) => {
  const now = new Date();
  const startTime = new Date(now.setHours(14, 0, 0, 0)); // Start time is 14:00
  const endTime = new Date(now.setHours(20, 0, 0, 0)); // End time is 20:00
  return generateTimeSlots(startTime, endTime, interval);
};

const Reception = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [today, setToday] = useState('');
  const listGroupRef = useRef(null);

  useEffect(() => {
    const interval = 30; // 30 minutes interval
    setTimeSlots(getTodayTimeSlots(interval));

    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setToday(now.toLocaleDateString(undefined, options));
  }, []);

  const handleBookAppointment = (slot) => {
    setAlertMessage(`Appointment booked for ${slot}`);
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const scrollList = (direction) => {
    if (listGroupRef.current) {
      const scrollAmount = direction === 'up' ? -100 : 100;
      listGroupRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <StyledContainer>
      <h2 className="text-center mb-4">Available Time Slots</h2>
      <h4 className="text-center mb-4">{today}</h4>
      {alertMessage && <Alert variant="success" onClose={() => setAlertMessage(null)} dismissible>{alertMessage}</Alert>}
      <ListContainer>
        <i className="fas fa-sort-up" onClick={() => scrollList('up')}></i>
        <StyledListGroup ref={listGroupRef}>
          {timeSlots.map((slot, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
              {slot}
              <Button variant="primary" onClick={() => handleBookAppointment(slot)}>Book Appointment</Button>
            </ListGroup.Item>
          ))}
        </StyledListGroup>
        <i className="fas fa-sort-down" onClick={() => scrollList('down')}></i>
      </ListContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledListGroup = styled(ListGroup)`
  max-height: 300px;
  overflow-y: auto;
  width: 80%; /* Change this to your desired width */
`;

export default Reception;
