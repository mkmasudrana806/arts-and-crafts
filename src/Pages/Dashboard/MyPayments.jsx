import React from 'react';
import { Table } from 'react-bootstrap';
import UseEnrolled from '../../hooks/useEnrolled';

const MyPayments = () => {
  const [enrolled,isLoading,refe] = UseEnrolled();
  return (
    <div>
      <h2>Payment History</h2>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>TransactionId</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {enrolled.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.transactionId}</td>
              <td>{new Date(payment.date).toLocaleDateString('en-US', { dateStyle: 'full' })}</td>
              <td>{payment.price}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};


export default MyPayments;
