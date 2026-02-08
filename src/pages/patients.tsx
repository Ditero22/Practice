// src/pages/Patients.tsx
import { useEffect, useState } from "react";
import {
  getPatients,
  savePatients,
  getLoggedUser,
  getUsers,
  saveUsers,
} from "@/hooks/fakeAuth";
import Sidebar from "@/components/layout/Sidebar";

const Patients = () => {
  const user = getLoggedUser();

  const [patients, setPatients] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setPatients(getPatients());
  }, []);

  if (user?.role !== "Admin") {
    return <h1 className="p-10 text-red-500">Access Denied</h1>;
  }

  const resetForm = () => {
    setName("");
    setAge("");
    setContact("");
    setEmail("");
    setPassword("");
    setEditId(null);
  };

  const handleSave = () => {
    let updatedPatients = [...patients];
    let accounts = getUsers();

    if (editId) {
      updatedPatients = updatedPatients.map((p) =>
        p.id === editId ? { ...p, name, age, contact, email, password } : p
      );
      accounts = accounts.map((a) =>
        a.id === editId ? { ...a, name, email, password } : a
      );
    } else {
      const id = Date.now();
      updatedPatients.push({ id, name, age, contact, email, password });
      accounts.push({ id, name, email, password, role: "Patient" });
    }

    savePatients(updatedPatients);
    saveUsers(accounts);
    setPatients(updatedPatients);
    resetForm();
    alert(editId ? "Patient updated!" : "Patient added!");
  };

  const handleEdit = (patient: any) => {
    setEditId(patient.id);
    setName(patient.name);
    setAge(patient.age);
    setContact(patient.contact);
    setEmail(patient.email);
    setPassword(patient.password);
  };

  const handleDelete = (id: number) => {
    const updatedPatients = patients.filter((p) => p.id !== id);
    const accounts = getUsers().filter((a) => a.id !== id);
    savePatients(updatedPatients);
    saveUsers(accounts);
    setPatients(updatedPatients);
  };

  // Sidebar Links
  const links = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Patients", path: "/patients" },
    { label: "Appointments", path: "/appointments" },
    { label: "Billing", path: "/billing" },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#f4f4f4]">
      {/* Sidebar Component */}
      <Sidebar links={links} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64 pt-24 px-4 md:px-6 py-10">
        <h1 className="text-2xl font-bold mb-6">Patient Management</h1>

        {/* Patient Form */}
        <div className="bg-white p-4 md:p-6 rounded shadow mb-8 w-full max-w-md mx-auto">
          <h2 className="font-semibold mb-3 text-lg md:text-xl">
            {editId ? "Edit Patient" : "Add Patient"}
          </h2>
          <input
            className="w-full border p-2 mb-2 rounded text-sm md:text-base"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full border p-2 mb-2 rounded text-sm md:text-base"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            className="w-full border p-2 mb-2 rounded text-sm md:text-base"
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <input
            className="w-full border p-2 mb-2 rounded text-sm md:text-base"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full border p-2 mb-2 rounded text-sm md:text-base"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleSave}
            className="bg-[#8b5e3c] text-white px-4 py-2 rounded w-full text-sm md:text-base"
          >
            {editId ? "Update" : "Add & Create Account"}
          </button>
        </div>

        {/* Patient Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] bg-white shadow rounded text-sm md:text-base">
            <thead className="bg-gray-200 text-left text-xs md:text-sm">
              <tr>
                <th className="p-2 md:p-3">Name</th>
                <th className="p-2 md:p-3">Age</th>
                <th className="p-2 md:p-3">Contact</th>
                <th className="p-2 md:p-3">Email</th>
                <th className="p-2 md:p-3">Password</th>
                <th className="p-2 md:p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="border-t text-left">
                  <td className="p-2 md:p-3">{p.name}</td>
                  <td className="p-2 md:p-3">{p.age}</td>
                  <td className="p-2 md:p-3">{p.contact}</td>
                  <td className="p-2 md:p-3">{p.email}</td>
                  <td className="p-2 md:p-3">{p.password}</td>
                  <td className="p-2 md:p-3 space-x-1 flex flex-wrap">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mb-1 text-xs md:text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded mb-1 text-xs md:text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Patients;
