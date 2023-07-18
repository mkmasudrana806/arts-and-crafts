import React from 'react';
import { Button, Table } from 'react-bootstrap';
import UseUser from '../../hooks/UseUser';
//import UserAdmin from '../../hooks/UserAdmin';

const ManageUsers = () => {
  // const [userAdmin]=UserAdmin();
const [users,isLoading,refetch] = UseUser();
console.log(users,"okkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
  const handleMakeInstructor = user =>{
    fetch(`https://art-craf-server-jabedweb.vercel.app/users/instructor/${user._id}`, {
        method: 'PATCH'
    })
    .then(res => res.json())
    .then(data => {
      refetch();
      console.log(data);
    })
}
  const handleMakeAdmin = user =>{
    fetch(`https://art-craf-server-jabedweb.vercel.app/users/admin/${user._id}`, {
        method: 'PATCH'
    })
    .then(res => res.json())
    .then(data => {
      refetch();
        console.log(data);
    })
}

  return (
    <div>
      <h2>Manage Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Image</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <img src={user.image} alt={user.name} style={{ width: '50px', height: '50px' }} />
              </td>
              <td>{user.role}</td>
              <td>
                <Button
                  variant="primary"
                  disabled={user.role === 'instructor' || user.role === 'admin'}
                  onClick={() => handleMakeInstructor(user)}
                >
                  Make Instructor
                </Button>
                <Button className='mx-1'
                  variant="danger"
                  disabled={user.role === 'admin'}
                  onClick={() => handleMakeAdmin(user)}
                >
                  Make Admin
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageUsers;
