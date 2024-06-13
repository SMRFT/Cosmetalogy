import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';
import styled from 'styled-components';

const Doctor = () => {
  const [lowQuantityMedicines, setLowQuantityMedicines] = useState([]);
  const [nearExpiryMedicines, setNearExpiryMedicines] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/check_medicine_status/')
      .then(response => {
        setLowQuantityMedicines(response.data.low_quantity_medicines);
        setNearExpiryMedicines(response.data.near_expiry_medicines);
      })
      .catch(error => {
        console.error('There was an error fetching the medicine status:', error);
      });
  }, []);

  return (
  <div>
    {/* <center><h2>Doctor Dashboard</h2></center><br/> */}
    <StyledContainer>
      <h2 className="text-center mb-3">Pharmacy Details</h2>
      <h4 className="mb-4">Low Quantity Medicines</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {lowQuantityMedicines.map((medicine, index) => (
            <tr key={index}>
              <td>{medicine.medicine_name}</td>
              <td>{medicine.quantity}</td>
              <td>{medicine.expiry_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h4 className="mb-4">Near Expiry Medicines</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {nearExpiryMedicines.map((medicine, index) => (
            <tr key={index}>
              <td>{medicine.medicine_name}</td>
              <td>{medicine.quantity}</td>
              <td>{medicine.expiry_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </StyledContainer>
    </div>
  );
};

const StyledContainer = styled(Container)`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default Doctor;
