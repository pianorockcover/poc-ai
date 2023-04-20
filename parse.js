const fs = require("fs");
const mongoData = require("./raw-data.json");

let i = 0;

const LIMIT = 1000;

const texts = [];

fs.writeFileSync("texts.json", "[]", "utf-8");

mongoData.forEach((item) => {
  let descriptionEn = item["Raw Scraped"]["descriptionEn"];

  descriptionEn = descriptionEn.replace(/[\n,"'` ]/g, "");

  const isEn = /^[A-Za-z0-9.:\s-]*$/.test(descriptionEn);

  if (isEn && descriptionEn.length > 30 && i < LIMIT) {
    i++;
    texts.push(descriptionEn);
  }
});

fs.appendFileSync("texts.json", JSON.stringify(texts), "utf-8");

console.log("Amount", i);
