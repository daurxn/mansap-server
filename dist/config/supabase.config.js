"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHAT_IMAGES_BUCKET = exports.supabaseClient = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
exports.supabaseClient = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '');
exports.CHAT_IMAGES_BUCKET = 'files';
//# sourceMappingURL=supabase.config.js.map