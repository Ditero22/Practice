// src/pages/Dashboard.tsx
import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { getLoggedUser, getPatients, getUsers } from "@/hooks/fakeAuth";

const Dashboard: React.FC = () => {
  const user = getLoggedUser();
  const patients = getPatients();
  const users = getUsers();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Staff count (exclude admin & patients)
  const staffCount = users.filter((u) => u.role === "Staff").length;

  // Links for Sidebar
  const links = [
    { label: "Dashboard", path: "/dashboard" },
    ...(user?.role === "Admin" || user?.role === "Staff"
      ? [{ label: "Patients", path: "/patients" }]
      : []),
    ...(user?.role === "Admin"
      ? [
          { label: "Appointments", path: "/appointments" },
          { label: "Billing", path: "/billing" },
        ]
      : []),
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#f4f4f4]">
      {/* Sidebar */}
      <Sidebar links={links} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64 pt-24 px-6">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-6">Dashboard</h1>

          <p className="text-[#333333] text-lg mb-10">
            Welcome back, {user?.name}! Here is a summary of your clinic's performance.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {/* Patients */}
            <div className="bg-[#A0522D]/20 rounded-xl p-6 text-center">
              <h2 className="text-2xl font-bold text-[#1A1A1A]">{patients.length}</h2>
              <p className="text-[#333333] mt-2 text-sm">Patients</p>
            </div>

            {/* Fake appointments demo */}
            <div className="bg-[#A0522D]/20 rounded-xl p-6 text-center">
              <h2 className="text-2xl font-bold text-[#1A1A1A]">0</h2>
              <p className="text-[#333333] mt-2 text-sm">Appointments</p>
            </div>

            {/* Fake revenue */}
            <div className="bg-[#A0522D]/20 rounded-xl p-6 text-center">
              <h2 className="text-2xl font-bold text-[#1A1A1A]">$0</h2>
              <p className="text-[#333333] mt-2 text-sm">Revenue</p>
            </div>

            {/* Staff */}
            <div className="bg-[#A0522D]/20 rounded-xl p-6 text-center">
              <h2 className="text-2xl font-bold text-[#1A1A1A]">{staffCount}</h2>
              <p className="text-[#333333] mt-2 text-sm">Staff</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
