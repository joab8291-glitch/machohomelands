import { isAuthed } from '../_auth.js';
import { writeRepoBase64File } from '../_github.js';

export const config = { api: { bodyParser: { sizeLimit: '4.5mb' } } };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!isAuthed(req)) return res.status(401).json({ error: 'Sign in again.' });

  const { dataUrl, filename } = req.body || {};
  if (typeof dataUrl !== 'string') return res.status(400).json({ error: 'Choose a property photo first.' });
  const match = dataUrl.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=\r\n]+)$/);
  if (!match) return res.status(400).json({ error: 'Use a PNG, JPG or WEBP property photo.' });

  const bytes = Buffer.from(match[2], 'base64');
  if (!bytes.length) return res.status(400).json({ error: 'The selected image is empty or invalid.' });
  if (bytes.length > 3 * 1024 * 1024) return res.status(413).json({ error: 'Property photos must be smaller than 3 MB.' });

  // Check the actual file signature as well as the browser-supplied MIME type.
  const mime = match[1];
  const validPng = mime === 'png' && bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const validJpeg = mime === 'jpeg' && bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const validWebp = mime === 'webp' && bytes.length >= 12 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
  if (!(validPng || validJpeg || validWebp)) return res.status(400).json({ error: 'The file does not match a supported image format.' });

  const ext = mime === 'jpeg' ? 'jpg' : mime;
  const base = String(filename || 'property-photo').replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '-').replace(/-+/g, '-').slice(0, 36).replace(/^-|-$/g, '') || 'property-photo';
  const path = 'public/uploads/listings/' + base + '-' + Date.now().toString(36) + '.' + ext;
  try {
    await writeRepoBase64File(path, bytes.toString('base64'), 'Upload property photo: ' + base);
    return res.status(200).json({ ok: true, imageUrl: '/' + path.replace(/^public\//, '') });
  } catch (error) {
    console.error('Property image upload failed:', error);
    return res.status(500).json({ error: 'Property photo upload failed. Check GITHUB_TOKEN Contents: Read and write permission.' });
  }
}
