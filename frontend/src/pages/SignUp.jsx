import { Button, Label, TextInput, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    // Fix: call trim() to remove whitespace and update state correctly
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All fields are required!");
    }

    try {
      setLoading(true);
      setErrorMessage(null); // Reset error message

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle errors from the backend
        return setErrorMessage(data.message || "Signup failed!");
      }

      setLoading(false);

      // On successful signup, navigate to the login page
      navigate("/sign-in");
    } catch (error) {
      setErrorMessage("An error occurred: " + error.message);
      setLoading(false);
    }
  };

  console.log(formData);

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-20">
        {/* Left */}
        <div className="flex-1">
          <Link to="/sign-up" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-green-500 via-red-500 to-red-400 rounded-lg text-blue-800">
              Sign
            </span>
            Up
          </Link>
          <p className="text-sm mt-5">
            This is a final year project. You can sign up with your username,
            email and password or with Google.
          </p>
        </div>
        {/* Right */}
        <div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Username" />
              <TextInput
                type="text"
                placeholder="Enter your username"
                id="username"
                onChange={handleChange}
              />
            </div>

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
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-4">
            <span>Already have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
