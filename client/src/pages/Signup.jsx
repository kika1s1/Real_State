import {Link} from "react-router-dom"
const Signup = () => {
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-center font-semibold my-7 text-3xl">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          className="p-3 rounded-lg border outline-none"
          type="text"
          name=""
          id="usernmae"
          placeholder="Username"
        />
        <input
          className="p-3 rounded-lg border outline-none"
          type="email"
          name=""
          id="email"
          placeholder="Email"
        />
        <input
          className="p-3 rounded-lg border outline-none"
          type="password"
          name=""
          id="password"
          placeholder="Password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign Up
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/signin'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
