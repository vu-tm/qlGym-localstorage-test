let invoices = [
    {
        id: 'HD001',
        time: '2025-05-01',
        customerName: 'Nguyễn Phúc Minh Khang',
        phone: '0912345678',
        totalAmount: 159000, // 2 * 30000 + 1 * 99000
        status: 'Hoàn thành',
        type: 'Bán hàng',
        paymentMethod: 'Tiền mặt',
        items: [
            { name: 'Đôi tất thể thao', quantity: 2, price: 30000 },
            { name: 'Bao tay tập gym', quantity: 1, price: 99000 }
        ]
    },
    {
        id: 'HD002',
        time: '2025-05-01',
        customerName: 'Vũ Duy Sơn',
        phone: '0987654321',
        totalAmount: 450000, // 1 * 450000
        status: 'Phiếu tạm',
        type: 'Bán vé',
        paymentMethod: 'Chuyển khoản',
        items: [
            { name: 'Gói người lớn 1 tháng', quantity: 1, price: 450000 }
        ]
    },
    {
        id: 'HD003',
        time: '2025-05-02',
        customerName: 'Chu Minh Tân',
        phone: '0976543210',
        totalAmount: 198000, // 2 * 99000
        status: 'Hoàn thành',
        type: 'Bán hàng',
        paymentMethod: 'Tiền mặt',
        items: [
            { name: 'Bao tay tập gym', quantity: 2, price: 99000 }
        ]
    },
    {
        id: 'HD004',
        time: '2025-05-03',
        customerName: 'Lê Công Phát',
        phone: '0932145678',
        totalAmount: 1000000, // 1 * 850000 + 1 * 150000
        status: 'Đã hủy',
        type: 'Bán hàng',
        paymentMethod: 'Chuyển khoản',
        items: [
            { name: 'Dây đeo cổ tay', quantity: 1, price: 850000 },
            { name: 'Băng quấn đầu gối', quantity: 1, price: 150000 }
        ]
    },
    {
        id: 'HD005',
        time: '2025-05-03',
        customerName: 'Nguyễn Đình Trung',
        phone: '0923456789',
        totalAmount: 130000, // 2 * 65000
        status: 'Hoàn thành',
        type: 'Bán hàng',
        paymentMethod: 'Khác',
        items: [
            { name: 'Khăn tập', quantity: 2, price: 65000 }
        ]
    },
    {
        id: 'HD006',
        time: '2025-05-04',
        customerName: 'Phạm Thế Anh',
        phone: '0945678901',
        totalAmount: 1080000, // 1 * 1080000
        status: 'Phiếu tạm',
        type: 'Bán vé',
        paymentMethod: 'Tiền mặt',
        items: [
            { name: 'Gói người lớn 3 tháng', quantity: 1, price: 1080000 }
        ]
    },
    {
        id: 'HD007',
        time: '2025-05-04',
        customerName: 'Đỗ Văn G',
        phone: '0967890123',
        totalAmount: 325000, // 5 * 65000
        status: 'Hoàn thành',
        type: 'Bán hàng',
        paymentMethod: 'Chuyển khoản',
        items: [
            { name: 'Khăn tập', quantity: 5, price: 65000 }
        ]
    },
    {
        id: 'HD008',
        time: '2025-05-05',
        customerName: 'Bùi Thị H',
        phone: '0956789012',
        totalAmount: 350000, // 1 * 350000
        status: 'Đã hủy',
        type: 'Bán vé',
        paymentMethod: 'Khác',
        items: [
            { name: 'Gói học sinh 1 tháng', quantity: 1, price: 350000 }
        ]
    },
    {
        id: 'HD009',
        time: '2025-05-05',
        customerName: 'Vũ Văn I',
        phone: '0919876543',
        totalAmount: 600000, // 3 * 200000
        status: 'Hoàn thành',
        type: 'Bán hàng',
        paymentMethod: 'Tiền mặt',
        items: [
            { name: 'Bình nước thể thao', quantity: 3, price: 200000 }
        ]
    },
    {
        id: 'HD010',
        time: '2025-05-01',
        customerName: 'Lý Thị K',
        phone: '0934567890',
        totalAmount: 1680000, // 2 * 840000
        status: 'Phiếu tạm',
        type: 'Bán vé',
        paymentMethod: 'Chuyển khoản',
        items: [
            { name: 'Gói học sinh 3 tháng', quantity: 2, price: 840000 }
        ]
    },
    {
        id: 'HD011',
        time: '2025-05-01',
        customerName: 'Trương Văn L',
        phone: '0971234567',
        totalAmount: 420000, // 2 * 200000 + 2 * 10000
        status: 'Hoàn thành',
        type: 'Bán hàng',
        paymentMethod: 'Tiền mặt',
        items: [
            { name: 'Bình nước thể thao', quantity: 2, price: 200000 },
            { name: 'Nước suối', quantity: 2, price: 10000 }
        ]
    },
    {
        id: 'HD012',
        time: '2025-05-02',
        customerName: 'Hà Thị M',
        phone: '0982345678',
        totalAmount: 1570000, // 1 * 1570000
        status: 'Đã hủy',
        type: 'Bán vé',
        paymentMethod: 'Khác',
        items: [
            { name: 'Gói học sinh 6 tháng', quantity: 1, price: 1570000 }
        ]
    },
    {
        id: 'HD013',
        time: '2025-05-02',
        customerName: 'Đinh Văn N',
        phone: '0963456789',
        totalAmount: 40000, // 2 * 20000
        status: 'Hoàn thành',
        type: 'Bán hàng',
        paymentMethod: 'Chuyển khoản',
        items: [
            { name: 'Nước tăng lực RedBull', quantity: 2, price: 20000 }
        ]
    },
    {
        id: 'HD014',
        time: '2025-05-03',
        customerName: 'Phan Thị O',
        phone: '0945671234',
        totalAmount: 400000, // 1 * 400000
        status: 'Phiếu tạm',
        type: 'Bán hàng',
        paymentMethod: 'Tiền mặt',
        items: [
            { name: 'Bột Whey Protein', quantity: 1, price: 400000 }
        ]
    },
    {
        id: 'HD015',
        time: '2025-05-03',
        customerName: 'Mai Văn P',
        phone: '0926789012',
        totalAmount: 5800000, // 2 * 2900000
        status: 'Hoàn thành',
        type: 'Bán vé',
        paymentMethod: 'Khác',
        items: [
            { name: 'Gói học sinh 12 tháng', quantity: 2, price: 2900000 }
        ]
    },
    {
        id: 'HD016',
        time: '2025-05-04',
        customerName: 'Lương Thị Q',
        phone: '0913456789',
        totalAmount: 24000, // 2 * 12000
        status: 'Đã hủy',
        type: 'Bán vé',
        paymentMethod: 'Chuyển khoản',
        items: [
            { name: 'Nước tăng lực number 1', quantity: 2, price: 12000 }
        ]
    },
    {
        id: 'HD017',
        time: '2025-05-04',
        customerName: 'Nguyễn Văn R',
        phone: '0989012345',
        totalAmount: 160000, // 4 * 40000
        status: 'Hoàn thành',
        type: 'Bán hàng',
        paymentMethod: 'Tiền mặt',
        items: [
            { name: 'Bánh protein', quantity: 4, price: 40000 }
        ]
    },
    {
        id: 'HD018',
        time: '2025-05-05',
        customerName: 'Trần Thị S',
        phone: '0978901234',
        totalAmount: 800000, // 2 * 400000
        status: 'Phiếu tạm',
        type: 'Bán vé',
        paymentMethod: 'Khác',
        items: [
            { name: 'Bột Whey Protein', quantity: 2, price: 400000 }
        ]
    },
    {
        id: 'HD019',
        time: '2025-05-05',
        customerName: 'Lê Văn T',
        phone: '0961234567',
        totalAmount: 7560000, // 2 * 3780000
        status: 'Hoàn thành',
        type: 'Bán vé',
        paymentMethod: 'Chuyển khoản',
        items: [
            { name: 'Gói người lớn 12 tháng', quantity: 2, price: 3780000 }
        ]
    },
    {
        id: 'HD020',
        time: '2025-05-05',
        customerName: 'Phạm Thị U',
        phone: '0941234567',
        totalAmount: 4000000, // 2 * 2000000
        status: 'Đã hủy',
        type: 'Bán vé',
        paymentMethod: 'Tiền mặt',
        items: [
            { name: 'Gói người lớn 6 tháng', quantity: 2, price: 2000000 }
        ]
    }
];

let products = [
    {
        id: 'SP001',
        name: 'Bột Whey Protein',
        sellPrice: 400000,
        buyPrice: 20000,
        stock: 50,
        image: '../../img/whey-protein.webp',
        status: 'Đang bán'
    },
    {
        id: 'SP002',
        name: 'Đôi tất thể thao',
        sellPrice: 30000,
        buyPrice: 50000,
        stock: 50,
        image: '../../img/pair-socks-sport.png',
        status: 'Đang bán'
    },
    {
        id: 'SP003',
        name: 'Dây nhảy thể dục',
        sellPrice: 100000,
        buyPrice: 80000,
        stock: 40,
        image: '../../img/day-nhay.png',
        status: 'Ngừng bán'
    },
    {
        id: 'SP004',
        name: 'Băng quấn đầu gối',
        sellPrice: 150000,
        buyPrice: 90000,
        stock: 35,
        image: '../../img/knee-wraps.webp',
        status: 'Đang bán'
    },
    {
        id: 'SP005',
        name: 'Nước tăng lực RedBull',
        sellPrice: 20000,
        buyPrice: 12000,
        stock: 0,
        image: '../../img/redbull.png',
        status: 'Đang bán'
    },
    {
        id: 'SP006',
        name: 'Bình nước thể thao',
        sellPrice: 200000,
        buyPrice: 130000,
        stock: 25,
        image: '../../img/bottle.png',
        status: 'Đang bán'
    },
    {
        id: 'SP007',
        name: 'Máy chạy bộ điện',
        sellPrice: 15000000,
        buyPrice: 12000000,
        stock: 5,
        image: '../../img/may-chay.png',
        status: 'Ngừng bán'
    },
    {
        id: 'SP008',
        name: 'Tạ đĩa 10kg',
        sellPrice: 250000,
        buyPrice: 200000,
        stock: 50,
        image: '../../img/dia-ta.png',
        status: 'Ngừng bán'
    },
    {
        id: 'SP009',
        name: 'Máy tập xà đơn',
        sellPrice: 1200000,
        buyPrice: 950000,
        stock: 10,
        image: '../../img/xa-don.webp',
        status: 'Ngừng bán'
    },
    {
        id: 'SP010',
        name: 'Ghế tập tạ',
        sellPrice: 3000000,
        buyPrice: 2500000,
        stock: 8,
        image: '../../img/ghe-ta.png',
        status: 'Ngừng bán'
    },
    {
        id: 'SP011',
        name: 'Khăn tập',
        sellPrice: 65000,
        buyPrice: 40000,
        stock: 275,
        image: '../../img/microfiber.png',
        status: 'Đang bán'
    },
    {
        id: 'SP012',
        name: 'Nước suối',
        sellPrice: 10000,
        buyPrice: 4000,
        stock: 15,
        image: '../../img/lavie.png',
        status: 'Đang bán'
    },
    {
        id: 'SP013',
        name: 'Bóng tập Yoga',
        sellPrice: 150000,
        buyPrice: 120000,
        stock: 20,
        image: '../../img/bong-yoga.png',
        status: 'Ngừng bán'
    },
    {
        id: 'SP014',
        name: 'Bánh protein',
        sellPrice: 40000,
        buyPrice: 25000,
        stock: 30,
        image: '../../img/bar-protein.png',
        status: 'Đang bán'
    },
    {
        id: 'SP015',
        name: 'Nước tăng lực number 1',
        sellPrice: 12000,
        buyPrice: 8000,
        stock: 0,
        image: '../../img/so1.png',
        status: 'Đang bán'
    },
    {
        id: 'SP016',
        name: 'Bao tay tập gym',
        sellPrice: 99000,
        buyPrice: 70000,
        stock: 35,
        image: '../../img/gym-gloves.png',
        status: 'Đang bán'
    },
    {
        id: 'SP017',
        name: 'Thảm tập cao cấp',
        sellPrice: 200000,
        buyPrice: 150000,
        stock: 30,
        image: '../../img/tham.png',
        status: 'Ngừng bán'
    },
    {
        id: 'SP018',
        name: 'Dây kháng lực',
        sellPrice: 150000,
        buyPrice: 120000,
        stock: 60,
        image: '../../img/day-khang-luc.png',
        status: 'Ngừng bán'
    },
    {
        id: 'SP019',
        name: 'Giàn tạ đa năng',
        sellPrice: 10000000,
        buyPrice: 8500000,
        stock: 3,
        image: '../../img/gian-ta.webp    ',
        status: 'Ngừng bán'
    },
    {
        id: 'SP020',
        name: 'Dây đeo cổ tay',
        sellPrice: 850000,
        buyPrice: 700000,
        stock: 10,
        image: '../../img/wrist-wrap.png',
        status: 'Đang bán'
    }
];


let imports = [
    {
        id: "PN001",
        supplierName: "Công ty CP Thiết Bị Giáo dục và Đồ Chơi Bình Dương",
        time: "2025-05-02",
        items: [
            { id: "SP012", name: "Dây nhảy thể dục", quantity: 20, price: 80000 },
            { id: "SP018", name: "Tạ đĩa 10kg", quantity: 15, price: 200000 }
        ],
        totalAmount: 4600000,
        paidAmount: 2000000,
        status: "Phiếu tạm"
    },
    {
        id: "PN002",
        supplierName: "Công ty TNHH Thể Thao Thiên Trường",
        time: "2025-05-03",
        items: [
            { id: "SP014", name: "Ghế tập tạ", quantity: 3, price: 2500000 },
            { id: "SP015", name: "Bóng tập Yoga", quantity: 10, price: 120000 }
        ],
        totalAmount: 8700000,
        paidAmount: 8700000,
        status: "Đã nhập"
    },
    {
        id: "PN003",
        supplierName: "Công ty TNHH TM Thanh Oánh",
        time: "2025-05-05",
        items: [
            { id: "SP013", name: "Máy chạy bộ điện", quantity: 2, price: 12000000 },
            { id: "SP016", name: "Thảm tập cao cấp", quantity: 15, price: 150000 }
        ],
        totalAmount: 26250000,
        paidAmount: 15000000,
        status: "Phiếu tạm"
    },
    {
        id: "PN004",
        supplierName: "Công ty TNHH Thể Thao Đông Á Việt Nam",
        time: "2025-05-07",
        items: [
            { id: "SP017", name: "Giàn tạ đa năng", quantity: 1, price: 8500000 },
            { id: "SP018", name: "Tạ đĩa 10kg", quantity: 10, price: 200000 }
        ],
        totalAmount: 10500000,
        paidAmount: 10500000,
        status: "Đã nhập"
    },
    {
        id: "PN005",
        supplierName: "Công ty Cổ phần CN Sport Việt Nam",
        time: "2025-05-08",
        items: [
            { id: "SP019", name: "Dây kháng lực", quantity: 30, price: 120000 },
            { id: "SP003", name: "Dây đeo cổ tay", quantity: 25, price: 700000 }
        ],
        totalAmount: 21100000,
        paidAmount: 3000000,
        status: "Hủy hàng"
    },
    {
        id: "PN006",
        supplierName: "Công ty TNHH Thể Thao Minh Phú",
        time: "2025-05-00",
        items: [
            { id: "SP020", name: "Xà đơn đa năng", quantity: 5, price: 950000 },
            { id: "SP006", name: "Bình nước thể thao", quantity: 20, price: 130000 }
        ],
        totalAmount: 7350000,
        paidAmount: 6350000,
        status: "Đã nhập"
    },
    {
        id: "PN007",
        supplierName: "Công ty TNHH MTV Thương mại và Dịch vụ Trần An",
        time: "2025-05-02",
        items: [
            { id: "SP002", name: "Bao tay tập gym", quantity: 15, price: 70000 },
            { id: "SP003", name: "Dây đeo cổ tay", quantity: 10, price: 700000 }
        ],
        totalAmount: 8050000,
        paidAmount: 3000000,
        status: "Phiếu tạm"
    },
    {
        id: "PN008",
        supplierName: "Công ty TNHH Thể thao Minh Toàn",
        time: "2025-05-04",
        items: [
            { id: "SP009", name: "Bột Whey Protein", quantity: 8, price: 20000 },
            { id: "SP005", name: "Khăn tập", quantity: 50, price: 40000 }
        ],
        totalAmount: 2160000,
        paidAmount: 2160000,
        status: "Đã nhập"
    },
    {
        id: "PN009",
        supplierName: "Công Ty TNHH Sản Xuất Đầu Tư Tân Hoàng Nguyên",
        time: "2025-05-05",
        items: [
            { id: "SP001", name: "Đôi tất thể thao", quantity: 25, price: 50000 },
            { id: "SP004", name: "Băng quấn đầu gối", quantity: 10, price: 90000 }
        ],
        totalAmount: 2150000,
        paidAmount: 2150000,
        status: "Phiếu tạm"
    },
    {
        id: "PN010",
        supplierName: "Công Ty TNHH Thể Thao Poca",
        time: "2025-05-06",
        items: [
            { id: "SP011", name: "Bánh protein", quantity: 40, price: 25000 },
            { id: "SP005", name: "Khăn tập", quantity: 50, price: 40000 }
        ],
        totalAmount: 3000000,
        paidAmount: 3000000,
        status: "Đã nhập"
    },
    {
        id: "PN011",
        supplierName: "Hộ Kinh Doanh Dụng Cụ Thể Thao Hà Vy",
        time: "2025-05-08",
        items: [
            { id: "SP013", name: "Máy chạy bộ điện", quantity: 3, price: 12000000 },
            { id: "SP004", name: "Băng quấn đầu gối", quantity: 15, price: 90000 }
        ],
        totalAmount: 37350000,
        paidAmount: 37350000,
        status: "Đã nhập"
    },
    {
        id: "PN012",
        supplierName: "Công Ty TNHH Đầu Tư Thanh Thịnh",
        time: "2025-05-09",
        items: [
            { id: "SP006", name: "Bình nước thể thao", quantity: 20, price: 130000 },
            { id: "SP009", name: "Bột Whey Protein", quantity: 30, price: 20000 }
        ],
        totalAmount: 3200000,
        paidAmount: 3200000,
        status: "Phiếu tạm"
    },
    {
        id: "PN013",
        supplierName: "CH Lan Nhi",
        time: "2025-05-01",
        items: [
            { id: "SP001", name: "Đôi tất thể thao", quantity: 15, price: 50000 },
            { id: "SP012", name: "Dây nhảy thể dục", quantity: 10, price: 80000 }
        ],
        totalAmount: 1550000,
        paidAmount: 1550000,
        status: "Đã nhập"
    },
    {
        id: "PN014",
        supplierName: "CH Hưng - Cần Thơ",
        time: "2025-05-01",
        items: [
            { id: "SP015", name: "Bóng tập Yoga", quantity: 8, price: 120000 },
            { id: "SP016", name: "Thảm tập cao cấp", quantity: 15, price: 150000 }
        ],
        totalAmount: 3210000,
        paidAmount: 2000000,
        status: "Hủy hàng"
    },
    {
        id: "PN015",
        supplierName: "Siêu Thị Dụng cụ Thể thao Thái Hiền",
        time: "2025-05-04",
        items: [
            { id: "SP013", name: "Máy chạy bộ điện", quantity: 5, price: 12000000 },
            { id: "SP017", name: "Giàn tạ đa năng", quantity: 10, price: 8500000 }
        ],
        totalAmount: 145000000,
        paidAmount: 145000000,
        status: "Đã nhập"
    },
    {
        id: "PN016",
        supplierName: "Cửa hàng Quốc Thy - Sports",
        time: "2025-05-02",
        items: [
            { id: "SP002", name: "Bao tay tập gym", quantity: 20, price: 70000 },
            { id: "SP011", name: "Bánh protein", quantity: 30, price: 25000 }
        ],
        totalAmount: 2150000,
        paidAmount: 2150000,
        status: "Đã nhập"
    },
    {
        id: "PN017",
        supplierName: "Trung tâm Thiết bị Hợp Nhất Gia Lai",
        time: "2025-05-03",
        items: [
            { id: "SP014", name: "Ghế tập tạ", quantity: 2, price: 2500000 },
            { id: "SP019", name: "Dây kháng lực", quantity: 25, price: 120000 }
        ],
        totalAmount: 8000000,
        paidAmount: 4000000,
        status: "Phiếu tạm"
    },
    {
        id: "PN018",
        supplierName: "Công ty CP Thiết Bị Giáo dục và Đồ Chơi Bình Dương",
        time: "2025-05-05",
        items: [
            { id: "SP006", name: "Bình nước thể thao", quantity: 15, price: 130000 },
            { id: "SP001", name: "Đôi tất thể thao", quantity: 20, price: 50000 }
        ],
        totalAmount: 2950000,
        paidAmount: 2950000,
        status: "Đã nhập"
    },
    {
        id: "PN019",
        supplierName: "Công ty TNHH Thể Thao Thiên Trường",
        time: "2025-05-07",
        items: [
            { id: "SP020", name: "Xà đơn đa năng", quantity: 4, price: 950000 },
            { id: "SP016", name: "Thảm tập cao cấp", quantity: 10, price: 150000 }
        ],
        totalAmount: 5300000,
        paidAmount: 5300000,
        status: "Đã nhập"
    },
    {
        id: "PN020",
        supplierName: "Công Ty TNHH Sản Xuất Đầu Tư Tân Hoàng Nguyên",
        time: "2025-05-00",
        items: [
            { id: "SP004", name: "Băng quấn đầu gối", quantity: 12, price: 90000 },
            { id: "SP009", name: "Bột Whey Protein", quantity: 20, price: 20000 }
        ],
        totalAmount: 1480000,
        paidAmount: 1480000,
        status: "Phiếu tạm"
    }
];



const packages = [
    { id: "GT001", name: "Gói người lớn 1 tháng", duration: 30, price: 450000 },
    { id: "GT002", name: "Gói người lớn 3 tháng", duration: 90, price: 1080000 },
    { id: "GT003", name: "Gói người lớn 6 tháng", duration: 180, price: 2000000 },
    { id: "GT004", name: "Gói người lớn 12 tháng", duration: 365, price: 3780000 },
    { id: "GT005", name: "Gói học sinh 1 tháng", duration: 30, price: 350000 },
    { id: "GT006", name: "Gói học sinh 3 tháng", duration: 90, price: 840000 },
    { id: "GT007", name: "Gói học sinh 6 tháng", duration: 180, price: 1570000 },
    { id: "GT008", name: "Gói học sinh 12 tháng", duration: 365, price: 2900000 }
];

const suppliers = [
    {
        id: 'NCC001',
        name: 'Công ty CP Thiết Bị Giáo dục và Đồ Chơi Bình Dương',
        phone: '0982936666',
        email: 'info@binhduongtoys.vn',
        address: 'Số 18, Ngách 7, Ngõ 381 Nguyễn Khang, P. Yên Hòa, Q. Cầu Giấy, Tp. Hà Nội'
    },
    {
        id: 'NCC002',
        name: 'Công ty TNHH Thể Thao Thiên Trường',
        phone: '0916131402',
        email: 'contact@thientruongsport.vn',
        address: 'Số 34, ngách 28B, Phố Hạ Đình, P. Thanh Xuân Trung, Q. Thanh Xuân, Hà Nội'
    },
    {
        id: 'NCC003',
        name: 'Công ty TNHH TM Thanh Oánh',
        phone: '0918071495',
        email: 'sales@thanhoanh.vn',
        address: 'Tổ dân phố 6, P. Tân Thanh, TP. Điện Biên Phủ, T. Điện Biên'
    },
    {
        id: 'NCC004',
        name: 'Công ty TNHH Thể Thao Đông Á Việt Nam',
        phone: '0974227398',
        email: 'info@donga-sport.vn',
        address: 'Số 7 ngách 42/20 đường Yên Bình, tổ 15, P. Yên Nghĩa, Q. Hà Đông, Hà Nội'
    },
    {
        id: 'NCC005',
        name: 'Công ty Cổ phần CN Sport Việt Nam',
        phone: '0983899439',
        email: 'support@cnsport.vn',
        address: 'Số 6A1, ngõ 20, đường Nước Phần Lan, P. Tứ Liên, Q. Tây Hồ, Hà Nội'
    },
    {
        id: 'NCC006',
        name: 'Công ty TNHH Thể Thao Minh Phú',
        phone: '0985761115',
        email: 'contact@minhphusport.vn',
        address: 'Số 1, tổ 22, P. Phương Liên, Q. Đống Đa, Hà Nội'
    },
    {
        id: 'NCC007',
        name: 'Công ty TNHH MTV Thương mại và Dịch vụ Trần An',
        phone: '0775306666',
        email: 'info@tranansport.vn',
        address: 'Số 349A phố Bạch Đằng, P. Chương Dương, Q. Hoàn Kiếm, Hà Nội'
    },
    {
        id: 'NCC008',
        name: 'Công ty TNHH Thể thao Minh Toàn',
        phone: '0946169876',
        email: 'sales@minhtoansport.vn',
        address: 'Số 3 Ngõ 189 Giảng Võ, P. Cát Linh, Q. Đống Đa, Hà Nội'
    },
    {
        id: 'NCC009',
        name: 'Công Ty TNHH Sản Xuất Đầu Tư Tân Hoàng Nguyên',
        phone: '0906514983',
        email: 'contact@tanhoangnguyen.vn',
        address: '45 Thạch Thị Thanh, Phường Tân Định, Quận 1, TP. HCM'
    },
    {
        id: 'NCC010',
        name: 'Công Ty TNHH Thể Thao Poca',
        phone: '0988195636',
        email: 'info@pocasport.vn',
        address: '364 Nguyễn Văn Nghi, P. 7, Q. Gò Vấp, TP HCM'
    },
    {
        id: 'NCC011',
        name: 'Hộ Kinh Doanh Dụng Cụ Thể Thao Hà Vy',
        phone: '0909120139',
        email: 'sales@havy-sport.vn',
        address: '451A Nguyễn Đình Chiểu, Phường 5, Quận 3, TP HCM'
    },
    {
        id: 'NCC012',
        name: 'Công Ty TNHH Đầu Tư Thanh Thịnh',
        phone: '0908080304',
        email: 'contact@thanhthinh.vn',
        address: 'Lầu 6 tòa nhà TOJI, 384/1C Nam Kỳ Khởi Nghĩa, Phường 8, Quận 3, TP. HCM'
    },
    {
        id: 'NCC013',
        name: 'CH Lan Nhi',
        phone: '0917552556',
        email: 'info@lannhisport.vn',
        address: '18/11, Khu phố 3, P. Tân Hiệp, TP. Biên Hòa, Tỉnh Đồng Nai'
    },
    {
        id: 'NCC014',
        name: 'CH Hưng - Cần Thơ',
        phone: '0902696426',
        email: 'contact@hung-cantho.vn',
        address: '95B Đường 30/4, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ'
    },
    {
        id: 'NCC015',
        name: 'Siêu Thị Dụng cụ Thể thao Thái Hiền',
        phone: '0919314561',
        email: 'sales@thaihiensport.vn',
        address: '30/4, Tổ 10 Khu 12, Phường Chánh Nghĩa, TP. Thủ Dầu Một, Tỉnh Bình Dương'
    },
    {
        id: 'NCC016',
        name: 'Cửa hàng Quốc Thy - Sports',
        phone: '0913886091',
        email: 'info@quocthysport.vn',
        address: '38-40 Đường Nguyễn Trung Trực, Phường 1, TX. Bến Tre, Tỉnh Bến Tre'
    },
    {
        id: 'NCC017',
        name: 'Trung tâm Thiết bị Hợp Nhất Gia Lai',
        phone: '0901234567',
        email: 'contact@hopnhatgialai.vn',
        address: 'Số 32 Nguyễn Đình Chiểu, phường Tây Sơn, Tp. Pleiku, tỉnh Gia Lai'
    }
];