const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Service Account JSON (আপনার দেওয়া প্রাইভেট কী সহ)
const serviceAccount = {
  type: "service_account",
  project_id: "chatcity-63c68",
  private_key_id: "a5b9fd1d5bc3d3c43dcd65faea9f6b796b6e3e50",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwsEYm1BZmy6HS\n97BUKXyoVE+GerAwDp5O8K8BMSZ5rYGV1myoxEJJKed6iWl6y/nlJ9V9e8mtfe/G\nBxc8O0xe4lpBOBG2BGKWAfNlW91jZV2gI+kUhvpARsWfxKqdKrqrUTQCgUDbmKn5\nnX1iGiskl30OlvrOnmtmiPq/ocULdsUmlZag0zH4GwLYlJFNIuTJ2wDItzDehvY3\n7bhztpVaI/tWxxJKXpXa9CO9aXFG8lYFi9l8wf2IdJaR3zHbNTMnSvDthOVZbPVL\nQlPxYdMqRGn5OKFfG5pJDyHiJgF5NllupnIgkDZAjjAy20NFQFleVUUHcon3C80S\nr0YHlhrRAgMBAAECggEAB0aqC+Qq3D61XjeDmhKnitPGftlnbyIx+hqanVYjoUoA\nKq5E5R4IZASLDxJwrt0uoDV/ytolteyYSreM6RbAzE0+Vd5YCd6kO+zOg/F4lGTW\nqj8iVH1iubIEZkH6O+zIGUEXvwTpOaXPtZsbAEbHOSt5G5hDca3nyrYYO9sevvwa\nifLz/RGzDcnGIZIF8L0RTdECRw0fGEAghvs3fJarPQiA8rpbwxNbmEhtN3NoyEzD\nGKAEBtD/swbRETX1LBuBULaqDnEWp1yLC56haWa5WJXgCOQ/b6s7Hvn1GzKwdTaZ\nuZ9nKhmdcjJNwDYJbR6aP2xrP0XMPEWYgnBLdgJ3QQKBgQDVKFQR6WSKWPbAUtwO\nkT9jClp7mMPeiQO8Vcvnd482YoeY5UyIM+m3cd2FWs2Pu9bKKuGcUDmbqrrUmEQL\ngWf6aoLOxcNc43sjp82h/gLgEMbyfWe1/nIolNcP1vb93AiHjGsezz+eD4jO67GO\nzOAUQ9QwRIQyOR/2SZjlLpockQKBgQDUM36zbOMGsVpGxSQzkzZXmevIQEgDwGmk\nUF4o9Yvn2YlCx90n1BrYewCZpGLKdKPh/p3qvF/UYpsy9t7h7ejC1W8+ugjkRNBf\nfiwiALuYVYHjzuhGwxDMZZTZoXxFlwsYqsIW4D43tGc8RUq2v+5D1RVEMfxpDvZo\nFzDRNjw6QQKBgQCKQMT+dR3D6d3pchTO0gCF8XIsljH8hWvJ3PAK6m4V/SQr1BWm\nhd1CIXVniDSp1FCFAfkhFJu4zqytNTF1MPLK5gh/qp+DAPyebLkgJ4uf3uHa5+G7\nlhRfI+K1oFzE3NEfccEM06lUkIjQhOi+UT3JhxD6WYZQuOJ1MNkdVPOaMQKBgHPo\nELvGrRbZxrrDMevt7A/bZjuCSROrhMiYkWYEAUBJxTyx2K3JoERAo2pIrSFyppVp\nsy4laJ6koasrx0BW5/2MAXCcwwCUSdDvJQIJrm4dvo4FVUBZihJrJevd1fhY8Vmu\n48cFA1b/9ieonY/GtEle2XffacSkxJjEmgicfDdBAoGAFkyR8pXt1yEyLgn1y3EY\n6qGbASO/mKZaevkxlUAmMLWPVh9byn2R3qfehRrg5YpIhgF9lNsWGHiYiAbqvg+R\n9LZlJm0JKu0RNIjTMWEmQaUvFXLgBvLJLqfJUjDkWBVj1uaoJTdlV9/Io1gs/+oL\nqNQg7WqFm0RgydD1oky/P84=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@chatcity-63c68.iam.gserviceaccount.com",
  client_id: "116173742858955468619",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40chatcity-63c68.iam.gserviceaccount.com"
};

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

// 📨 Send Push Notification
app.post('/api/sendPush', async (req, res) => {
  const { token, title, body, url } = req.body;
  if(!token) return res.status(400).json({error:'Missing token'});
  try {
    await admin.messaging().send({
      token,
      notification: { title, body },
      webpush: { fcmOptions: { link: url } }
    });
    res.json({ success: true });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
