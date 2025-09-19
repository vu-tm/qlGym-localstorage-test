document.addEventListener("DOMContentLoaded", () => {
    loadEmployees(); // Gọi hàm tải dữ liệu
    filterAndRenderTable(); // Render bảng
});
$(function () {
    // Khởi tạo Daterangepicker với giá trị mặc định hợp lệ
    const savedDateRange = localStorage.getItem('dateRangeFilter');
    let startDateDefault = moment();
    let endDateDefault = moment();

    if (savedDateRange) {
        const dates = savedDateRange.split(' - ');
        if (dates.length === 2) {
            const start = moment(dates[0], 'DD/MM/YYYY', true);
            const end = moment(dates[1], 'DD/MM/YYYY', true);
            if (start.isValid() && end.isValid()) {
                startDateDefault = start;
                endDateDefault = end;
            } else {
                console.warn('Giá trị dateRangeFilter không hợp lệ:', savedDateRange);
                localStorage.removeItem('dateRangeFilter');
            }
        } else {
            console.warn('Định dạng dateRangeFilter không đúng:', savedDateRange);
            localStorage.removeItem('dateRangeFilter');
        }
    }

    $('#dateRange').daterangepicker({
        autoUpdateInput: true,
        locale: {
            format: 'DD/MM/YYYY',
            applyLabel: 'Xác nhận',
            cancelLabel: 'Hủy',
            daysOfWeek: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            firstDay: 1
        },
        opens: 'left',
        showDropdowns: true,
        autoApply: false
    }).on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
        setTimeout(() => {
            applyFilters();
        }, 100);
    }).on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
        applyFilters();
    });
});

sessionStorage.setItem("visitedReport", "true");

document.addEventListener('DOMContentLoaded', () => {
    const createShiftBtn = document.getElementById('createShiftBtn');
    const closeShiftModal = document.getElementById('closeShiftModal');
    const cancelShiftModal = document.getElementById('cancelShiftModal');
    const shiftTableBody = document.querySelector('.shift-table-body');
    const paginationContainer = document.querySelector('.pagination');
    const scheduleNameFilter = document.getElementById('scheduleName');
    const employeeNameFilter = document.getElementById('employeeName');
    const dateRangeInput = document.getElementById('dateRange');
    const recordsSelect = document.getElementById('records');

    let shifts = JSON.parse(localStorage.getItem('shifts')) || [];
    let editIndex = null;
    let currentPage = 1;
    let itemsPerPage = parseInt(recordsSelect.value) || 10;
    let isModalOpen = false;

    // Chuẩn hóa định dạng ngày
    shifts = shifts.map(shift => {
        if (shift.startDate) {
            const startDate = moment(shift.startDate, ['DD/MM/YYYY', 'YYYY-MM-DD'], true);
            if (startDate.isValid()) {
                shift.startDate = startDate.format('DD/MM/YYYY');
            } else {
                console.warn('Ngày bắt đầu không hợp lệ, đặt trống:', shift.startDate);
                shift.startDate = '';
            }
        }
        if (shift.endDate) {
            const endDate = moment(shift.endDate, ['DD/MM/YYYY', 'YYYY-MM-DD'], true);
            if (endDate.isValid()) {
                shift.endDate = endDate.format('DD/MM/YYYY');
            } else {
                console.warn('Ngày kết thúc không hợp lệ, đặt trống:', shift.endDate);
                shift.endDate = '';
            }
        }
        return shift;
    });
    localStorage.setItem('shifts', JSON.stringify(shifts));

    function displayShifts(filteredShifts = shifts) {
        shiftTableBody.innerHTML = '';
    
        const employeesData = JSON.parse(localStorage.getItem('employees')) || [];
        const employees = employeesData.length > 0
            ? (Array.isArray(employeesData[0]) ? employeesData[0] : employeesData)
            : [];
    
        // ⚠️ Chỉ hiển thị shift của nhân viên hợp lệ
        filteredShifts = filteredShifts.filter(shift =>
            employees.some(emp => emp.code === shift.employeeCode)
        );
    
        const totalPages = Math.ceil(filteredShifts.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedShifts = filteredShifts.slice(startIndex, startIndex + itemsPerPage);
    
        if (paginatedShifts.length === 0) {
            shiftTableBody.innerHTML = '<tr><td colspan="7" class="no-data">Không tìm thấy bản ghi nào</td></tr>';
            renderPagination(totalPages, filteredShifts);
            return;
        }
    
        paginatedShifts.forEach((shift, index) => {
            const employee = employees.find(emp => emp.code === shift.employeeCode);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <button class="action-btn edit" data-index="${startIndex + index}"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" data-index="${startIndex + index}"><i class="fas fa-trash"></i></button>
                </td>
                <td>${employee ? employee.name : ''}</td>
                <td>${employee ? employee.phone : ''}</td>
                <td>${shift.scheduleName}</td>
                <td>${shift.startDate}</td>
                <td>${shift.endDate}</td>
                <td>${shift.cycle}</td>
            `;
            shiftTableBody.appendChild(row);
        });
    
        // Gắn sự kiện nút
        document.querySelectorAll('.action-btn.edit').forEach(btn => btn.addEventListener('click', handleEdit));
        document.querySelectorAll('.action-btn.delete').forEach(btn => btn.addEventListener('click', handleDelete));
    
        renderPagination(totalPages, filteredShifts);
    }
    

    function renderPagination(totalPages, filteredShifts) {
        paginationContainer.innerHTML = '';
        if (totalPages <= 0) return;

        const firstButton = document.createElement('button');
        firstButton.textContent = 'Trang đầu';
        firstButton.disabled = currentPage === 1;
        firstButton.addEventListener('click', () => {
            if (currentPage !== 1) {
                currentPage = 1;
                displayShifts(filteredShifts);
            }
        });
        paginationContainer.appendChild(firstButton);

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Trang trước';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayShifts(filteredShifts);
            }
        });
        paginationContainer.appendChild(prevButton);

        const pageInfo = document.createElement('span');
        pageInfo.classList.add('page-info');
        pageInfo.textContent = `Trang ${currentPage}/${totalPages}`;
        paginationContainer.appendChild(pageInfo);

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Trang sau';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayShifts(filteredShifts);
            }
        });
        paginationContainer.appendChild(nextButton);

        const lastButton = document.createElement('button');
        lastButton.textContent = 'Trang cuối';
        lastButton.disabled = currentPage === totalPages;
        lastButton.addEventListener('click', () => {
            if (currentPage !== totalPages) {
                currentPage = totalPages;
                displayShifts(filteredShifts);
            }
        });
        paginationContainer.appendChild(lastButton);
    }

    function applyFilters() {
        // Tải lại shifts từ localStorage để đảm bảo dữ liệu mới nhất
        shifts = JSON.parse(localStorage.getItem('shifts')) || [];
        console.log('Shifts sau khi tải lại:', shifts);
        let filteredShifts = [...shifts];
        const dateRange = $('#dateRange').val();

        // Lọc theo ngày
        if (dateRange) {
            const dates = dateRange.split(' - ');
            if (dates.length === 2) {
                const startDate = moment(dates[0].trim(), 'DD/MM/YYYY', true);
                const endDate = moment(dates[1].trim(), 'DD/MM/YYYY', true);
                if (startDate.isValid() && endDate.isValid()) {
                    filteredShifts = filteredShifts.filter(shift => {
                        try {
                            // Cho phép hiển thị shift không có startDate hoặc endDate
                            if (!shift.startDate) return true; // Hiển thị nếu không có ngày bắt đầu
                            const shiftStart = moment(shift.startDate, 'DD/MM/YYYY', true);
                            const shiftEnd = shift.endDate ?
                                moment(shift.endDate, 'DD/MM/YYYY', true) :
                                moment().endOf('day'); // Dùng ngày hiện tại nếu không có endDate
                            return shiftStart.isValid() &&
                                (shiftStart.isSameOrBefore(endDate, 'day')) &&
                                (!shift.endDate || shiftEnd.isSameOrAfter(startDate, 'day'));
                        } catch (e) {
                            console.error('Lỗi xử lý ngày:', shift, e);
                            return true; // Giữ shift nếu có lỗi
                        }
                    });
                }
            }
        }

        // Lọc theo tên lịch
        const scheduleName = $('#scheduleName').val().trim().toLowerCase();
        if (scheduleName) {
            filteredShifts = filteredShifts.filter(shift =>
                (shift.scheduleName || '').toLowerCase().includes(scheduleName)
            );
        }

        // Lọc theo tên nhân viên
        const employeeName = $('#employeeName').val().trim().toLowerCase();
        if (employeeName) {
            filteredShifts = filteredShifts.filter(shift =>
                (shift.employee || '').toLowerCase().includes(employeeName) ||
                (shift.employeeCode || '').toLowerCase().includes(employeeName)
            );
        }

        // Không reset currentPage khi thay đổi số bản ghi để giữ trang hiện tại
        // Chỉ reset nếu filteredShifts rỗng hoặc không đủ dữ liệu cho trang hiện tại
        const totalPages = Math.ceil(filteredShifts.length / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        } else if (totalPages === 0) {
            currentPage = 1;
        }

        console.log('Filtered shifts:', filteredShifts);
        displayShifts(filteredShifts);
    }

    function openModal() {
        const modal = document.getElementById('shiftCreationModal');
        if (!modal) {
            console.error('Modal không tồn tại!');
            return;
        }

        modal.classList.add('active');
        modal.style.display = 'flex';
        isModalOpen = true;

        // Lấy dữ liệu nhân viên từ localStorage (xử lý mảng 2 chiều)
        const employeesData = JSON.parse(localStorage.getItem('employees')) || [];
        const employees = employeesData.length > 0
            ? (Array.isArray(employeesData[0]) ? employeesData[0] : employeesData)
            : [];


        const selectEmployee = document.getElementById('selectEmployee');
        if (selectEmployee) {
            selectEmployee.innerHTML = '<option value="">Chọn nhân viên</option>';

            // Chỉ hiển thị nhân viên đang làm việc (status = "Đang làm")
            employees
                .filter(emp => emp.status === "Đang làm")
                .forEach(employee => {
                    const option = document.createElement('option');
                    option.value = employee.code;
                    option.textContent = `${employee.code} - ${employee.name}`;
                    selectEmployee.appendChild(option);
                });
        }

        // Khởi tạo datepicker
        $('#startDateInput').daterangepicker({
            singleDatePicker: true,
            autoUpdateInput: true,
            locale: {
                format: 'DD/MM/YYYY',
                applyLabel: 'Xác nhận',
                cancelLabel: 'Hủy',
                daysOfWeek: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                firstDay: 1
            },
            parentEl: '#shiftCreationModal'
        });

        $('#endDateInput').daterangepicker({
            singleDatePicker: true,
            autoUpdateInput: true,
            locale: {
                format: 'DD/MM/YYYY',
                applyLabel: 'Xác nhận',
                cancelLabel: 'Hủy',
                daysOfWeek: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                firstDay: 1
            },
            parentEl: '#shiftCreationModal'
        });

        // Reset sự kiện click cho nút Lưu
        const saveShiftDataBtn = document.getElementById('saveShiftDataBtn');
        if (saveShiftDataBtn) {
            saveShiftDataBtn.removeEventListener('click', handleSaveShift);
            saveShiftDataBtn.addEventListener('click', handleSaveShift);
        }
    }

    function handleSaveShift(e) {
        e.stopPropagation();
        const selectEmployee = document.getElementById('selectEmployee');
        const scheduleNameInput = document.getElementById('scheduleNameInput');
        const startDateInput = document.getElementById('startDateInput');
        const endDateInput = document.getElementById('endDateInput');
        const cycleInput = document.getElementById('cycleInput');

        // Validate dữ liệu
        if (!selectEmployee.value || !scheduleNameInput.value || !startDateInput.value || !cycleInput.value) {
            alert('Vui lòng điền đủ thông tin bắt buộc!');
            return;
        }

        // Lấy dữ liệu nhân viên từ localStorage (xử lý mảng 2 chiều)
        const employeesData = JSON.parse(localStorage.getItem('employees')) || [];
        const employees = employeesData.length > 0 ? employeesData[0] : [];
        const employee = employees.find(emp => emp.code === selectEmployee.value);

        if (!employee) {
            alert('Không tìm thấy thông tin nhân viên!');
            return;
        }

        // Chuẩn hóa ngày tháng
        const startDate = moment(startDateInput.value, 'DD/MM/YYYY', true);
        if (!startDate.isValid()) {
            alert('Ngày bắt đầu không hợp lệ!');
            return;
        }

        let endDate = null;
        if (endDateInput.value) {
            endDate = moment(endDateInput.value, 'DD/MM/YYYY', true);
            if (!endDate.isValid()) {
                alert('Ngày kết thúc không hợp lệ!');
                return;
            }

            // Kiểm tra ngày kết thúc phải sau ngày bắt đầu
            if (endDate.isBefore(startDate)) {
                alert('Ngày kết thúc phải sau ngày bắt đầu!');
                return;
            }
        }

        // Tạo dữ liệu ca làm việc mới
        const shiftData = {
            employeeCode: employee.code,
            employee: employee.name,
            phone: employee.phone,
            scheduleName: scheduleNameInput.value,
            startDate: startDate.format('DD/MM/YYYY'),
            endDate: endDate ? endDate.format('DD/MM/YYYY') : '',
            cycle: cycleInput.value
        };

        // Lấy dữ liệu shifts hiện tại
        let shifts = JSON.parse(localStorage.getItem('shifts')) || [];

        if (editIndex !== null) {
            // Cập nhật ca làm việc hiện có
            shifts[editIndex] = shiftData;
        } else {
            // Thêm ca làm việc mới
            shifts.push(shiftData);
            currentPage = Math.ceil(shifts.length / itemsPerPage);
        }

        // Lưu vào localStorage
        localStorage.setItem('shifts', JSON.stringify(shifts));

        // Cập nhật dữ liệu shifts trong nhân viên (nếu cần)
        const employeeIndex = employees.findIndex(emp => emp.code === employee.code);
        if (employeeIndex !== -1) {
            employees[employeeIndex].shifts = employees[employeeIndex].shifts || [];
            if (editIndex !== null) {
                // Cập nhật shift trong employee nếu đang chỉnh sửa
                const shiftIndex = employees[employeeIndex].shifts.findIndex(
                    s => s.scheduleName === shiftData.scheduleName &&
                        s.startDate === shiftData.startDate
                );
                if (shiftIndex !== -1) {
                    employees[employeeIndex].shifts[shiftIndex] = shiftData;
                }
            } else {
                // Thêm shift mới vào employee
                employees[employeeIndex].shifts.push(shiftData);
            }

            // Lưu lại employees với cấu trúc mảng 2 chiều
            localStorage.setItem('employees', JSON.stringify([employees]));
        }

        // Đóng modal và cập nhật giao diện
        applyFilters();
        closeModal(document.getElementById('shiftCreationModal'));
    }

    function closeModal(modal) {
        if (!modal) return;
        const startDatePicker = $('#startDateInput').data('daterangepicker');
        const endDatePicker = $('#endDateInput').data('daterangepicker');

        if (startDatePicker && startDatePicker.isShowing) startDatePicker.hide();
        if (endDatePicker && endDatePicker.isShowing) endDatePicker.hide();

        modal.classList.remove('active');
        modal.style.display = 'none';
        isModalOpen = false;
        resetModal();
    }

    function resetModal() {
        ['selectEmployee', 'scheduleNameInput', 'startDateInput', 'endDateInput', 'cycleInput'].forEach(id => {
            const input = document.getElementById(id);
            if (input) input.value = '';
        });
        editIndex = null;
    }

    function handleEdit(e) {
        editIndex = parseInt(e.currentTarget.getAttribute('data-index'));
        const shift = shifts[editIndex];

        document.querySelector('.modal-header span').textContent = 'Chỉnh sửa';
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        const employeeCode = employees.find(emp => emp.name === shift.employee)?.code || '';

        const selectEmployee = document.getElementById('selectEmployee');
        const scheduleNameInput = document.getElementById('scheduleNameInput');
        const startDateInput = document.getElementById('startDateInput');
        const endDateInput = document.getElementById('endDateInput');
        const cycleInput = document.getElementById('cycleInput');

        if (selectEmployee) {
            selectEmployee.innerHTML = '<option value="">Chọn nhân viên</option>';
            employees.forEach(employee => {
                const option = document.createElement('option');
                option.value = employee.code;
                option.textContent = employee.name;
                if (employee.code === employeeCode) option.selected = true;
                selectEmployee.appendChild(option);
            });
        }

        if (scheduleNameInput) scheduleNameInput.value = shift.scheduleName;
        if (startDateInput) startDateInput.value = shift.startDate;
        if (endDateInput) endDateInput.value = shift.endDate;
        if (cycleInput) cycleInput.value = shift.cycle;

        openModal();
    }

    function handleDelete(e) {
        const index = parseInt(e.currentTarget.getAttribute('data-index'));
        if (confirm('Bạn có chắc chắn muốn xóa ca làm việc này?')) {
            shifts.splice(index, 1);
            localStorage.setItem('shifts', JSON.stringify(shifts));
            applyFilters();
        }
    }

    scheduleNameFilter.addEventListener('input', () => {
        applyFilters();
    });

    employeeNameFilter.addEventListener('input', () => {
        applyFilters();
    });

    recordsSelect.addEventListener('change', () => {
        itemsPerPage = parseInt(recordsSelect.value);
        applyFilters();
    });

    const initCreateShiftBtn = () => {
        if (createShiftBtn) {
            createShiftBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                document.querySelector('.modal-header span').textContent = 'Tạo mới';
                openModal();
            }, { capture: true });
        }
    };

    initCreateShiftBtn();

    if (closeShiftModal) closeShiftModal.addEventListener('click', () => {
        closeModal(document.getElementById('shiftCreationModal'));
    });

    if (cancelShiftModal) cancelShiftModal.addEventListener('click', () => {
        closeModal(document.getElementById('shiftCreationModal'));
    });

    const modal = document.getElementById('shiftCreationModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal.querySelector('.modal-overlay')) {
                closeModal(modal);
            }
        });

        $(modal).on('click', '.daterangepicker', function (e) {
            e.stopPropagation();
        });

        modal.querySelector('.modal-box').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    applyFilters();
});
