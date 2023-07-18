import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { authContext } from '../../providers/AuthProvider/AuthProvider';
import { ToastContext } from '../../providers/AuthProvider/SweetToast.jsx';
import PageTitle from '../../components/PageTitle/PageTitle';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const { user, signIn, signInGoogle } = useContext(authContext);
  const { successToast, wrongToast } = useContext(ToastContext);
  const { handleSubmit, register, formState: { errors } } = useForm();

  if(user){
    navigate(from);
  }

  const handleLogin = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then((result) => {
        console.log(result);
        successToast();
        navigate(from);
      })
      .catch((error) => {
        wrongToast();
        console.log(error);
      });
  };

  const signInWithGoogle = () => {
    //check if user is already registered or not
    //if registered then login
    //else register and then login
    signInGoogle()
      .then((result) => {
          const newUser = {
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          };
          console.log(newUser);
          fetch('https://art-craf-server-jabedweb.vercel.app/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              successToast();
              navigate(from);
            })
            .catch((error) => {
              wrongToast();
              console.log(error);
            });
      })
      .catch((error) => {
        wrongToast();
        console.log(error);
      }
      );
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Container>
      <PageTitle title="Login" />
      <Row className="justify-content-center">
        <Col className="justify-content-center shadow card py-3 my-5" md={5}>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                {...register('email', { required: true })}
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              {errors.email && <div className="invalid-feedback">Email is required</div>}
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input
                  {...register('password', { required: true })}
                  type={passwordVisible ? 'text' : 'password'}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <div className="invalid-feedback">Password is required</div>}
            </div>
            <button style={{ backgroundColor: '#617A55', borderRadius: '4px' }} type="submit" className="btn text-light mb-3">Login</button>
          </form>
          <div className="social_login d-flex justify-content-center flex-wrap">
            <div className="google_sign">
              <button style={{ backgroundColor: '#617A55', borderRadius: '4px' }} onClick={signInWithGoogle} className="btn d-flex align-items-center fw-bold px-3 my-2 py-2 text-light me-2">
                <FaGoogle className="me-1" /> Google LogIn
              </button>
            </div>
          </div>
          <h5 className="text-center mt-2">Are you a new register? <Link style={{ color: '#617A55' }} className="text-decoration-none" to="/register">Register</Link></h5>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
