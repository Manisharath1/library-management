import { FaLock, FaUser } from "react-icons/fa";
import { useRef } from "react";
import { currentUser, loginUser, returnHomeUrl, storeKey } from "../services/authservice";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
interface SigninProps {
  handleSignUpClick: () => void;
}
const Signin: React.FC<SigninProps> = ({ handleSignUpClick }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function reset() {
    if (usernameRef.current) usernameRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    const login = { username, password };

    loginUser(login)
      .then((res) => {
        storeKey(res.data.token);
        naviagateUserHome();
        reset();
      })
      .catch((err) => {
        const res = err.response.data;

        toast({
          title: res.title,
          description: res.detail,
          variant: "destructive",
        });
      });
  }

  function naviagateUserHome() {
    currentUser()
      .then((response) => {
        const url = returnHomeUrl(response.data);
        navigate(url);
      })
      .catch((err) => {
        const res = err.response.data;

        toast({
          title: res.title,
          description: res.detail,
          variant: "destructive",
        });
      });
  }
  return (
    <div className="login-form-container sign-in">
      <form onSubmit={onSubmit}>
        <h2>login</h2>
        <div className="form-group">
          <input type="text" id="username" required ref={usernameRef} />
          <i>
            <FaUser />
          </i>
          <label>username</label>
        </div>
        <div className="form-group">
          <input type="password" id="userPassword" required ref={passwordRef} />
          <i>
            <FaLock />
          </i>
          <label>password</label>
        </div>
        {/* <div className="forgot-pass">
          <a href="#">forgot password?</a>
        </div> */}
        <div>
          <button type="submit" className="btn">
            login
          </button>
        </div>
        <div className="link">
          <p>
            Don't have an account?
            <a href="#" className="signup-link" onClick={handleSignUpClick}>
              sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;
