const fetch = require('node-fetch');

const spreadsheetZipPrice = '18VNxXCItcIx5AErIHvloP4O8Lzfq36UOTlN6Pi1TLLQ'; // Replace with the ID of the first Google Sheet
const spreadsheetZipForecasts = '1f7XG5dMpiRlaYBvN8HlIjg5j9kmZ5vrj4AtCj5tWiJk'; // Replace with the ID of the second Google Sheet
const apiKey = process.env.REACT_APP_GOOGLE_SHEETS; // Replace with your API key
const range = 'Sheet1!A:M'; // Replace with the range you want to search

async function searchSheet(req, res) {
  const searchTerm = req.query.searchTerm;

  const url1 = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetZipPrice}/values/${range}?key=${apiKey}&majorDimension=ROWS`;
  const url2 = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetZipForecasts}/values/${range}?key=${apiKey}&majorDimension=ROWS`;

  const response1 = await fetch(url1);
  const response2 = await fetch(url2);
  const priceData = await response1.json();
  const forecastsData = await response2.json();
  console.log(priceData);
  console.log(forecastsData);


  let matchingRows1 = [];
  let matchingRows2 = [];

  if (searchTerm.startsWith('0')) {
    const zipWithoutLeadingZero = searchTerm.slice(1);
    matchingRows1 = priceData.values.filter(row => row[2].includes(zipWithoutLeadingZero) && row[2].length === 4);
    matchingRows2 = forecastsData.values.filter(row => row[2].includes(zipWithoutLeadingZero) && row[2].length === 4);
  } else {
    matchingRows1 = priceData.values.filter(row => row[2].includes(searchTerm));
    matchingRows2 = forecastsData.values.filter(row => row[2].includes(searchTerm));
  }

  res.json({ priceData: matchingRows1, forecastsData: matchingRows2 });
}

module.exports = {
  searchSheet
};

