import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useState, useRef } from "react";
import Header from "./Header";
import { validateForm } from "../utils/Validate";
import { BG_IMG } from "../utils/constants";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const [message, setMessage] = useState(null);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const isValid = () => {
    const mssg = validateForm(email.current.value, password.current.value);
    setMessage(mssg);
    if (mssg) return;
    if (!isLoginForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };
  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };
  return (
    <div>
      <Header />
      <div className="fixed">
        <img
          src={BG_IMG}
          alt="bg-img"
        />
      </div>
      <div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="absolute w-3/12 p-12 text-white bg-black bg-opacity-80 my-36 mx-auto right-0 left-0 rounded-lg"
        >
          <p className="text-left font-bold  text-3xl">
            {isLoginForm ? "Sign In" : "Sign Up"}
          </p>
          {!isLoginForm && (
            <input
              type="text"
              placeholder="Full Name"
              className=" bg-gray-600 p-4 my-4 w-full "
            />
          )}
          <input
            ref={email}
            type="email"
            placeholder="Email Address"
            className=" bg-gray-600 p-4 my-4 w-full "
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="bg-gray-600
            p-4 my-4 w-full"
          />
          {message !== null ? <p className="p-4 my-4 ">{message}</p> : <></>}
          <button
            className="p-2 my-4 bg-red-700 w-full rounded-lg"
            type="submit"
            onClick={isValid}
          >
            {isLoginForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-sm p-2 my-4 cursor-pointer" onClick={toggleForm}>
            {isLoginForm
              ? "New to Netflix? Sign Up Now"
              : "Already a Member? LogIn Now"}
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
