import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../Url";

const MemberDetail = () => {
  const [memberList, setMemberList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch members from the backend
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/member/get-member`
        );
        setMemberList(response.data.data); 
      } catch (err) {
        console.error("Error fetching members:", err);
        setError("Failed to fetch members. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <div className="text-center p-6">Loading members...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 min-h-[100vh]">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
        Member Detail
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {memberList.length > 0 ? (
          memberList.map((member, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow p-4"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                {member.firstName} {member.middleName} {member.lastName}
              </h2>
              <p className="text-gray-700">
                <span className="font-medium">Address:</span>{" "}
                {[
                  member.streetAddress,
                  member.secondAddress,
                  member.city,
                  member.state,
                  member.country,
                  member.pincode,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Phone:</span> {member.phoneNumber}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {member.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Expiry Date:</span>{" "}
                {new Date(member.expiryDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Registered By:</span>{" "}
                {[
                  member.registerByFirstName,
                  member.registerByMiddleName,
                  member.registerByLastName,
                ]
                  .filter(Boolean)
                  .join(" ")}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Payment Mode:</span>{" "}
                {member.paymentMode}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full text-gray-500">
            No members found.
          </div>
        )}
      </div>
    </div>
  );
};

export {MemberDetail}