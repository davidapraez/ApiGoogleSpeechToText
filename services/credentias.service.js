// Import the Google Cloud Speech library and the file system module
const speech = require("@google-cloud/speech");
const fs = require("fs");

// Initialize Google Cloud Speech client with credentials
let credentials;
try {
  // Attempt to read the Google Cloud credentials from a file
  credentials = JSON.parse(fs.readFileSync("/google.json", "utf8"));
} catch (error) {
  // Log an error message if there's an issue reading the credentials
  console.error("Error loading credentials:", error);
  // Exit the application if the credentials file cannot be read
  process.exit(1);
}

// Create a new instance of the SpeechClient with the loaded credentials
const client = new speech.SpeechClient({
  projectId: credentials.project_id,
  credentials: {
    private_key: credentials.private_key,
    client_email: credentials.client_email,
  },
});

// Export the initialized client for use in other modules
module.exports = client;
