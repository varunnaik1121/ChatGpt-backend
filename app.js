const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();
app.use(express.json());

app.use(cors());

const configuration = new Configuration({
  apiKey: process.env.SECRET_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from backend',
  });
});

app.post('/', async (req, res) => {
  try {
    const userInput = req.body.userInput;
    console.log({ userInput });
    const response = await openai.createCompletion({
      model: 'gpt-3.5-turbo',
      prompt: `${userInput}`,
      temperature: 0.2,
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    res.status(500).send(error || 'something went wrong');
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log('server running on port 5000');
});
