document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.section-body input[type="text"]');
    const statusRadios = document.querySelectorAll('input[name="status"]');
    const positionCheckboxes = document.querySelectorAll('.section-body input[type="checkbox"]');
    let currentPage = 1;
    let recordsPerPage = 10;
    let employees = JSON.parse(localStorage.getItem('employees')) || [];

    function formatCurrency(amount) {
        return parseInt(amount).toLocaleString('vi-VN') + ' VNĐ';
    }

    // Hàm tạo các icon hành động
    function createActionIcons(employeeCode) {
        return `
            <div class="action-icons">
                <i class="fa fa-eye" onclick="viewEmployee('${employeeCode}')"></i>
                <i class="fa fa-cog" onclick="editEmployee('${employeeCode}')"></i>
                <i class="fa fa-trash" onclick="deleteEmployee('${employeeCode}')"></i>
            </div>
        `;
    }


    // Hàm cập nhật phân trang
    function updatePagination(totalPages) {
        const pageInfo = document.getElementById('pageInfo');
        const prevButton = document.getElementById('prevPage');
        const nextButton = document.getElementById('nextPage');

        pageInfo.textContent = `Trang ${currentPage} / ${Math.max(1, totalPages)}`;
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages || totalPages === 0;
    }

    // Hàm hiển thị danh sách nhân viên với phân trang và bộ lọc
    function renderEmployeeTable() {
        const tbody = document.getElementById('roleList');
        const filteredEmployees = applyFilters(employees);

        const totalPages = Math.ceil(filteredEmployees.length / recordsPerPage);
        const startIndex = (currentPage - 1) * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;
        const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

        tbody.innerHTML = '';

        if (paginatedEmployees.length === 0) {
            tbody.innerHTML = `<tr><td colspan="11" class="no-data">Không tìm thấy bản ghi nào</td></tr>`;
        } else {
            paginatedEmployees.forEach(employee => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${createActionIcons(employee.code)}</td>
                <td>${employee.code}</td>
                <td>${employee.name}</td>
                <td>${employee.phone}</td>
                <td>${employee.email || 'N/A'}</td>
                <td>${employee.address}</td>
                <td>${employee.sex}</td>
                <td>
                    <span class="status-${employee.status === 'Đang làm' ? 'working' : 'resigned'}">
                        ${employee.status}
                    </span>
                </td>
                <td>${employee.contractType}</td>
                <td>${formatCurrency(employee.salary)}</td>
                <td>${employee.position}</td>
            `;
                tbody.appendChild(row);
            });
        }

        // Cập nhật phân trang
        updatePagination(totalPages);

        // Cập nhật tổng số nhân viên
        document.querySelector('.footer-note').textContent = `Tổng số nhân viên: ${filteredEmployees.length}`;
    }

    // Hàm cập nhật phân trang
    function updatePagination(totalPages) {
        const pageInfo = document.getElementById('pageInfo');
        const prevButton = document.getElementById('prevPage');
        const nextButton = document.getElementById('nextPage');

        pageInfo.textContent = `Trang ${currentPage} / ${Math.max(1, totalPages)}`;
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages || totalPages === 0;
    }

    // Xử lý thay đổi số bản ghi hiển thị
    document.getElementById('records').addEventListener('change', function (e) {
        recordsPerPage = parseInt(e.target.value);
        currentPage = 1; // Reset về trang đầu khi thay đổi số bản ghi
        renderEmployeeTable();
    });

    // Xử lý nút điều hướng
    document.getElementById('prevPage').addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            renderEmployeeTable();
        }
    });

    document.getElementById('nextPage').addEventListener('click', function () {
        const totalPages = Math.ceil(employees.length / recordsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderEmployeeTable();
        }
    });

    // Khởi tạo ban đầu
    // Mặc định tích hết checkbox chức danh khi trang load
    document.querySelectorAll('.section-body input[type="checkbox"]').forEach(cb => cb.checked = true);
    renderEmployeeTable();



    // TÌM KIẾM - BỘ LỌC
    function applyFilters(data) {
        const searchValue = searchInput.value.trim().toLowerCase();

        // Lọc theo ô tìm kiếm (tên, sđt, email)
        let filtered = data.filter(emp => {
            const keyword = `${emp.name} ${emp.phone} ${emp.email || ''}`.toLowerCase();
            return keyword.includes(searchValue);
        });

        // Lọc theo trạng thái (radio)
        const selectedStatus = document.querySelector('input[name="status"]:checked').value;
        if (selectedStatus !== 'Tất cả') {
            let statusText = selectedStatus === 'Đang làm việc' ? 'Đang làm' : 'Nghỉ việc';
            filtered = filtered.filter(emp => emp.status === statusText);
        }

        // Lọc theo chức danh
        const selectedPositions = Array.from(positionCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.nextSibling.textContent.trim());
        filtered = filtered.filter(emp => selectedPositions.includes(emp.position));


        return filtered;
    }

    // === Sự kiện khi lọc hoặc tìm kiếm thay đổi ===
    searchInput.addEventListener('input', () => {
        currentPage = 1;
        renderEmployeeTable();
    });
    statusRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            currentPage = 1;
            renderEmployeeTable();
        });
    });
    positionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            currentPage = 1;
            renderEmployeeTable();
        });
    });









    // ================= MODAL THÊM NHÂN VIÊN MỚI VÀO BẢNG

    // Sự kiện mở modal thêm nhân viên (CHỈ GIỮ LẠI 1 BẢN)
    document.getElementById('openAddEmployeeModal').addEventListener('click', function () {
        const modal = document.getElementById('addEmployeeModal');

        document.getElementById('empCode').value = '';

        // Reset trạng thái mặc định
        document.querySelector('[data-status="Đang làm"]').classList.add('active');
        document.querySelector('[data-status="Nghỉ việc"]').classList.remove('active');

        modal.classList.add('modal-open');
        modal.style.display = 'flex';
    });

    // Hàm đóng modal
    function closeModal() {
        const modal = document.getElementById('addEmployeeModal');
        modal.classList.remove('modal-open');
        modal.style.display = 'none';

        // Reset toàn bộ form
        const form = document.getElementById('addEmployeeModal');
        form.reset();
    }

    // Sự kiện đóng modal
    document.getElementById('closeAddEmployeeModal').addEventListener('click', closeModal);
    document.getElementById('cancelAddEmployeeModal').addEventListener('click', closeModal);

    function closeModal() {
        const modal = document.getElementById('addEmployeeModal');
        modal.classList.remove('modal-open');
        modal.style.display = 'none';
    }






    // Hoàn tất thêm nhân viên mới vào
    document.getElementById('saveEmployeeBtn').addEventListener('click', function () {
        // Lấy giá trị từ form
        const empCode = document.getElementById('empCode').value.trim();
        const empName = document.getElementById('empName').value.trim();
        const empDob = document.getElementById('empDob').value.trim();
        const empSex = document.getElementById('empSex').value;
        const empPhone = document.getElementById('empPhone').value.trim();
        const empAddress = document.getElementById('empAddress').value.trim();
        const empEmail = document.getElementById('empEmail').value.trim();
        const empStatus = document.querySelector('.status-btn.active')?.dataset.status || 'Đang làm';
        const empPosition = document.getElementById('empPosition').value;
        const empContractType = document.getElementById('empContractType').value;
        const empSalary = document.getElementById('empSalary').value.replace(/\D/g, '');


        if (!empCode || !empName || !empDob || !empSex || !empPhone || !empAddress || !empStatus || !empContractType || !empSalary) {
            alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
            return;
        }

        // Tạo object nhân viên
        const newEmployee = {
            code: empCode,
            name: empName,
            dob: empDob,
            sex: empSex,
            phone: empPhone,
            address: empAddress,
            email: empEmail || null,
            status: empStatus,
            position: empPosition,
            contractType: empContractType,
            salary: empSalary || '0',
            photo: '',
            Shifts: [] 
        };
        

        // Thêm vào localStorage
        employees.push(newEmployee); // Sử dụng biến toàn cục
        localStorage.setItem('employees', JSON.stringify(employees));


        // Cập nhật giao diện
        currentPage = 1;
        renderEmployeeTable();
        closeModal();

        // Reset form
        document.querySelectorAll('#addEmployeeModal input').forEach(input => input.value = '');
    });

    // =============== XỬ LÝ CHỌN TRẠNG THÁI ===============
    document.querySelectorAll('.status-btn').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('.status-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });









    // ================ CÁC ICON TRONG CỘT HÀNH ĐỘNG
    // xoá nhân viên khỏi bảng (icon thùng rác)
    let employeeCodeToDelete = null;

    window.deleteEmployee = function (employeeCode) {
        employeeCodeToDelete = employeeCode;
        const alertBox = document.getElementById('deleteConfirmAlert');
        alertBox.style.display = 'flex';
        alertBox.classList.add('modal-open');
    };

    document.getElementById('deleteCancelBtn').addEventListener('click', () => {
        const alertBox = document.getElementById('deleteConfirmAlert');
        alertBox.classList.remove('modal-open');
        alertBox.style.display = 'none';
        employeeCodeToDelete = null;
    });

    document.getElementById('deleteConfirmBtn').addEventListener('click', () => {
        if (!employeeCodeToDelete) return;

        employees = employees.filter(emp => emp.code !== employeeCodeToDelete);
        localStorage.setItem('employees', JSON.stringify(employees));

        renderEmployeeTable();

        const alertBox = document.getElementById('deleteConfirmAlert');
        alertBox.classList.remove('modal-open');
        alertBox.style.display = 'none';
        employeeCodeToDelete = null;
    });



    // xem quản lý ca làm việc nhân viên (icon bánh răng)
    window.editEmployee = function(employeeCode) {
        const shiftModal = document.getElementById('shiftModal');
        shiftModal.style.display = 'flex';
        shiftModal.classList.add('modal-open');
        
        // Lưu mã nhân viên vào sessionStorage để sử dụng khi thêm ca làm
        sessionStorage.setItem('editingEmployeeCode', employeeCode);
        
        renderShiftsForEmployee(employeeCode);
    };
    

    // Đóng modal khi click nút đóng hoặc hủy
    document.getElementById('shiftModalClose').addEventListener('click', closeShiftModal);
    document.getElementById('shiftModalCancel').addEventListener('click', closeShiftModal);
    
    function closeShiftModal() {
        const shiftModal = document.getElementById('shiftModal');
        shiftModal.classList.remove('modal-open');
        shiftModal.style.display = 'none';
    }
    
            // hiển thị lịch làm việc nhân viên trong modal quản lý ca làm 
            function renderShiftsForEmployee(employeeCode) {
                const employees = JSON.parse(localStorage.getItem('employees')) || [];
                const shiftBody = document.getElementById('shiftList');
                const shiftTotal = document.getElementById('shiftTotal');
                shiftBody.innerHTML = '';
            
                const employee = employees.find(emp => emp.code === employeeCode);
                if (!employee || !employee.Shifts) {
                    shiftBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#888">Không có ca làm việc nào</td></tr>`;
                    shiftTotal.textContent = '0';
                    return;
                }
            
                const shifts = employee.Shifts;
            
                if (shifts.length === 0) {
                    shiftBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#888">Không có ca làm việc nào</td></tr>`;
                    shiftTotal.textContent = '0';
                    return;
                }
            
                shifts.forEach((shift, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>
                            <i class="fa fa-trash shift-delete-icon" data-index="${index}" data-code="${employee.code}" style="cursor:pointer; color:red;" title="Xoá ca làm"></i>
                        </td>
                        <td>${employee.name}</td>
                        <td>${shift.scheduleName}</td>
                        <td>${shift.startDate}</td>
                        <td>${shift.endDate}</td>
                        <td>${shift.cycle}</td>
                    `;
                    shiftBody.appendChild(row);
                });
            
                // Gắn sự kiện xoá sau khi vẽ
                shiftBody.querySelectorAll('.shift-delete-icon').forEach(icon => {
                    icon.addEventListener('click', function () {
                        const index = parseInt(this.dataset.index);
                        const code = this.dataset.code;
                        const emp = employees.find(e => e.code === code);
                        if (emp && emp.Shifts && index >= 0) {
                            emp.Shifts.splice(index, 1);
                            localStorage.setItem('employees', JSON.stringify(employees));
                            renderShiftsForEmployee(code); // cập nhật lại bảng
                        }
                    });
                });
            
                shiftTotal.textContent = shifts.length;
            }
            
    


    // Xem chi tiết thông tin nhân viên (icon mắt):
    window.viewEmployee = function(employeeCode) {
        const employee = employees.find(emp => emp.code === employeeCode);
        if (!employee) return;
    
        // Hiển thị thông tin
        document.getElementById('infoEmpCode').textContent = employee.code;
        document.getElementById('infoEmpName').textContent = employee.name;
        document.getElementById('infoEmpDob').textContent = employee.dob;
        document.getElementById('infoEmpSex').textContent = employee.sex;
        document.getElementById('infoEmpPhone').textContent = employee.phone;
        document.getElementById('infoEmpAddress').textContent = employee.address;
        document.getElementById('infoEmpEmail').textContent = employee.email || '---';
        document.getElementById('infoEmpStatus').textContent = employee.status;
        document.getElementById('infoEmpContractType').textContent = employee.contractType;
        document.getElementById('infoEmpSalary').textContent = employee.salary;
        document.getElementById('infoEmpPosition').textContent = employee.position || '---';
    

        const photoElement = document.getElementById('employeePhoto');
        photoElement.innerHTML = ''; // reset
    
        if (employee.photoUrl) {
            const img = document.createElement('img');
            img.src = employee.photoUrl;
            img.alt = 'Ảnh nhân viên';
            img.classList.add('employee-avatar-img');
            photoElement.appendChild(img);
        } else {
            photoElement.innerHTML = '<i class="fa fa-user"></i>'; 
        }
    
        // Mở modal
        const modal = document.getElementById('employeeInfoModal');
        modal.style.display = 'flex';
        modal.classList.add('modal-open');
    };
    
    // Đóng modal
    document.getElementById('employeeInfoModalClose').addEventListener('click', closeEmployeeInfoModal);
    document.getElementById('employeeInfoModalCancel').addEventListener('click', closeEmployeeInfoModal);
    
    function closeEmployeeInfoModal() {
        const modal = document.getElementById('employeeInfoModal');
        modal.style.display = 'none';
        modal.classList.remove('modal-open');
    }
                // THÊM MỚI CA LÀM CỦA NHÂN VIÊN TRONG MODAL XEM LỊCH LÀM
                // Mở modal thêm ca làm khi bấm "Tạo mới"
                document.getElementById('addShiftBtn').addEventListener('click', () => {
                    const modal = document.getElementById('addShiftModal');
                    modal.style.display = 'flex';
                    modal.classList.add('modal-open');
                });

                // Đóng modal
                document.getElementById('addShiftModalClose').addEventListener('click', closeAddShiftModal);
                document.getElementById('cancelAddShiftModal').addEventListener('click', closeAddShiftModal);

                function closeAddShiftModal() {
                    const modal = document.getElementById('addShiftModal');
                    modal.classList.remove('modal-open');
                    modal.style.display = 'none';
                    
                    // Reset form
                    document.getElementById('shiftScheduleName').value = '';
                    document.getElementById('shiftStartDate').value = '';
                    document.getElementById('shiftEndDate').value = '';
                    document.getElementById('shiftCycle').value = 'Theo tuần';
                }

                // Lưu ca làm mới
                document.getElementById('saveShiftBtn').addEventListener('click', () => {
                    const employeeCode = sessionStorage.getItem('editingEmployeeCode');
                    
                    // Luôn lấy dữ liệu MỚI NHẤT từ localStorage
                    const employees = JSON.parse(localStorage.getItem('employees')) || [];
                    const employeeIndex = employees.findIndex(emp => emp.code === employeeCode);
                
                    if (employeeIndex === -1) {
                        alert('Không tìm thấy nhân viên!');
                        return;
                    }
                
                    const scheduleName = document.getElementById('shiftScheduleName').value.trim();
                    const startDate = document.getElementById('shiftStartDate').value.trim();
                    const endDate = document.getElementById('shiftEndDate').value.trim();
                    const cycle = document.getElementById('shiftCycle').value;
                
                    if (!scheduleName || !startDate || !endDate || !cycle) {
                        alert('Vui lòng nhập đầy đủ thông tin ca làm!');
                        return;
                    }
                
                    const newShift = { scheduleName, startDate, endDate, cycle };
                
                    // Thêm ca làm và cập nhật localStorage
                    employees[employeeIndex].Shifts = employees[employeeIndex].Shifts || [];
                    employees[employeeIndex].Shifts.push(newShift);
                    localStorage.setItem('employees', JSON.stringify(employees));
                
                    // Render lại BẢNG CA LÀM với dữ liệu mới
                    renderShiftsForEmployee(employeeCode);
                
                    // Đóng modal và reset form
                    closeAddShiftModal();
                });
            
});


