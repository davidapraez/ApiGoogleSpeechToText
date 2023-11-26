const axios = require("axios");
const client = require("../services/credentias.service");

// Function to transcribe audio from a given URL using Google Cloud Speech-to-Text API
async function transcribeAudioFromURL(audioUrl) {
  try {
    const audio = {
      uri: audioUrl,
    };
    const config = {
      encoding: "LINEAR16", // Audio encoding type
      languageCode: "en-US", // Language of the audio
      model: "default", // Transcription model
      audioChannelCount: 2, // Number of audio channels
      sampleRateHertz: 44100, // Sample rate in Hertz
    };

    const request = { audio: audio, config: config };

    const response = await client.recognize(request);

    return response[0].results.map(
      (result) => result.alternatives[0].transcript
    );
  } catch (error) {
    console.error("Error in transcription:", error);
    throw error;
  }
}

// Export the transcribeAudioFromURL function for use in other modules
module.exports = transcribeAudioFromURL;
