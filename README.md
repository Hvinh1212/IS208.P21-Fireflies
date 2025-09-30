# Website Quản lý Tuyển Dụng

## Giới thiệu

Website Quản lý Tuyển Dụng là dự án nhằm hỗ trợ kết nối giữa nhà tuyển dụng và ứng viên, quản lý quy trình tuyển dụng hiện đại, minh bạch và hiệu quả.

## Tính năng chính

- Đăng tuyển và quản lý tin tuyển dụng cho nhà tuyển dụng
- Ứng viên tạo hồ sơ, nộp đơn ứng tuyển, upload CV/PDF
- Quản lý trạng thái ứng tuyển, xác thực hồ sơ
- Bộ lọc, tìm kiếm việc làm thông minh
- Quản lý thông tin ứng viên, nhà tuyển dụng
- Thống kê, báo cáo quá trình tuyển dụng

## Công nghệ sử dụng

- **Frontend:** Next.js, React, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express.js, MongoDB, AWS S3 (lưu trữ file)
- **Quản lý mã nguồn:** GitHub

## Cài đặt & chạy dự án

1. **Clone repository:**

   ```sh
   git clone <repo-url>
   cd <project-folder>
   ```

2. **Cài đặt các package:**

   ```sh
   cd Hiring_Website/backend
   npm install
   cd ../frontend/Joby
   npm install
   ```

3. **Cấu hình biến môi trường:**  
   Tạo file `.env` cho backend với thông tin kết nối MongoDB, AWS S3,...

4. **Khởi chạy server:**

   ```sh
   cd Hiring_Website/backend
   npm start
   ```

5. **Khởi chạy frontend:**

   ```sh
   cd Hiring_Website/frontend/Joby
   npm run dev
   ```

6. **Truy cập:**  
   Mở trình duyệt tại [http://localhost:3000](http://localhost:3000)
