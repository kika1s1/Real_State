import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import axios from "axios";
import {  deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, updateUserFailure, updateUserStart, updateUserSuccess } from "../features/user/userSlice";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const {loading, error} = useSelector(state=>state.user)
  const [success, setSuccess] = useState(null)
  const profileImageRef = useRef(null);
  const fileRef = useRef();
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        profileImageRef.current = file; // Store the file for submission
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    dispatch(updateUserStart())
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", usernameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("password", passwordRef.current.value);
    
    if (profileImageRef.current instanceof File) {
      formData.append("profileImage", profileImageRef.current);
    }

    try {
      const res = await axios.post("/api/user/update/"+currentUser._id, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (res.data.success) {
        dispatch(updateUserSuccess(res.data))
        setSuccess(res.data.message)
        
        
        
      } else {
        dispatch(updateUserFailure(res.data.error || "Update failed."))
        setSuccess(null)
        
      }
    } catch (error) {

      dispatch(updateUserFailure(error.response?.data?.error || error.message || "Update failed."))
      setSuccess(null)
      
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const data = await axios.get('/api/auth/signout');
      // const data = await res.json();
      console.log(data.data)
      if (data.status !== 200) {
        dispatch(deleteUserFailure(data.data));
        return;
      }
      dispatch(deleteUserSuccess(data.data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const data = await axios.delete(`/api/user/delete/${currentUser._id}`);
      
      if (data.status !== 200) {
        dispatch(deleteUserFailure(data.data));
        return;
      }
      dispatch(deleteUserSuccess(data.data));
    } catch (error) {
      dispatch(deleteUserFailure(error.response.data));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          hidden
          type="file"
          ref={fileRef}
          id="avatar"
          accept="image/*"
          onChange={handleImageChange}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={profileImage || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
          ref={usernameRef}
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          ref={emailRef}
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          ref={passwordRef}
        />
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {loading?"Updating...":"Update"}
        </button>
      </form>
      {error && <p className="text-center text-red-500">{error}</p>}
      {success && <p className="text-center text-blue-500">{success}</p>}
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
