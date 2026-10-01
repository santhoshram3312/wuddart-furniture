// server/index.js — app entry point.
// Run with: npm start   (or: node server/index.js)

const express = require("express");
const cors = require("cors");
const path = require("path");

const settingsRoutes = require("./routes/settings");
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "..", "public");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(PUBLIC_DIR));

app.use("/api/settings", settingsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);

// Fallback: serve the homepage for the root path.
app.get("/", (req, res) => res.sendFile(path.join(PUBLIC_DIR, "index.html")));

const os = require("os");

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "127.0.0.1";
}

const localIP = getLocalIP();

if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n======================================================`);
    console.log(`🛋️  Wuddart Furniture is running on all devices:`);
    console.log(`   • This machine:   http://localhost:${PORT}`);
    console.log(`   • Phone / Tablet: http://${localIP}:${PORT}`);
    console.log(`   • Admin panel:    http://${localIP}:${PORT}/admin.html`);
    console.log(`======================================================\n`);
  });
}

module.exports = app;
