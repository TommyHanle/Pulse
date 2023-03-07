export default async function searchSheet(searchTerm) {
    const spreadsheetId = '18VNxXCItcIx5AErIHvloP4O8Lzfq36UOTlN6Pi1TLLQ';
    const apiKey = 'AIzaSyBjy1pWoN1pbn63FDF_VyoTcDWNkMIcSv8';
    const range = 'Sheet1!A:J';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}&majorDimension=ROWS`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    let matchingRows = [];
  
    if (searchTerm.startsWith('0')) {
      const zipWithoutLeadingZero = searchTerm.slice(1);
      matchingRows = data.values.filter(row => row[2].includes(zipWithoutLeadingZero) && row[2].length === 4);
    } else {
      matchingRows = data.values.filter(row => row[2].includes(searchTerm));
    }
  
    return matchingRows;
  }
  