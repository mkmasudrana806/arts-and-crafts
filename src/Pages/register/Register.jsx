import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { updateProfile } from 'firebase/auth';
import PageTitle from '../../components/PageTitle/PageTitle';
import { ToastContext } from '../../providers/AuthProvider/SweetToast';
import { authContext } from '../../providers/AuthProvider/AuthProvider';


const img_token=import.meta.env.VITE_imag_upload_token;
console.log("img_token",img_token);
const Register = () => {
  const navigate = useNavigate();
  const {user, loginUser ,signInGoogle} = useContext(authContext);
  if(user){
    navigate('/');
  }
  const { successToast, alertToast, wrongToast } = useContext(ToastContext);

  const { handleSubmit, register, formState: { errors }, watch } = useForm();

  const img_hosting_url=`https://api.imgbb.com/1/upload?key=${img_token}`
  console.log("img_hosting_url",img_hosting_url);
  const handleRegister = (data) => {
    console.log(data.photo[0],"data.photo[0]");
    const formData = new FormData();
    formData.append('image', data.photo[0]);
  
    fetch(img_hosting_url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((imgResponse) => {
        console.log(imgResponse);
        if (imgResponse.data.display_url) {
          const { name, email, password, confirmPassword } = data;
          const photo = imgResponse.data.display_url;
  
          // Validate password
          if (password !== confirmPassword) {
            alertToast('Passwords do not match');
            return;
          }
  
          // Proceed with registration if password is valid
          loginUser(email, password)
            .then((result) => {
              const user = result.user;
              updateNameAndPhoto(user, name, email, photo);
              const newUser = { name: name, email: email, photo: photo };
              console.log("newUser", newUser);
  
              fetch('https://art-craf-server-jabedweb.vercel.app/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
              })
                .then(response => response.json())
                .then(data => {
                  console.log("User registered successfully:", data);
                  // Handle successful registration
                })
                .catch(error => {
                  console.error("Error registering user:", error);
                  // Handle error in registration
                });
            })
            .catch((error) => {
              wrongToast();
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const signInWithGoogle = () => {
    signInGoogle()
      .then((result) => {
        const user = result.user;
        const { displayName, email, photoURL } = user;
        const newUser = { name: displayName, email: email, photo: photoURL };
        console.log("newUser", newUser);
        fetch('https://art-craf-server-jabedweb.vercel.app/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        })
          .then(response => response.json())
          .then(data => {
            console.log("User registered successfully:", data);
            // Handle successful registration
            successToast();
            navigate('/');
          })
          .catch(error => {
            console.error("Error registering user:", error);
            // Handle error in registration
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const updateNameAndPhoto = (user, name,email, photo) => {
    console.log("NewUser", email);
    updateProfile(user, {
      displayName: name,
      photoURL: photo,
    })
      .then((result) => {
        
        successToast();
        navigate('/');
      })
      .catch((error) => {
        alertToast();
      });
  };

  return (
    <Container>
      <PageTitle title="Register" />
      <Row className="justify-content-center">
        <Col className="justify-content-center shadow card px-0 py-3 my-5" md={5}>
          <form onSubmit={handleSubmit(handleRegister)}>
            <h3 className="text-center">Register</h3>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                {...register('name', { required: true })}
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              />
              {errors.name && <div className="invalid-feedback">Name is required</div>}
            </div>
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
              <input
                {...register('password', {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
                })}
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              />
              {errors.password && errors.password.type === 'required' && <div className="invalid-feedback">Password is required</div>}
              {errors.password && errors.password.type === 'minLength' && <div className="invalid-feedback">Password should be at least 6 characters long</div>}
              {errors.password && errors.password.type === 'pattern' && <div className="invalid-feedback">Password should contain at least one capital letter and one special character</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                {...register('confirmPassword', {
                  required: true,
                  validate: (value) => value === watch('password'),
                })}
                type="password"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              />
              {errors.confirmPassword && errors.confirmPassword.type === 'required' && <div className="invalid-feedback">Confirm Password is required</div>}
              {errors.confirmPassword && errors.confirmPassword.type === 'validate' && <div className="invalid-feedback">Passwords do not match</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Photo</label>
              <input
                {...register('photo', { required: true })}
                type="file"
                className={`form-control ${errors.photo ? 'is-invalid' : ''}`}
              />
              {errors.photo && <div className="invalid-feedback">Photo is required</div>}
            </div>
            <button style={{ backgroundColor: "#617A55", borderRadius: "4px" }} type="submit" className="btn text-light mb-3">Register</button>
          </form>
          <div className="social_login d-flex justify-content-center flex-wrap">
            <div className="google_sign">
              <button style={{ backgroundColor: '#617A55', borderRadius: '4px' }} onClick={signInWithGoogle} className="btn d-flex align-items-center fw-bold px-3 my-2 py-2 text-light me-2">
                <FaGoogle className="me-1" /> Google LogIn
              </button>
            </div>
          </div>
          <h5 className="text-center mt-2">Already have an account? <Link style={{ color: "#617A55" }} className="text-decoration-none" to="/login">Login</Link></h5>
        </Col>
      </Row>
    </Container>
  );
};


export default Register;
