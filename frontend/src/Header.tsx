import { useState, useEffect, useCallback } from "react";
import UploadImage from "./common/uploadimage";
import { currentUser } from "./components/services/authservice";
import { useToast } from "./components/ui/use-toast";
import { uploadUserImage } from "./components/services/userservice";

const BASE_URL = `http://localhost:1205/api/v1`;

const Header = () => {
  const { toast } = useToast();
  const [showUploadModal, setUploadModal] = useState(false);
  const [loginUser, setLoginUser] = useState(null);

  const getCurrentUser = useCallback(() => {
    currentUser()
      .then((res) => {
        setLoginUser(res.data);
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

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  function uploadImage(id: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      uploadUserImage(id, formData).then(() => {
        getCurrentUser();
        toast({ title: "Image added" });
      });
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <header className="bg-gray-50 dark:bg-gray-800 p-5 shadow-md flex justify-end">
      <div role="button" onClick={() => setUploadModal(true)} title="Upload image">
        {loginUser && loginUser["profilePic"] ? (
          <img
            src={`${BASE_URL}${loginUser["profilePic"]}`}
            alt="Profile Image"
            className="shadow-lg"
            style={{
              width:'50px',
              height: '50px',
              borderRadius: '50%'
            }}
          />
        ) : (
          <span className="text-xl">👤</span>
        )}
      </div>

      {showUploadModal && loginUser && (
        <UploadImage
          id={loginUser["userId"]}
          uploadFile={uploadImage}
          setDisplayModal={setUploadModal}
        />
      )}
    </header>
  );
};

export default Header;
