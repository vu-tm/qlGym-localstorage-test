// Kiểm tra đăng nhập
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
if (!isLoggedIn) {
    window.location.href = '../../html/login.html';
}

// Hàm sắp xếp dữ liệu
function sortData(data) {
    if (!currentSort || !currentSort.field) return data;

    return [...data].sort((a, b) => {
        let valueA = a[currentSort.field];
        let valueB = b[currentSort.field];

        // Xử lý trường hợp giá trị undefined/null
        if (valueA === undefined || valueA === null) valueA = '';
        if (valueB === undefined || valueB === null) valueB = '';

        // Xử lý đặc biệt cho trường hợp sắp xếp theo ngày tháng
        if (currentSort.field === 'time') {
            const dateA = new Date(valueA);
            const dateB = new Date(valueB);
            return currentSort.direction === 'asc' ? dateA - dateB : dateB - dateA;
        }

        // So sánh số
        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return currentSort.direction === 'asc' ? valueA - valueB : valueB - valueA;
        }

        // So sánh chuỗi
        valueA = String(valueA).toLowerCase();
        valueB = String(valueB).toLowerCase();

        if (valueA < valueB) {
            return currentSort.direction === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
            return currentSort.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });
}

// Hàm cập nhật biểu tượng sắp xếp
function updateSortIcons() {
    document.querySelectorAll('.sortable').forEach(header => {
        const upIcon = header.querySelector('.fa-arrow-up-wide-short');
        const downIcon = header.querySelector('.fa-arrow-down-wide-short');

        // Reset all icons first
        if (upIcon) {
            upIcon.style.display = 'inline-block';
            upIcon.style.color = '';
        }
        if (downIcon) {
            downIcon.style.display = 'none';
            downIcon.style.color = '';
        }

        // Highlight the current sorted column
        if (header.dataset.sort === currentSort.field) {
            if (currentSort.direction === 'asc') {
                if (upIcon) {
                    upIcon.style.color = '#1a5fb4';
                }
            } else {
                if (upIcon) upIcon.style.display = 'none';
                if (downIcon) {
                    downIcon.style.display = 'inline-block';
                    downIcon.style.color = '#1a5fb4';
                }
            }
        }
    });
}

// Hàm thiết lập sự kiện click cho header
function setupSortableHeaders() {
    // Remove any existing click listeners first to prevent duplicates
    document.querySelectorAll('.sortable').forEach(header => {
        header.replaceWith(header.cloneNode(true));
    });

    // Add new click listeners
    document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', () => {
            const sortField = header.dataset.sort;

            // Toggle direction if clicking the same column
            if (currentSort.field === sortField) {
                currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
            }
            // For new column, default to ascending
            else {
                currentSort.field = sortField;
                currentSort.direction = 'asc';
            }

            updateSortIcons();
            renderData();
        });
    });
}

// Hàm lấy giá trị radio button
function getRadioValue(name) {
    const checkedRadio = document.querySelector(`input[name="${name}"]:checked`);
    return checkedRadio ? checkedRadio.id : '';
}

// Hàm định dạng ngày tháng
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDateInput(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

// Khởi tạo input ngày (trong 1 tháng)
function initializeDateInputs() {
    const startDateInput = document.getElementById('time-start-user');
    const endDateInput = document.getElementById('time-end-user');

    if (!startDateInput || !endDateInput) return;

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    startDateInput.value = formatDate(startOfMonth);
    endDateInput.value = formatDate(today);
}

// Kiểm tra thời gian hợp lệ
function validateDateInputs() {
    const startDateInput = document.getElementById('time-start-user');
    const endDateInput = document.getElementById('time-end-user');

    if (startDateInput && endDateInput) {
        startDateInput.addEventListener('change', () => {
            if (new Date(startDateInput.value) > new Date(endDateInput.value)) {
                alert('Ngày bắt đầu không thể sau ngày kết thúc');
                startDateInput.value = endDateInput.value;
            }
        });

        endDateInput.addEventListener('change', () => {
            if (new Date(endDateInput.value) < new Date(startDateInput.value)) {
                alert('Ngày kết thúc không thể trước ngày bắt đầu');
                endDateInput.value = startDateInput.value;
            }

            // Don't allow future dates
            const today = new Date();
            today.setHours(23, 59, 59, 999);
            if (new Date(endDateInput.value) > today) {
                alert('Không thể chọn ngày trong tương lai');
                endDateInput.value = formatDate(today);
            }
        });
    }
}

function formatDateDisplay(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Hàm định dạng tiền tệ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// Hàm chuyển đổi từ chuỗi tiền tệ về số
function parseCurrency(currencyString) {
    return parseInt(currencyString.replace(/[^\d]/g, ''));
}

// Hàm lấy class trạng thái
function getStatusClass(status) {
    switch (status) {
        case 'Hoàn thành':
        case 'Đã nhập':
            return 'status-completed';
        case 'Phiếu tạm':
            return 'status-pending';
        case 'Đã hủy':
        case 'Hủy hàng':
            return 'status-cancelled';
        case 'Đang bán':
            return 'status-active';
        case 'Ngừng bán':
            return 'status-inactive';
        default:
            return '';
    }
}

// Hàm debounce để tối ưu hiệu suất
function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Toggle sidebar function
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.noi-dung_BH');

    if (sidebar && content) {
        sidebar.classList.toggle('closed');
        content.classList.toggle('expanded');
    }
}

// Hàm định dạng ngày cho export
function formatDateForExport(date) {
    const d = new Date(date);
    return [
        d.getDate().toString().padStart(2, '0'),
        (d.getMonth() + 1).toString().padStart(2, '0'),
        d.getFullYear()
    ].join('-');
}

// Hàm load thư viện XLSX
function loadXLSXLibrary() {
    return new Promise((resolve, reject) => {
        if (window.XLSX) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Không thể tải thư viện Excel'));
        document.head.appendChild(script);
    });
}

// Unified Export Function
async function exportToExcel() {
    try {
        // Load XLSX library if not already loaded
        await loadXLSXLibrary();

        const tableType = detectTableType();
        let fileName, data, colWidths, sheetName;

        if (tableType === 'BanHang') {
            // Export invoices data
            const filteredInvoices = filterInvoices();

            fileName = `Hoa_don_${formatDateForExport(new Date())}.xlsx`;
            sheetName = 'Hóa đơn';

            // Headers and data for invoices
            data = [
                ['Mã hóa đơn', 'Thời gian', 'Tên khách hàng', 'Nhân viên nhập', 'Tổng tiền hàng', 'Trạng thái', 'Loại hóa đơn', 'Phương thức thanh toán']
            ];

            filteredInvoices.forEach(invoice => {
                data.push([
                    invoice.id,
                    formatDateDisplay(invoice.time),
                    invoice.customerName,
                    invoice.employee,
                    invoice.totalAmount,
                    invoice.status,
                    invoice.type,
                    invoice.paymentMethod
                ]);
            });

            colWidths = [
                { wch: 10 }, { wch: 12 }, { wch: 20 },
                { wch: 15 }, { wch: 15 }, { wch: 12 },
                { wch: 15 }, { wch: 20 }
            ];

        } else if (tableType === 'ThongTinKhoHang') {
            // Export products data
            const filteredProducts = filterProducts();

            fileName = `Kho_hang_${formatDateForExport(new Date())}.xlsx`;
            sheetName = 'Kho hàng';

            // Headers and data for products
            data = [
                ['Mã hàng', 'Tên hàng', 'Giá bán', 'Giá nhập', 'Tồn kho', 'Trạng thái']
            ];

            filteredProducts.forEach(product => {
                data.push([
                    product.id,
                    product.name,
                    product.sellPrice,
                    product.buyPrice,
                    product.stock,
                    product.status
                ]);
            });

            colWidths = [
                { wch: 10 }, { wch: 25 }, { wch: 12 },
                { wch: 12 }, { wch: 10 }, { wch: 12 }
            ];

        } else if (tableType === 'NhapHang') {
            // Export imports data
            const filteredImports = filterImports();

            fileName = `Phieu_nhap_${formatDateForExport(new Date())}.xlsx`;
            sheetName = 'Nhập hàng';

            // Headers and data for imports
            data = [
                ['Mã phiếu nhập', 'Thời gian', 'Nhà cung cấp', 'Tổng tiền hàng', 'Trạng thái']
            ];

            filteredImports.forEach(importItem => {
                data.push([
                    importItem.id,
                    formatDateDisplay(importItem.time),
                    importItem.supplierName,
                    formatCurrency(importItem.totalAmount),
                    importItem.status
                ]);
            });

            colWidths = [
                { wch: 12 }, { wch: 12 }, { wch: 20 },
                { wch: 15 }, { wch: 15 }, { wch: 15 },
                { wch: 12 }
            ];
        } else {
            throw new Error('Không xác định được loại dữ liệu cần xuất');
        }

        // Create workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(data);

        // Apply column widths
        worksheet['!cols'] = colWidths;

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

        // Generate and download Excel file
        XLSX.writeFile(workbook, fileName);

    } catch (error) {
        console.error('Lỗi khi xuất file Excel:', error);
        alert('Có lỗi xảy ra khi xuất file: ' + error.message);
    }
}

// Hàm kiểm tra loại bảng
function detectTableType() {
    const tableContainer = document.querySelector('.table-container_BH');
    if (tableContainer) {
        return 'BanHang';
    }

    const tableContainerTTKH = document.querySelector('.table-container_TTKH');
    if (tableContainerTTKH) {
        return 'ThongTinKhoHang';
    }

    const tableContainerNH = document.querySelector('.table-container_NH');
    if (tableContainerNH) {
        return 'NhapHang';
    }

    const tableContainerVT = document.querySelector('.table-container_VT');
    if (tableContainerVT) {
        return 'VeTap';
    }

    const tableContainerNCC = document.querySelector('.table-container_NCC');
    if (tableContainerNCC) return 'NCC';

    return 'unknown';
}

// Hàm để lấy số lượng dữ liệu đã lọc
function getFilteredDataCount() {
    const tableType = detectTableType();
    if (tableType === 'BanHang') return filterInvoices().length;
    if (tableType === 'ThongTinKhoHang') return filterProducts().length;
    if (tableType === 'NhapHang') return filterImports().length;
    if (tableType === 'VeTap') return filterPackages().length;
    if (tableType === 'NCC') return getAllNCC().length;
    return 0;
}

// Bảng thống kê
function updateDashboardSummary() {
    const invoices = getAllInvoices();

    const summaryContainer = document.querySelector('.dashboard-summary');
    if (!summaryContainer) return; // Nếu không tìm thấy dashboard-summary, thoát

    // Tính toán dữ liệu
    const totalInvoices = invoices.length;
    const completedInvoices = invoices.filter(inv => inv.status === 'Hoàn thành').length;
    const pendingInvoices = invoices.filter(inv => inv.status === 'Phiếu tạm').length;
    const totalRevenue = invoices
        .filter(inv => inv.status === 'Hoàn thành')
        .reduce((sum, inv) => sum + inv.totalAmount, 0);

    // Cập nhập lại bảng thống kê
    const totalInvoicesElement = summaryContainer.querySelector('#total-invoices');
    const completedInvoicesElement = summaryContainer.querySelector('#completed-invoices');
    const pendingInvoicesElement = summaryContainer.querySelector('#pending-invoices');
    const totalRevenueElement = summaryContainer.querySelector('#total-revenue');

    if (totalInvoicesElement) totalInvoicesElement.textContent = totalInvoices;
    if (completedInvoicesElement) completedInvoicesElement.textContent = completedInvoices;
    if (pendingInvoicesElement) pendingInvoicesElement.textContent = pendingInvoices;
    if (totalRevenueElement) totalRevenueElement.textContent = formatCurrency(totalRevenue);
}

// Hàm render theo loại bảng
function renderTable(type, data) {
    const tableBody = document.querySelector('.table-item tbody');

    if (!tableBody) {
        console.error('Table body element not found!');
        return;
    }

    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr class="no-data-row">
                <td colspan="8">Không tìm thấy bản ghi nào</td>
            </tr>
        `;
        return;
    }

    let tableRows = '';

    if (type === 'BanHang') {
        // Render bảng BanHang
        data.forEach(invoice => {
            tableRows += `
                <tr>
                    <td>
                        <button class="action-btn view-btn" data-id="${invoice.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit-btn" data-id="${invoice.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                    <td>${invoice.id}</td>
                    <td>${formatDateDisplay(invoice.time)}</td>
                    <td>${invoice.customerName}</td>
                    <td>${getEmployeeName(invoice.employee) || 'Chưa xác định'}</td>
                    <td>${formatCurrency(invoice.totalAmount)}</td>
                    <td>
                        <span class="status-badge ${getStatusClass(invoice.status)}">${invoice.status}</span>
                    </td>
                </tr>
            `;
        });

        // Gắn sự kiện sau khi render
        tableBody.innerHTML = tableRows;

        const viewButtons = document.querySelectorAll('.view-btn');
        const editButtons = document.querySelectorAll('.edit-btn');

        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => viewInvoice(btn.getAttribute('data-id')));
        });

        editButtons.forEach(btn => {
            btn.addEventListener('click', () => editInvoice(btn.getAttribute('data-id')));
        });

    } else if (type === 'ThongTinKhoHang') {
        // Render bảng ThongTinKhoHang
        data.forEach(product => {
            tableRows += `
                <tr>
                    <td>
                        <button class="action-btn view-btn" data-id="${product.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit-btn" data-id="${product.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" data-id="${product.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                    <td>
                        <img src="${product.image}" alt="${product.name}" class="product-thumbnail">
                    </td>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${formatCurrency(product.sellPrice)}</td>
                    <td>${formatCurrency(product.buyPrice)}</td>
                    <td>${product.stock}</td>
                    <td>
                        <span class="status-badge ${product.status === 'Đang bán' ? 'status-active' : 'status-inactive'}">
                            ${product.status}
                        </span>
                    </td>
                </tr>
            `;
        });

        // Gắn sự kiện sau khi render
        tableBody.innerHTML = tableRows;

        const viewButtons = document.querySelectorAll('.view-btn');
        const editButtons = document.querySelectorAll('.edit-btn');
        const deleteButtons = document.querySelectorAll('.delete-btn');

        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => viewProduct(btn.getAttribute('data-id')));
        });

        editButtons.forEach(btn => {
            btn.addEventListener('click', () => editProduct(btn.getAttribute('data-id')));
        });

        deleteButtons.forEach(btn => {
            btn.addEventListener('click', () => deleteProduct(btn.getAttribute('data-id')));
        });
    } else if (type === 'NhapHang') {
        // Render bảng Nhập Hàng
        data.forEach(importItem => {
            tableRows += `
                <tr>
                    <td>
                        <button class="action-btn view-btn" data-id="${importItem.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit-btn" data-id="${importItem.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                    <td>${importItem.id}</td>
                    <td>${formatDateDisplay(importItem.time)}</td>
                    <td>${importItem.supplierName}</td>
                    <td>${formatCurrency(importItem.totalAmount)}</td>
                    <td>
                        <span class="status-badge ${getStatusClass(importItem.status)}">${importItem.status}</span>
                    </td>
                </tr>
            `;
        });

        // Gắn sự kiện sau khi render
        tableBody.innerHTML = tableRows;

        const viewButtons = document.querySelectorAll('.view-btn');
        const editButtons = document.querySelectorAll('.edit-btn');

        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => viewImport(btn.getAttribute('data-id')));
        });

        editButtons.forEach(btn => {
            btn.addEventListener('click', () => editImport(btn.getAttribute('data-id')));
        });
    } else if (type === 'VeTap') {
        // Render bảng VeTap
        data.forEach(pkg => {
            tableRows += `
                <tr>
                    <td>
                        <button class="action-btn view-btn" data-id="${pkg.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit-btn" data-id="${pkg.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                    <td>${pkg.id}</td>
                    <td>${pkg.name}</td>
                    <td>${pkg.duration}</td>
                    <td>${formatCurrency(pkg.price)}</td>
                </tr>
            `;
        });

        // Gắn sự kiện sau khi render
        tableBody.innerHTML = tableRows;

        const viewButtons = document.querySelectorAll('.view-btn');
        const editButtons = document.querySelectorAll('.edit-btn');

        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => viewPackage(btn.getAttribute('data-id')));
        });

        editButtons.forEach(btn => {
            btn.addEventListener('click', () => editPackage(btn.getAttribute('data-id')));
        });
    } else if (type == 'NCC') {
        data.forEach(supplier => {
            tableRows += `
                <tr>
                    <td class="td-ncc">
                        <button class="action-btn view-btn" data-id="${supplier.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit-btn" data-id="${supplier.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" data-id="${supplier.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                    <td class="td-ncc">${supplier.id}</td>
                    <td class="td-ncc">${supplier.name}</td>
                    <td class="td-ncc">${supplier.phone || '-'}</td>
                    <td class="td-ncc">${supplier.email || '-'}</td>
                    <td class="td-ncc">${supplier.address || '-'}</td>
                </tr>
            `;
        });

        tableBody.innerHTML = tableRows;

        // Gắn sự kiện cho các nút hành động
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => viewNCC(btn.getAttribute('data-id')));
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => editNCC(btn.getAttribute('data-id')));
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteNCC(btn.getAttribute('data-id')));
        });
    }
}

// Render bảng 
function renderData() {
    const tableType = detectTableType();
    let filteredData = [];

    if (tableType === 'BanHang') {
        filteredData = filterInvoices();
    } else if (tableType === 'ThongTinKhoHang') {
        filteredData = filterProducts();
        filteredData = sortData(filteredData);
    } else if (tableType === 'NhapHang') {
        filteredData = filterImports();
        filteredData = sortData(filteredData);
    } else if (tableType === 'VeTap') {
        filteredData = filterPackages();
    } else if (tableType === 'NCC') {
        filteredData = sortData(getAllNCC());
    } else {
        console.error('Unknown table type');
        return;
    }

    // Phân trang và render
    const recordsPerPage = parseInt(document.querySelector('.records-per-page')?.value || 10);
    const currentPage = window.currentPage || 1;
    const start = (currentPage - 1) * recordsPerPage;
    const paginatedData = filteredData.slice(start, start + recordsPerPage);

    renderTable(tableType, paginatedData);
    updatePagination(filteredData.length, recordsPerPage, currentPage);
}

// Phân trang
function setupPagination() {
    const recordsPerPageSelect = document.querySelector('.records-per-page');

    // Xác định container phân trang dựa vào loại trang
    let paginationContainer = document.querySelector('.pagination-container');
    const tableType = detectTableType();

    if (!paginationContainer) return;

    // Tạo phần số bản ghi bên trái
    const recordsContainer = document.createElement('div');
    recordsContainer.className = 'records-per-page-container';
    recordsContainer.innerHTML = `
        <h4>Số bản ghi:</h4>
        <select class="records-per-page">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
        </select>
    `;

    // Tạo điều khiển phân trang bên phải
    const paginationControls = document.createElement('div');
    paginationControls.className = 'pagination-controls';

    paginationControls.innerHTML = `
        <button class="pagination-btn prev-btn" disabled><i class="fas fa-chevron-left"></i></button>
        <span class="pagination-info"><span class="current-page">1</span> / <span class="total-pages">1</span></span>
        <button class="pagination-btn next-btn" disabled><i class="fas fa-chevron-right"></i></button>
    `;

    // Thêm cả hai vào container
    paginationContainer.appendChild(recordsContainer);
    paginationContainer.appendChild(paginationControls);

    // Khởi tạo biến phân trang
    window.currentPage = 1;
    let recordsPerPage = recordsPerPageSelect ? parseInt(recordsPerPageSelect.value) : 10;

    // Cập nhật phân trang khi số bản ghi mỗi trang thay đổi
    if (recordsPerPageSelect) {
        recordsPerPageSelect.addEventListener('change', () => {
            recordsPerPage = parseInt(recordsPerPageSelect.value);
            window.currentPage = 1;
            renderData();
        });
    }

    // Thêm sự kiện cho nút phân trang
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (window.currentPage > 1) {
                window.currentPage--;
                renderData();
            }
        });

        nextBtn.addEventListener('click', () => {
            const totalRecords = getFilteredDataCount();
            const totalPages = Math.ceil(totalRecords / recordsPerPage);
            if (window.currentPage < totalPages) {
                window.currentPage++;
                renderData();
            }
        });
    }

    // Gắn sự kiện cho các bộ lọc dựa vào loại trang
    setupFilters(tableType);
}

// Cập nhật điều khiển phân trang
function updatePagination(totalRecords, recordsPerPage, currentPage) {
    let totalPages;

    if (totalRecords === 0) {
        // Nếu không có dữ liệu, hiển thị "Trang 1/1"
        currentPage = 1;
        totalPages = 1;
    } else {
        // Nếu có dữ liệu, tính totalPages như bình thường, tối thiểu là 1
        totalPages = Math.max(1, Math.ceil(totalRecords / recordsPerPage));
        // Đảm bảo currentPage không vượt quá totalPages
        currentPage = Math.min(currentPage, totalPages);
    }

    const currentPageElement = document.querySelector('.current-page');
    const totalPagesElement = document.querySelector('.total-pages');

    if (currentPageElement && totalPagesElement) {
        currentPageElement.textContent = currentPage;
        totalPagesElement.textContent = totalPages;
    }

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) {
        prevBtn.disabled = currentPage <= 1 || totalRecords === 0;
    }

    if (nextBtn) {
        nextBtn.disabled = currentPage >= totalPages || totalRecords === 0;
    }
}

// Thiết lập các bộ lọc dựa vào loại trang
function setupFilters(tableType) {
    const handleFilterChange = () => {
        window.currentPage = 1;
        renderData();
    };

    if (tableType === 'BanHang') {
        // Bộ lọc cho BanHang (giữ nguyên)
        const selectors = [
            'input[placeholder="Theo mã Hóa đơn"]',
            'input[placeholder="Theo mã hàng, tên hàng"]',
            'input[placeholder="Theo tên khách, số điện thoại"]',
            '#time-start-user',
            '#time-end-user',
            '#status-filter',
            '#bill-filter',
            '#payment-filter'
        ];

        selectors.forEach(selector => {
            const el = document.querySelector(selector);
            if (el) {
                const event = selector.startsWith('input') ? 'input' : 'change';
                el.addEventListener(event, () => {
                    if (event === 'input') {
                        debounce(renderData, 300)();
                    } else {
                        renderData();
                    }
                });
            }
        });

    } else if (tableType === 'ThongTinKhoHang') {
        // Bộ lọc cho ThongTinKhoHang
        const selectors = [
            'input[placeholder="Theo mã hàng, tên hàng"]',
            'input[name="stock-filter"]',
            'input[name="status-filter"]'
        ];

        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                const event = selector.startsWith('input') ? 'change' : 'change';
                el.addEventListener(event, handleFilterChange);
            });
        });
    } else if (tableType === 'NhapHang') {
        // Bộ lọc cho Nhập Hàng
        const selectors = [
            'input[placeholder="Theo mã phiếu nhập"]',
            '#time-start-user',
            '#time-end-user',
            'input[name="status-filter"]'
        ];

        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                const event = selector.startsWith('input') ? 'input' : 'change';
                el.addEventListener(event, () => {
                    if (event === 'input') {
                        debounce(handleFilterChange, 300)();
                    } else {
                        handleFilterChange();
                    }
                });
            });
        });
    } else if (tableType === 'VeTap') {
        // Bộ lọc cho Vé tập
        const selectors = [
            'input[placeholder="Theo mã gói tập"]',
            'input[placeholder="Theo tên gói tập"]',
            '#duration-min',
            '#duration-max',
            '#price-min',
            '#price-max'
        ];

        selectors.forEach(selector => {
            const el = document.querySelector(selector);
            if (el) {
                const event = selector.startsWith('input') ? 'input' : 'change';
                el.addEventListener(event, () => {
                    if (event === 'input') {
                        debounce(handleFilterChange, 300)();
                    } else {
                        handleFilterChange();
                    }
                });
            }
        });
    }
}

function getAllEmployees() {
    // Nếu đã có biến toàn cục employees
    if (typeof employees !== 'undefined' && Array.isArray(employees)) {
        return employees;
    }

    // Nếu lưu trong localStorage
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
        try {
            window.employees = JSON.parse(storedEmployees);
            return window.employees;
        } catch (e) {
            console.error('Lỗi khi đọc dữ liệu nhân viên:', e);
        }
    }

    // Trường hợp không có dữ liệu
    console.error('Không tìm thấy dữ liệu nhân viên');
    return [];
}

function getEmployeeName(username) {
    const employees = getAllEmployees();
    if (!employees || employees.length === 0) return username;
    const employee = employees.find(emp => emp.username === username);
    return employee ? employee.name : username;
}

// Hàm lấy tất cả hóa đơn (BanHang.html)
function getAllInvoices() {
    // Nếu đã có biến toàn cục invoices
    if (typeof invoices !== 'undefined' && Array.isArray(invoices)) {
        return invoices;
    }

    // Nếu lưu trong localStorage
    const storedInvoices = localStorage.getItem('invoices');
    if (storedInvoices) {
        try {
            window.invoices = JSON.parse(storedInvoices);
            return window.invoices;
        } catch (e) {
            console.error('Lỗi khi đọc dữ liệu hóa đơn:', e);
        }
    }

    // Khởi tạo mảng rỗng nếu không có dữ liệu
    return [...invoices];
}

// Hàm lấy tất cả sản phẩm (thongtin-khohang.html)
function getAllProducts() {
    // Nếu bạn đã có một biến toàn cục lưu trữ sản phẩm
    if (typeof products !== 'undefined' && Array.isArray(products)) {
        return products;
    }

    // Nếu bạn lưu sản phẩm trong localStorage
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        try {
            return JSON.parse(storedProducts);
        } catch (e) {
            console.error('Lỗi khi đọc dữ liệu sản phẩm:', e);
        }
    }

    // Trả về mảng rỗng nếu không có dữ liệu
    return [...products];
}

// Hàm lấy tất cả phiếu nhập (nhaphang.html)
function getAllImports() {
    if (typeof imports !== 'undefined' && Array.isArray(imports)) {
        return imports;
    }

    const storedImports = localStorage.getItem('imports');
    if (storedImports) {
        try {
            return JSON.parse(storedImports);
        } catch (e) {
            console.error('Lỗi khi đọc dữ liệu nhập hàng:', e);
        }
    }

    return [...imports];
}

// Hàm lấy tất cả gói tập
function getAllPackages() {
    // Nếu đã có biến toàn cục packages
    if (typeof packages !== 'undefined' && Array.isArray(packages)) {
        return packages;
    }

    // Nếu lưu trong localStorage
    const storedPackages = localStorage.getItem('packages');
    if (storedPackages) {
        try {
            window.packages = JSON.parse(storedPackages);
            return window.packages;
        } catch (e) {
            console.error('Lỗi khi đọc dữ liệu gói tập:', e);
        }
    }

    // Khởi tạo mảng rỗng nếu không có dữ liệu
    window.packages = [];
    return window.packages;
}

// Hàm lấy tất cả nhà cung cấp
function getAllNCC() {
    // Nếu đã có biến toàn cục suppliers
    if (typeof suppliers !== 'undefined' && Array.isArray(suppliers)) {
        return suppliers;
    }

    // Nếu lưu trong localStorage
    const storedSuppliers = localStorage.getItem('suppliers');
    if (storedSuppliers) {
        try {
            window.suppliers = JSON.parse(storedSuppliers);
            return window.suppliers;
        } catch (e) {
            console.error('Lỗi khi đọc dữ liệu nhà cung cấp:', e);
        }
    }

    // Khởi tạo mảng rỗng nếu không có dữ liệu
    window.suppliers = [...suppliers];
    return window.suppliers;
}


// Bộ lọc của hóa đơn
function filterInvoices() {
    const invoices = getAllInvoices();

    const invoiceIdInput = document.querySelector('input[placeholder="Theo mã Hóa đơn"]');
    const productInput = document.querySelector('input[placeholder="Theo mã hàng, tên hàng"]');
    const customerInput = document.querySelector('input[placeholder="Theo tên khách"]');
    const startDateInput = document.getElementById('time-start-user');
    const endDateInput = document.getElementById('time-end-user');
    const statusSelect = document.getElementById('status-filter');
    const billSelect = document.getElementById('bill-filter');
    const paymentSelect = document.getElementById('payment-filter');

    // const variable = element?.property || defaultValue;
    const invoiceId = invoiceIdInput?.value.toLowerCase() || '';
    const product = productInput?.value.toLowerCase() || '';
    const customer = customerInput?.value.toLowerCase() || '';
    const startDate = startDateInput?.value || '';
    const endDate = endDateInput?.value || '';
    const status = statusSelect?.value || 'Tất cả';
    const type = billSelect?.value || 'Tất cả';
    const payment = paymentSelect?.value || 'Tất cả';

    return invoices.filter(arr => { //Mảng mới lọc từ danh sách invoices
        // Theo mã Hóa đơn //
        if (invoiceId && !arr.id.toLowerCase().includes(invoiceId)) {
            //Tránh rỗng && Kiểm tra xem có trùng id không
            return false;
        }

        // Theo mã hàng, tên hàng //
        if (product) {
            const hasMatchingProduct = arr.items.some(item =>
                item.name.toLowerCase().includes(product)
            );
            if (!hasMatchingProduct) {
                return false;
            }
        }

        // Theo tên khách
        if (customer &&
            !arr.customerName.toLowerCase().includes(customer)) {
            return false;
        }

        // Bộ lọc theo thời gian
        if (startDate && arr.time < startDate) {
            return false;
        }
        if (endDate && arr.time > endDate) {
            return false;
        }

        // Bộ lọc theo Trạng thái
        if (status !== 'Tất cả' && arr.status !== status) {
            return false;
        }

        // Bộ lọc theo Loại hóa đơn
        if (type !== 'Tất cả' && arr.type !== type) {
            return false;
        }

        // Bộ lọc theo Thanh toán
        if (payment !== 'Tất cả' && arr.paymentMethod !== payment) {
            return false;
        }

        return true;
    });
}

// Bộ lọc của sản phẫm
function filterProducts() {
    const allProducts = getAllProducts();

    // Lấy giá trị từ các input tìm kiếm
    const productInfoInput = document.querySelector('input[placeholder="Theo mã hàng, tên hàng"]');

    // Lấy giá trị từ radio buttons
    const stockFilter = getRadioValue('stock-filter');
    const statusFilter = getRadioValue('status-filter');

    // Xác định điều kiện lọc
    const productInfoFilter = productInfoInput?.value.trim().toLowerCase() || '';

    return allProducts.filter(product => {

        // Lọc theo mã/tên sản phẩm
        if (productInfoFilter &&
            !product.id.toLowerCase().includes(productInfoFilter) &&
            !product.name.toLowerCase().includes(productInfoFilter)) {
            return false;
        }

        // Lọc theo tồn kho
        if (stockFilter === 'stock-available' && product.stock <= 0) return false;
        if (stockFilter === 'stock-out' && product.stock > 0) return false;

        // Lọc theo trạng thái
        if (statusFilter === 'status-selling' && product.status !== 'Đang bán') return false;
        if (statusFilter === 'status-stopped' && product.status !== 'Ngừng bán') return false;

        return true;
    });
}

// Bộ lọc của phiếu nhập
function filterImports() {
    const allImports = getAllImports();

    // Lấy giá trị từ các input tìm kiếm
    const importIdInput = document.querySelector('input[placeholder="Theo mã phiếu nhập"]');
    const startDateInput = document.getElementById('time-start-user');
    const endDateInput = document.getElementById('time-end-user');

    // Lấy giá trị từ radio buttons
    const statusFilter = getRadioValue('status-filter');

    // Xác định điều kiện lọc
    const importIdFilter = importIdInput?.value.trim().toLowerCase() || '';
    const startDateFilter = startDateInput?.value || '';
    const endDateFilter = endDateInput?.value || '';

    return allImports.filter(importItem => {
        // Lọc theo mã phiếu nhập
        if (importIdFilter && !importItem.id.toLowerCase().includes(importIdFilter)) {
            return false;
        }

        // Lọc theo thời gian
        if (startDateFilter && importItem.time < startDateFilter) return false;
        if (endDateFilter && importItem.time > endDateFilter) return false;

        // Lọc theo trạng thái
        if (statusFilter === 'status-temp' && importItem.status !== 'Phiếu tạm') return false;
        if (statusFilter === 'status-completed' && importItem.status !== 'Đã nhập') return false;
        if (statusFilter === 'status-cancel' && importItem.status !== 'Hủy hàng') return false;

        return true;
    });
}

// Hàm bộ lọc cho gói tập
function filterPackages() {
    const allPackages = getAllPackages();

    // Lấy giá trị từ các input tìm kiếm
    const packageCodeInput = document.querySelector('input[placeholder="Theo mã gói tập"]');
    const packageNameInput = document.querySelector('input[placeholder="Theo tên gói tập"]');
    const durationMinInput = document.getElementById('duration-min');
    const durationMaxInput = document.getElementById('duration-max');
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');

    // Xác định điều kiện lọc
    const packageCodeFilter = packageCodeInput?.value.trim().toLowerCase() || '';
    const packageNameFilter = packageNameInput?.value.trim().toLowerCase() || '';
    const durationMin = durationMinInput?.value ? parseInt(durationMinInput.value) : null;
    const durationMax = durationMaxInput?.value ? parseInt(durationMaxInput.value) : null;
    const priceMin = priceMinInput?.value ? parseInt(priceMinInput.value) : null;
    const priceMax = priceMaxInput?.value ? parseInt(priceMaxInput.value) : null;

    return allPackages.filter(pkg => {
        // Lọc theo mã gói tập
        if (packageCodeFilter && !pkg.id.toLowerCase().includes(packageCodeFilter)) {
            return false;
        }

        // Lọc theo tên gói tập
        if (packageNameFilter && !pkg.name.toLowerCase().includes(packageNameFilter)) {
            return false;
        }

        // Lọc theo thời lượng
        if (durationMin !== null && pkg.duration < durationMin) return false;
        if (durationMax !== null && pkg.duration > durationMax) return false;

        // Lọc theo giá
        if (priceMin !== null && pkg.price < priceMin) return false;
        if (priceMax !== null && pkg.price > priceMax) return false;

        return true;
    });
}

// Hiển thị modal Chi Tiết Hóa Đơn
function viewInvoice(invoiceId) {
    const invoices = getAllInvoices();

    const arr = invoices.find(inv => inv.id === invoiceId);
    if (!arr) return;

    const modal = document.getElementById('invoice-detail-modal');

    // Điền dữ liệu vào modal
    modal.querySelector('#invoice-id').textContent = arr.id;
    modal.querySelector('#customer-name_BH').textContent = arr.customerName;
    modal.querySelector('#employ_BH').textContent = getEmployeeName(arr.employee) || 'Chưa xác định';
    modal.querySelector('#date_BH').textContent = formatDateDisplay(arr.time);
    modal.querySelector('#invoice-type_BH').textContent = arr.type;
    modal.querySelector('#payment-method_BH').textContent = arr.paymentMethod;
    modal.querySelector('#status_BH').textContent = arr.status;
    modal.querySelector('#status_BH').className = `status-badge ${getStatusClass(arr.status)}`;

    // Tạo bảng sản phẩm
    let itemsHTML = '';
    let totalItems = 0;
    arr.items.forEach(item => {
        itemsHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(item.price)}</td>
                <td>${formatCurrency(item.price * item.quantity)}</td>
            </tr>
        `;
        totalItems += item.quantity;
    });

    modal.querySelector('#items-list').innerHTML = itemsHTML;
    modal.querySelector('#total-items').textContent = totalItems;
    modal.querySelector('#total-amount').textContent = formatCurrency(arr.totalAmount);
    modal.querySelector('#summary-total').textContent = formatCurrency(arr.totalAmount);

    // Hiển thị/ẩn nút in hóa đơn dựa vào trạng thái
    const printButton = modal.querySelector('.print-btn');
    if (arr.status === 'Đã hủy') {
        printButton.style.display = 'none';
    } else {
        printButton.style.display = 'inline-block';
    }

    // Hiển thị modal
    modal.style.display = 'block';

    // Thêm sự kiện đóng modal
    modal.querySelector('.close-btn').onclick = () => {
        modal.style.display = 'none';
    };
    modal.querySelector('.close-btn-footer').onclick = () => {
        modal.style.display = 'none';
    };

    // Đóng modal khi nhấp vào backdrop
    modal.onclick = () => {
        modal.style.display = 'none';
    };

    // Ngăn sự kiện đóng khi nhấp vào modal-content
    modal.querySelector('.modal-content').onclick = (event) => {
        event.stopPropagation();
    };

    // Thêm sự kiện in hóa đơn
    modal.querySelector('.print-btn').onclick = () => {
        printInvoice(arr.id);
    };
}

function showSellModal() {
    const invoices = getAllInvoices();
    const employees = getAllEmployees();

    const modal = document.getElementById('sell-modal');
    if (!modal) return;

    // Reset form và thiết lập tiêu đề
    modal.querySelector('.sell-modal-header h3').textContent = 'TẠO HÓA ĐƠN MỚI';

    // Điền giá trị mặc định cho mã hóa đơn
    modal.querySelector('#new-invoice-id').value = `HD${String(invoices.length + 1).padStart(3, '0')}`;

    // Reset các trường form
    modal.querySelector('#new-customer-name_BH').value = '';
    modal.querySelector('#new-invoice-type_BH').value = 'Bán hàng'; // Mặc định là bán hàng
    modal.querySelector('#new-payment-method_BH').value = 'Tiền mặt'; // Mặc định là tiền mặt

    // Tạo dropdown nhân viên
    const employeeSelect = modal.querySelector('#new-employee_BH');
    employeeSelect.innerHTML = '';
    employees.forEach(employee => {
        const option = document.createElement('option');
        option.value = employee.username;  // Sử dụng username thay vì name
        option.textContent = employee.name;
        employeeSelect.appendChild(option);
    });

    // Ẩn trường chọn trạng thái (không cho người dùng chọn trực tiếp)
    const statusFormGroup = modal.querySelector('#new-status_BH').closest('.form-group');
    if (statusFormGroup) {
        statusFormGroup.style.display = 'none';
    }

    // Mặc định trạng thái là "Phiếu tạm" nhưng không hiển thị
    modal.querySelector('#new-status_BH').value = 'Phiếu tạm';

    // Xóa tất cả sản phẩm hiện có
    const productsContainer = modal.querySelector('#products-container');
    productsContainer.innerHTML = '';

    // Cập nhật danh sách sản phẩm kho bên phải (mặc định là sản phẩm kho)
    updateInventoryProductsList('Bán hàng');

    // Hiển thị modal
    modal.style.display = 'block';

    // Thêm sự kiện cho nút "Thêm sản phẩm"
    modal.querySelector('#add-product-btn').onclick = () => {
        addProductRow(productsContainer);
    };

    // Sự kiện đóng modal
    modal.querySelector('.close-btn').onclick = () => {
        modal.style.display = 'none';
    };
    modal.querySelector('#close-btn-footer').onclick = () => {
        modal.style.display = 'none';
    };

    // Đóng modal khi nhấp vào backdrop
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Ngăn sự kiện đóng khi nhấp vào modal-content
    modal.querySelector('.modal-content').onclick = (event) => {
        event.stopPropagation();
    };

    // Cập nhật nút footer
    const modalFooter = modal.querySelector('.modal-footer');
    modalFooter.innerHTML = `
        <button id="save-invoice-btn" class="save-invoice-btn">
            <i class="fa-solid fa-check"></i> Hoàn thành
        </button>
        <button id="save-temp-btn" class="save-temp-btn">
            <i class="fa-solid fa-hourglass-half"></i> Lưu tạm
        </button>
        <button id="close-btn-footer" class="close-btn-footer">
            <i class="fa-solid fa-xmark"></i></i> Đóng
        </button>
    `;

    // Sự kiện khi nhấn nút "Hoàn thành"
    modal.querySelector('#save-invoice-btn').onclick = () => {
        modal.querySelector('#new-status_BH').value = 'Hoàn thành';
        saveInvoice(modal);
    };

    // Sự kiện khi nhấn nút "Lưu tạm"
    modal.querySelector('#save-temp-btn').onclick = () => {
        modal.querySelector('#new-status_BH').value = 'Phiếu tạm';
        saveInvoice(modal);
    };

    // Sự kiện khi nhấn nút "Hủy"
    modal.querySelector('#close-btn-footer').onclick = () => {
        modal.style.display = 'none';
    };

    // Sự kiện khi thay đổi loại hóa đơn
    modal.querySelector('#new-invoice-type_BH').addEventListener('change', function () {
        updateInventoryProductsList(this.value);
    });

    // Sự kiện tính tổng tiền khi có thay đổi số lượng hoặc giá
    listenForQuantityAndPriceChanges(modal);

    // Cập nhật tổng tiền ban đầu
    updateTotalAmount(modal);
}

// Hàm tạo một hàng sản phẩm mới
function addProductRow(container) {
    const productRow = document.createElement('div');
    productRow.className = 'product-row';
    productRow.innerHTML = `
        <input type="text" placeholder="Tên sản phẩm" class="product-name">
        <input type="number" placeholder="Số lượng" class="product-quantity" min="1" value="1">
        <input type="number" placeholder="Giá" class="product-price">
        <button class="remove-product-btn">Xóa</button>
    `;
    container.appendChild(productRow);

    // Thêm sự kiện cho nút xóa sản phẩm
    productRow.querySelector('.remove-product-btn').onclick = function () {
        this.parentElement.remove();
        // Cập nhật tổng tiền khi xóa sản phẩm
        updateTotalAmount(this.closest('#sell-modal'));
    };

    // Thêm sự kiện cho input số lượng và giá
    const quantityInput = productRow.querySelector('.product-quantity');
    const priceInput = productRow.querySelector('.product-price');

    quantityInput.addEventListener('input', () => {
        updateTotalAmount(container.closest('#sell-modal'));
    });

    priceInput.addEventListener('input', () => {
        updateTotalAmount(container.closest('#sell-modal'));
    });
}

// Cập nhật danh sách sản phẩm trong kho hoặc gói tập (phía bên phải modal)
function updateInventoryProductsList(invoiceType = 'Bán hàng') {
    const inventoryContainer = document.getElementById('inventory-products');
    if (!inventoryContainer) return;

    // Xóa danh sách hiện tại
    inventoryContainer.innerHTML = '';

    // Thêm thanh tìm kiếm
    const searchBox = document.createElement('div');
    searchBox.className = 'inventory-search';
    searchBox.innerHTML = `
        <input type="text" id="inventory-search-input" placeholder="Tìm kiếm ${invoiceType === 'Bán hàng' ? 'sản phẩm' : 'gói tập'}...">
    `;
    inventoryContainer.appendChild(searchBox);

    // Thêm danh sách sản phẩm hoặc gói tập
    const productsList = document.createElement('div');
    productsList.className = 'inventory-products-list';

    let items = [];
    if (invoiceType === 'Bán hàng') {
        // Lấy danh sách sản phẩm từ kho
        items = getAllProducts();
    } else {
        // Lấy danh sách gói tập
        items = packages;
    }

    items.forEach(item => {
        const productItem = document.createElement('div');
        productItem.className = 'inventory-product-item';
        productItem.innerHTML = `
            <div class="product-info">
                <div class="product-name">${item.name}</div>
                <div class="product-details">
                    <span class="product-id">${item.id}</span>
                    <span class="product-price">${formatCurrency(item.price || item.sellPrice)}</span>
                    ${invoiceType === 'Bán hàng' ? `<span class="product-stock">Tồn: ${item.stock}</span>` : ''}
                </div>
            </div>
            <button class="add-to-invoice-btn">+</button>
        `;
        productsList.appendChild(productItem);

        // Thêm sự kiện khi nhấn nút thêm sản phẩm vào hóa đơn
        productItem.querySelector('.add-to-invoice-btn').onclick = function () {
            addProductToInvoice(item, invoiceType);
        };
    });

    inventoryContainer.appendChild(productsList);

    // Thêm sự kiện tìm kiếm
    const searchInput = searchBox.querySelector('#inventory-search-input');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const productItems = productsList.querySelectorAll('.inventory-product-item');

        productItems.forEach(item => {
            const productName = item.querySelector('.product-name').textContent.toLowerCase();
            const productId = item.querySelector('.product-id').textContent.toLowerCase();

            if (productName.includes(searchTerm) || productId.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Hàm thêm sản phẩm từ kho hoặc gói tập vào hóa đơn
function addProductToInvoice(item, invoiceType = 'Bán hàng') {
    const modal = document.getElementById('sell-modal');
    const productsContainer = modal.querySelector('#products-container');

    // Kiểm tra xem sản phẩm đã có trong danh sách chưa
    let found = false;
    const productRows = productsContainer.querySelectorAll('.product-row');

    for (const row of productRows) {
        const nameInput = row.querySelector('.product-name');
        if (nameInput.value === item.name) {
            // Nếu đã có, tăng số lượng lên 1
            const quantityInput = row.querySelector('.product-quantity');
            quantityInput.value = parseInt(quantityInput.value) + 1;
            found = true;
            // Cập nhật tổng tiền
            updateTotalAmount(modal);
            break;
        }
    }

    // Nếu chưa có, thêm sản phẩm mới
    if (!found) {
        const productRow = document.createElement('div');
        productRow.className = 'product-row';
        productRow.innerHTML = `
            <input type="text" value="${item.name}" class="product-name" readonly>
            <input type="number" value="1" class="product-quantity" min="1">
            <input type="number" value="${item.price || item.sellPrice}" class="product-price">
            <button class="remove-product-btn">Xóa</button>
        `;
        productsContainer.appendChild(productRow);

        // Thêm sự kiện cho nút xóa sản phẩm
        productRow.querySelector('.remove-product-btn').onclick = function () {
            this.parentElement.remove();
            // Cập nhật tổng tiền khi xóa sản phẩm
            updateTotalAmount(modal);
        };

        // Thêm sự kiện cho input số lượng và giá
        const quantityInput = productRow.querySelector('.product-quantity');
        const priceInput = productRow.querySelector('.product-price');

        quantityInput.addEventListener('input', () => {
            updateTotalAmount(modal);
        });

        priceInput.addEventListener('input', () => {
            updateTotalAmount(modal);
        });

        // Cập nhật tổng tiền
        updateTotalAmount(modal);
    }
}

// Hàm lắng nghe sự thay đổi số lượng và giá
function listenForQuantityAndPriceChanges(modal) {
    modal.addEventListener('input', (event) => {
        if (event.target.classList.contains('product-quantity') ||
            event.target.classList.contains('product-price')) {
            updateTotalAmount(modal);
        }
    });
}

// Hàm cập nhật tổng tiền hóa đơn
function updateTotalAmount(modal) {
    let totalAmount = 0;
    const productRows = modal.querySelectorAll('.product-row');

    productRows.forEach(row => {
        const quantity = parseInt(row.querySelector('.product-quantity').value) || 0;
        const price = parseInt(row.querySelector('.product-price').value) || 0;
        totalAmount += quantity * price;
    });

    // Hiển thị tổng tiền (giả sử có phần tử hiển thị tổng tiền)
    const totalAmountElement = modal.querySelector('#invoice-total-amount');
    if (totalAmountElement) {
        totalAmountElement.textContent = formatCurrency(totalAmount);
    }
}

// Hàm lưu hóa đơn
function saveInvoice(modal) {
    const invoices = getAllInvoices();

    // Lấy thông tin từ form
    const invoiceId = modal.querySelector('#new-invoice-id').value;
    const customerName = modal.querySelector('#new-customer-name_BH').value;
    const type = modal.querySelector('#new-invoice-type_BH').value;
    const paymentMethod = modal.querySelector('#new-payment-method_BH').value;
    const status = modal.querySelector('#new-status_BH').value;

    const employees = getAllEmployees();
    const selectedEmployee = employees.find(emp => emp.username === modal.querySelector('#new-employee_BH').value);
    const employee = selectedEmployee ? selectedEmployee.username : 'Chưa xác định';

    // Kiểm tra thông tin khách hàng
    if (!customerName) {
        alert('Vui lòng nhập tên khách hàng');
        return;
    }

    // Lấy danh sách sản phẩm
    const items = [];
    let totalAmount = 0;

    modal.querySelectorAll('.product-row').forEach(row => {
        const name = row.querySelector('.product-name').value;
        const quantity = parseInt(row.querySelector('.product-quantity').value) || 0;
        const price = parseInt(row.querySelector('.product-price').value) || 0;

        if (name && quantity > 0 && price > 0) {
            items.push({
                name,
                quantity,
                price
            });
            totalAmount += quantity * price;
        }
    });

    // Kiểm tra sản phẩm
    if (items.length === 0) {
        alert('Vui lòng thêm ít nhất một sản phẩm');
        return;
    }

    // Tạo đối tượng hóa đơn mới
    const newInvoice = {
        id: invoiceId,
        customerName,
        employee,
        type,
        paymentMethod,
        status,
        time: formatDate(new Date()),
        items,
        totalAmount
    };

    // Thêm hóa đơn mới hoặc cập nhật hóa đơn cũ
    const existingIndex = invoices.findIndex(inv => inv.id === invoiceId);
    if (existingIndex !== -1) {
        invoices[existingIndex] = newInvoice;
    } else {
        invoices.push(newInvoice);
    }

    // Đóng modal
    modal.style.display = 'none';

    // Cập nhật giao diện
    renderData();
    updateDashboardSummary();
    localStorage.setItem('invoices', JSON.stringify(invoices));
}

// Hành động chỉnh sửa hóa đơn
function editInvoice(invoiceId) {
    const invoices = getAllInvoices();
    const employees = getAllEmployees();
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    // Lấy modal từ HTML
    const modal = document.getElementById('sell-modal');
    modal.querySelector('.sell-modal-header h3').textContent = 'CHỈNH SỬA HÓA ĐƠN';

    // Điền giá trị hóa đơn cần chỉnh sửa vào form
    modal.querySelector('#new-invoice-id').value = invoice.id;
    modal.querySelector('#new-customer-name_BH').value = invoice.customerName;
    modal.querySelector('#new-invoice-type_BH').value = invoice.type;
    modal.querySelector('#new-payment-method_BH').value = invoice.paymentMethod;
    modal.querySelector('#new-status_BH').value = invoice.status;

    // Tạo dropdown nhân viên
    const employeeSelect = modal.querySelector('#new-employee_BH');
    employeeSelect.innerHTML = '';
    employees.forEach(employee => {
        const option = document.createElement('option');
        option.value = employee.username;  // Sử dụng username thay vì name
        option.textContent = employee.name;
        employeeSelect.appendChild(option);
    });
    employeeSelect.value = invoice.employee || '';

    // Ẩn trường chọn trạng thái
    const statusFormGroup = modal.querySelector('#new-status_BH').closest('.form-group');
    if (statusFormGroup) {
        statusFormGroup.style.display = 'none';
    }

    // Reset danh sách sản phẩm và thêm các sản phẩm từ hóa đơn
    const productsContainer = modal.querySelector('#products-container');
    productsContainer.innerHTML = '';
    invoice.items.forEach(item => {
        const productRow = document.createElement('div');
        productRow.className = 'product-row';
        productRow.innerHTML = `
            <input type="text" value="${item.name}" class="product-name">
            <input type="number" value="${item.quantity}" class="product-quantity" min="1">
            <input type="number" value="${item.price}" class="product-price">
            <button class="remove-product-btn">Xóa</button>
        `;
        productsContainer.appendChild(productRow);

        // Thêm sự kiện cho nút xóa sản phẩm
        productRow.querySelector('.remove-product-btn').onclick = function () {
            this.parentElement.remove();
            updateTotalAmount(modal);
        };
    });

    // Cập nhật danh sách sản phẩm kho hoặc gói tập bên phải
    updateInventoryProductsList(invoice.type);

    // Hiển thị modal
    modal.style.display = 'block';

    // Thêm sự kiện cho nút "Thêm sản phẩm"
    modal.querySelector('#add-product-btn').onclick = () => {
        addProductRow(productsContainer);
    };

    // Sự kiện đóng modal
    modal.querySelector('.close-btn').onclick = () => {
        modal.style.display = 'none';
    };

    // Đóng modal khi nhấp vào backdrop
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Ngăn sự kiện đóng khi nhấp vào modal-content
    modal.querySelector('.modal-content').onclick = (event) => {
        event.stopPropagation();
    };

    // Sự kiện khi thay đổi loại hóa đơn
    modal.querySelector('#new-invoice-type_BH').addEventListener('change', function () {
        updateInventoryProductsList(this.value);
    });

    // Cập nhật nút footer tùy theo trạng thái hiện tại
    const modalFooter = modal.querySelector('.modal-footer');

    // Nếu hóa đơn đã hủy, chỉ cho phép xem
    if (invoice.status === 'Đã hủy') {
        modalFooter.innerHTML = `
            <button id="close-btn-footer" class="close-btn-footer">
                <i class="fa-solid fa-xmark"></i></i> Đóng
            </button>
        `;

        // Disable tất cả các input
        modal.querySelectorAll('input, select').forEach(input => {
            input.disabled = true;
        });

        // Ẩn các nút thao tác
        modal.querySelectorAll('.remove-product-btn, #add-product-btn').forEach(btn => {
            btn.style.display = 'none';
        });

        modal.querySelector('#close-btn-footer').onclick = () => {
            modal.style.display = 'none';
        };
    }
    // Nếu hóa đơn là phiếu tạm hoặc hoàn thành
    else {
        modalFooter.innerHTML = `
            <button id="save-invoice-btn" class="save-invoice-btn">
                <i class="fa-solid fa-check"></i> Hoàn thành
            </button>
            <button id="save-temp-btn" class="save-temp-btn">
                <i class="fa-solid fa-hourglass-half"></i> Lưu tạm
            </button>
            <button id="cancel-invoice-btn" class="cancel-invoice-btn">
                <i class="fa-solid fa-ban"></i> Hủy hóa đơn
            </button>
        `;

        // Sự kiện khi nhấn nút "Hoàn thành"
        modal.querySelector('#save-invoice-btn').onclick = () => {
            modal.querySelector('#new-status_BH').value = 'Hoàn thành';
            saveInvoice(modal);
        };

        // Sự kiện khi nhấn nút "Lưu tạm"
        modal.querySelector('#save-temp-btn').onclick = () => {
            modal.querySelector('#new-status_BH').value = 'Phiếu tạm';
            saveInvoice(modal);
        };

        // Sự kiện khi nhấn nút "Hủy hóa đơn"
        modal.querySelector('#cancel-invoice-btn').onclick = () => {
            if (confirm(`Bạn có chắc chắn muốn hủy hóa đơn ${invoiceId}?`)) {
                modal.querySelector('#new-status_BH').value = 'Đã hủy';
                saveInvoice(modal);
            }
        };
    }

    // Lắng nghe sự thay đổi số lượng và giá để cập nhật tổng tiền
    listenForQuantityAndPriceChanges(modal);

    // Cập nhật tổng tiền ban đầu
    updateTotalAmount(modal);
}

// In hóa đơn
function printInvoice(invoiceId) {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    const printWindow = window.open('', '_blank');

    let itemsHTML = '';
    let totalItems = 0;

    invoice.items.forEach(item => {
        itemsHTML += `
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${formatCurrency(item.price)}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${formatCurrency(item.price * item.quantity)}</td>
            </tr>
        `;
        totalItems += item.quantity;
    });

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Hóa đơn ${invoice.id}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                }
                .invoice-header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .invoice-info {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                th {
                    background-color: #f2f2f2;
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                .invoice-total {
                    text-align: right;
                    font-size: 18px;
                    margin-top: 20px;
                }
                .footer {
                    margin-top: 40px;
                    text-align: center;
                }
                @media print {
                    .no-print {
                        display: none;
                    }
                }
            </style>
        </head>
        <body>
            <div class="invoice-header">
                <h1>HÓA ĐƠN BÁN HÀNG</h1>
                <p>FastFit Gym</p>
            </div>
            
            <div class="invoice-info">
                <div>
                    <p><strong>Hóa đơn:</strong> ${invoice.id}</p>
                    <p><strong>Ngày:</strong> ${formatDateDisplay(invoice.time)}</p>
                    <p><strong>Loại hóa đơn:</strong> ${invoice.type}</p>
                </div>
                <div>
                    <p><strong>Khách hàng:</strong> ${invoice.customerName}</p>
                    <p><strong>Người bán:</strong> ${invoice.employee || 'Chưa xác định'}</p>
                    <p><strong>Phương thức thanh toán:</strong> ${invoice.paymentMethod}</p>
                </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th style="border: 1px solid #ddd; padding: 8px;">Sản phẩm</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Số lượng</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Đơn giá</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="1" style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Tổng:</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold;">${totalItems}</td>
                        <td colspan="2" style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">${formatCurrency(invoice.totalAmount)}</td>
                    </tr>
                </tfoot>
            </table>
            
            <div class="invoice-total">
                <p><strong>Tổng tiền thanh toán:</strong> ${formatCurrency(invoice.totalAmount)}</p>
            </div>
            
            <div class="footer">
                <p>Cảm ơn quý khách đã sử dụng dịch vụ của FastFit!</p>
            </div>
            
            <div class="no-print" style="text-align: center; margin-top: 20px;">
                <button onclick="window.print();" style="padding: 10px 20px;">In hóa đơn</button>
                <button onclick="window.close();" style="padding: 10px 20px; margin-left: 10px;">Đóng</button>
            </div>
            
            <script>
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                    }, 500);
                }
            </script>
        </body>
        </html>
    `);

    printWindow.document.close();
}

// Hàm hiển thị modal Chi Tiết Phiếu Nhập
function viewImport(importId) {
    const imports = getAllImports();
    const importItem = imports.find(imp => imp.id === importId);
    if (!importItem) return;

    const modal = document.getElementById('import-detail-modal');

    // Điền dữ liệu vào modal
    modal.querySelector('#import-id').textContent = importItem.id;
    modal.querySelector('#supplier-name').textContent = importItem.supplierName;
    modal.querySelector('#import-date').textContent = formatDateDisplay(importItem.time);
    modal.querySelector('#import-date').textContent = formatDateDisplay(importItem.time);
    modal.querySelector('#import-total-amount').textContent = formatCurrency(importItem.totalAmount);
    modal.querySelector('#import-status').textContent = importItem.status;
    modal.querySelector('#import-status').className = `status-badge ${getStatusClass(importItem.status)}`;

    // Tạo bảng sản phẩm
    let itemsHTML = '';
    let totalItems = 0;
    importItem.items.forEach(item => {
        itemsHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(item.price)}</td>
                <td>${formatCurrency(item.price * item.quantity)}</td>
            </tr>
        `;
        totalItems += item.quantity;
    });

    modal.querySelector('#import-items-list').innerHTML = itemsHTML;
    modal.querySelector('#import-total-items').textContent = totalItems;
    modal.querySelector('#import-summary-total').textContent = formatCurrency(importItem.totalAmount);

    // Hiển thị/ẩn nút in phiếu nhập dựa vào trạng thái
    const printButton = modal.querySelector('.print-btn');
    if (importItem.status === 'Hủy hàng') {
        printButton.style.display = 'none';
    } else {
        printButton.style.display = 'inline-block';
    }

    // Hiển thị modal
    modal.style.display = 'block';

    // Thêm sự kiện đóng modal
    modal.querySelector('.close-btn').onclick = () => {
        modal.style.display = 'none';
    };
    modal.querySelector('.close-btn-footer').onclick = () => {
        modal.style.display = 'none';
    };

    // Đóng modal khi nhấp vào backdrop
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Ngăn sự kiện đóng khi nhấp vào modal-content
    modal.querySelector('.modal-content').onclick = (event) => {
        event.stopPropagation();
    };

    // Thêm sự kiện in phiếu nhập
    modal.querySelector('.print-btn').onclick = () => {
        printImport(importItem.id);
    };
}

// Hàm hiển thị modal Nhập Hàng
function showImportModal() {
    const imports = getAllImports();
    const modal = document.getElementById('import-modal');

    // Reset form và thiết lập tiêu đề
    modal.querySelector('.import-modal-header h3').textContent = 'TẠO PHIẾU NHẬP MỚI';

    // Điền giá trị mặc định cho mã phiếu nhập
    modal.querySelector('#new-import-id').value = `PN${String(imports.length + 1).padStart(3, '0')}`;

    // Reset các trường form
    const supplierSelect = modal.querySelector('#new-supplier-name');
    supplierSelect.innerHTML = '<option value="">-- Chọn nhà cung cấp --</option>';

    // Load danh sách nhà cung cấp từ localStorage
    const suppliers = getAllNCC();
    suppliers.forEach(supplier => {
        const option = document.createElement('option');
        option.value = supplier.id;
        option.textContent = `${supplier.name} (${supplier.id})`;
        supplierSelect.appendChild(option);
    });

    modal.querySelector('#new-import-date').value = formatDateInput(new Date());

    // Ẩn trường chọn trạng thái
    const statusFormGroup = modal.querySelector('#new-import-status').closest('.form-group');
    if (statusFormGroup) {
        statusFormGroup.style.display = 'none';
    }

    // Mặc định trạng thái là "Phiếu tạm"
    modal.querySelector('#new-import-status').value = 'Phiếu tạm';

    // Xóa tất cả sản phẩm hiện có
    const productsContainer = modal.querySelector('#import-products-container');
    productsContainer.innerHTML = '';

    // Cập nhật danh sách sản phẩm kho bên phải
    updateImportInventoryProductsList();

    // Hiển thị modal
    modal.style.display = 'block';

    // Thêm sự kiện cho nút "Thêm sản phẩm"
    modal.querySelector('#add-import-product-btn').onclick = () => {
        addImportProductRow(productsContainer);
    };

    // Sự kiện đóng modal
    modal.querySelector('.close-btn').onclick = () => {
        modal.style.display = 'none';
    };

    // Đóng modal khi nhấp vào backdrop
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Ngăn sự kiện đóng khi nhấp vào modal-content
    modal.querySelector('.modal-content').onclick = (event) => {
        event.stopPropagation();
    };

    // Cập nhật nút footer
    const modalFooter = modal.querySelector('.modal-footer');
    modalFooter.innerHTML = `
        <button id="save-import-btn" class="save-invoice-btn">
            <i class="fa-solid fa-check"></i> Hoàn thành
        </button>
        <button id="save-temp-btn" class="save-temp-btn">
            <i class="fa-solid fa-hourglass-half"></i> Lưu tạm
        </button>
        <button id="close-import-btn" class="close-btn-footer">
            <i class="fa-solid fa-xmark"></i> Đóng
        </button>
    `;

    // Sự kiện khi nhấn nút "Hoàn thành"
    modal.querySelector('#save-import-btn').onclick = () => {
        modal.querySelector('#new-import-status').value = 'Đã nhập';
        saveImport(modal);
    };

    // Sự kiện khi nhấn nút "Lưu tạm"
    modal.querySelector('#save-temp-btn').onclick = () => {
        modal.querySelector('#new-import-status').value = 'Phiếu tạm';
        saveImport(modal);
    };

    // Sự kiện khi nhấn nút "Đóng"
    modal.querySelector('#close-import-btn').onclick = () => {
        modal.style.display = 'none';
    };

    // Lắng nghe sự thay đổi số lượng và giá để cập nhật tổng tiền
    listenForImportQuantityAndPriceChanges(modal);

    // Cập nhật tổng tiền vu
    updateImportTotalAmount(modal);
}

// Hàm tạo một hàng sản phẩm mới cho phiếu nhập
function addImportProductRow(container) {
    const productRow = document.createElement('div');
    productRow.className = 'product-row';
    productRow.innerHTML = `
        <input type="text" placeholder="Tên sản phẩm" class="product-name">
        <input type="number" placeholder="Số lượng" class="product-quantity" min="1" value="1">
        <input type="number" placeholder="Giá nhập" class="product-price">
        <button class="remove-product-btn">Xóa</button>
    `;
    container.appendChild(productRow);

    // Thêm sự kiện cho nút xóa sản phẩm
    productRow.querySelector('.remove-product-btn').onclick = function () {
        this.parentElement.remove();
        updateImportTotalAmount(this.closest('#import-modal'));
    };

    // Thêm sự kiện cho input số lượng và giá
    const quantityInput = productRow.querySelector('.product-quantity');
    const priceInput = productRow.querySelector('.product-price');

    quantityInput.addEventListener('input', () => {
        updateImportTotalAmount(container.closest('#import-modal'));
    });

    priceInput.addEventListener('input', () => {
        updateImportTotalAmount(container.closest('#import-modal'));
    });
}

// Cập nhật danh sách sản phẩm trong kho (phía bên phải modal nhập hàng)
function updateImportInventoryProductsList() {
    const inventoryContainer = document.getElementById('import-inventory-products');
    if (!inventoryContainer) return;

    const inventory = getAllProducts();
    inventoryContainer.innerHTML = '';

    // Thêm thanh tìm kiếm
    const searchBox = document.createElement('div');
    searchBox.className = 'inventory-search';
    searchBox.innerHTML = `
        <input type="text" id="import-inventory-search-input" placeholder="Tìm kiếm sản phẩm...">
    `;
    inventoryContainer.appendChild(searchBox);

    // Thêm danh sách sản phẩm
    const productsList = document.createElement('div');
    productsList.className = 'inventory-products-list';

    inventory.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'inventory-product-item';
        productItem.innerHTML = `
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-details">
                    <span class="product-id">${product.id}</span>
                    <span class="product-price">${formatCurrency(product.buyPrice)}</span>
                    <span class="product-stock">Tồn: ${product.stock}</span>
                </div>
            </div>
            <button class="add-to-invoice-btn">+</button>
        `;
        productsList.appendChild(productItem);

        // Thêm sự kiện khi nhấn nút thêm sản phẩm vào phiếu nhập
        productItem.querySelector('.add-to-invoice-btn').onclick = function () {
            addProductToImport(product);
        };
    });

    inventoryContainer.appendChild(productsList);

    // Thêm sự kiện tìm kiếm
    const searchInput = searchBox.querySelector('#import-inventory-search-input');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const productItems = productsList.querySelectorAll('.inventory-product-item');

        productItems.forEach(item => {
            const productName = item.querySelector('.product-name').textContent.toLowerCase();
            const productId = item.querySelector('.product-id').textContent.toLowerCase();

            if (productName.includes(searchTerm) || productId.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Hàm thêm sản phẩm từ kho vào phiếu nhập
function addProductToImport(product) {
    const modal = document.getElementById('import-modal');
    const productsContainer = modal.querySelector('#import-products-container');

    // Kiểm tra xem sản phẩm đã có trong danh sách chưa
    let found = false;
    const productRows = productsContainer.querySelectorAll('.product-row');

    for (const row of productRows) {
        const nameInput = row.querySelector('.product-name');
        if (nameInput.value === product.name) {
            // Nếu đã có, tăng số lượng lên 1
            const quantityInput = row.querySelector('.product-quantity');
            quantityInput.value = parseInt(quantityInput.value) + 1;
            found = true;
            updateImportTotalAmount(modal);
            break;
        }
    }

    // Nếu chưa có, thêm sản phẩm mới
    if (!found) {
        const productRow = document.createElement('div');
        productRow.className = 'product-row';
        productRow.innerHTML = `
            <input type="text" value="${product.name}" class="product-name" readonly>
            <input type="number" value="1" class="product-quantity" min="1">
            <input type="number" value="${product.buyPrice}" class="product-price">
            <button class="remove-product-btn">Xóa</button>
        `;
        productsContainer.appendChild(productRow);

        // Thêm sự kiện cho nút xóa sản phẩm
        productRow.querySelector('.remove-product-btn').onclick = function () {
            this.parentElement.remove();
            updateImportTotalAmount(modal);
        };

        // Thêm sự kiện cho input số lượng và giá
        const quantityInput = productRow.querySelector('.product-quantity');
        const priceInput = productRow.querySelector('.product-price');

        quantityInput.addEventListener('input', () => {
            updateImportTotalAmount(modal);
        });

        priceInput.addEventListener('input', () => {
            updateImportTotalAmount(modal);
        });

        updateImportTotalAmount(modal);
    }
}

// Hàm lắng nghe sự thay đổi số lượng và giá trong modal nhập hàng
function listenForImportQuantityAndPriceChanges(modal) {
    modal.addEventListener('input', (event) => {
        if (event.target.classList.contains('product-quantity') ||
            event.target.classList.contains('product-price')) {
            updateImportTotalAmount(modal);
        }
    });
}

// Hàm cập nhật tổng tiền phiếu nhập
function updateImportTotalAmount(modal) {
    let totalAmount = 0;
    const productRows = modal.querySelectorAll('.product-row');

    productRows.forEach(row => {
        const quantity = parseInt(row.querySelector('.product-quantity').value) || 0;
        const price = parseInt(row.querySelector('.product-price').value) || 0;
        totalAmount += quantity * price;
    });

    // Hiển thị tổng tiền
    const totalAmountElement = modal.querySelector('#import-total-amount');
    if (totalAmountElement) {
        totalAmountElement.textContent = formatCurrency(totalAmount);
    }
}

// Hàm lưu phiếu nhập
function saveImport(modal) {
    const imports = getAllImports();

    // Lấy thông tin từ form
    const importId = modal.querySelector('#new-import-id').value;
    const importDate = modal.querySelector('#new-import-date').value;
    const status = modal.querySelector('#new-import-status').value;

    // Kiểm tra thông tin nhà cung cấp
    if (!supplierName) {
        alert('Vui lòng nhập tên nhà cung cấp');
        return;
    }

    // Lấy tên nhà cung cấp từ ID
    const suppliers = getAllNCC();
    const selectedSupplier = suppliers.find(s => s.id === supplierId);
    if (!selectedSupplier) {
        alert('Nhà cung cấp không tồn tại');
        return;
    }
    const supplierName = selectedSupplier.name;

    // Lấy danh sách sản phẩm
    const items = [];
    let totalAmount = 0;

    modal.querySelectorAll('.product-row').forEach(row => {
        const name = row.querySelector('.product-name').value;
        const quantity = parseInt(row.querySelector('.product-quantity').value) || 0;
        const price = parseInt(row.querySelector('.product-price').value) || 0;

        if (name && quantity > 0 && price > 0) {
            items.push({
                name,
                quantity,
                price
            });
            totalAmount += quantity * price;
        }
    });

    // Kiểm tra sản phẩm
    if (items.length === 0) {
        alert('Vui lòng thêm ít nhất một sản phẩm');
        return;
    }

    // Tạo đối tượng phiếu nhập mới
    const newImport = {
        id: importId,
        supplierName,
        status,
        time: importDate,
        items,
        totalAmount,
    };

    // Thêm phiếu nhập mới hoặc cập nhật phiếu nhập cũ
    const existingIndex = imports.findIndex(imp => imp.id === importId);
    if (existingIndex !== -1) {
        imports[existingIndex] = newImport;
    } else {
        imports.push(newImport);
    }

    // Đóng modal
    modal.style.display = 'none';

    // Cập nhật giao diện
    renderData();
    localStorage.setItem('imports', JSON.stringify(imports));
}

// Hàm in phiếu nhập
function printImport(importId) {
    const importItem = imports.find(imp => imp.id === importId);
    if (!importItem) return;

    const printWindow = window.open('', '_blank');

    let itemsHTML = '';
    let totalItems = 0;

    importItem.items.forEach(item => {
        itemsHTML += `
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${formatCurrency(item.price)}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${formatCurrency(item.price * item.quantity)}</td>
            </tr>
        `;
        totalItems += item.quantity;
    });

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Phiếu nhập ${importItem.id}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                }
                .invoice-header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .invoice-info {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                th {
                    background-color: #f2f2f2;
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                .invoice-total {
                    text-align: right;
                    font-size: 18px;
                    margin-top: 20px;
                }
                .footer {
                    display: flex;
                    justify-content: space-between;
                    text-align: center;
                }
                .footer div {
                    width: 33%;
                }
                @media print {
                    .no-print {
                        display: none;
                    }
                }
            </style>
        </head>
        <body>
            <div class="invoice-header">
                <h1>PHIẾU NHẬP HÀNG</h1>
                <p>FastFit Gym</p>
            </div>
            
            <div class="invoice-info">
                <div>
                    <p><strong>Phiếu nhập:</strong> ${importItem.id}</p>
                    <p><strong>Ngày:</strong> ${formatDateDisplay(importItem.time)}</p>
                    <p><strong>Trạng thái:</strong> ${importItem.status}</p>
                </div>
                <div>
                    <p><strong>Nhà cung cấp:</strong> ${importItem.supplierName}</p>
                </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th style="border: 1px solid #ddd; padding: 8px;">Sản phẩm</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Số lượng</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Đơn giá</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="1" style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Tổng:</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold;">${totalItems}</td>
                        <td colspan="2" style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">${formatCurrency(importItem.totalAmount)}</td>
                    </tr>
                </tfoot>
            </table>
            
            <div class="invoice-total">
                <p><strong>Tổng tiền hàng:</strong> ${formatCurrency(importItem.totalAmount)}</p>
            </div>
            
            <div class="footer">
                <div>
                    <p>Người lập phiếu</p>
                    <p>(Ký và ghi rõ họ tên)</p>
                </div>
                <div>
                    <p>Nhân viên nhập</p>
                    <p>(Ký và ghi rõ họ tên)</p>
                </div>
                <div>
                    <p>Nhà cung cấp</p>
                    <p>(Ký và ghi rõ họ tên)</p>
                </div>
            </div>
            
            <div class="no-print" style="text-align: center; margin-top: 20px;">
                <button onclick="window.print();" style="padding: 10px 20px;">In phiếu nhập</button>
                <button onclick="window.close();" style="padding: 10px 20px; margin-left: 10px;">Đóng</button>
            </div>
            
            <script>
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                    }, 500);
                }
            </script>
        </body>
        </html>
    `);

    printWindow.document.close();
}

// Hàm chỉnh sửa phiếu nhập
function editImport(importId) {
    const imports = getAllImports();
    const importItem = imports.find(imp => imp.id === importId);
    if (!importItem) return;

    const modal = document.getElementById('import-modal');
    modal.querySelector('.import-modal-header h3').textContent = 'CHỈNH SỬA PHIẾU NHẬP';

    // Điền giá trị phiếu nhập cần chỉnh sửa vào form
    modal.querySelector('#new-import-id').value = importItem.id;

    // Load danh sách nhà cung cấp và chọn nhà cung cấp hiện tại
    const supplierSelect = modal.querySelector('#new-supplier-name');
    supplierSelect.innerHTML = '<option value="">-- Chọn nhà cung cấp --</option>';

    const suppliers = getAllNCC();
    suppliers.forEach(supplier => {
        const option = document.createElement('option');
        option.value = supplier.id;
        option.textContent = `${supplier.name} (${supplier.id})`;
        if (supplier.name === importItem.supplierName) {
            option.selected = true;
        }
        supplierSelect.appendChild(option);
    });

    modal.querySelector('#new-import-date').value = formatDateInput(importItem.time);
    modal.querySelector('#new-import-status').value = importItem.status;

    // Reset danh sách sản phẩm và thêm các sản phẩm từ phiếu nhập
    const productsContainer = modal.querySelector('#import-products-container');
    productsContainer.innerHTML = '';
    importItem.items.forEach(item => {
        const productRow = document.createElement('div');
        productRow.className = 'product-row';
        productRow.innerHTML = `
            <input type="text" value="${item.name}" class="product-name">
            <input type="number" value="${item.quantity}" class="product-quantity" min="1">
            <input type="number" value="${item.price}" class="product-price">
            <button class="remove-product-btn">Xóa</button>
        `;
        productsContainer.appendChild(productRow);

        // Thêm sự kiện cho nút xóa sản phẩm
        productRow.querySelector('.remove-product-btn').onclick = function () {
            this.parentElement.remove();
            updateImportTotalAmount(modal);
        };
    });

    // Cập nhật danh sách sản phẩm kho bên phải
    updateImportInventoryProductsList();

    // Hiển thị modal
    modal.style.display = 'block';

    // Thêm sự kiện cho nút "Thêm sản phẩm"
    modal.querySelector('#add-import-product-btn').onclick = () => {
        addImportProductRow(productsContainer);
    };

    // Sự kiện đóng modal
    modal.querySelector('.close-btn').onclick = () => {
        modal.style.display = 'none';
    };

    // Đóng modal khi nhấp vào backdrop
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Ngăn sự kiện đóng khi nhấp vào modal-content
    modal.querySelector('.modal-content').onclick = (event) => {
        event.stopPropagation();
    };

    // Cập nhật nút footer tùy theo trạng thái phiếu nhập
    const modalFooter = modal.querySelector('.modal-footer');

    if (importItem.status === 'Hủy hàng') {
        // Trường hợp phiếu nhập đã hủy: chỉ hiển thị nút "Đóng"
        modalFooter.innerHTML = `
            <button id="close-import-btn" class="close-btn-footer">
                <i class="fa-solid fa-xmark"></i> Đóng
            </button>
        `;

        // Vô hiệu hóa tất cả input
        modal.querySelectorAll('input, select').forEach(input => {
            input.disabled = true;
        });

        // Ẩn các nút thao tác
        modal.querySelectorAll('.remove-product-btn, #add-import-product-btn').forEach(btn => {
            btn.style.display = 'none';
        });

        // Sự kiện nút "Đóng"
        modal.querySelector('#close-import-btn').onclick = () => {
            modal.style.display = 'none';
        };
    } else {
        // Trường hợp phiếu nhập chưa hủy: hiển thị 3 nút "Hoàn thành", "Lưu tạm", "Hủy"
        modalFooter.innerHTML = `
            <button id="save-import-btn" class="save-invoice-btn">
                <i class="fa-solid fa-check"></i> Hoàn thành
            </button>
            <button id="save-temp-btn" class="save-temp-btn">
                <i class="fa-solid fa-hourglass-half"></i> Lưu tạm
            </button>
            <button id="cancel-import-btn" class="cancel-invoice-btn">
                <i class="fa-solid fa-ban"></i> Hủy
            </button>
        `;

        // Sự kiện khi nhấn nút "Hoàn thành"
        modal.querySelector('#save-import-btn').onclick = () => {
            modal.querySelector('#new-import-status').value = 'Đã nhập';
            saveImport(modal);
        };

        // Sự kiện khi nhấn nút "Lưu tạm"
        modal.querySelector('#save-temp-btn').onclick = () => {
            modal.querySelector('#new-import-status').value = 'Phiếu tạm';
            saveImport(modal);
        };

        // Sự kiện khi nhấn nút "Hủy"
        modal.querySelector('#cancel-import-btn').onclick = () => {
            if (confirm(`Bạn có chắc chắn muốn hủy phiếu nhập ${importId}?`)) {
                modal.querySelector('#new-import-status').value = 'Hủy hàng';
                saveImport(modal);
            }
        };
    }

    // Lắng nghe sự thay đổi số lượng và giá để cập nhật tổng tiền
    listenForImportQuantityAndPriceChanges(modal);

    // Cập nhật tổng tiền ban đầu
    updateImportTotalAmount(modal);
}

// Product Management Functions
function viewProduct(productId) {
    const products = getAllProducts();
    const product = products.find(p => p.id === productId);

    if (!product) {
        alert('Không tìm thấy sản phẩm');
        return;
    }

    const modal = document.getElementById('view-product-modal');

    // Fill in product details
    document.getElementById('view-product-id').textContent = product.id;
    document.getElementById('view-product-name').textContent = product.name;
    document.getElementById('view-product-cost').textContent = product.buyPrice;
    document.getElementById('view-product-price').textContent = product.sellPrice;

    const imgElement = document.getElementById('view-product-image');
    imgElement.src = product.image;
    imgElement.alt = product.name;

    // Show modal
    modal.style.display = 'block';

    // Close handlers
    modal.querySelector('.close-btn').onclick = () => {
        modal.style.display = 'none';
    };

    modal.querySelector('.close-btn-footer').onclick = () => {
        modal.style.display = 'none';
    };

    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };

    modal.querySelector('.modal-content').onclick = (e) => {
        e.stopPropagation();
    };
}

function editProduct(productId) {
    const products = getAllProducts();
    const product = products.find(p => p.id === productId);

    if (!product) {
        alert('Không tìm thấy sản phẩm');
        return;
    }

    const modal = document.getElementById('add-product-modal');
    modal.style.display = 'block';
    modal.querySelector('.modal-header h3').textContent = 'CHỈNH SỬA SẢN PHẨM';

    // Fill form
    document.getElementById('add-product-name').value = product.name;
    document.getElementById('add-product-cost').value = product.buyPrice;
    document.getElementById('add-product-price').value = product.sellPrice;

    // Set status
    const statusRadios = document.getElementsByName('product-status');
    for (let radio of statusRadios) {
        if (radio.value === product.status) {
            radio.checked = true;
            break;
        }
    }

    // Set image preview
    const imagePreview = document.getElementById('image-preview');
    if (product.image) {
        imagePreview.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
    }

    // Change save button text
    document.getElementById('confirm-add-product').innerHTML = '<i class="fa-solid fa-save"></i> LƯU THAY ĐỔI';

    // Store product ID
    modal.dataset.editingProductId = productId;

    // Setup close handlers (same as add product)
    setupModalCloseHandlers(modal);
}

function deleteProduct(productId) {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        return;
    }

    const products = getAllProducts();
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        localStorage.setItem('products', JSON.stringify(products));

        // Hiển thị thông báo thành công
        alert('Xóa sản phẩm thành công!');

        // Cập nhật lại bảng
        renderData();
    } else {
        alert('Không tìm thấy sản phẩm để xóa');
    }
}

function showAddProductModal() {
    const modal = document.getElementById('add-product-modal');
    modal.style.display = 'block';
    modal.querySelector('.modal-header h3').textContent = 'THÊM MỚI SẢN PHẨM';

    // Reset form
    document.getElementById('add-product-name').value = '';
    document.getElementById('add-product-cost').value = '';
    document.getElementById('add-product-price').value = '';
    document.querySelector('input[name="product-status"][value="Đang bán"]').checked = true;
    document.getElementById('image-preview').innerHTML = '<span>Chưa có ảnh</span>';
    document.getElementById('confirm-add-product').innerHTML = '<i class="fa-solid fa-plus"></i> THÊM SẢN PHẨM';

    // Clear editing state
    if (modal.dataset.editingProductId) {
        delete modal.dataset.editingProductId;
    }

    // Setup close handlers
    setupModalCloseHandlers(modal);
}

function setupModalCloseHandlers(modal) {
    modal.querySelector('.close-btn').onclick = () => {
        modal.style.display = 'none';
    };

    modal.querySelector('.close-btn-footer').onclick = () => {
        modal.style.display = 'none';
    };

    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };

    modal.querySelector('.modal-content').onclick = (e) => {
        e.stopPropagation();
    };
}

function setupImageUpload() {
    const uploadInput = document.getElementById('product-image-upload');
    const imagePreview = document.getElementById('image-preview');

    uploadInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                imagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
            };

            reader.readAsDataURL(file);
        }
    });
}

function saveProduct() {
    const modal = document.getElementById('add-product-modal');
    const isEditing = modal.dataset.editingProductId !== undefined;

    // Get form values
    const name = document.getElementById('add-product-name').value.trim();
    const cost = parseFloat(document.getElementById('add-product-cost').value) || 0;
    const price = parseFloat(document.getElementById('add-product-price').value) || 0;
    const status = document.querySelector('input[name="product-status"]:checked').value;

    // Validate
    if (!name) {
        alert('Vui lòng nhập tên sản phẩm');
        return;
    }

    if (cost <= 0 || price <= 0) {
        alert('Giá nhập và giá bán phải lớn hơn 0');
        return;
    }

    if (price < cost) {
        alert('Giá bán không được nhỏ hơn giá nhập');
        return;
    }

    // Handle image upload
    const uploadInput = document.getElementById('product-image-upload');
    const products = getAllProducts();

    if (uploadInput.files.length > 0) {
        const file = uploadInput.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            completeSaveProduct(products, name, cost, price, status, event.target.result, isEditing, modal.dataset.editingProductId);
        };

        reader.readAsDataURL(file);
    } else {
        // If no new image but editing, keep existing image
        let imageData = null;
        if (isEditing) {
            const existingProduct = products.find(p => p.id === modal.dataset.editingProductId);
            imageData = existingProduct ? existingProduct.image : null;
        }
        completeSaveProduct(products, name, cost, price, status, imageData, isEditing, modal.dataset.editingProductId);
    }
}

function completeSaveProduct(products, name, cost, price, status, image, isEditing, productId) {
    if (isEditing) {
        // Update existing product
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products[index] = {
                ...products[index],
                name,
                buyPrice: cost,
                sellPrice: price,
                status,
                image: image || products[index].image
            };
        }
    } else {
        // Create new product
        const newId = 'SP' + String(products.length + 1).padStart(3, '0');
        products.push({
            id: newId,
            name,
            buyPrice: cost,
            sellPrice: price,
            stock: 0,
            status,
            image
        });
    }

    // Save to localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Close modal and refresh
    document.getElementById('add-product-modal').style.display = 'none';
    renderData();
}

// Hàm xem chi tiết gói tập
function viewPackage(packageId) {
    const packages = getAllPackages();
    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) return;

    const modal = document.getElementById('package-detail-modal');
    if (!modal) return;

    // Kiểm tra từng phần tử trước khi thiết lập nội dung
    const setTextContent = (selector, text) => {
        const element = modal.querySelector(selector);
        if (element) element.textContent = text;
    };

    // Điền dữ liệu vào modal
    setTextContent('#package-id', pkg.id);
    setTextContent('#package-code', pkg.id);
    setTextContent('#package-name', pkg.name);
    setTextContent('#package-duration', pkg.duration);
    setTextContent('#package-price', formatCurrency(pkg.price));

    // Hiển thị modal
    modal.style.display = 'block';

    // Thêm sự kiện đóng modal
    modal.querySelector('.close-btn')?.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.querySelector('.close-btn-footer')?.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Đóng modal khi nhấp vào backdrop
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Ngăn sự kiện đóng khi nhấp vào modal-content
    modal.querySelector('.modal-content')?.addEventListener('click', (event) => {
        event.stopPropagation();
    });
}

// Hàm hiển thị modal thêm gói tập
function showPackageModal() {
    const packages = getAllPackages();
    const modal = document.getElementById('package-modal');

    // Reset form
    modal.querySelector('.package-modal-header h3').textContent = 'TẠO GÓI TẬP MỚI';
    modal.querySelector('#new-package-id').value = `GT${String(packages.length + 1).padStart(3, '0')}`;
    modal.querySelector('#new-package-name').value = '';
    modal.querySelector('#new-package-duration').value = '';
    modal.querySelector('#new-package-price').value = '';

    // Hiển thị modal
    modal.style.display = 'block';

    // Sự kiện đóng modal
    modal.querySelector('.close-btn').onclick = () => {
        modal.style.display = 'none';
    };
    modal.querySelector('#close-package-btn').onclick = () => {
        modal.style.display = 'none';
    };

    // Đóng modal khi nhấp vào backdrop
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Sự kiện lưu gói tập
    modal.querySelector('#save-package-btn').onclick = () => {
        savePackage(modal);
    };
}

// Hàm chỉnh sửa gói tập
function editPackage(packageId) {
    const packages = getAllPackages();
    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) return;

    const modal = document.getElementById('package-modal');
    modal.querySelector('.package-modal-header h3').textContent = 'CHỈNH SỬA GÓI TẬP';

    // Điền thông tin gói tập vào form
    modal.querySelector('#new-package-id').value = pkg.id;
    modal.querySelector('#new-package-name').value = pkg.name;
    modal.querySelector('#new-package-duration').value = pkg.duration;
    modal.querySelector('#new-package-price').value = pkg.price;

    // Hiển thị modal
    modal.style.display = 'block';

    // Sự kiện đóng modal
    modal.querySelector('.close-btn').onclick = () => {
        modal.style.display = 'none';
    };
    modal.querySelector('#close-package-btn').onclick = () => {
        modal.style.display = 'none';
    };

    // Sự kiện lưu gói tập
    modal.querySelector('#save-package-btn').onclick = () => {
        savePackage(modal);
    };
}

// Hàm lưu gói tập
function savePackage(modal) {
    const packages = getAllPackages();

    // Lấy thông tin từ form
    const packageId = modal.querySelector('#new-package-id').value;
    const packageName = modal.querySelector('#new-package-name').value;
    const packageDuration = parseInt(modal.querySelector('#new-package-duration').value);
    const packagePrice = parseInt(modal.querySelector('#new-package-price').value);

    // Kiểm tra thông tin bắt buộc
    if (!packageName || !packageDuration || !packagePrice) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc (Tên gói, Thời lượng, Chi phí)');
        return;
    }

    // Tạo đối tượng gói tập mới
    const newPackage = {
        id: packageId,
        name: packageName,
        duration: packageDuration,
        price: packagePrice,
        status: packageStatus
    };

    // Thêm gói tập mới hoặc cập nhật gói tập cũ
    const existingIndex = packages.findIndex(p => p.id === packageId);
    if (existingIndex !== -1) {
        packages[existingIndex] = newPackage;
    } else {
        packages.push(newPackage);
    }

    // Đóng modal
    modal.style.display = 'none';

    // Cập nhật giao diện
    renderData();
    localStorage.setItem('packages', JSON.stringify(packages));
}

// Hàm xem chi tiết nhà cung cấp
function viewNCC(supplierId) {
    const suppliers = getAllNCC();
    const supplier = suppliers.find(s => s.id === supplierId);
    if (!supplier) return;

    const modal = document.getElementById('supplier-modal');
    if (!modal) return;

    // Điền dữ liệu vào modal
    document.getElementById('supplier-id').value = supplier.id;
    document.getElementById('supplier-code').value = supplier.id;
    document.getElementById('supplier-name').value = supplier.name;
    document.getElementById('supplier-phone').value = supplier.phone || '';
    document.getElementById('supplier-email').value = supplier.email || '';
    document.getElementById('supplier-address').value = supplier.address || '';

    // Đặt tiêu đề modal
    modal.querySelector('#supplier-modal-title').textContent = 'CHI TIẾT NHÀ CUNG CẤP';

    // Hiển thị modal
    modal.style.display = 'block';

    // Vô hiệu hóa tất cả các trường input
    modal.querySelectorAll('input, textarea').forEach(input => {
        input.disabled = true;
    });

    // Ẩn nút Lưu
    document.getElementById('save-supplier-btn').style.display = 'none';

    // Sự kiện đóng modal
    setupModalCloseHandlers(modal);
}

// Hàm chỉnh sửa nhà cung cấp
function editNCC(supplierId) {
    const suppliers = getAllNCC();
    const supplier = suppliers.find(s => s.id === supplierId);
    if (!supplier) return;

    const modal = document.getElementById('supplier-modal');
    if (!modal) return;

    // Điền dữ liệu vào modal
    document.getElementById('supplier-id').value = supplier.id;
    document.getElementById('supplier-code').value = supplier.id;
    document.getElementById('supplier-name').value = supplier.name;
    document.getElementById('supplier-phone').value = supplier.phone || '';
    document.getElementById('supplier-email').value = supplier.email || '';
    document.getElementById('supplier-address').value = supplier.address || '';

    // Đặt tiêu đề modal
    modal.querySelector('#supplier-modal-title').textContent = 'CHỈNH SỬA NHÀ CUNG CẤP';

    // Hiển thị modal
    modal.style.display = 'block';

    // Kích hoạt tất cả các trường input
    modal.querySelectorAll('input, textarea').forEach(input => {
        input.disabled = false;
    });

    // Hiển thị nút Lưu
    document.getElementById('save-supplier-btn').style.display = 'inline-block';

    // Sự kiện đóng modal
    setupModalCloseHandlers(modal);
}

// Hàm xóa nhà cung cấp
function deleteNCC(supplierId) {
    if (!confirm('Bạn có chắc chắn muốn xóa nhà cung cấp này?')) {
        return;
    }

    const suppliers = getAllNCC();
    const supplierIndex = suppliers.findIndex(s => s.id === supplierId);

    if (supplierIndex !== -1) {
        suppliers.splice(supplierIndex, 1);
        localStorage.setItem('suppliers', JSON.stringify(suppliers));

        // Hiển thị thông báo thành công
        alert('Xóa nhà cung cấp thành công!');

        // Cập nhật lại bảng
        renderData();
    } else {
        alert('Không tìm thấy nhà cung cấp để xóa');
    }
}

// Hàm thêm mới nhà cung cấp
function showAddNCCModal() {
    const suppliers = getAllNCC();
    const modal = document.getElementById('supplier-modal');
    if (!modal) return;

    // Reset form
    document.getElementById('supplier-id').value = '';
    document.getElementById('supplier-code').value = `NCC${String(suppliers.length + 1).padStart(3, '0')}`;
    document.getElementById('supplier-name').value = '';
    document.getElementById('supplier-phone').value = '';
    document.getElementById('supplier-email').value = '';
    document.getElementById('supplier-address').value = '';

    // Đặt tiêu đề modal
    modal.querySelector('#supplier-modal-title').textContent = 'THÊM MỚI NHÀ CUNG CẤP';

    // Hiển thị modal
    modal.style.display = 'block';

    // Kích hoạt tất cả các trường input
    modal.querySelectorAll('input, textarea').forEach(input => {
        input.disabled = false;
    });

    // Hiển thị nút Lưu
    document.getElementById('save-supplier-btn').style.display = 'inline-block';

    // Sự kiện đóng modal
    setupModalCloseHandlers(modal);
}

// Hàm lưu nhà cung cấp
function saveNCC() {
    const modal = document.getElementById('supplier-modal');
    if (!modal) return;

    const suppliers = getAllNCC();

    // Lấy thông tin từ form
    const id = document.getElementById('supplier-id').value;
    const code = document.getElementById('supplier-code').value;
    const name = document.getElementById('supplier-name').value.trim();
    const phone = document.getElementById('supplier-phone').value.trim();
    const email = document.getElementById('supplier-email').value.trim();
    const address = document.getElementById('supplier-address').value.trim();

    // Kiểm tra thông tin bắt buộc
    if (!name) {
        alert('Vui lòng nhập tên nhà cung cấp');
        return;
    }

    // Tạo đối tượng nhà cung cấp mới
    const newSupplier = {
        id: code,
        name,
        phone,
        email,
        address,
        note
    };

    // Thêm nhà cung cấp mới hoặc cập nhật nhà cung cấp cũ
    if (id) {
        // Chỉnh sửa nhà cung cấp hiện có
        const existingIndex = suppliers.findIndex(s => s.id === id);
        if (existingIndex !== -1) {
            suppliers[existingIndex] = newSupplier;
        }
    } else {
        // Thêm nhà cung cấp mới
        suppliers.push(newSupplier);
    }

    // Lưu vào localStorage
    localStorage.setItem('suppliers', JSON.stringify(suppliers));

    // Đóng modal
    modal.style.display = 'none';

    // Cập nhật giao diện
    renderData();
}


function initEventListeners() {
    const tableType = detectTableType();

    // 1. Thiết lập các bộ lọc
    // Filter selects
    [document.getElementById('status-filter'),
    document.getElementById('bill-filter'),
    document.getElementById('payment-filter')]
        .filter(select => select && !Array.from(select.options).some(option => option.text === 'Tất cả'))
        .forEach(select => {
            const allOption = document.createElement('option');
            allOption.text = 'Tất cả';
            select.insertBefore(allOption, select.firstChild);
            allOption.selected = true;
        });

    // Filter inputs
    [
        { el: document.querySelector('input[placeholder="Theo mã Hóa đơn"]'), event: 'input' },
        { el: document.querySelector('input[placeholder="Theo mã hàng, tên hàng"]'), event: 'input' },
        { el: document.querySelector('input[placeholder="Theo tên khách, số điện thoại"]'), event: 'input' },
        { el: document.querySelector('input[placeholder="Theo mã phiếu nhập"]'), event: 'input' },
        { el: document.querySelector('input[placeholder="Theo mã, tên NCC"]'), event: 'input' },
        { el: document.getElementById('time-start-user'), event: 'change' },
        { el: document.getElementById('time-end-user'), event: 'change' },
        { el: document.getElementById('status-filter'), event: 'change' },
        { el: document.getElementById('bill-filter'), event: 'change' },
        { el: document.getElementById('payment-filter'), event: 'change' },
        { el: document.querySelector('.records-per-page'), event: 'change' }
    ].forEach(({ el, event }) => {
        if (el) el.addEventListener(event, () => event === 'input' ? debounce(renderData, 300)() : renderData());
    });

    // Radio filters
    document.querySelectorAll('input[type="radio"][name="status-filter"]')
        .forEach(radio => radio.addEventListener('change', renderData));

    // 2. Thiết lập các nút chức năng
    // Common buttons
    [
        {
            selector: '.ban-hang_btn', action:
                tableType === 'BanHang' ? showSellModal :
                    tableType === 'NCC' ? showAddNCCModal :
                        tableType === 'ThongTinKhoHang' ? showAddProductModal :
                            showImportModal
        },
        {
            selector: '.xuat-file_btn', action: async () => {
                const btn = document.querySelector('.xuat-file_btn');
                if (!btn) return;
                try {
                    btn.disabled = true;
                    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xuất file...';
                    await loadXLSXLibrary();
                    await exportToExcel();
                } catch (error) {
                    console.error('Export failed:', error);
                    alert('Không thể xuất file Excel. Vui lòng thử lại sau.');
                } finally {
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fa-solid fa-file-excel"></i> Xuất file';
                }
            }
        },
        { selector: '.option_btn', action: toggleSidebar },
        { selector: '.them-goitap_btn', action: showPackageModal },
        { selector: '#save-supplier-btn', action: saveNCC }
    ].forEach(({ selector, action }) => {
        const btn = document.querySelector(selector);
        if (btn) btn.addEventListener('click', action);
    });

    // Modal close buttons
    document.querySelectorAll('.close-btn, .close-btn-footer').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.backdrop');
            if (modal) modal.style.display = 'none';
        });
    });

    // 3. Thiết lập phân trang và sắp xếp
    // Pagination
    const recordsPerPageSelect = document.querySelector('.records-per-page');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (window.currentPage > 1) {
                window.currentPage--;
                renderData();
            }
        });

        nextBtn.addEventListener('click', () => {
            const totalRecords = getFilteredDataCount();
            const recordsPerPage = parseInt(recordsPerPageSelect?.value || 10);
            const totalPages = Math.ceil(totalRecords / recordsPerPage);
            if (window.currentPage < totalPages) window.currentPage++;
            renderData();
        });
    }

    if (recordsPerPageSelect) {
        recordsPerPageSelect.addEventListener('change', () => {
            window.currentPage = 1;
            renderData();
        });
    }

    // Sorting
    setupSortableHeaders();

    // 4. Xử lý các hành động trong bảng
    document.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        if (!row) return;

        const idCell = row.querySelector('td:nth-child(2)');
        if (!idCell) return;

        const id = idCell.textContent;

        if (e.target.closest('.view-btn')) {
            if (tableType === 'BanHang') viewInvoice(id);
            else if (tableType === 'NhapHang') viewImport(id);
            else if (tableType === 'NCC') viewNCC(id);
        }
        else if (e.target.closest('.edit-btn')) {
            if (tableType === 'BanHang') editInvoice(id);
            else if (tableType === 'NhapHang') editImport(id);
            else if (tableType === 'NCC') editNCC(id);
        }
        else if (e.target.closest('.delete-btn')) {
            e.preventDefault();
            if (tableType === 'ThongTinKhoHang') deleteProduct(id);
            else if (tableType === 'NCC') deleteNCC(id);
        }
    });

    // 5. Các sự kiện đặc biệt
    // Tooltip
    document.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'TD' && e.target.textContent.length > 20) {
            e.target.setAttribute('title', e.target.textContent);
        }
    });

    // Product management
    if (tableType === 'ThongTinKhoHang') {
        document.querySelector('.ban-hang_btn')?.addEventListener('click', showAddProductModal);
        document.getElementById('confirm-add-product')?.addEventListener('click', saveProduct);
        setupImageUpload();
    }
}

function init() {
    console.log('Initializing application...');

    // 1. Khởi tạo dữ liệu cơ bản
    if (!window.products) {
        window.products = getAllProducts();

        // Nếu localStorage trống, lưu dữ liệu mẫu vào
        if (!localStorage.getItem('products')) {
            localStorage.setItem('products', JSON.stringify(products));
        }
    }
    if (!window.products) {
        window.products = getAllProducts();

        // Nếu localStorage trống, lưu dữ liệu mẫu vào
        if (!localStorage.getItem('products')) {
            localStorage.setItem('products', JSON.stringify(products));
        }
    }

    if (!window.imports) {
        window.imports = getAllImports();
        if (!localStorage.getItem('imports')) {
            localStorage.setItem('imports', JSON.stringify(imports));
        }
    }

    if (!window.products) {
        window.products = getAllNCC();

        // Nếu localStorage trống, lưu dữ liệu mẫu vào
        if (!localStorage.getItem('suppliers')) {
            localStorage.setItem('suppliers', JSON.stringify(suppliers));
        }
    }

    // 2. Khởi tạo các thành phần UI
    initializeDateInputs();
    validateDateInputs();
    setupPagination();

    currentSort = {
        field: 'id', // Mặc định sắp xếp theo mã (id)
        direction: 'asc' // Mặc định sắp xếp tăng dần
    };

    // 3. Thiết lập sắp xếp
    setupSortableHeaders();
    updateSortIcons();

    // 4. Thiết lập event listeners
    initEventListeners();

    // 5. Hiển thị dữ liệu ban đầu
    updateDashboardSummary();
    renderData();

    console.log('Application initialized successfully');
}


// Khởi chạy khi trang đã tải xong
document.addEventListener('DOMContentLoaded', init);



