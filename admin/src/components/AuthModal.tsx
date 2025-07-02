import { useState } from "react";
import { API_CONST } from "../constants";

export default function AuthModal({
  setIsAuthModalOpen,
}: {
  setIsAuthModalOpen: (value: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await fetch(API_CONST + "/user/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then(async (response: any) => {
        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          return;
        }

        if (response.ok) {
          localStorage.setItem("adminAccessToken", data.access_token);
          setIsAuthModalOpen(false);
          window.location.reload(); // Reload the window after successful login
        }
      });
    } catch (error: any) {
      // If there is an error, log the error
      setError(error.message);
      console.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 h-screen w-screen">
      {" "}
      <div className="fixed w-96 h-fit bg-white p-10 rounded-2xl border slide-in-top">
        <p className="text-xl font-bold mb-5">Sign in with admin's access</p>
        <p className="size-5 font-medium mb-3">Email</p>
        <input
          className="w-full bg-white border border-black rounded-lg h-9 p-3 mb-5"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <p className="size-5 font-medium mb-3">Password</p>
        <input
          className="w-full bg-white border border-black rounded-lg h-9 p-3 mb-5"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        {error && <p className="text-red-500 mb-5">{error}</p>}
        <button onClick={() => handleLogin()}>Login</button>
      </div>
    </div>
  );
}
