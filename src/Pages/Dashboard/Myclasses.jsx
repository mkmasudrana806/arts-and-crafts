import React, { useContext, useEffect, useState } from 'react';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import { authContext } from '../../providers/AuthProvider/AuthProvider';
import UseClasses from '../../hooks/UseClasses';

const MyClasses = () => {
 // const [classes, setClasses] = useState([]);
  const { user } = useContext(authContext);

  const [classesData,isLoading,refetch]=UseClasses();

  const classes=classesData.filter((classItem) => classItem.email === user.email);

  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const handleUpdateClick = (classId) => {
    const selected = classes.find((classItem) => classItem._id === classId);
    setSelectedClass(selected);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedClass(null);
    setShowModal(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form =event.target;
    const name=form.name.value;
    console.log(name);
    fetch(`https://art-craf-server-jabedweb.vercel.app/classes/${selectedClass._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then((data) => {
          refetch();
      }
      )
    handleModalClose();
  };

  return (
    <div>
      <h2>My Classes</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Status</th>
            <th>Total Enrolled Students</th>
            <th>Feedback</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem._id}>
              <td>{classItem.name}</td>
              <td>{classItem.status}</td>
              <td>{classItem.EnrolledStudents}</td>
              <td>{ classItem.feedback}</td>
              <td>
                {classItem.status === 'denied' ? (
                  <button disabled>Update</button>
                ) : (
                  <button onClick={() => handleUpdateClick(classItem._id)}>Update</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="className">
              <Form.Label>Class Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter class name"
                name="name"
                defaultValue={selectedClass?.name}
              />
            </Form.Group>
            {/* Add other form fields for updating class information */}
            <Button type="submit">Update</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MyClasses;
