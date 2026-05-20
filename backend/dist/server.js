"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Import config to trigger SQLite database connection and check tables
const database_1 = __importDefault(require("./config/database"));
const astrology_routes_1 = __importDefault(require("./routes/astrology.routes"));
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5113;
// Middleware
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
}));
app.use(express_1.default.json());
// Routes
app.use('/api/astrology', astrology_routes_1.default);
app.use('/api/profiles', profile_routes_1.default);
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Serve static frontend assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../../frontend/dist/index.html'));
    });
}
// Start Server
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`   COSMIC ASTROLOGY BACKEND SERVER STARTED        `);
    console.log(`==================================================`);
    console.log(`Server listening on port : http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`==================================================`);
});
// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('Shutting down gracefully...');
    database_1.default.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        }
        else {
            console.log('Closed SQLite database connection.');
        }
        process.exit(0);
    });
});
