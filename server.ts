import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

const staticPath = path.join(__dirname, 'static');

// API endpoint to list HTML files in the static directory
app.get('/api/files', (req, res) => {
    fs.readdir(staticPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read directory' });
        }
        const htmlFiles = files
            .filter(file => file.endsWith('.html') && file !== 'index.html')
            .map(file => ({
                name: file,
                url: `/${file}`
            }));

        res.json(htmlFiles);
    });
});

// Serve static files
app.use(express.static(staticPath));

// Catch-all 404 handler that returns JSON
// This prevents "Unexpected token <" errors when a requested resource is missing
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `The path '${req.path}' does not exist in the static directory.`
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});