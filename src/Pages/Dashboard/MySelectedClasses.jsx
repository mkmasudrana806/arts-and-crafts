import React, { useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCreditCard, FaTrashAlt } from 'react-icons/fa';
import { ToastContext } from '../../providers/AuthProvider/SweetToast';
import Swal from 'sweetalert2';
import UseCart from '../../hooks/UseCart';

const MySelectedClasses = () => {
  const [cart, isLoading, refetch] = UseCart();
  const { deleteToast } = useContext(ToastContext);
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleDelete = (id) => {
    deleteToast().then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        fetch('https://art-craf-server-jabedweb.vercel.app/carts/' + id, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              refetch();
              console.log('deleted');
            }
          });
      }
    });
  };

  return (
    <div>
      <h2>My Selected Classes</h2>
      <div className="d-flex mt-4 mb-3 justify-content-between flex-wrap">
        <h4>Number of Classes: {cart.length}</h4>
        <h4>Total: {total}</h4>
      </div>
      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>Serial</th>
            <th>Class Name</th>
            <th>Instructor</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((classItem, index) => (
            <tr key={classItem._id}>
              <td>{index + 1}</td>
              <td>{classItem.name}</td>
              <td>{classItem.instructor}</td>
              <td>{classItem.price}</td>
              <td>
                <Button
                  onClick={() => handleDelete(classItem._id)}
                  className="me-5"
                  variant="danger"
                >
                  <FaTrashAlt />
                </Button>
                <Link to={`/dashboard/payment/${classItem._id}`}>
  <Button variant="primary">
    Pay <FaCreditCard />
  </Button>
</Link>



              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MySelectedClasses;
