import { FaAt, FaLock, FaUser, FaUserPlus } from "react-icons/fa";
import { AiOutlineNumber } from "react-icons/ai";
import { useState, useEffect, useRef } from "react";
import Batch from "@/model/Batch";
import { getActiveBatches } from "../services/batchservice";
import { useToast } from "../ui/use-toast";
import User from "@/model/User";
import { createUser } from "../services/userservice";

interface SignupProps {
  handleSignInClick: () => void;
}

const Signup: React.FC<SignupProps> = ({ handleSignInClick }) => {
  const { toast } = useToast();
  const [batchs, setBatchs] = useState<Batch[]>([]);
  const [semester, setSemester] = useState(0);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const batchNameRef = useRef<HTMLSelectElement>(null);
  const semesterRef = useRef<HTMLSelectElement>(null);
  const referenceNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getActiveBatches()
      .then((response) => {
        setBatchs(response.data);
      })
      .catch((err) => {
        const res = err.response.data;

        toast({
          title: res.title,
          description: res.detail,
          variant: "destructive",
        });
      });
  }, [toast]);

  function onBatchChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value !== "") {
      const batch = batchs.find((batch) => batch.batchId === value);
      if (batch) {
        setSemester(batch.totalSemester);
      }
    } else {
      setSemester(0);
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const firstName = firstNameRef.current?.value || "";
    const lastName = lastNameRef.current?.value || "";
    const batchId = batchNameRef.current?.value || "";
    const semester = semesterRef.current?.value || "";
    const referenceNumber = referenceNumberRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    const user: User = {
      firstName,
      lastName,
      batchId,
      semester,
      referenceNumber,
      email,
      password,
    };

    createUser(user)
      .then(function () {
        toast({
          title: "Account created",
          description: "Once it verified, you can login",
        });

        reset();
        handleSignInClick();
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

  function reset() {
    if (firstNameRef.current) firstNameRef.current.value = "";
    if (lastNameRef.current) lastNameRef.current.value = "";
    if (batchNameRef.current) batchNameRef.current.value = "";
    if (semesterRef.current) semesterRef.current.value = "";
    if (referenceNumberRef.current) referenceNumberRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
  }
  return (
    <div className="login-form-container sign-up">
      <form onSubmit={onSubmit} autoComplete="off">
        <h2>sign up</h2>
        <div className="form-group">
          <input type="text" id="firstName" required ref={firstNameRef} />
          <label>first name</label>
          <i>
            <FaUser />
          </i>
        </div>
        <div className="form-group">
          <input type="text" id="lastName" required ref={lastNameRef} />
          <label>last name</label>
          <i>
            <FaUserPlus />
          </i>
        </div>
        <div className="form-group">
          <select
            onChange={onBatchChange}
            id="batchName"
            required
            ref={batchNameRef}
          >
            <option value="">Select batch</option>
            {batchs.map((batch) => (
              <option value={batch.batchId}>{batch.batchName}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <select required id="semester" ref={semesterRef}>
            <option value="">Select semester</option>
            {semester == 0 ? (
              <option value="0">0</option>
            ) : (
              Array.from({ length: semester }, (_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="referenceNumber"
            required
            ref={referenceNumberRef}
          />
          <label>registration no</label>
          <i>
            <AiOutlineNumber />
          </i>
        </div>
        <div className="form-group">
          <input type="email" id="email" required ref={emailRef} />
          <label>email</label>
          <i>
            <FaAt />
          </i>
        </div>
        <div className="form-group">
          <input type="password" id="password" required ref={passwordRef} />
          <label>password</label>
          <i>
            <FaLock />
          </i>
        </div>
        <button type="submit" className="btn">
          sign up
        </button>
        <div className="link">
          <p>
            You already have an account?
            <a href="#" className="signin-link" onClick={handleSignInClick}>
              sign in
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
