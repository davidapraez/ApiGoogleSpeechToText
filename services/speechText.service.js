const axios = require("axios");
const client = require("../services/credentias.service");

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
