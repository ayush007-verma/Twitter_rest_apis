import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signupImage from '../assets/signup.webp';
const cookies = new Cookies();

const initialState = {
    name: '',
    email: '',
    phone: '',
    password: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignUp, setIsSignUp] = useState(true);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        // console.log(form)
    }

    const switchMode = () => {
        setIsSignUp(!isSignUp)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, phone, password } = form;

        const URL = 'http://localhost:5000';

        const response = await axios.post(`${URL}/${isSignUp ? 'signup' : 'signin'}`, {
            name, email, phone, password
        });
        console.log(response);

        cookies.set('authToken', response.data.accessToken)
        cookies.set('name', response.data.userDetails.name)
        cookies.set('email', response.data.userDetails.email)
        cookies.set('userId', response.data.userDetails._id)

        if(isSignUp) {
            cookies.set('hashedPassword', response.data.userDetails.password)
            cookies.set('phone', response.data.userDetails.phone)
            cookies.set('name', response.data.userDetails.name)
        }

        // window.location.reload();
    }
    return (
        <section className="vh-100" style={{backgroundColor: "#eee"}}>
            <div className='container h-100'>
                <div className='row d-flex justify-content-center align-items-center h-100'>
                    <div className='col-lg-12 col-xl-11'>
                        <div className="card text-black" style={{borderRadius: "25px"}}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>{isSignUp ? 'Sign Up' : 'Sign In'}</p>

                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                                            {
                                                isSignUp && (
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input
                                                                className='form-control'
                                                                name='name'
                                                                type='text'
                                                                placeholder='Name'
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                            {/* <label htmlFor='name'>Name</label> */}
                                                        </div>
                                                    </div>

                                                )
                                            }
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        className='form-control'
                                                        name='email'
                                                        type='text'
                                                        placeholder='Email'
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    {/* <label htmlFor='email'>Email</label> */}
                                                </div>
                                            </div>

                                            {
                                                isSignUp && (
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input
                                                                className='form-control'
                                                                name='phone'
                                                                type='text'
                                                                placeholder='Phone'
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                            {/* <label htmlFor='phone'>Phone</label> */}
                                                        </div>
                                                    </div>

                                                )
                                            }

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        className='form-control'
                                                        name='password'
                                                        type='password'
                                                        placeholder='Password'
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    {/* <label htmlFor='password'>Password</label> */}
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">
                                                    {
                                                        isSignUp
                                                            ? 'Sign up'
                                                            : 'Sign In'
                                                    }</button>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src={signupImage} className="img-fluid" alt="Sample image" />
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className='auth__form-container_fields-account'>
                            <p>
                                {
                                    isSignUp
                                        ? 'Already have an account?'
                                        : "Don't have an account?"
                                }
                                <span onClick={switchMode}>
                                    {
                                        isSignUp
                                            ? 'Sign In'
                                            : 'Sign up'
                                    }
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Auth