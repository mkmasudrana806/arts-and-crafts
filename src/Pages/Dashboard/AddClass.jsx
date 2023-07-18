import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ToastContext } from '../../providers/AuthProvider/SweetToast';
import { authContext } from '../../providers/AuthProvider/AuthProvider';
import UseClasses from '../../hooks/UseClasses';

const AddClass = () => {
  const {user}=useContext(authContext);
  const { addedToast, wrongToast } = useContext(ToastContext);
  const [,,refetch] = UseClasses();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form =e.target;
    const instructor=form.instructorName.value;
    const email=form.instructorEmail.value;
    const name = form.className.value;
    const image = form.classImage.value;
    const total_sets = parseInt(form.total_seats.value);
    const price = parseInt(form.price.value);
    const instructor_photo = user?.photoURL;

    const newClass = {
      name,
      instructor,
      email,
      image,
      EnrolledStudents: 0,
      availableSeats : total_sets,
      total_sets,
      price,
      instructor_photo,
      status: 'Pending'
    };
  

      fetch('https://art-craf-server-jabedweb.vercel.app/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClass),
      })
        .then((response) => response.json())
        .then((data) => {
          refetch();
          addedToast();
          console.log('Success:', data);
          // form.reset();
          form.reset();
        })
        .catch((error) => {
          console.error('Error:', error);
          wrongToast();
        });
    };


  return (
    <div>
      <h2>Add a Class</h2>
      <Form onSubmit={handleSubmit}>
        
      <Form.Group controlId="instructorName">
          <Form.Label>Instructor Name</Form.Label>
          <Form.Control type="text" value={user?.displayName} name='instructorName' />
        </Form.Group>

        <Form.Group controlId="instructorEmail">
          <Form.Label>Instructor Email</Form.Label>
          <Form.Control type="email" value={user?.email} name='instructorEmail'/>
        </Form.Group>


        <Form.Group controlId="className">
          <Form.Label>Class Name</Form.Label>
          <Form.Control type="text" name='className' />
        </Form.Group>

        <Form.Group controlId="classImage">
          <Form.Label>Class Image</Form.Label>
          <Form.Control type="text" name='classImage'  />
        </Form.Group>


        <Form.Group controlId="TotalSeats">
          <Form.Label>Total Seats</Form.Label>
          <Form.Control type="number" name='total_seats' />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name='price' />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Class
        </Button>
      </Form>
    </div>
  );
};

export default AddClass;

