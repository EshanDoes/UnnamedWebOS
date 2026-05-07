import { put } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, message, subject } = req.body;

    const fileId = Math.random() / Math.random()

    const { url } = await put(`emails/${subject}―${email}―${fileId}.txt`, message, {
      access: 'private',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json({ success: true, url });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: error.message });
  }
}