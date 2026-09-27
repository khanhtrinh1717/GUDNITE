# Deploy GUDNITE lên Vercel

Các tệp HTML/CSS/JS ở thư mục gốc vẫn là mã nguồn chỉnh sửa trực tiếp.
Lệnh node deploy-build.cjs chỉ chép các tệp công khai và ảnh sang dist/.
Không thay đổi build.cjs và không chạy lại bộ sinh thiết kế cũ.

## GitHub và tự động cập nhật
Kết nối repository với Vercel, Production Branch: main.
Framework: Other. Build: node deploy-build.cjs. Output: dist.
Các thông số này đã có trong vercel.json.
Sau đó commit và push main sẽ kích hoạt deployment mới.
Kiểm tra trạng thái Ready trên Vercel trước khi coi là đã xuất bản.

## Domain
Thêm tên miền bạn sở hữu trong Project Settings > Domains.
Sao chép chính xác bản ghi DNS do Vercel cung cấp vào nơi quản lý tên miền.
Không dùng IP mẫu hoặc CNAME tự đoán. Chọn một địa chỉ chính và chuyển hướng địa chỉ còn lại.
Chưa có tên miền vẫn dùng được địa chỉ vercel.app do Vercel cấp.

## Giới hạn hiện tại
Đây là giao diện tĩnh. Trang checkout chưa lưu đơn, chưa có backend đối soát chuyển khoản và chưa kết nối VNPay.
QR hiện là bản xem trước; không coi deployment thành công là hoàn tất hệ thống thanh toán.
Không đặt secret trong HTML, JavaScript công khai, assets hoặc Git.
