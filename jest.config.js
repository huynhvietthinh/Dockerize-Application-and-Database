// jest.config.js
module.exports = {
  testEnvironment: 'node',
  // Yêu cầu Jest tạo báo cáo coverage trong thư mục 'coverage'
  collectCoverage: true,
  coverageDirectory: 'coverage',
  // Thêm cấu hình để bỏ qua các thư mục không cần test
  testPathIgnorePatterns: ['/node_modules/', '/coverage/'],
  // Các file cần theo dõi coverage
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/*.spec.js'
  ]
};