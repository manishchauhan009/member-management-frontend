  import React, { useState, useEffect } from "react";
  import axios from "axios";

  export const AddNewMember = () => {
    const [memberData, setMemberData] = useState({
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
      expiryDate: "",
      registerByFirstName: "",
      registerByMiddleName: "",
      registerByLastName: "",
      paymentMode: "",
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const fetchCountries = () => {
      const API_URL = process.env.REACT_APP_API_URL;
      axios
        .get(`${API_URL}/api/locations/countries`)
        .then((response) => setCountries(response.data))
        .catch((error) => console.error("Error fetching countries:", error));
    };

    useEffect(() => {
      const API_URL = process.env.REACT_APP_API_URL;
      if (memberData.country) {
        // Correct URL with country ID as a parameter
        axios.get(`${API_URL}/api/locations/states/${memberData.country}`)
          .then((response) => setStates(response.data))
          // .then((response => { console.log(response.data) }))
          .catch((error) => console.error("Error fetching states:", error));
      } else {
        setStates([]);
        setCities([]);
      }
    }, [memberData.country]);


    useEffect(() => {
      const API_URL = process.env.REACT_APP_API_URL;
      if (memberData.state) {
        // Correct URL with state ID as a parameter
        axios
          .get(`${API_URL}/api/locations/cities/${memberData.state}`)
          .then((response) => setCities(response.data))
          .catch((error) => console.error("Error fetching cities:", error));
      } else {
        setCities([]);
      }
    }, [memberData.state]);


    function inputChangeHandler(event) {
      const { name, type, value, checked } = event.target;

      setMemberData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    function submitHandler(event) {
      const API_URL = process.env.REACT_APP_API_URL;
      event.preventDefault();

      const apiEndpoint = `${API_URL}/api/member/member-register`;

      axios
        .post(apiEndpoint, memberData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Member added successfully:", response.data);
          alert("Member added successfully!");

          setMemberData({
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
            expiryDate: "",
            registerByFirstName: "",
            registerByMiddleName: "",
            registerByLastName: "",
            paymentMode: "",
          });
        })
        .catch((error) => {
          console.error("Error adding member:", error.response?.data || error.message);
          alert("Failed to add member. Please check your input and try again.");
        });
    }

    return (
      <div className="mx-auto mt-2 bg-white p-10 rounded-lg shadow-lg min-h-[55rem] min-w-md ">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Membership Registration
        </h2>
        <form onSubmit={submitHandler}>
          {/* Name Section */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full sm:w-1/3 px-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-2 border rounded-md"
                name="firstName"
                onChange={inputChangeHandler}
                value={memberData.firstName}
                required
              />
            </div>
            <div className="w-full sm:w-1/3 px-2">
              <label htmlFor="middleName" className="block text-sm font-medium text-gray-700 mb-1">
                Middle Name
              </label>
              <input
                type="text"
                placeholder="Middle Name"
                className="w-full p-2 border rounded-md"
                name="middleName"
                onChange={inputChangeHandler}
                value={memberData.middleName}
              />
            </div>
            <div className="w-full sm:w-1/3 px-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-2 border rounded-md"
                name="lastName"
                onChange={inputChangeHandler}
                value={memberData.lastName}
                required
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full sm:w-1/2 px-2">
              <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Street Address"
                className="w-full p-2 border rounded-md"
                name="streetAddress"
                onChange={inputChangeHandler}
                value={memberData.streetAddress}
                required
              />
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <label htmlFor="secondAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 2
              </label>
              <input
                type="text"
                placeholder="Address Line 2"
                className="w-full p-2 border rounded-md"
                name="secondAddress"
                onChange={inputChangeHandler}
                value={memberData.secondAddress}
              />
            </div>
          </div>

          {/* Location Section */}
          <div className="flex flex-wrap -mx-2 mb-4">
            {/* Country Dropdown */}
            <div className="w-full sm:w-1/3 px-2">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country <span className="text-red-600">*</span>
              </label>
              <select
                name="country"
                className="w-full p-2 border rounded-md"
                onChange={(e) => {
                  const selectedCountryId = e.target.value;
                  setMemberData({ ...memberData, country: selectedCountryId, state: "", city: "" });
                }}
                onClick={fetchCountries} 
                value={memberData.country}
                required
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country._id} value={country._id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* State Dropdown */}
            <div className="w-full sm:w-1/3 px-2">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-600">*</span>
              </label>
              <select
                name="state"
                className="w-full p-2 border rounded-md"
                onChange={(e) => {
                  const selectedStateId = e.target.value;
                  setMemberData({ ...memberData, state: selectedStateId, city: "" });
                }}
                value={memberData.state}
                required
                disabled={!memberData.country}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state._id} value={state._id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            <div className="w-full sm:w-1/3 px-2">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-600">*</span>
              </label>
              <select
                name="city"
                className="w-full p-2 border rounded-md"
                onChange={(e) => {
                  const selectedCityId = e.target.value;
                  setMemberData({ ...memberData, city: selectedCityId });
                }}
                value={memberData.city}
                required
                disabled={!memberData.state}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city._id} value={city._id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>


          {/* Contact Section */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full sm:w-1/2 px-2">
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                Pin Code <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Pin Code"
                className="w-full p-2 border rounded-md"
                name="pincode"
                onChange={inputChangeHandler}
                value={memberData.pincode}
                required
              />
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-2 border rounded-md"
                name="phoneNumber"
                onChange={inputChangeHandler}
                value={memberData.phoneNumber}
                required
              />
            </div>
          </div>

          {/* Email and Expiry Date Section */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full sm:w-1/2 px-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded-md"
                name="email"
                onChange={inputChangeHandler}
                value={memberData.email}
                required
              />
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                name="expiryDate"
                onChange={inputChangeHandler}
                value={memberData.expiryDate}
                required
              />
            </div>
          </div>

          {/* Registered By Section */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full sm:w-1/3 px-2">
              <label htmlFor="registerByFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                Registered By First Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Registered By First Name"
                className="w-full p-2 border rounded-md"
                name="registerByFirstName"
                onChange={inputChangeHandler}
                value={memberData.registerByFirstName}
                required
              />
            </div>
            <div className="w-full sm:w-1/3 px-2">
              <label htmlFor="registerByMiddleName" className="block text-sm font-medium text-gray-700 mb-1">
                Registered By Middle Name
              </label>
              <input
                type="text"
                placeholder="Registered By Middle Name"
                className="w-full p-2 border rounded-md"
                name="registerByMiddleName"
                onChange={inputChangeHandler}
                value={memberData.registerByMiddleName}
              />
            </div>
            <div className="w-full sm:w-1/3 px-2">
              <label htmlFor="registerByLastName" className="block text-sm font-medium text-gray-700 mb-1">
                Registered By Last Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Registered By Last Name"
                className="w-full p-2 border rounded-md"
                name="registerByLastName"
                onChange={inputChangeHandler}
                value={memberData.registerByLastName}
                required
              />
            </div>
          </div>

          {/* Payment Mode */}
          <div className="mb-4">
            <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-700 mb-1">
              Payment Mode
            </label>
            <select
              name="paymentMode"
              className="w-full p-2 border rounded-md"
              onChange={inputChangeHandler}
              value={memberData.paymentMode}
            >
              <option value="">Select Payment Mode</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            className="bg-blue-500 font-medium text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-200"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  };


