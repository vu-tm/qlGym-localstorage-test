// BC_buoidayPT.js
$(document).ready(function () {
    let currentPage = 1;
    let recordsPerPage = parseInt($('#records').val()) || 10;
    let searchText = '';
    let groupedData = [];

    // Hàm lấy danh sách HLV đang làm việc
    function getActiveTrainers() {
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        return employees.filter(emp => 
            (emp.position === 'Huấn luyện viên' || emp.position === 'PT') &&
            emp.status === 'Đang làm'
        );
    }

    let startDate = null;
    let endDate = null;

    // Hàm kiểm tra ca làm việc trong khoảng ngày
    function isShiftInDateRange(shiftStart, shiftEnd, filterStart, filterEnd) {
        const shiftStartMoment = moment(shiftStart, 'DD/MM/YYYY');
        const shiftEndMoment = moment(shiftEnd, 'DD/MM/YYYY');
        return shiftStartMoment.isSameOrBefore(filterEnd) && 
               shiftEndMoment.isSameOrAfter(filterStart);
    }

    // Chỉnh sửa hàm prepareGroupedData
    function prepareGroupedData() {
        const trainers = getActiveTrainers();
        const grouped = {};

        trainers.forEach(trainer => {
            if (trainer.Shifts && trainer.Shifts.length > 0) {
                let totalSessions = 0;
                const validShifts = [];

                // Lọc ca làm việc theo khoảng ngày
                trainer.Shifts.forEach(shift => {
                    if (startDate && endDate) {
                        const filterStart = moment(startDate, 'DD/MM/YYYY');
                        const filterEnd = moment(endDate, 'DD/MM/YYYY');
                        
                        if (isShiftInDateRange(shift.startDate, shift.endDate, filterStart, filterEnd)) {
                            validShifts.push(shift);
                            totalSessions += calculateShiftSessions(shift, filterStart, filterEnd);
                        }
                    } else {
                        validShifts.push(shift);
                        totalSessions += calculateShiftSessions(shift);
                    }
                });

                if (validShifts.length > 0) {
                    const schedules = validShifts.map(shift => 
                        `${shift.scheduleName} (${shift.startDate} - ${shift.endDate})`
                    ).join('<br>');

                    grouped[trainer.code] = {
                        code: trainer.code,
                        name: trainer.name,
                        schedules: schedules,
                        total: totalSessions
                    };
                }
            }
        });

        return Object.values(grouped);
    }

    // Chỉnh sửa hàm tính buổi học
    function calculateShiftSessions(shift, filterStart, filterEnd) {
        let start = moment(shift.startDate, 'DD/MM/YYYY');
        let end = moment(shift.endDate, 'DD/MM/YYYY');
        
        // Nếu có filter date thì adjust khoảng tính
        if (filterStart && filterEnd) {
            start = moment.max(start, filterStart);
            end = moment.min(end, filterEnd);
        }

        const diffDays = end.diff(start, 'days') + 1;
        
        switch(shift.cycle.toLowerCase()) {
            case 'hàng ngày': return diffDays;
            case 'theo tuần': return Math.ceil(diffDays / 7);
            case 'luân phiên': return Math.floor(diffDays / 2);
            default: return 0;
        }
    }

    // Khởi tạo datepicker
    function initDateRangePicker() {
        $('.sidebar-date').daterangepicker({
            autoUpdateInput: false,
            locale: {
                format: 'DD/MM/YYYY',
                cancelLabel: 'Xóa',
                applyLabel: 'Áp dụng',
                daysOfWeek: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
            }
        });

        // Xử lý sự kiện chọn ngày
        $('.sidebar-date').on('apply.daterangepicker', function(ev, picker) {
            startDate = picker.startDate.format('DD/MM/YYYY');
            endDate = picker.endDate.format('DD/MM/YYYY');
            $(this).val(startDate + ' - ' + endDate);
            currentPage = 1;
            renderTable();
        });

        // Xử lý xóa lọc
        $('.sidebar-date').on('cancel.daterangepicker', function() {
            startDate = null;
            endDate = null;
            $(this).val('');
            currentPage = 1;
            renderTable();
        });
    }

    // Gọi khởi tạo datepicker
    initDateRangePicker();

    // Hàm tính tổng số buổi cho 1 ca


    // Hàm hiển thị bảng
    function renderTable() {
        groupedData = prepareGroupedData();
        const $tbody = $('.report_table tbody');
        $tbody.empty();

        const filteredData = groupedData.filter(employee => 
            employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
            employee.schedules.toLowerCase().includes(searchText.toLowerCase())
        );

        const totalPages = Math.ceil(filteredData.length / recordsPerPage);
        currentPage = Math.min(currentPage, totalPages || 1);
        const startIdx = (currentPage - 1) * recordsPerPage;
        const paginatedData = filteredData.slice(startIdx, startIdx + recordsPerPage);

        if (paginatedData.length === 0) {
            $tbody.append('<tr><td colspan="3" class="no-data">Không tìm thấy bản ghi nào</td></tr>');
        } else {
            paginatedData.forEach(employee => {
                const row = `
                    <tr>
                        <td>${employee.name} (${employee.code})</td>
                        <td>${employee.schedules}</td>
                        <td>${employee.total}</td>
                    </tr>`;
                $tbody.append(row);
            });
        }

        $('#pageInfo').text(`Trang ${currentPage} / ${totalPages || 1}`);
        $('.section-body').last().text(`Tổng số: ${filteredData.length}`);
    }

    // Xử lý sự kiện xuất file
    $('.export_btn').on('click', function() {
        const filteredData = groupedData.filter(employee => 
            employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
            employee.schedules.toLowerCase().includes(searchText.toLowerCase())
        );

        let csvContent = "Mã HLV,Tên HLV,Lịch trình,Tổng buổi\n";
        
        filteredData.forEach(employee => {
            const row = [
                `"${employee.code}"`,
                `"${employee.name}"`,
                `"${employee.schedules.replace(/<br>/g, '; ')}"`,
                employee.total
            ].join(',');
            
            csvContent += row + '\n';
        });

        const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const timestamp = moment().format('YYYYMMDD_HHmmss');
        const fileName = `BaoCao_HLV_${timestamp}.csv`;

        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Các sự kiện khác
    $('.sidebar-input').on('input', function() {
        searchText = $(this).val();
        currentPage = 1;
        renderTable();
    });

    $('#records').on('change', function() {
        recordsPerPage = parseInt($(this).val());
        currentPage = 1;
        renderTable();
    });

    $('#prevPage').on('click', () => {
        if(currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    $('#nextPage').on('click', () => {
        const totalPages = Math.ceil(groupedData.length / recordsPerPage);
        if(currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });

    // Khởi tạo
    renderTable();
});