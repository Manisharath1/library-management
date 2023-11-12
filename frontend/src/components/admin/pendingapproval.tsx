import { useEffect, useState } from "react";
import {
  approveUser,
  deleteUser,
  getAllPendingUser,
} from "../services/userservice";
import User from "@/model/User";
import { useToast } from "../ui/use-toast";

const PendingApproval = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    getPendingUsers();
  }, []);

  function getPendingUsers() {
    try {
      getAllPendingUser().then((response) => {
        setUsers(response.data);
      });
    } catch (err) {
      console.error(err);
    }
  }

  function onApproveUser(id: string) {
    try {
      approveUser(id).then(() => {
        toast({ title: "Student approved" });
        getPendingUsers();
      });
    } catch (err) {
      console.error(err);
    }
  }

  function declineUser(id: string) {
    try {
      deleteUser(id).then(() => {
        toast({ title: "Student rejected" });
        getPendingUsers();
      });
    } catch (err) {
      console.error(err);
    }
  }

  if (users.length == 0) {
    return <h1 className="text-center">No pending request</h1>;
  }

  return (
    <>
      {users.map((user) => (
        <div className="shadow-lg p-5 bg-white rounded-md flex justify-between items-center mb-5">
          <div>
            <h3>
              <span className="capitalize font-bold">
                {user.firstName} {user.lastName}
              </span>
              ({user.referenceNumber}) wants to join
            </h3>
            <a href="#" className="text-blue-500">
              View details
            </a>
          </div>
          <div className="flex gap-5">
            <button
              className="bg-teal-200 px-5 shadow-md rounded-md"
              onClick={() => onApproveUser(user.userId ?? "")}
            >
              &#x2713;
            </button>
            <button
              className="bg-red-200 px-5 shadow-md rounded-md"
              onClick={() => declineUser(user.userId ?? "")}
            >
              &#x274C;
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default PendingApproval;
