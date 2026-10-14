// In-memory baseline counter for Vercel Serverless Function
let count = 0;

export default function handler(req, res) {
  // Set CORS headers so your frontend can call this endpoint cleanly
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    count += 1;
    return res.status(200).json({ visits: count });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}