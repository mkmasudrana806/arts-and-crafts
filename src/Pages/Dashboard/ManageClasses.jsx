import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import UseClasses from '../../hooks/UseClasses';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import UseUser from '../../hooks/UseUser';

const ManageClasses = () => {
  const [axiosSecure] = UseAxiosSecure();

  const[users,,]=UseUser();
  console.log(users,"okkkkkkkkkkkkkkkkkkkk");
  console.log(users);


  const [classesData,isLoading,refetch] = UseClasses();

  const [selectedClass, setSelectedClass] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleApprove = (classId) => {
    fetch(`https://art-craf-server-jabedweb.vercel.app/classes/${classId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Approved' }),
    })
      .then((response) => response.json())
      .then((data) => {
          refetch();  
      }
      )
  };

  const handleDeny = (classId) => {
    fetch(`https://art-craf-server-jabedweb.vercel.app/classes/${classId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Denied' }),
    })
      .then((response) => response.json())
      .then((data) => {
          refetch();  
      }
      )
  };

  const handleSendFeedback = () => {
    const res=axiosSecure.patch(`/classes/${selectedClass._id}`, { feedback : feedback })
    console.log(res);
    setShowModal(false);
  };

  const openModal = (classId) => {
    console.log(classId, "classId");
    const selectedClass = classesData.find((cls) => cls._id === classId);
    setSelectedClass(selectedClass);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClass(null);
    setFeedback('');
  };

  return (
    <div>
      <h2>Manage Classes</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr className='align-middle text-center'>
            <th>Serial</th>
            <th>Class Name</th>
            <th>Class Image</th>
            <th>Instructor</th>
            <th>Instructor Email</th>
            <th>Available Seats</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {classesData.map((cls,index) => (
            <tr key={cls.id} className='align-middle'>
              <td>{index+1}</td>
              <td>{cls.name}</td>
              <td className='text-center'><img style={{width:"50px"}} src={cls.image}></img></td>
              <td>{cls.instructor}</td>
              <td>{cls.email}</td>
              <td>{cls.availableSeats}</td>
              <td>{cls.price}</td>
              <td>{cls.status}</td>
              <td className='d-flex flex-column'>
                {cls.status === 'Pending'  && (
                  <>
                    <Button variant="success" onClick={() => handleApprove(cls._id)}>
                      Approve
                    </Button>
                    <Button className='my-1' variant="danger" onClick={() => handleDeny(cls._id)}>
                      Deny
                    </Button>
                  </>
                )}
                  <Button variant="primary" onClick={() => openModal(cls._id)}>
                      Send Feedback
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Send Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="feedback">
            <Form.Label>Feedback</Form.Label>
            <Form.Control as="textarea" rows={4} value={feedback} onChange={(e) => setFeedback(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendFeedback}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageClasses;
