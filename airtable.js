import { writeFile } from 'fs';
import fetch from 'node-fetch'; 
import dotenv from 'dotenv' 
dotenv.config();

const tables = [
    'Education',
    'Jobs',
    'Projects',
    'Side'
];

async function downloadData (table) {

    const request = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${table}?view=Grid view`, {
        headers: {
            'Authorization': `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}` 
        }
    });
    
    const data = await request.json();
    
    writeFile(`data/${table.toLowerCase()}.json`, JSON.stringify(data), 'utf8', err => {
        if (err) {
        console.error(err);
        } 
    });
}



tables.forEach(function(table) {
    downloadData(table);        
})