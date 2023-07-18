import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const PopularInstructorsSection = () => {


  const [classesData, setClassesData] = useState([]);
  useEffect(() => {
    // Fetch the classes data from the API
    fetch('https://art-craf-server-jabedweb.vercel.app/classes')
      .then((response) => response.json())
      .then((data) => setClassesData(data.popularInstructors))
      .catch((error) => console.error(error));
  }, []);

  console.log(classesData);

             
  return (  
    <div className='container mt-5'>  
      <h2 className='text-center mb-4'>Popular Instructors</h2>  
      <Row>
        {classesData.map((instructor) => (  
          <Col key={instructor.name} sm={6} md={3} className='mb-4'>  
            <Card className='class-card'>
              <Card.Img className='class-image' variant='top' src={instructor.instructor_photo} alt={instructor.name} />
              <Card.Body>
                <Card.Title>{instructor.instructor}</Card.Title>  

                <Card.Text><strong>Students : </strong> {instructor.totalEnrolledStudents}</Card.Text>
                {/* show classes array */}
                <Card.Text> <strong>Classes:</strong> {instructor.classes.map((className) => (
                  <span key={className}>{className}, </span>
                ))}</Card.Text>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PopularInstructorsSection;
