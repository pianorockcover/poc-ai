const { Configuration, OpenAIApi } = require("openai");
const texts = require("./texts.json");
const fs = require("fs");

const args = process.argv.slice(2);

const limit = args[0] || 3;

fs.writeFileSync("result.csv", "Text,Buidling,Scores\n");

const configuration = new Configuration({
  apiKey: process.env.TOKEN,
});

const openai = new OpenAIApi(configuration);

const predict = async (text) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `
      Identify about which building in Bangkok the following text is about: "${text}".
      No response formatting. Send only building name.
    `,
    temperature: 0,
    max_tokens: 100,
    top_p: 1.0,
    logprobs: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  return {
    prediction: response.data.choices[0].text,
    text,
    scores: JSON.stringify(
      response.data.choices[0].logprobs.top_logprobs
    ).replace(/,/g, " "),
  };
};

(async () => {
  const results = (
    await Promise.allSettled(texts.slice(0, limit).map((text) => predict(text)))
  ).filter((item) => {
    if (item.status === "fulfilled" && item.value) {
      return true;
    } else {
      console.log("Error");
    }
  });

  results.forEach((item) => {
    fs.appendFileSync(
      "result.csv",
      `${item.value.text},${item.value.prediction},${item.value.scores}`.replace(
        /\n/g,
        ""
      ) + "\n"
    );
  });

  console.log("Done");
})();
