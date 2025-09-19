// THÊM CÁC NHÂN VIÊN CÓ CA LÀM VÀO BẢNG
let allShifts = []; // Biến toàn cục để lưu tất cả ca làm

document.addEventListener('DOMContentLoaded', () => {
    const shiftTableBody = document.getElementById('shiftTableBody');
    const searchNameInput = document.getElementById('searchName');
    const searchScheduleInput = document.getElementById('searchSchedule');
    const searchDateInput = document.getElementById('dateRange');

    // Hàm tải và hiển thị dữ liệu
    function loadAndRenderShifts() {
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        allShifts = []; // Reset mảng allShifts
        
        employees.forEach(emp => {
            if (emp.Shifts && Array.isArray(emp.Shifts) && emp.Shifts.length > 0) {
                emp.Shifts.forEach(shift => {
                    allShifts.push({
                        code: emp.code,
                        name: emp.name,
                        scheduleName: shift.scheduleName,
                        startDate: shift.startDate,
                        endDate: shift.endDate,
                        cycle: shift.cycle
                    });
                });
            }
        });

        renderShiftTable(allShifts);
    }

    // Hàm hiển thị bảng
    function renderShiftTable(shifts) {
        shiftTableBody.innerHTML = '';

        if (shifts.length === 0) {
            shiftTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#888">Không có ca làm việc nào</td></tr>`;
            return;
        }

        shifts.forEach((shift, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <i class="fas fa-trash delete-shift-icon" data-index="${index}" style="color:red; cursor:pointer;" title="Xoá lịch làm"></i>
                </td>
                <td>${shift.code}</td>
                <td>${shift.name}</td>
                <td>${shift.scheduleName}</td>
                <td>${shift.startDate}</td>
                <td>${shift.endDate}</td>
                <td>${shift.cycle}</td>
            `;
            shiftTableBody.appendChild(row);
        });

        // Gắn sự kiện xoá
        document.querySelectorAll('.delete-shift-icon').forEach(icon => {
            icon.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                if (!isNaN(index)) {
                    deleteShiftAtIndex(index);
                }
            });
        });
    }

    // Hàm lọc theo tên, lịch, ngày
    function filterShifts() {
        const nameKeyword = searchNameInput.value.trim().toLowerCase();
        const scheduleKeyword = searchScheduleInput.value.trim().toLowerCase();
        const dateRange = searchDateInput.value.trim();

        let fromDate = null, toDate = null;
        if (dateRange.includes('đến')) {
            const [fromStr, toStr] = dateRange.split('đến').map(s => s.trim());
            fromDate = moment(fromStr, 'DD/MM/YYYY');
            toDate = moment(toStr, 'DD/MM/YYYY');
        }

        const filtered = allShifts.filter(shift => {
            const matchName = shift.name.toLowerCase().includes(nameKeyword);
            const matchSchedule = shift.scheduleName.toLowerCase().includes(scheduleKeyword);

            let matchDate = true;
            if (fromDate && toDate) {
                const shiftStart = moment(shift.startDate, 'DD/MM/YYYY');
                const shiftEnd = shift.endDate ? moment(shift.endDate, 'DD/MM/YYYY') : null;
                
                // Kiểm tra nếu ca làm việc nằm trong khoảng ngày chọn
                matchDate = shiftStart.isSameOrBefore(toDate) && 
                          (shiftEnd ? shiftEnd.isSameOrAfter(fromDate) : true);
            }

            return matchName && matchSchedule && matchDate;
        });

        renderShiftTable(filtered);
    }

    // Gắn sự kiện tìm kiếm
    searchNameInput.addEventListener('input', filterShifts);
    searchScheduleInput.addEventListener('input', filterShifts);

    // Khởi tạo lịch bằng daterangepicker
    $(function() {
        $('#dateRange').daterangepicker({
            autoUpdateInput: false,
            locale: {
                format: 'DD/MM/YYYY',
                cancelLabel: 'Xoá',
                applyLabel: 'Lọc'
            }
        });

        $('#dateRange').on('apply.daterangepicker', function(ev, picker) {
            const start = picker.startDate.format('DD/MM/YYYY');
            const end = picker.endDate.format('DD/MM/YYYY');
            $(this).val(`${start} đến ${end}`);
            filterShifts();
        });

        $('#dateRange').on('cancel.daterangepicker', function() {
            $(this).val('');
            filterShifts();
        });
    });

    // Tải dữ liệu ban đầu
    loadAndRenderShifts();
});






// MODAL THÊM CA LÀM VIỆC CỦA NHÂN VIÊN
// hiển thị modal
document.getElementById('createShiftBtn').addEventListener('click', () => {
    const modal = document.getElementById('shiftCreationModal');
    modal.style.display = 'flex';
    modal.classList.add('modal-open');

    // Tùy chọn: load danh sách nhân viên vào select box
    populateEmployeeSelect();
});



// đóng modal
function closeShiftModal() {
    const modal = document.getElementById('shiftCreationModal');
    modal.style.display = 'none';
    modal.classList.remove('modal-open');
}

document.getElementById('closeShiftModal').addEventListener('click', closeShiftModal);
document.getElementById('cancelShiftModal').addEventListener('click', closeShiftModal);



// modal 
function populateEmployeeSelect() {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const select = document.getElementById('selectEmployee');
    select.innerHTML = '';

    employees.forEach(emp => {
        const option = document.createElement('option');
        option.value = emp.code;
        option.textContent = `${emp.code} - ${emp.name}`;
        select.appendChild(option);
    });
}



// lưu thông tin ca làm vừa thêm
document.getElementById('saveShiftDataBtn').addEventListener('click', function () {
    const employeeCode = document.getElementById('selectEmployee').value;
    const scheduleName = document.getElementById('scheduleNameInput').value.trim();
    const startDate = document.getElementById('startDateInput').value.trim();
    const endDate = document.getElementById('endDateInput').value.trim();
    const cycle = document.getElementById('cycleInput').value;

    if (!employeeCode || !startDate || !cycle) {
        alert('Vui lòng nhập đầy đủ các trường bắt buộc!');
        return;
    }

    // Cập nhật vào employees[]
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const emp = employees.find(e => e.code === employeeCode);
    if (emp) {
        if (!emp.Shifts) emp.Shifts = [];
        emp.Shifts.push({ scheduleName, startDate, endDate, cycle });
        localStorage.setItem('employees', JSON.stringify(employees));
    }

    // Đóng modal
    closeShiftModal();

    localStorage.setItem('employees', JSON.stringify(employees));
    closeShiftModal();
    location.reload();
});







// ICON XOÁ CA LÀM VIỆC
function deleteShiftAtIndex(index) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    let count = 0;

    for (const emp of employees) {
        if (Array.isArray(emp.Shifts)) {
            for (let i = 0; i < emp.Shifts.length; i++) {
                if (count === index) {
                    emp.Shifts.splice(i, 1);
                    localStorage.setItem('employees', JSON.stringify(employees));
                    location.reload();
                    return;
                }
                count++;
            }
        }
    }
}
