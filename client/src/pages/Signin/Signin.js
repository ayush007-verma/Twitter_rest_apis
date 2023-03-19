import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../urlConfig";
import { useDispatch } from 'react-redux'
import { loginStart, loginSuccess, loginFailure } from "../../redux/userSlice";
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const initialState = {
  name: "",
  email: "",
  phone: "",
  password: "",
};

const Signin = () => {
  const [form, setForm] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    const { name, email, phone, password } = form;
    try {
      
      if(isSignUp) {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        
        await axios.post(`${api}/auth/${isSignUp ? 'signup' : 'signin'}`, { name, email, phone, password }, {
          headers: {
            Authorization: `Bearer ${user.getIdToken()}`,
          }
        });
      }
      else {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        const token = user.getIdToken();
        const res = await axios.post(`${api}/auth/signin`, { email, password }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(loginSuccess(res.data));
      }

      
      // console.log(res);
      navigate('/')
    } catch (error) {
      // console.log(error);
      dispatch(loginFailure());
    }
  }


  return (
    <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-center">
        {isSignUp ? "Create Account" : "Sign in to twitter"}
      </h2>

      {isSignUp && (
        <input
          className="text-xl py-2 rounded-full px-4"
          placeholder="Name"
          name="name"
          type="text"
          required
          onChange={handleChange}
        />
      )}

      <input
        className="text-xl py-2 rounded-full px-4"
        placeholder="Email"
        name="email"
        type="text"
        required
        onChange={handleChange}
      />
      <input
        className="text-xl py-2 rounded-full px-4"
        placeholder="Password"
        name="password"
        type="password"
        required
        onChange={handleChange}
      />

      {isSignUp && (
        <input
          className="text-xl py-2 rounded-full px-4"
          placeholder="Phone"
          name="phone"
          type="text"
          required
          onChange={handleChange}
        />
      )}

      <button
        type="submit"
        className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
      >
        {isSignUp ? "Sign up" : "Sign In"}
      </button>

      <p className="text-center text-xl cursor-pointer" onClick={switchMode}>
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
      </p>
    </form>
  );
};

export default Signin;
