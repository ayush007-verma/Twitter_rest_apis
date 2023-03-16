import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SignUpSuccessMessage = () => {
    toast.success('Sign up Successful', {
        position: toast.POSITION.TOP_CENTER
    })
}

const EmailAlreadyExistsMessage = () => {
    toast.success('Email already exists, try with different email !', {
        position: toast.POSITION.TOP_CENTER
    });
}

const ServerErrorMessage = () => {
    toast.warning('Sign up Successful', {
        position: toast.POSITION.TOP_CENTER
    })
}

const SignInSuccessMessage = () => {
    toast.success('Sign In Successful', {
        position: toast.POSITION.TOP_CENTER
    })
}

export {SignUpSuccessMessage, SignInSuccessMessage, EmailAlreadyExistsMessage, ServerErrorMessage}