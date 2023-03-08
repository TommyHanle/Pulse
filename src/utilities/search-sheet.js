export default async function searchSheet(searchTerm) {
    const spreadsheetZipPrice = '18VNxXCItcIx5AErIHvloP4O8Lzfq36UOTlN6Pi1TLLQ'; // Replace with the ID of the first Google Sheet
    const spreadsheetZipForecasts = '1f7XG5dMpiRlaYBvN8HlIjg5j9kmZ5vrj4AtCj5tWiJk'; // Replace with the ID of the second Google Sheet
    const apiKey = 'AIzaSyBjy1pWoN1pbn63FDF_VyoTcDWNkMIcSv8'; // Replace with your API key
    const range = 'Sheet1!A:M'; // Replace with the range you want to search
  
    const url1 = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetZipPrice}/values/${range}?key=${apiKey}&majorDimension=ROWS`;
    const url2 = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetZipForecasts}/values/${range}?key=${apiKey}&majorDimension=ROWS`;
  
    const response1 = await fetch(url1);
    const response2 = await fetch(url2);
    const priceData = await response1.json();
    const forecastsData = await response2.json();
  
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
  
    return { priceData: matchingRows1, forecastsData: matchingRows2 };
  }
  