import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../Url";

function RegisterForm({ hideModal }) {
  const initialFormState = {
    firstName: "",
    middleName: "",
    lastName: "",
    streetAddress: "",
    secondAddress: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    phoneNumber: "",
    email: "",
    username: "",
    password: "",
    role: "user",
    confirmPassword: "",
    profileURL: "",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  // const [countries, setCountries] = useState([]);
  // const [states, setStates] = useState([]);
  // const [cities, setCities] = useState([]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // useEffect(() => {
  //   fetchCountries();
  // }, []);

  // const fetchCountries = async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}/api/locations/countries`);
  //     setCountries(response.data);
  //   } catch (error) {
  //     console.error("Error fetching countries", error);
  //   }
  // };

  // const fetchStates = async (country) => {
  //   try {
  //     const response = await axios.get(`${API_URL}/api/locations/states/${country}`);
  //     console.log("State Data", response.data)
  //     setStates(response.data);
  //     setCities([]); // Reset cities when country changes
  //   } catch (error) {
  //     console.error("Error fetching states", error);
  //   }
  // };

  // const fetchCities = async (state) => {
  //   try {
  //     const response = await axios.get(`${API_URL}/api/locations/cities/${state}`);
  //     setCities(response.data);
  //   } catch (error) {
  //     console.error("Error fetching cities", error);
  //   }
  // };

  // useEffect(() => {
  //   if (formData.country) fetchStates(formData.country);
  // }, [formData.country]);

  // useEffect(() => {
  //   if (formData.state) fetchCities(formData.state);
  // }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "username") setUsernameStatus(null);
  };

  const handleCheckUsername = useCallback(
    debounce(async () => {
      if (!formData.username) {
        setUsernameStatus("Please enter a username to check.");
        return;
      }
      setCheckingUsername(true);
      try {
        const response = await axios.post(`${API_URL}/api/user/check-username`, {
          username: formData.username,
        });
        setUsernameStatus(response.data.available ? "Username is available." : "Username is already taken.");
      } catch (error) {
        setUsernameStatus("An error occurred. Please try again.");
      } finally {
        setCheckingUsername(false);
      }
    }, 500),
    [formData.username]
  );

  const MAX_FILE_SIZE_MB = 2 * 1024 * 1024;
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB) {
      toast.error("File size exceeds the 2MB limit.");
      return;
    }

    setLoading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("upload_preset", "wkrs4eur");
      uploadFormData.append("cloud_name", "denuugve5");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/denuugve5/image/upload",
        uploadFormData
      );

      if (response.data.secure_url) {
        setFormData((prevData) => ({
          ...prevData,
          profileURL: response.data.secure_url,
        }));
        toast.success("Profile photo uploaded successfully!");
      } else {
        toast.error("Failed to upload profile photo.");
      }
    } catch (error) {
      toast.error("An error occurred during photo upload. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/user/register`, formData);
      if (response.data.success) {
        toast.success("Registration successful!");
        setFormData(initialFormState);
        setUsernameStatus(null);
      } else {
        toast.error(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-w-md mx-auto p-6 rounded-lg mt-10 md:mt-16 bg-white shadow-lg">
      {/* Close Button */}


      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <button
          onClick={hideModal}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-600 hover:text-red-500 text-3xl font-bold transition duration-300 z-50"
        >
          &times;
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={formData.streetAddress}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <input
          type="text"
          name="secondAddress"
          placeholder="Second Address (Optional)"
          value={formData.secondAddress}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>

          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            disabled={!formData.country}
          >
            <option value="">Select State</option>
            {states.map((state) => ( // Use `states` instead of `filteredStates`
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>

          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            disabled={!formData.state}
          >
            <option value="">Select City</option>
            {cities.map((city) => ( // Use `cities` instead of `filteredCities`
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select> */}

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            pattern="[0-9]{10}"
            title="Please enter a 10-digit phone number"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleCheckUsername}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <div className="flex items-center mt-2">
            <button
              type="button"
              onClick={handleCheckUsername}
              className={`bg-gray-500 text-white py-2 px-4 rounded ${!formData.username ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`}
              disabled={checkingUsername || !formData.username}
            >
              {checkingUsername ? "Checking..." : "Check Availability"}
            </button>
            {usernameStatus && (
              <span
                className={`ml-4 text-sm ${usernameStatus.includes("available") ? "text-green-500" : "text-red-500"}`}
              >
                {usernameStatus}
              </span>
            )}
          </div>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <div>
          <label htmlFor="profilePhoto" className="mr-5">Upload Profile Photo:</label>
          <input
            type="file"
            id="profilePhoto"
            name="profileURL"
            onChange={handleFileChange}
          />
          {loading && <p>Uploading photo...</p>}
          {formData.profileURL && (
            <div style={{ marginTop: "10px" }}>
              <p>Uploaded Photo Preview:</p>
              <img
                src={formData.profileURL}
                alt="Profile"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Uploading Photo" : "Register"}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
