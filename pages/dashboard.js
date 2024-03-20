import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, storage, db } from "../firebase"; // Ensure this points to your Firebase config file
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Chat } from "@/components/Chat";
import { uploadFileContentToServer } from "@/rag_utils/uploadFile";

export default function Dashboard() {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const filesCollectionRef = collection(db, "files");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        fetchFiles();
      }
    });
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

  const uploadFile = async (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      // File size check
      const fileRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress, including pause and resume
          // Optionally, implement progress feedback here
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Upload failed:", error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(filesCollectionRef, {
              name: file.name,
              url: downloadURL,
            });
            fetchFiles(); // Refresh the files list
          });
        }
      );
    } else {
      alert("File is too large. Maximum allowed size is 2MB.");
    }
  };

  const fetchFiles = async () => {
    const querySnapshot = await getDocs(filesCollectionRef);
    const filesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFiles(filesData);
  };

  const deleteFile = async (file) => {
    const fileRef = ref(storage, `files/${file.name}`);
    await deleteObject(fileRef);
    await deleteDoc(doc(db, "files", file.id));
    fetchFiles(); // Refresh the list after deletion
  };

  const uploadDoc = async (file) => {
    try {
      console.log("dashboard.js 97 | file name", file.name);
      await uploadFileContentToServer(file.url, file.name);
      console.log("dashboard.js 97 | uploaded to server!");
    } catch (error) {
      console.log("dashboard.js 99 | error uploading to server", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 w-full">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <input type="file" onChange={uploadFile} />
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.name} -{" "}
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              Open
            </a>{" "}
            - <button onClick={() => deleteFile(file)}>Delete</button>-{" "}
            <button className="" onClick={() => uploadDoc(file)}>
              Upload Doc
            </button>
          </li>
        ))}
      </ul>

      <Chat />
      <button
        onClick={handleLogout}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Logout
      </button>
    </div>
  );
}
