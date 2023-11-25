const speech = require("@google-cloud/speech");
const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();
// Initialize Google Vision client with credentials
let credentials;
try {
  credentials = JSON.parse(
    fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS_PATH, "utf8")
  );
} catch (error) {
  console.error("Error al cargar las credenciales:", error);
  process.exit(1); // Detener la aplicación si no hay credenciales
}

const client = new speech.SpeechClient({
  projectId: credentials.project_id,
  credentials: {
    private_key: credentials.private_key,
    client_email: credentials.client_email,
  },
});

module.exports = client;
