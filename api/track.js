export default function handler(req, res) {
    const fs = require('fs');
    const path = require('path');

    // Get visitor details
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const time = new Date().toISOString();

    // Parse user agent for OS and browser (basic detection)
    function getBrowser(userAgent) {
        if (userAgent.includes("Firefox")) return "Firefox";
        if (userAgent.includes("Chrome")) return "Chrome";
        if (userAgent.includes("Safari")) return "Safari";
        if (userAgent.includes("Opera")) return "Opera";
        if (userAgent.includes("MSIE") || userAgent.includes("Trident")) return "Internet Explorer";
        return "Unknown";
    }

    function getOS(userAgent) {
        if (userAgent.includes("Windows")) return "Windows";
        if (userAgent.includes("Macintosh")) return "MacOS";
        if (userAgent.includes("Linux")) return "Linux";
        if (userAgent.includes("Android")) return "Android";
        if (userAgent.includes("iPhone")) return "iPhone";
        return "Unknown";
    }

    const browser = getBrowser(userAgent);
    const os = getOS(userAgent);

    // Visitor data
    const visitorData = { time, ip, browser, os };
    
    // Save data to a JSON file (local storage in Vercel does not persist)
    const filePath = path.join(process.cwd(), "visitors.json");
    
    let visitors = [];
    if (fs.existsSync(filePath)) {
        visitors = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
    
    visitors.push(visitorData);
    fs.writeFileSync(filePath, JSON.stringify(visitors, null, 2));

    res.status(200).json({ status: "success", visitor: visitorData });
    }
