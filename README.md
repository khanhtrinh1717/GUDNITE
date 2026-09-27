# GUDNITE

Website kết hợp trang chủ và trang sản phẩm từ thiết kế gốc, dùng chung giao diện sáng/tối. Các tệp thiết kế gốc vẫn được giữ trong thư mục con.

Chạy `npm start`, sau đó mở http://localhost:3000. Hoặc mở trực tiếp `index.html` (nên dùng server để lưu trạng thái nhất quán giữa các trang).

- Chuyển sáng/tối ở thanh điều hướng, ghi nhớ lựa chọn; lần đầu theo cài đặt hệ thống.
- Trang chủ, danh mục, chi tiết sản phẩm, FAQ, menu điện thoại và tìm kiếm bằng Enter.
- Chọn màu, số lượng, xem ảnh, giỏ hàng và yêu thích lưu trên trình duyệt.
- Sửa nội dung trực tiếp trong `index.html` và `product.html`: đây là hai bản chính của website. Lưu tệp rồi tải lại trình duyệt để xem thay đổi.
- Chỉnh tương tác và nội dung động trong `site.js`; giao diện trong `site.css`, `brand.css` và bảng màu trong `theme.css`.
- Website không cần bước build. `npm run build` chỉ hiển thị thông báo, không tạo lại hoặc ghi đè bất kỳ tệp nào.
- Thư mục thiết kế gốc cùng `localize.cjs` và `translations-vi.cjs` chỉ là tài liệu tham khảo của lần nhập thiết kế ban đầu, không được dùng để tạo lại website.
- `npm run check` kiểm tra cú pháp JavaScript.

Đây là frontend demo: chưa có backend, thanh toán, gửi newsletter, theo dõi đơn hoặc xác thực đánh giá. Ba mẫu đèn ngoài Monolith dùng lại bố cục và thông số minh họa của Monolith, cần bổ sung nội dung riêng trước khi bán hàng. Giá, đánh giá và chính sách trong thiết kế là nội dung mẫu. Font, Tailwind CDN và ảnh Google cần Internet.
