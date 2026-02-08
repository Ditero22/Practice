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
    return <h1 className="p-4 text-red-500">Access Denied</h1>;
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
    if (!confirm("Are you sure you want to delete this patient?")) return;

    const updatedPatients = patients.filter((p) => p.id !== id);
    const accounts = getUsers().filter((a) => a.id !== id);
    savePatients(updatedPatients);
    saveUsers(accounts);
    setPatients(updatedPatients);
  };

  const links = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Patients", path: "/patients" },
    { label: "Appointments", path: "/appointments" },
    { label: "Billing", path: "/billing" },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#f4f4f4]">
      <Sidebar links={links} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 md:ml-64 pt-24 px-4 md:px-6 py-6">
        <h1 className="text-xl md:text-2xl font-bold mb-4">Patient Management</h1>

        {/* Patient Form */}
        <div className="bg-white p-3 md:p-6 rounded shadow mb-6 w-full max-w-md mx-auto">
          <h2 className="font-semibold mb-3 text-base md:text-lg">
            {editId ? "Edit Patient" : "Add Patient"}
          </h2>
          <div className="grid grid-cols-1 gap-2">
            <input
              className="w-full border p-2 rounded text-xs md:text-sm"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full border p-2 rounded text-xs md:text-sm"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              className="w-full border p-2 rounded text-xs md:text-sm"
              placeholder="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <input
              className="w-full border p-2 rounded text-xs md:text-sm"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full border p-2 rounded text-xs md:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2 mt-2">
            <button
              onClick={handleSave}
              className="bg-[#8b5e3c] text-white px-2 py-1 md:px-3 md:py-2 rounded w-full text-xs md:text-sm"
            >
              {editId ? "Update" : "Add & Create Account"}
            </button>
            {editId && (
              <button
                onClick={resetForm}
                className="bg-gray-500 text-white px-2 py-1 md:px-3 md:py-2 rounded w-full text-xs md:text-sm"
              >
                Exit
              </button>
            )}
          </div>

        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Age</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Email</th>
                <th className="p-3">Password</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.age}</td>
                  <td className="p-2">{p.contact}</td>
                  <td className="p-2">{p.email}</td>
                  <td className="p-2">{p.password}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE VIEW (2-ROW TABLE PER PATIENT) */}
        <div className="md:hidden space-y-4">
          {patients.map((p) => (
            <table key={p.id} className="w-full border rounded text-xs">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Age</th>
                  <th className="p-2">Contact</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Password</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.age}</td>
                  <td className="p-2">{p.contact}</td>
                  <td className="p-2 break-all">{p.email}</td>
                  <td className="p-2">{p.password}</td>
                  <td className="p-2">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>


      </div>
    </div>
  );
};

export default Patients;
