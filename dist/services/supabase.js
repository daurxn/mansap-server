"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseUrl = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
exports.supabaseUrl = 'https://kuywmshotcrszkbvgpun.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1eXdtc2hvdGNyc3prYnZncHVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNDMzMTcsImV4cCI6MjA2MDgxOTMxN30.VtqOyqmZzdeKfVSIDg0yonhp_WEiSL9Qfs3NnCjRXwA';
const supabase = (0, supabase_js_1.createClient)(exports.supabaseUrl, supabaseKey);
exports.default = supabase;
//# sourceMappingURL=supabase.js.map