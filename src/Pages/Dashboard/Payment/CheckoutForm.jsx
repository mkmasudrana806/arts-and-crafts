import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect } from "react";
import { useState } from "react";
import './CheckoutForm.css'
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import { authContext } from "../../../providers/AuthProvider/AuthProvider";
import UseEnrolled from "../../../hooks/useEnrolled";
import UseClasses from "../../../hooks/UseClasses";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ cart, price }) => {
    const navigate = useNavigate();
    const [, ,refe]=UseEnrolled();
    // console.log(cart, 'cart');
    // console.log(cart.classItemId, 'cart Name');
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(authContext);
    const [axiosSecure] = UseAxiosSecure()
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    const [classesData,,refetch] = UseClasses();
    console.log(classesData, 'classesData');
    
    const classItem = classesData.find(item => item._id === cart.classItemId)
    console.log(classItem, 'classItem');


    //Reduce available seats
    console.log('price', price);
    const ReduceAvailableSeats = async () => {

        const res = await axiosSecure.patch(`/classes/${cart.classItemId}`, {
            availableSeats: classItem.availableSeats - 1,
            EnrolledStudents: classItem.EnrolledStudents + 1,
        })
        console.log(res.data);
        refetch();
    }

    useEffect(() => {
        if (price > 0) {
            console.log('price', price);
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, axiosSecure])



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('error', error)
            setCardError(error.message);
        }
        else {
            setCardError('');
        }

        setProcessing(true)
        if (!clientSecret) {
            console.log('Invalid clientSecret');
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }

        console.log('payment intent', paymentIntent)
        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            // save payment information to the server
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                quantity: 1,
                cartItem: cart._id, 
                classItem: cart.classItemId, 
                name: cart.name,
                instructor: cart.instructor,
                image: cart.image,
                status: 'Completed',
            }
            axiosSecure.post('/payments', payment)
                .then(res => {

                    console.log(res.data);
                    refe();
                    //update enrolled and available seats
                    ReduceAvailableSeats(cart.classItemId);
                    navigate('/dashboard/enrolledClass')
                })
        }
    }

    return (
        <>
            <form className="w-2/3 m-8" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    // disabled={!stripe || !clientSecret || processing}
                />
                <button className="btn btn-primary btn-sm mt-4" type="submit" >
                    Pay
                </button>
            </form>
            {cardError && <p className="text-warning">{cardError}</p>}
            {transactionId && <p className="text-success">Transaction complete with transactionId: {transactionId}</p>}
        </>
    );
};

export default CheckoutForm;