export default function handler(req, res) {
    if (req.method === 'GET') {
      res.status(200).json({ message: 'Check successful' });
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  }