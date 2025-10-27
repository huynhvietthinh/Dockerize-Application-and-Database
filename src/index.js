// file: src/index.js
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// YÊU CẦU MỚI: Middleware để parse JSON
// Dòng này rất quan trọng để đọc req.body cho POST và PUT
app.use(express.json());

// Cấu hình kết nối Postgres (như cũ)
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.DB_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

// Endpoint /health (như cũ)
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.status(200).json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

app.get('/', (req, res) => {
  res.send('Chào mừng đến với MockTest API v2 (CRUD)!');
});

// --- CÁC API CRUD MỚI ---

// 1. CREATE (Tạo mới câu hỏi)
// POST /questions
app.post('/questions', async (req, res) => {
  try {
    const { question_text, answer } = req.body;

    // Validation cơ bản (Tiêu chí của Lab)
    if (!question_text || !answer) {
      return res.status(400).json({ error: 'Cần có cả question_text và answer' });
    }

    const newQuestion = await pool.query(
      'INSERT INTO questions (question_text, answer) VALUES ($1, $2) RETURNING *',
      [question_text, answer]
    );

    // Trả về 201 Created (Tiêu chí của Lab)
    res.status(201).json(newQuestion.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// 2. READ (Lấy tất cả câu hỏi)
// GET /questions
app.get('/questions', async (req, res) => {
  try {
    const allQuestions = await pool.query('SELECT * FROM questions ORDER BY id ASC');
    res.status(200).json(allQuestions.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// 3. READ (Lấy 1 câu hỏi)
// GET /questions/:id
app.get('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ URL
    const question = await pool.query('SELECT * FROM questions WHERE id = $1', [id]);

    if (question.rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy câu hỏi' });
    }

    res.status(200).json(question.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// 4. UPDATE (Cập nhật 1 câu hỏi)
// PUT /questions/:id
app.put('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { question_text, answer } = req.body;

    // Validation cơ bản
    if (!question_text || !answer) {
      return res.status(400).json({ error: 'Cần có cả question_text và answer' });
    }

    const updatedQuestion = await pool.query(
      'UPDATE questions SET question_text = $1, answer = $2 WHERE id = $3 RETURNING *',
      [question_text, answer, id]
    );

    if (updatedQuestion.rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy câu hỏi để cập nhật' });
    }

    res.status(200).json(updatedQuestion.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// 5. DELETE (Xóa 1 câu hỏi)
// DELETE /questions/:id
app.delete('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await pool.query('DELETE FROM questions WHERE id = $1 RETURNING *', [id]);

    if (deletedQuestion.rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy câu hỏi để xóa' });
    }

    res.status(200).json({ message: 'Đã xóa câu hỏi', question: deletedQuestion.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});


// Khởi động server (như cũ)
app.listen(port, () => {
  console.log(`MockTest app đang chạy trên cổng ${port}`);
});