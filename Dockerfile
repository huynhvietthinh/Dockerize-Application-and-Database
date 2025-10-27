# Bước 1: Chọn image cơ sở (base image)
FROM node:18-alpine

# Bước 2: Đặt thư mục làm việc bên trong container
WORKDIR /app

# Bước 3: Sao chép file package.json (chỉ file này)
# Tận dụng cơ chế cache của Docker
COPY src/package*.json ./

# Bước 4: Cài đặt dependencies
RUN npm install

# Bước 5: Sao chép toàn bộ mã nguồn của app (từ /src)
COPY src/ .

# Bước 6: Mở cổng (port) mà ứng dụng của bạn chạy
EXPOSE 3000

# Bước 7: Lệnh để khởi chạy ứng dụng
CMD [ "node", "index.js" ]