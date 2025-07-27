const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const ACCESS_TOKEN = process.env.META_TOKEN;
const PIXEL_ID = "1711730589631681";

app.post("/heyflow-complete", async (req, res) => {
  try {
    const { email, phone } = req.body;

    const response = await axios.post(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events`, {
      data: [
        {
          event_name: "CompleteRegistration",
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: "https://www.eonlat.com/precalificacion",
          user_data: {
            em: [email],
            ph: [phone]
          },
          action_source: "website"
        }
      ],
      access_token: ACCESS_TOKEN
    });

    res.status(200).json({ success: true, fb_response: response.data });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: "Failed to send to Meta" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
