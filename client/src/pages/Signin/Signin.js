import React, {useState} from 'react'

const Signin = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const switchMode = () => {
    setIsSignUp(!isSignUp)
}

  return (
    <form className='bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10'>
      <h2 className='text-3xl font-bold text-center'>
        {
          isSignUp ? 'Create Account' : 'Sign in to twitter'
        }
      </h2>
      
      {
        isSignUp && (
          <input
            className='text-xl py-2 rounded-full px-4'
            placeholder='Name'
            type='text'
            required
          />
        )
      }

      <input
        className='text-xl py-2 rounded-full px-4'
        placeholder='Email'
        type='text'
        required
       />
       <input
        className="text-xl py-2 rounded-full px-4"
        placeholder="Password"
        type="password"
        required
      />

      {
        isSignUp && (
          <input
            className='text-xl py-2 rounded-full px-4'
            placeholder='Phone'
            type='text'
            required
          />
        )
      }

      <button type='submit' className='text-xl py-2 rounded-full px-4 bg-blue-500 text-white'>
      {
        isSignUp ? 'Sign up' : 'Sign In'
      }
      </button>

      <p className='text-center text-xl cursor-pointer' onClick={switchMode}>
        {
          isSignUp ? "Already have an account?" : "Don't have an account?"
        }
      </p>
    </form>
  )
}

export default Signin