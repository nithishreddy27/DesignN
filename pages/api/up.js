import { put } from '@vercel/blob';


export const runtime = 'edge';

// const nanoid = customAlphabet(
//   '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
//   7
// ); // 7-character random string

async function POST(req) {
  const file = req.body || '';
  const contentType = req.headers.get('content-type') || 'text/plain';
  const filename = `somefilenamenithishreddygade`;
  const blob = await put(filename, file, {
    contentType,
    access: 'public',
  });

  return new Response(JSON.stringify(blob), {
    headers: { 'Content-Type': 'application/json' },
  });
}

module.exports = { POST };
