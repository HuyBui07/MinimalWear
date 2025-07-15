import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_CONST } from "../../constants";

// redux
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import LoadingScreen from "../../components/LoadingScreen";
import MotionSlider from "../../components/MotionSlider";

import logo from "../../assets/men.png";
import google from "../../assets/google.png";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleSignIn = async () => {
    if (!email) {
      setError("Please enter your email!");
      return;
    } else if (!password) {
      setError("Please enter your password!");
      return;
    }

    setLoading(true);

    try {
      // Call the API to sign in with email and password
      await fetch(API_CONST + "/user/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then(async (response: Response) => {
        const data = await response.json();
        if (!response.ok) {
          setLoading(false);
          setError(data.message);
        }

        if (response.ok) {
          localStorage.setItem("accessToken", data.access_token);
          dispatch(setUser(data.userInfo));
          setLoading(false);
          navigate("/");
        }
      });
    } catch (error: unknown) {
      // If there is an error, log the error
      if (error instanceof Error) {
        setLoading(false);
        setError(error.message);
      }
      console.error(error);
    }
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="flex flex-col w-full h-[100vh]">
        <div className="bg-gray-200 w-screen h-12">
          <p className="text-center font-extrabold text-lg   pt-2">
            Contact me at 21520909@gm.uit.edu.vn
          </p>
        </div>

        <div className="flex flex-row w-full h-full">
          <div className="flex flex-col w-2/5 h-full bg-[#D9D9D9] items-center justify-center">
            <MotionSlider />

            <div className="flex flex-col w-fit gap-7 mt-20">
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

          <div className="flex flex-col w-2/5 m-auto px-20">
            <img src={logo} alt="logo" className="w-[160px] mx-auto mb-20" />
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
            <div className="flex flex-row mb-5 items-center">
              <input type="checkbox" className="w-4 h-4 accent-black" />
              <label className="text-black mt-1 ml-2">Remember me</label>

              <p className="text-black hover:underline mt-1 cursor-pointer ml-auto">
                Forgot password?
              </p>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              className="bg-black text-white rounded-xl py-3 mt-5 w-2/3 mx-auto font-bold"
              onClick={handleSignIn}
            >
              Sign In
            </button>

            <div className="flex flex-row justify-center items-center gap-2 my-5">
              <div className="w-40 h-0.5 bg-gray-400 rounded-full"></div>
              <p className="text-black">or</p>
              <div className="w-40 h-0.5 bg-gray-400 rounded-full"></div>
            </div>

            <div
              className="flex flex-row justify-center items-center gap-5 bg-white text-black rounded-xl py-3 w-2/3 mx-auto border border-black hover:bg-gray-100"
              onClick={handleSignIn}
            >
              <p className="text-black font-bold">Sign In with Google</p>
              <img src={google} alt="google" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
