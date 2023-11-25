const axios = require("axios");
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

async function transcribeAudioFromURL(audioUrl) {
  try {
    // const responses = await axios({
    //   method: "get",
    //   url: audioUrl,
    //   responseType: "arraybuffer",
    // });
    // const audioBytes = responses.data.toString("base64");

    const audio = {
      // content: audioBytes,
      uri: audioUrl,
    };
    const config = {
      encoding: "LINEAR16", // Especificar MP3 si el archivo es MP3
      languageCode: "en-US",
      model: "default",
      audioChannelCount: 2,
      sampleRateHertz: 44100,
      // Omitir sampleRateHertz y audioChannelCount para detección automática
    };
    const request = { audio: audio, config: config };
    const response = await client.recognize(request);
    response[0].results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");
    return response[0].results.map(
      (result) => result.alternatives[0].transcript
    );
  } catch (error) {
    console.error("Error en la transcripción:", error);
    throw error;
  }
}

module.exports = transcribeAudioFromURL;
