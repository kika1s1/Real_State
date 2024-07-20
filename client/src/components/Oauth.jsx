import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await axios.post("/api/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
      });
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      console.log("could not sign in with google");
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3
    hover:opacity-90
    rounded-lg uppercase"
    >
      Continue with google
    </button>
  );
};

export default Oauth;
