import fs from "fs";
import path from "path";

const filePath = path.resolve("./public/visitors.json");

// Ensure the file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify({ total: 0, unique: [] }, null, 2));
}

export default function handler(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const time = new Date().toISOString();

  // Read current data
  let data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Update total visits
  data.total += 1;

  // Track unique visitors
  if (!data.unique.includes(ip)) {
    data.unique.push(ip);
  }

  // Save back to file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.status(200).json({ status: "success", total: data.total, uniqueVisitors: data.unique.length });
}
