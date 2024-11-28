import { Button, Label, TextInput, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  SignInSuccess,
  SignInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleChange = (e) => {
    // Fix: call trim() to remove whitespace and update state correctly
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.email || !formData.password) {
      return dispatch(SignInFailure("Please fill all fields"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(SignInFailure(data.message));
      }

      if (res.ok) {
        dispatch(SignInSuccess(data));
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(SignInFailure(error.message));
    }
  };

  console.log(formData);

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center md:gap-15">
        {/* Left */}
        <div className="flex-1">
          <Link to="/sign-in" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-green-500 via-red-500 to-red-400 rounded-lg text-blue-800">
              Sign
            </span>
            In
          </Link>
          <p className="text-sm mt-5 max-w-md">
            This is a final year project. You can sign in with your email and
            password or with Google.
          </p>
        </div>
        {/* Right */}
        <div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="Enter your email address"
                id="email"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="Enter your password"
                id="password"
                onChange={handleChange}
              />
            </div>

            {/* Error Message Display */}
            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
            )}

            <Button
              className="w-full justify-center items-center px-2 py-1 bg-gradient-to-r from-green-500 via-red-500 to-red-400 rounded-lg text-black"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-4">
            <span>Don&apos;t have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
