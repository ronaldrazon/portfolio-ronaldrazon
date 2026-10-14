let count = 0; // Starting baseline

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  if (req.method === 'GET') {
    count += 1;
    return res.status(200).json({ visits: count });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}