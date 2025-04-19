"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const project_routes_1 = __importDefault(require("./routes/project.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const team_routes_1 = __importDefault(require("./routes/team.routes"));
const node_server_1 = require("@hono/node-server");
const app_1 = __importDefault(require("./app"));
// Load environment variables
dotenv_1.default.config();
// Initialize Express app
const PORT = process.env.PORT || 5000;
// Middleware
const appExpress = (0, express_1.default)();
appExpress.use((0, cors_1.default)());
appExpress.use(express_1.default.json());
appExpress.use((0, morgan_1.default)('dev'));
// Routes
appExpress.use('/api/auth', auth_routes_1.default);
appExpress.use('/api/projects', project_routes_1.default);
appExpress.use('/api/tasks', task_routes_1.default);
appExpress.use('/api/teams', team_routes_1.default);
// Health check endpoint
appExpress.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});
// Global error handler
appExpress.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});
// Start the server
async function startServer() {
    try {
        // Connect to MongoDB when ready
        // await connectDB();
        console.log(`Server starting on port ${PORT}...`);
        (0, node_server_1.serve)({
            fetch: app_1.default.fetch,
            port: Number(PORT)
        });
        console.log(`Server running at http://localhost:${PORT}`);
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=index.js.map