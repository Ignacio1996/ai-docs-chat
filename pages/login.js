import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Ensure you've set up this export

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("erorr with login", email, password, error.message);
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="mb-3 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none"
          autoComplete="current-password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded w-80"
        >
          Log in
        </button>
        <a href="/register" className="mt-5 text-blue-600 hover:underline">
          Register
        </a>
      </form>
    </div>
  );
}
