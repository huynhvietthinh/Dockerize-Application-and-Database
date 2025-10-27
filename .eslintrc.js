// .eslintrc.js
module.exports = {
  // Môi trường chạy code của bạn
  env: {
    commonjs: true, // Cho phép các từ khóa CommonJS (require/module.exports)
    es2021: true,   // Cho phép cú pháp ES2021
    node: true      // Cho phép các biến toàn cục của Node.js (như 'process')
  },
  // Sử dụng bộ quy tắc khuyến nghị của ESLint
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest' // Luôn dùng trình phân tích cú pháp mới nhất
  },
  // (Tùy chọn) Thêm các quy tắc của riêng bạn ở đây
  rules: {
    // Ví dụ: 'no-console': 'off' // (Để tắt lỗi báo khi dùng console.log)
  }
};
