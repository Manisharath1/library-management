import "./login.css";
import { useEffect, useState } from "react";
import Signup from "./signup";
import Signin from "./signin";
import { useLocation } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";

const Login = () => {
  const { toast } = useToast();
  const location = useLocation();
  const expiredParam = new URLSearchParams(location.search).get("expired");
  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    if (expiredParam) {
      toast({ title: "Session Expired", description: "Please login again" });
    }
  }, [expiredParam, toast]);

  const handleSignUpClick = () => {
    setIsSignUp(false);
  };

  const handleSignInClick = () => {
    setIsSignUp(true);
  };

  const wrapperClass = isSignUp ? "animated-signup" : "animated-signin";

  return (
    <main className="bg-teal-700 h-screen flex items-center justify-center overflow-hidden">
      <div className={`wrapper ${wrapperClass}`}>
        <Signup handleSignInClick={handleSignInClick} />
        <Signin handleSignUpClick={handleSignUpClick} />
      </div>
      <Toaster />
    </main>
  );
};
export default Login;
