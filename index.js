const { Configuration, OpenAIApi } = require("openai");
const texts = require("./texts.json");
const fs = require("fs");

const args = process.argv.slice(2);

const limit = args[0] || 3;

fs.writeFileSync("result.csv", "Text,Buidling,Score\n");

const configuration = new Configuration({
  apiKey: process.env.TOKEN,
});

const openai = new OpenAIApi(configuration);

const predict = async (text) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Extract the building name from the text, no response formatting, just simply the name' +
     '"""' +
     '${text}'`,
    temperature: 0,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  return {
    prediction: response.data.choices[0].text,
    text,
  };
};

(async () => {
  const results = (
    await Promise.allSettled(texts.slice(0, limit).map((text) => predict(text)))
  ).filter((item) => item.status === "fulfilled" && item.value);

  results.forEach((item) => {
    fs.appendFileSync(
      "result.csv",
      `${item.value.text},${item.value.prediction}`.replace(/\n/g, "") + "\n"
    );

    console.log(item);
  });

  console.log("Done");
})();
