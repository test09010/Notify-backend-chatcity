const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

// Firebase Service Account
const serviceAccount = {
  type: "service_account",
  project_id: "chatcity-63c68",
  private_key_id: "a5b9fd1d5bc3d3c43dcd65faea9f6b796b6e3e50",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwsEYm1BZmy6HS\n97BUKXyoVE+GerAwDp5O8K8BMSZ5rYGV1myoxEJJKed6iWl6y/nlJ9V9e8mtfe/G\nBxc8O0xe4lpBOBG2BGK/8RkVkI0e2m5bEVm50FEKnhd3pFmP+EZTpwWQHf/t8qXz\nwxJQsVu9T7F6BnmqHgAhDp3gm3VWXWQq3cGqmEWvb1/fBfDfEZA7qHhLe4qMb+B6\nvOhWe1lFZJGeFfMk1n6iQYUqGlKXnOqRrjMdoVSpLeVLmGKMPIZxYwO/E3lE5T5z\nJh7YxDW8K9VJ3DqD8qJBnvX3s3jEjyp/rKmjBDL3QTjR+5c0TqBxQf3pYh+y4pYi\nh5pNJzjnAgMBAAECggEARTkWLXqF9t+3H0Y1qTM5RCr+Cx7Z5oW2HVfA9+3z2Y7g\nFaR8S5m7XtQ4mOxLvLs2z3nLbX5s5P7YqE7D4xZ5qTQj8K7L8qT9Z3pX5X5Y5qTd\njK8L9sU0U3nQ6M9V9yY1Z1pW6K8M0tV2U4oR7N0V3xZ2Z2qX7L9N1uW3V5pS8K9\nO1vW4W6oS9L0W4yT8O0wX5yU9P1xY6zU0V5pT9L1W5yU0P1xY6zU0V5pT9L1W5yU\n0P1xY6zU0V5pT9L1W5yU0P1xY6zU0V5pT9L1W5yU0P1xY6zU0V5pT9L1W5yU0P1x\nY6zU0V5pT9L1W5yU0P1xY6zU0V5pT9L1W5yU0P1xY6zU0V5pT9L1W5yU0P1xY6zU\n0V5pT9L1W5yU0P1xY6zU0V5pT9L1W5yU0P1xY6zU0V5pT9L1W5yU0P1xY6zU0V5p\nT9L1W5yU0P1xY6zU0QKBgQD5c5X0Z5pUUT9L2W6zVVU6qUUT8L1W6yU0P1xY6yU0V\n5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L\n1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU\n0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY\n6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5\npT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1\nW5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0\nP1xY6yU0V5pT9L1W5yU0QKBgQDxc5X0Z5pUUT9L2W6zVVU6qUUT8L1W6yU0P1xY6yU\n0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT\n9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W\n5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P\n1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT9L1W5yU0QKBgQD\nxc5X0Z5pUUT9L2W6zVVU6qUUT8L1W6yU0P1xY6yU0V5pT9L1W5yU0P1xY6yU0V5pT\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@chatcity-63c68.iam.gserviceaccount.com",
  client_id: "116173742858955468619",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40chatcity-63c68.iam.gserviceaccount.com"
};

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

// ✅ Health Check Endpoint
app.get('/', (req, res) => {
  res.json({ status: '✅ ChatCity Backend Running', timestamp: new Date().toISOString() });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is healthy' });
});

// ✅ Send Push Notification - Main Endpoint
app.post('/api/sendPush', async (req, res) => {
  const { token, title, body, url } = req.body;
  
  console.log('📨 FCM Request received:', { token: token?.substring(0, 20) + '...', title, body });
  
  if (!token) {
    return res.status(400).json({ error: 'Token required' });
  }

  try {
    const response = await admin.messaging().send({
      token,
      notification: {
        title: title || 'ChatCity',
        body: body || 'New message'
      },
      webpush: {
        fcmOptions: {
          link: url || 'home.html'
        },
        notification: {
          title: title || 'ChatCity',
          body: body || 'New message',
          icon: 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png',
          badge: 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png',
          tag: 'chatcity-notification',
          requireInteraction: false
        }
      },
      data: {
        url: url || 'home.html',
        click_action: url || 'home.html'
      }
    });
    
    console.log('✅ Push sent successfully:', response);
    res.json({ success: true, messageId: response });
  } catch (error) {
    console.error('❌ FCM Error:', error.message);
    res.status(500).json({ error: error.message || 'Failed to send notification' });
  }
});

// ✅ Send to Multiple Users
app.post('/api/sendMulticast', async (req, res) => {
  const { tokens, title, body } = req.body;
  
  if (!tokens || tokens.length === 0) {
    return res.status(400).json({ error: 'Tokens required' });
  }

  try {
    const response = await admin.messaging().sendMulticast({
      tokens,
      notification: { title, body }
    });
    
    res.json({ 
      success: true, 
      successCount: response.successCount, 
      failureCount: response.failureCount 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Test Endpoint
app.post('/api/test', (req, res) => {
  res.json({ success: true, message: 'Test endpoint working', body: req.body });
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found', path: req.path });
});

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error('🔴 Server Error:', err);
  res.status(500).json({ error: 'Server error', message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 ChatCity Backend running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});
