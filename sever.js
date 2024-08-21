const express = require('express');
const XLSX = require('xlsx');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/save-results', (req, res) => {
    const { username, score } = req.body;
    const filePath = 'quiz_results.xlsx';

    let workbook;
    if (fs.existsSync(filePath)) {
        workbook = XLSX.readFile(filePath);
    } else {
        workbook = XLSX.utils.book_new();
    }

    const worksheetData = [
        ["Username", "Score"],
        [username, score]
    ];

    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, ws, "Results");
    XLSX.writeFile(workbook, filePath);

    res.send('Results saved to Excel file.');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
