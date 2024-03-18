import { useState } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Adjust this path as needed

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="p-10 bg-white rounded flex justify-between items-center flex-col shadow-md"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          className="mb-3 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none"
          autoComplete="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="mb-3 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="mb-3 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none"
          placeholder="Confirm Password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded w-80"
        >
          Register
        </button>
      </form>
    </div>
  );
}
