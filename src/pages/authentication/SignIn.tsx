import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { API_CONST } from "../../constants";

// redux
import { useDispatch } from "react-redux";

export default function SignIn() {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleSignIn = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    } else if (!password) {
      setError("Please enter your password");
      return;
    }

    try {
      // Call the API to sign in with email and password
      await fetch(API_CONST + "/user/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("accessToken", data.token);
          navigate("/");
        }
      });
    } catch (error: any) {
      // If there is an error, log the error
      setError(error.message);
      console.error(error);
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
        <div className="flex w-2/5 bg-[#D9D9D9] items-center justify-center">
          <div className="w-2/3">
            <div className="flex flex-col w-fit gap-7">
              <p className="font-normal text-2xl">Welcome!</p>
              <p className="font-bold text-3xl">Sign in to your account</p>
              <p
                onClick={handleSignUpClick}
                className="text-black hover:underline font-normal text-base cursor-pointer"
              >
                Do not have an account? Click here
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-2/5 m-auto">
          <p className="size-5 font-medium mb-3">Email</p>
          <input
            className="w-full bg-white border border-black rounded-lg h-9 p-3 mb-5"
            type="email"
            value={email}
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
          ></input>
          <p className="size-5 font-medium mb-3">Password</p>
          <input
            className="w-full bg-white border border-black rounded-lg h-9 p-3 mb-2"
            type="password"
            value={password}
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
          ></input>
          <p className="text-black hover:underline cursor-pointer">
            Forgot password?
          </p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            className="bg-black text-white rounded-3xl h-9 mt-5 w-1/3 mx-auto"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
