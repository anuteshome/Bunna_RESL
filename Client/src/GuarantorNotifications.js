import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Alert, Container, Row, Col } from 'react-bootstrap';

const GuarantorNotifications = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseStatus, setResponseStatus] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/loan/guarantor-requests', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(response.data.requests);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch guarantor requests');
      setLoading(false);
    }
  };

  const handleResponse = async (requestId, accept) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/loan/guarantor-response', 
        { requestId, accept },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      // Remove the responded request from the list
      setRequests(requests.filter(req => req.id !== requestId));
      
      // Show success message
      setResponseStatus({
        show: true,
        message: response.data.message,
        type: 'success'
      });
      
      // Hide the message after 3 seconds
      setTimeout(() => {
        setResponseStatus({ show: false, message: '', type: '' });
      }, 3000);
      
    } catch (err) {
      setResponseStatus({
        show: true,
        message: err.response?.data?.message || 'Failed to respond to request',
        type: 'danger'
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <Container className="mt-4">
      <h2>Guarantor Requests</h2>
      
      {responseStatus.show && (
        <Alert variant={responseStatus.type}>
          {responseStatus.message}
        </Alert>
      )}
      
      {requests.length === 0 ? (
        <Alert variant="info">You have no pending guarantor requests.</Alert>
      ) : (
        <Row>
          {requests.map(request => (
            <Col md={6} key={request.id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Loan Guarantor Request</Card.Title>
                  <Card.Text>
                    <strong>From:</strong> {request.requester_fname} {request.requester_lname}<br />
                    <strong>Message:</strong> {request.request_message}<br />
                    <strong>Date:</strong> {new Date(request.request_date).toLocaleDateString()}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button 
                      variant="success" 
                      onClick={() => handleResponse(request.id, true)}
                    >
                      Accept
                    </Button>
                    <Button 
                      variant="danger" 
                      onClick={() => handleResponse(request.id, false)}
                    >
                      Reject
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default GuarantorNotifications;