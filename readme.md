# PoC for Open AI API

1. Copy .env.example to .env

2. Insert api token

3. Install dependencies

```
yarn install
```

4. Run the script

```
yarn start <limit>
```

Default limit is `3`, max is `1000`

5. Result will be stored to result.csv

## Data

- raw-data.json - scrapped table from mongodb
- texts.json - cleared descriptions array

`parse.js` - Script to format raw data to texts.json
