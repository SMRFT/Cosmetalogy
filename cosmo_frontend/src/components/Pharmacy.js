import React, { useState } from 'react';
import { Form, Container, Table } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

const Pharmacy = () => {
  const [formData, setFormData] = useState([{ medicineName: '', quantity: '', expiryDate: '' }]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newFormData = [...formData];
    newFormData[index][name] = value;
    setFormData(newFormData);
  };

  const handleKeyPress = (index, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index === formData.length - 1) {
        setFormData([...formData, { medicineName: '', quantity: '', expiryDate: '' }]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/pharmacy/', formData.map(item => ({
      medicine_name: item.medicineName,
      quantity: item.quantity,
      expiry_date: item.expiryDate
    })))
    .then(response => {
      console.log('Data submitted successfully:', response.data);
    })
    .catch(error => {
      console.error('There was an error submitting the form:', error);
    });
  };

  return (
    <StyledContainer>
      <h2 className="text-center mb-4">Pharmacy Form</h2>
      <Form onSubmit={handleSubmit}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((data, index) => (
              <tr key={index}>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter medicine name"
                    name="medicineName"
                    value={data.medicineName}
                    onChange={(e) => handleChange(index, e)}
                    onKeyPress={(e) => handleKeyPress(index, e)}
                    required
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    placeholder="Enter quantity"
                    name="quantity"
                    value={data.quantity}
                    onChange={(e) => handleChange(index, e)}
                    onKeyPress={(e) => handleKeyPress(index, e)}
                    required
                  />
                </td>
                <td>
                  <Form.Control
                    type="date"
                    placeholder="Enter expiry date"
                    name="expiryDate"
                    value={data.expiryDate}
                    onChange={(e) => handleChange(index, e)}
                    onKeyPress={(e) => handleKeyPress(index, e)}
                    required
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <button variant="primary" type="submit">
          Submit
        </button>
      </Form>
    </StyledContainer>
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

export default Pharmacy;
