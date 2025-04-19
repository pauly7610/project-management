"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const logger_1 = require("hono/logger");
const cors_1 = require("hono/cors");
const pretty_json_1 = require("hono/pretty-json");
const secure_headers_1 = require("hono/secure-headers");
// Import routes
const auth_routes_1 = require("./routes/auth-routes");
const project_routes_1 = __importDefault(require("./routes/project-routes"));
const task_routes_1 = require("./routes/task-routes");
const team_routes_1 = require("./routes/team-routes");
// Create Hono app
const app = new hono_1.Hono();
// Apply middleware
app.use('*', (0, logger_1.logger)());
app.use('*', (0, cors_1.cors)());
app.use('*', (0, pretty_json_1.prettyJSON)());
app.use('*', (0, secure_headers_1.secureHeaders)());
// Health check endpoint
app.get('/health', (c) => {
    return c.json({ status: 'ok', message: 'Server is running' });
});
// Mount routers
app.route('/api/auth', auth_routes_1.authRouter);
app.route('/api/projects', project_routes_1.default);
app.route('/api/tasks', task_routes_1.taskRouter);
app.route('/api/teams', team_routes_1.teamRouter);
// Error handling
app.onError((err, c) => {
    console.error('Server error:', err);
    return c.json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }, 500);
});
exports.default = app;
//# sourceMappingURL=app.js.map