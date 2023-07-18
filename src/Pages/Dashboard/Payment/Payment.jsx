import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import UseCart from '../../../hooks/UseCart';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {

    const { classItemId } = useParams();


    console.log(classItemId, 'classItem');
  const [cart] = UseCart();
  console.log(cart, 'cart');

  const cartItem = cart.find((item) => item._id === classItemId);
    console.log(cartItem, 'cartItem');
    const { price } = cartItem;

  const total = parseFloat(price.toFixed(2));

  return (
    <div>
      <h2 className="text-3xl">You Are Almost There.</h2>
      <h3>Total: {total}</h3>
      <Elements stripe={stripePromise}>
        <CheckoutForm cart={cartItem} price={total} />
      </Elements>
    </div>
  );
};

export default Payment;
