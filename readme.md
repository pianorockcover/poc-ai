# PoC for Open AI API

1. Copy `.env.example` to `.env`

2. Put api token to `.env`

3. Install dependencies

```
yarn install
```

4. Run the script

```
yarn start <limit>
```

Default limit is `3`, max is `1000`

5. Result will be stored to `result.csv` file

## Data

- raw-data.json - data dump from the prod's `Scrapped` Mongodb table
- texts.json - clean descriptions array

`parse.js` - Script to clear raw data and save to texts.json
