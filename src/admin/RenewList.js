import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../Url";

export const RenewList = () => {
  const [memberList, setMemberList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [newExpiryDate, setNewExpiryDate] = useState("");

  useEffect(() => {
    const fetchMemberList = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/member/get-member`);
        setMemberList(response.data.data);
      } catch (error) {
        console.error("Error fetching member data:", error);
        toast.error("Failed to fetch member data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMemberList();
  }, []);

  const today = new Date();
  const renewList = memberList.filter((member) => {
    const expiryDate = new Date(member.expiryDate);
    const timeDifference = expiryDate - today;
    const daysRemaining = timeDifference / (1000 * 60 * 60 * 24);
    return daysRemaining <= 7;
  });

  const handleRenewClick = (member) => {
    setSelectedMember(member);
  };

  const handleRenewSubmit = async () => {
    if (!newExpiryDate) {
      toast.error("Please select a new expiry date.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/member/renew-member/${selectedMember._id}`, {
        newExpiryDate,
      });

      toast.success(`Membership for ${response.data.firstName} has been renewed!`);
      setMemberList((prevList) =>
        prevList.map((member) =>
          member._id === selectedMember._id
            ? { ...member, expiryDate: response.data.updatedExpiryDate }
            : member
        )
      );
      setSelectedMember(null);
      setNewExpiryDate("");
    } catch (error) {
      console.error("Error renewing membership:", error);
      toast.error("Failed to renew membership. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-[100vh]">
      <ToastContainer />
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
        Renewal List
      </h1>
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : renewList.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                #
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                Expiry Date
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {renewList.map((member, index) => (
              <tr key={member._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {member.firstName} {member.middleName || ""} {member.lastName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{member.email}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{member.phoneNumber}</td>
                <td className="px-4 py-3 text-sm text-red-600">
                  {format(new Date(member.expiryDate), "dd MMM yyyy")}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleRenewClick(member)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Renew
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-lg text-gray-600">
          No memberships require renewal within the next 7 days.
        </p>
      )}

      {selectedMember && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              Renew Membership for {selectedMember.firstName} {selectedMember.lastName}
            </h2>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Select New Expiry Date
            </label>
            <input
              type="date"
              value={newExpiryDate}
              onChange={(e) => setNewExpiryDate(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedMember(null)}
                className="mr-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleRenewSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
