import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import UseEnrolled from '../../hooks/useEnrolled';

const MyEnrolledClasses = () => {
  const [enrolled,isLoading,refe] = UseEnrolled();

  return (
    <div>
      <h2>My Enrolled Classes</h2>
      <div className="d-flex mt-4 mb-3 justify-content-between flex-wrap">
      </div>
      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>Serial</th>
            <th>Class Name</th>
            <th>Instructor</th>
            <th>Price</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {enrolled.map((classItem, index) => (
            <tr key={classItem._id}>
              <td>{index + 1}</td>
              <td>{classItem.name}</td>
              <td>{classItem.instructor}</td>
              <td>{classItem.price}</td>
              <td>
              <td className='text-center'><img style={{width:"50px"}} src={classItem.image}></img></td>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyEnrolledClasses;
