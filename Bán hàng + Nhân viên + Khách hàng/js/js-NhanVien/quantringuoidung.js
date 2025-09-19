document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra và khởi tạo dữ liệu nhân viên nếu cần
    function initEmployees() {
        let existingEmployees = JSON.parse(localStorage.getItem('employees')) || [];

        // Fix cấu trúc dữ liệu nếu cần
        if (existingEmployees.length === 1 && typeof existingEmployees[0] === 'object') {
            // Chuyển đổi object thành mảng
            const employeesArray = [];
            for (const key in existingEmployees[0]) {
                if (!['shifts', 'Shifts'].includes(key) && typeof existingEmployees[0][key] === 'object') {
                    employeesArray.push(existingEmployees[0][key]);
                }
            }
            existingEmployees = employeesArray;
            localStorage.setItem('employees', JSON.stringify(existingEmployees));
        }

        if (existingEmployees.length === 0) {
            localStorage.setItem('employees', JSON.stringify([]));
        }
        return existingEmployees;
    }
    // Gọi hàm khởi tạo khi trang load
    const employees = initEmployees();

    // Elements for adding a new user
    const addUserBtn = document.querySelector('.btn-add');
    const addUserModal = document.getElementById('addUserModal');
    const closeAddUserModal = document.getElementById('closeAddUserModal');
    const cancelAddUserModal = document.getElementById('cancelAddUserModal');
    const createUserBtn = document.getElementById('createUserBtn');
    const userTableBody = document.querySelector('.user-table-body');
    const selectEmployee = document.getElementById('selectEmployee');

    // Elements for view user modal
    const viewUserModal = document.getElementById('viewUserModal');
    const closeViewUserModal = document.getElementById('closeViewUserModal');
    const cancelViewUserModal = document.getElementById('cancelViewUserModal');

    // Elements for "Xem tất cả"
    const viewAllBtn = document.querySelector('.btn-all');

    // Alert elements
    const successAlert = document.getElementById('successAlert');
    const errorAlert = document.getElementById('errorAlert');

    // Load users from localStorage
    let savedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Initial display of all users
    displayUsers(savedUsers);

    // Function to populate employees in the "Chọn nhân viên" dropdown
    function populateEmployees() {
        console.log('Đang populate employees...');
        selectEmployee.innerHTML = '<option value="">Chọn nhân viên</option>';

        const employees = initEmployees(); // Sử dụng hàm đã sửa
        console.log('Dữ liệu nhân viên sau khi xử lý:', employees);

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const employeeCodesWithAccount = users.map(u => u.employee);

        employees.forEach(employee => {
            if (employee && employee.code && !employeeCodesWithAccount.includes(employee.code)) {
                const option = document.createElement('option');
                option.value = employee.code;
                option.textContent = `${employee.name} (${employee.code})`;
                option.dataset.name = employee.name || '';
                option.dataset.email = employee.email || '';
                selectEmployee.appendChild(option);
            }
        });

        console.log('Các option trong dropdown:',
            Array.from(selectEmployee.options).map(opt => ({
                value: opt.value,
                text: opt.text
            }))
        );
    }

    // Function to display users in the table
    function displayUsers(users) {
        userTableBody.innerHTML = '';
        if (users.length === 0) {
            userTableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; font-style: italic">Không có dữ liệu</td></tr>';
        } else {
            users.forEach((user, index) => {
                addUserToTable(user, index + 1);
            });
        }
    }

    // Function to add user to table
    function addUserToTable(user, index) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td class="action-cell">
                <button class="action-btn view"><i class="fas fa-eye"></i></button>
                <button class="action-btn delete"><i class="fas fa-trash-alt"></i></button>
            </td>
            <td>${index}</td>
            <td>${user.username}</td>
            <td>${user.role || ''}</td>
            <td><span class="badge-approved">${user.approvalStatus}</span></td>
            <td>
                <div class="lock-status ${user.locked ? 'locked' : 'unlocked'}">
                    <i class="fas ${user.locked ? 'fa-lock' : 'fa-lock-open'}"></i>
                    <span>${user.locked ? 'Khóa' : 'Mở'}</span>
                </div>
            </td>
            <td>${user.createdAt}</td>
        `;
        userTableBody.appendChild(newRow);

        // Add event listener for view button
        newRow.querySelector('.view').addEventListener('click', () => {
            showUserDetails(user);
        });

        // Add event listener for delete button
        newRow.querySelector('.delete').addEventListener('click', () => {
            deleteUser(user.username);
        });
    }

    // Function to show user details in modal
    function showUserDetails(user) {
        document.getElementById('viewEmployeeName').value = user.employee || '';
        document.getElementById('viewUsername').value = user.username || '';
        document.getElementById('viewRole').value = user.role || '';
        document.getElementById('viewApprovalStatus').value = user.approvalStatus || '';
        document.getElementById('viewLockStatus').value = user.locked ? 'Khóa' : 'Mở';
        document.getElementById('viewCreatedAt').value = user.createdAt || '';
        viewUserModal.style.display = 'flex';
    }

    // Function to delete user
    function deleteUser(username) {
        if (confirm(`Bạn có chắc muốn xóa tài khoản ${username}?`)) {
            savedUsers = savedUsers.filter(user => user.username !== username);
            localStorage.setItem('users', JSON.stringify(savedUsers));
            displayUsers(savedUsers);

            successAlert.textContent = 'Xóa tài khoản thành công!';
            successAlert.style.display = 'block';
            setTimeout(() => {
                successAlert.style.display = 'none';
                successAlert.textContent = 'Thêm thành công!';
            }, 1200);
        }
    }

    // Event listeners for role filtering
    document.querySelectorAll('.role-item').forEach(item => {
        item.addEventListener('click', () => {
            const roleName = item.querySelector('.role-name').textContent;

            // Highlight selected role
            document.querySelectorAll('.role-item').forEach(r => r.classList.remove('active'));
            item.classList.add('active');

            // Filter users by role
            if (roleName === 'Xem tất cả') {
                displayUsers(savedUsers);
            } else {
                const filteredUsers = savedUsers.filter(user => user.role === roleName);
                displayUsers(filteredUsers);
            }
        });
    });

    // Event listeners for adding a new user
    addUserBtn.addEventListener('click', () => {
        populateEmployees();
        addUserModal.style.display = 'flex';

        // Debug: Kiểm tra giá trị trong dropdown
        setTimeout(() => {
            console.log('Giá trị dropdown sau khi mở modal:',
                Array.from(selectEmployee.options).map(opt => opt.value));
        }, 100);
    });

    closeAddUserModal.addEventListener('click', () => {
        addUserModal.style.display = 'none';
    });

    cancelAddUserModal.addEventListener('click', () => {
        addUserModal.style.display = 'none';
    });

    addUserModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            addUserModal.style.display = 'none';
        }
    });

    // Trong phần tạo user mới (thay thế phần hiện tại)
    createUserBtn.addEventListener('click', () => {
        const employee = document.getElementById('selectEmployee').value;
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const role = document.getElementById('selectRole').value;

        if (!employee || !username || !password || !confirmPassword || !role) {
            errorAlert.textContent = 'Vui lòng điền đầy đủ các trường bắt buộc!';
            errorAlert.style.display = 'block';
            setTimeout(() => {
                errorAlert.style.display = 'none';
            }, 1200);
            return;
        }

        if (password !== confirmPassword) {
            errorAlert.textContent = 'Mật khẩu và nhập lại mật khẩu không khớp!';
            errorAlert.style.display = 'block';
            setTimeout(() => {
                errorAlert.style.display = 'none';
            }, 1200);
            return;
        }

        // Kiểm tra username đã tồn tại chưa
        const userExists = savedUsers.some(user => user.username === username);
        if (userExists) {
            errorAlert.textContent = 'Tên đăng nhập đã tồn tại!';
            errorAlert.style.display = 'block';
            setTimeout(() => {
                errorAlert.style.display = 'none';
            }, 1200);
            return;
        }

        const newUser = {
            employee: employee,
            username: username,
            password: password, 
            role: role,
            approvalStatus: 'Đã phê duyệt', // Đảm bảo trạng thái này
            locked: false, // Đảm bảo tài khoản không bị khóa
            createdAt: new Date().toLocaleDateString('vi-VN')
        };

        savedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(savedUsers));
        displayUsers(savedUsers);

        successAlert.style.display = 'block';
        setTimeout(() => {
            successAlert.style.display = 'none';
        }, 1200);

        // Reset form
        document.getElementById('selectEmployee').value = '';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirmPassword').value = '';
        document.getElementById('selectRole').value = '';
        addUserModal.style.display = 'none';
    });

    // Event listeners for view user modal
    closeViewUserModal.addEventListener('click', () => {
        viewUserModal.style.display = 'none';
    });

    cancelViewUserModal.addEventListener('click', () => {
        viewUserModal.style.display = 'none';
    });

    viewUserModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            viewUserModal.style.display = 'none';
        }
    });

    // Event listener for "Xem tất cả"
    viewAllBtn.addEventListener('click', () => {
        displayUsers(savedUsers);
        document.querySelectorAll('.role-item').forEach(item => item.classList.remove('active'));
        document.querySelector('.role-list').firstElementChild.classList.add('active');
    });
});
