const transcribeAudioFromURL = require("../services/speechText.service");

exports.handler = async (event) => {
  let body;

  // Parsing the event body safely
  try {
    body = event.body ? JSON.parse(event.body) : event;
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON format in the body" }),
    };
  }

  // Validating the audio URL
  if (!body.audioUrl || typeof body.audioUrl !== "string") {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "URL not provided or invalid format" }),
    };
  }

  try {
    const transcription = await transcribeAudioFromURL(body.audioUrl);
    return {
      statusCode: 200,
      body: JSON.stringify(transcription),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
