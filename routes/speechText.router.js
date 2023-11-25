const express = require("express");
const transcribeAudioFromURL = require("../services/speechText.service");

const router = express.Router();

router.post("/", async (req, res) => {
  const { audioUrl } = req.body;
  if (!audioUrl) {
    return res.status(400).send("No se proporcionó audioUrl.");
  }
  try {
    const transcription = await transcribeAudioFromURL(audioUrl);
    res.json(transcription);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
