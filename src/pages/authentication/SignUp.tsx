import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleSignIn = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    } else if (!password) {
      setError("Please enter your password");
      return;
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Call the API to sign in with email and password
      await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then((response) => {
        if (response.ok) {
          // If the response is ok, navigate to the home page
          navigate("/");
        }
      });
    } catch (error: any) {
      // If there is an error, log the error
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col w-full h-[100vh]">
      <div className="bg-gray-200 w-screen h-12">
        <p className="text-center font-extrabold text-lg   pt-2">
          Contact me at 21520909@gm.uit.edu.vn
        </p>
      </div>

      <div className="flex flex-row w-full h-full">
        <div className="flex w-2/5 bg-[#D9D9D9] items-center justify-center ">
          <div className="w-2/3">
            <div className="flex flex-col w-fit gap-7">
              <p className="font-normal text-2xl">Welcome!</p>
              <p className="font-bold text-3xl">Create a new account</p>
              <p
                onClick={handleSignInClick}
                className="text-black hover:underline font-normal text-base cursor-pointer"
              >
                Already have an account? Click here
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-2/5 m-auto">
          <p className="text-base font-medium mb-3">Email</p>
          <input
            className="w-full bg-white border border-black rounded-lg h-9 p-3 mb-5"
            type="email"
            value={email}
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
          ></input>
          <p className="text-base font-medium mb-3">Password</p>
          <input
            className="w-full bg-white border border-black rounded-lg h-9 p-3 mb-5"
            type="password"
            value={password}
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
          ></input>
          <p className="text-base font-medium mb-3">Confirm Password</p>
          <input
            className="w-full bg-white border border-black rounded-lg h-9 p-3 mb-5"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setError("");
              setConfirmPassword(e.target.value);
            }}
          ></input>
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="bg-black text-white rounded-3xl h-9 mt-5 w-1/3 mx-auto"
            onClick={handleSignIn}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
