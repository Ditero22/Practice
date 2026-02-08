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
    <div className="flex h-screen w-screen bg-[#f4f4f4]">
      <Sidebar links={links} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 md:ml-64 pt-24 px-4 md:px-6 py-6 overflow-y-auto">
        <h1 className="text-xl md:text-2xl font-bold mb-4">Patient Management</h1>

        {/* FORM */}
        <div className="bg-white p-3 md:p-6 rounded shadow mb-6 w-full max-w-md mx-auto">
          <h2 className="font-semibold mb-3 text-base md:text-lg">
            {editId ? "Edit Patient" : "Add Patient"}
          </h2>

          <div className="grid gap-2">
            <input className="border p-2 rounded text-sm" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
            <input className="border p-2 rounded text-sm" placeholder="Age" value={age} onChange={(e)=>setAge(e.target.value)} />
            <input className="border p-2 rounded text-sm" placeholder="Contact" value={contact} onChange={(e)=>setContact(e.target.value)} />
            <input className="border p-2 rounded text-sm" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" className="border p-2 rounded text-sm" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>

          <div className="flex flex-col md:flex-row gap-2 mt-3">
            <button onClick={handleSave} className="bg-[#8b5e3c] text-white py-2 rounded w-full">
              {editId ? "Update" : "Add & Create Account"}
            </button>
            {editId && (
              <button onClick={resetForm} className="bg-gray-500 text-white py-2 rounded w-full">
                Exit
              </button>
            )}
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block">
          <table className="w-full bg-white shadow rounded text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-center">Name</th>
                <th className="p-3 text-center">Age</th>
                <th className="p-3 text-center">Contact</th>
                <th className="p-3 text-center">Email</th>
                <th className="p-3 text-center">Password</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3 text-center">{p.name}</td>
                  <td className="p-3 text-center">{p.age}</td>
                  <td className="p-3 text-center">{p.contact}</td>
                  <td className="p-3 text-center">{p.email}</td>
                  <td className="p-3 text-center">{p.password}</td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={()=>handleEdit(p)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                      <button onClick={()=>handleDelete(p.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE STACKED VIEW WITH THIN LINES */}
          <div className="md:hidden space-y-4">
            {patients.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded shadow text-sm divide-y divide-gray-200 border border-[0.5px]"
              >
                <div className="flex justify-between p-3">
                  <span className="font-semibold">Name</span>
                  <span>{p.name}</span>
                </div>

                <div className="flex justify-between p-3">
                  <span className="font-semibold">Age</span>
                  <span>{p.age}</span>
                </div>

                <div className="flex justify-between p-3">
                  <span className="font-semibold">Contact</span>
                  <span>{p.contact}</span>
                </div>

                <div className="flex justify-between p-3">
                  <span className="font-semibold">Email</span>
                  <span className="break-all">{p.email}</span>
                </div>

                <div className="flex justify-between p-3">
                  <span className="font-semibold">Password</span>
                  <span>{p.password}</span>
                </div>

                <div className="flex justify-between items-center p-3">
                  <span className="font-semibold">Actions</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

      </div>
    </div>
  );
};

export default Patients;
