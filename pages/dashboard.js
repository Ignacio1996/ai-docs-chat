import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase"; // Ensure this points to your Firebase config file
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      {/* Your dashboard content goes here */}

      <button
        onClick={handleLogout}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Logout
      </button>
    </div>
  );
}
