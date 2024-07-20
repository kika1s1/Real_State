import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Signin = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/signin", {
        ...formData,
      });
      if (res.success == false) {
        setError(res.data.error);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/")
    } catch (error) {
      console.log(error.response.data.error);
      setLoading(false);
      setError(error.response.data.error);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-center font-semibold my-7 text-3xl">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        
        <input
          className="p-3 rounded-lg border outline-none"
          type="email"
          name=""
          id="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="p-3 rounded-lg border outline-none"
          type="password"
          name=""
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Signin"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&rsquo; have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700">Signup</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default Signin;
