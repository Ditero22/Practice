// src/hooks/fakeAuth.ts

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "Admin" | "Staff" | "Patient";
}

export interface Patient {
  id: number;
  name: string;
  age: number;
  contact: string;
  email: string;
  password: string;
}

// ------------------- Default Users -------------------
const defaultUsers: User[] = [
  {
    id: 1,
    name: "Admin",
    email: "admin@example.com",
    password: "admin",
    role: "Admin",
  },
  {
    id: 2,
    name: "Staff",
    email: "staff@example.com",
    password: "staff",
    role: "Staff",
  },
];

// ------------------- Users -------------------
export const getUsers = (): User[] => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : defaultUsers;
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};

// ------------------- Patients -------------------
export const getPatients = (): Patient[] => {
  return JSON.parse(localStorage.getItem("patients") || "[]");
};

export const savePatients = (patients: Patient[]) => {
  localStorage.setItem("patients", JSON.stringify(patients));
};

// ------------------- Auth -------------------
export const loginUser = (identifier: string, password: string) => {
  const users = getUsers();
  const patients = getPatients();

  // 1️⃣ Check users first (Admin/Staff & Patient accounts)
  let user = users.find(
    (u) => u.email === identifier && u.password === password
  );

  // 2️⃣ If not found, check patients by email OR contact number
  if (!user) {
    const patient = patients.find(
      (p) => (p.email === identifier || p.contact === identifier) && p.password === password
    );
    if (patient) {
      user = { ...patient, role: "Patient" };
    }
  }

  // 3️⃣ If login success, store loggedUser
  if (user) {
    localStorage.setItem("loggedUser", JSON.stringify(user));
    return user;
  }

  return null; // login failed
};

// ------------------- Logout -------------------
export const logoutUser = () => {
  localStorage.removeItem("loggedUser");
};

// ------------------- Get Logged User -------------------
export const getLoggedUser = (): User | null => {
  return JSON.parse(localStorage.getItem("loggedUser") || "null");
};
