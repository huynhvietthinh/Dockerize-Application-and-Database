const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000; // Cổng bên trong container

// Cấu hình kết nối Postgres
// Docker Compose sẽ inject các biến môi trường này
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.DB_HOST, // Tên service của DB trong docker-compose
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

// Endpoint /health để kiểm tra "sức khỏe"
app.get('/health', async (req, res) => {
  try {
    // Thử truy vấn 1 câu đơn giản để kiểm tra kết nối DB
    await pool.query('SELECT NOW()');
    res.status(200).json({ status: 'ok', database: 'connected' });
  } catch (err) {
    // Nếu thất bại, trả về lỗi 503 (Service Unavailable)
    res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

app.get('/', (req, res) => {
  res.send('Chào mừng đến với MockTest App!');
});

app.listen(port, () => {
  console.log(`MockTest app đang chạy trên cổng ${port}`);
});