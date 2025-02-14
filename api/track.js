export default function handler(req, res) {
    // Get visitor details
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const time = new Date().toISOString();

    // Parse user agent
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

    // Visitor Data
    const visitorData = { time, ip, browser, os };

    // Log data to Vercel function logs (you can see this in Vercel Dashboard)
    console.log("Visitor:", visitorData);

    // Send response
    res.status(200).json({ status: "success", visitor: visitorData });
}
