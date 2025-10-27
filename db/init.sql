-- file: db/init.sql

-- Xóa bảng nếu đã tồn tại (để test cho dễ)
DROP TABLE IF EXISTS questions;

-- Tạo bảng 'questions'
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,              -- ID tự tăng (ví dụ: 1, 2, 3...)
    question_text TEXT NOT NULL,        -- Nội dung câu hỏi, không được rỗng
    answer TEXT NOT NULL,               -- Câu trả lời, không được rỗng
    created_at TIMESTAMP DEFAULT NOW()   -- Ngày giờ tạo
);

-- Thêm một vài câu hỏi mẫu
INSERT INTO questions (question_text, answer) VALUES
('Câu hỏi 1: Docker là gì?', 'Docker là một nền tảng container hóa.'),
('Câu hỏi 2: CRUD là gì?', 'Là viết tắt của Create, Read, Update, Delete.');