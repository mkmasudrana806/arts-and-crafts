import React, { useContext, useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './ClassesPage.css'; // Import custom CSS file
import { authContext } from '../../providers/AuthProvider/AuthProvider';
import { ToastContext } from '../../providers/AuthProvider/SweetToast';
import { useNavigate } from 'react-router-dom';
import UseClasses from '../../hooks/UseClasses';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const ClassesPage = () => {
  const navigate = useNavigate();
  const { addedToast, wrongToast,wrongPurchase } = useContext(ToastContext);
  const { user,loader } = useContext(authContext);
  const [classesData,,refetch] = UseClasses();
  const [axiosSecure] = UseAxiosSecure();


  const [userRole, setUserRole] = useState(null);

  const [approvedClasses,setApprovedClasses]=useState([])

  useEffect(()=>{
    if(classesData.length>0){
      const approvedClasses=classesData.filter(item=>item.status==='Approved')
      setApprovedClasses(approvedClasses)
    }
  }
  ,[classesData])

  useEffect(() => {
    if (user) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          setUserRole(res.data.role);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);


  const handleAddToCart = item => {

    const { name, image, price, _id ,instructor} = item;

    if(user && user.email){
        const cartItem = {classItemId: _id, name,instructor, image, price, email: user.email}
        axiosSecure.post('/carts', cartItem)
        .then(res => res.data)
        .then(data => {
          if(data.insertedId){
              refetch();
              addedToast();
          }
        })
        .catch(err => console.log(err))
    }else{
      wrongToast();
      navigate('/login');
    }
  }

  return (
    <div className='container'>
      <h2 className='text-center mt-4 mb-5'>Approved Classes</h2>
      <Row>
      {approvedClasses.map((classItem) => (
      <Col key={classItem.id} sm={6} md={4} lg={3} className="mb-4">
        <Card className={classItem.availableSeats === 0  ? 'class-card sold-out' : 'class-card'}>
          <Card.Img variant="top" src={classItem.image} alt={classItem.name} />
          <Card.Body>
            <Card.Title>{classItem.name}</Card.Title>
            <Card.Text>Instructor: {classItem.instructor}</Card.Text>
            <Card.Text>Available Seats: {classItem.availableSeats}</Card.Text>
            <Card.Text>Price: ${classItem.price}</Card.Text>
            <Button onClick={() => handleAddToCart(classItem)}  disabled={classItem.availableSeats === 0 || userRole=='admin' || userRole=='instructor'} variant="primary">
              {classItem.availableSeats === 0 ? 'Sold Out' : 'Select'}
            </Button>
          </Card.Body>
        </Card>
      </Col>
      ))}
        </Row>
    </div>
  );
};


export default ClassesPage;
