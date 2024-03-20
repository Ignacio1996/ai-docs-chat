export const uploadFileContentToServer = async (downloadURL, fileName) => {
  try {
    // Fetch the file content from the downloadURL
    console.log("uploadFile.js 3 | downloadurl", downloadURL);
    const response = await fetch(downloadURL, {
      // mode: "no-cors",
    });
    console.log("uploadFile.js 5 | response", response);
    let fileContent;

    // Check if the file is a text file based on its name or MIME type (if available)
    if (fileName.endsWith(".txt")) {
      // If it's a text file, read the content as text
      fileContent = await response.text();
      console.log("uploadFile.js 14 | file content", fileContent);
    } else if (fileName.endsWith(".pdf")) {
      // If it's a PDF (or other binary file), convert the binary data to a Base64 string
      const blob = await response.blob();
      fileContent = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // Base64 string
        reader.readAsDataURL(blob);
      });
    } else {
      console.error("File format not supported for direct upload");
      return;
    }

    // Now, send the file content to your server
    // Adjust the fetch options as per your server's API requirements
    const serverResponse = await fetch("/api/uploadDoc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName,
        content: fileContent, // Send as a base64 string for binary files
      }),
    });

    if (!serverResponse.ok) {
      throw new Error("Failed to upload file content to server");
    }

    console.log("File content uploaded successfully");
  } catch (error) {
    console.error("Error uploading file content to server:", error);
  }
};
