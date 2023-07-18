import { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import UseClasses from '../../hooks/UseClasses';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { authContext } from '../../providers/AuthProvider/AuthProvider';
import { ToastContext } from '../../providers/AuthProvider/SweetToast';
import { useNavigate } from 'react-router-dom';
import './PopularClassesSection.css';

const PopularClassesSection = () => {

  const [classesData, setClassesData] = useState([]);
  const navigate = useNavigate();
  const { addedToast, wrongToast,wrongPurchase } = useContext(ToastContext);
  const { user,loader } = useContext(authContext);
  const [axiosSecure] = UseAxiosSecure();
  const [,,refetch] = UseClasses();
  

  useEffect(() => {
    // Fetch the classes data from the API
    fetch('https://art-craf-server-jabedweb.vercel.app/classes?limit=6&status=Approved')
      .then((response) => response.json())
      .then((data) => setClassesData(data.classes))
      .catch((error) => console.error(error));
  }, []);


  const [userRole, setUserRole] = useState(null);

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
      <h2 className='text-center mb-4'>Our Popular Classes</h2>  
      <Row>
      {classesData.map((classItem) => (
      <Col key={classItem._id} sm={6} md={4} lg={3} className="mb-4">
        <Card className={classItem.availableSeats === 0 ? 'class-card sold-out' : 'class-card'}>
          <Card.Img variant="top" src={classItem.image} alt={classItem.name} />
          <Card.Body>
            <Card.Title>{classItem.name}</Card.Title>
            <Card.Text>Instructor: {classItem.instructor}</Card.Text>
            <Card.Text>Available Seats: {classItem.availableSeats}</Card.Text>
            <Card.Text>EnrolledStudents Seats: {classItem.EnrolledStudents}</Card.Text>
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

export default PopularClassesSection;

