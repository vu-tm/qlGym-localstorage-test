console.log('Trước khi đăng xuất - users:', JSON.parse(localStorage.getItem('users')));
// Gọi hàm đăng xuất
console.log('Sau khi đăng xuất - users:', JSON.parse(localStorage.getItem('users')));

// init_user.js
document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra xem đã khởi tạo tài khoản mặc định chưa
    const isInitialized = localStorage.getItem('usersInitialized');
    if (isInitialized) return;

    // Tạo danh sách người dùng mặc định
    const defaultUsers = [
        {
            employee: 'admin',
            username: 'admin',
            password: '123',
            role: 'Quản lý',
            approvalStatus: 'Đã phê duyệt',
            locked: false,
            createdAt: new Date().toLocaleDateString('vi-VN')
        },
        {
            employee: 'sell',
            username: 'sell',
            password: '123',
            role: 'Nhân viên bán hàng',
            approvalStatus: 'Đã phê duyệt',
            locked: false,
            createdAt: new Date().toLocaleDateString('vi-VN')
        },
        {
            employee: 'kho',
            username: 'kho',
            password: '123',
            role: 'Nhân viên kho',
            approvalStatus: 'Đã phê duyệt',
            locked: false,
            createdAt: new Date().toLocaleDateString('vi-VN')
        }
    ];

    // Lấy danh sách người dùng hiện có từ localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Thêm các tài khoản mặc định nếu chưa tồn tại
    defaultUsers.forEach(defaultUser => {
        const userExists = existingUsers.some(user => user.username === defaultUser.username);
        if (!userExists) {
            existingUsers.push(defaultUser);
        }
    });

    // Lưu vào localStorage
    localStorage.setItem('users', JSON.stringify(existingUsers));
    localStorage.setItem('usersInitialized', 'true');
});
