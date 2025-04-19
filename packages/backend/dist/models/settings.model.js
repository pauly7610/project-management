"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const SettingsSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    theme: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'system',
    },
    language: {
        type: String,
        default: 'en',
        enum: ['en', 'es', 'fr', 'de', 'ja', 'zh', 'ko', 'pt', 'it', 'ru'],
    },
    timeZone: {
        type: String,
        default: 'UTC',
    },
    dateFormat: {
        type: String,
        enum: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'],
        default: 'MM/DD/YYYY',
    },
    notifications: {
        email: {
            type: Boolean,
            default: true,
        },
        push: {
            type: Boolean,
            default: true,
        },
        desktop: {
            type: Boolean,
            default: true,
        },
        taskReminders: {
            type: Boolean,
            default: true,
        },
        eventReminders: {
            type: Boolean,
            default: true,
        },
        mentionNotifications: {
            type: Boolean,
            default: true,
        },
        dailyDigest: {
            type: Boolean,
            default: false,
        },
    },
    calendar: {
        defaultView: {
            type: String,
            enum: ['month', 'week', 'day', 'agenda'],
            default: 'month',
        },
        startOfWeek: {
            type: Number,
            enum: [0, 1, 6], // 0 = Sunday, 1 = Monday, 6 = Saturday
            default: 1,
        },
        showWeekends: {
            type: Boolean,
            default: true,
        },
        workingHours: {
            start: {
                type: String,
                default: '09:00',
            },
            end: {
                type: String,
                default: '17:00',
            },
        },
    },
    dashboard: {
        defaultLayout: {
            type: String,
            enum: ['grid', 'list'],
            default: 'grid',
        },
        visibleWidgets: {
            type: [String],
            default: ['tasks', 'calendar', 'projects', 'activity'],
        },
        widgetLayout: {
            type: String,
            default: '{}',
        },
    },
}, {
    timestamps: true,
});
// Create index for faster lookups
SettingsSchema.index({ user: 1 });
exports.Settings = mongoose_1.default.model('Settings', SettingsSchema);
//# sourceMappingURL=settings.model.js.map