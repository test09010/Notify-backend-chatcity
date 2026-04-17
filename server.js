const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Firebase Initialize (Environment variable থেকে)
try {
  const serviceAccount = {
    type: "service_account",
    project_id: "chatcity-63c68",
    private_key_id: "a5b9fd1d5bc3d3c43dcd65faea9f6b796b6e3e50",
    private_key: process.env.FIREBASE_PRIVATE_KEY || `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwsEYm1BZmy6HS
97BUKXyoVE+GerAwDp5O8K8BMSZ5rYGV1myoxEJJKed6iWl6y/nlJ9V9e8mtfe/G
Bxc8O0xe4lpBOBG2BGK/8RkVkI0e2m5bEVm50FEKnhd3pFmP+EZTpwWQHf/t8qXz
wxJQsVu9T7F6BnmqHgAhDp3gm3VWXWQq3cGqmEWvb1/fBfDfEZA7qHhLe4qMb+B6
vOhWe1lFZJGeFfMk1n6iQYUqGlKXnOqRrjMdoVSpLeVLmGKMPIZxYwO/E3lE5T5z
Jh7YxDW8K9VJ3DqD8qJBnvX3s3jEjyp/rKmjBDL3QTjR+5c0TqBxQf3pYh+y4pYi
h5pNJzjnAgMBAAECggEARTkWLXqF9t+3H0Y1qTM5RCr+Cx7Z5oW2HVfA9+3z2Y7g
FaR8S5m7XtQ4mOxLvLs2z3nLbX5s5P7YqE7D4xZ5qTQj8K7L8qT9Z3pX5X5Y5qTd
jK8L9sU0U3nQ6M9V9yY1Z1pW6K8M0tV2U4oR7N0V3xZ2Z2qX7L9N1uW3V5pS8K9
O1vW4W6oS9L0W4yT8O0wX5yU9P1xY6zU0V5pT9L1W5yU0P1xY6zU0V5pT9L1W5yU
0P1xY6zU0V5pT9L1W5yU0P1xY6zU0V5pT9L1W5yU0P1xY6zU0V5pT9L1W5yU0P1x
Y6zU0V5pT9L1W5yU0P1xY6zU0V5pT9L1W5yU0P1xY6zU0V5pT9L1W5yU0P1xY6zU
0V5pT9L1W5yU0QKBgQD5c5X0Z5pUUT9L2W6zVVU6qUUT8L1W6yU0P1xY6yU0V5pT
9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1
W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU
0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1x
Y6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0QKBgQDx
c5X0Z5pUUT9L2W6zVVU6qUUT8L1W6yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT
9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1
W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU
0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1x
Y6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0V5pT9L1W5yU0QKBgQDxc5X0Z5p
UUT9L2W6zVVU6qUUT8L1W6yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT
-----END PRIVATE KEY-----`,
    client_email: "firebase-adminsdk-fbsvc@chatcity-63c68.iam.gserviceaccount.com",
    client_id: "116173742858955468619",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40chatcity-63c68.iam.gserviceaccount.com"
  };

  admin.initializeApp({ 
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chatcity-63c68-default-rtdb.firebaseio.com"
  });
  console.log('✅ Firebase initialized');
} catch (e) {
  console.error('❌ Firebase init error:', e.message);
}

// ✅ Endpoints
app.get('/', (req, res) => {
  res.json({ status: '✅ ChatCity Backend Running' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.post('/api/sendPush', async (req, res) => {
  const { token, title, body } = req.body;
  if (!token) return res.status(400).json({ error: 'Token required' });

  try {
    const msg = await admin.messaging().send({
      token,
      notification: { title, body }
    });
    res.json({ success: true, messageId: msg });
  } catch (e) {
    console.error('FCM error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Running on ${PORT}`));
