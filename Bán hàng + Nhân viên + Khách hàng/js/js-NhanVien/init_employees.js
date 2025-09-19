(function () {
  const sampleEmployees = [
    {
      "code": "NV001",
      "name": "Nguyễn Văn An",
      "phone": "0905123456",
      "email": "an.nguyen@example.com",
      "address": "123 Đường Láng, Đống Đa, Hà Nội",
      "dob": "12/09/1999",
      "sex": "Nam",
      "status": "Đang làm",
      "contractType": "Hợp đồng lao động",
      "salary": "15000000",
      "position": "Nhân viên",
      "photo": "img/bar-protein.png",
      "Shifts": [
        {
          "scheduleName": "Ca sáng",
          "startDate": "04/03/2025",
          "endDate": "12/03/2025",
          "cycle": "luân phiên"
        }
      ]
    },
    {
      "code": "NV002",
      "name": "Trần Thị Bình",
      "phone": "0987654321",
      "email": "binh.tran@example.com",
      "address": "45 Nguyễn Huệ, Quận 1, TP.HCM",
      "dob": "15/07/2002",
      "sex": "Nữ",
      "status": "Đang làm",
      "contractType": "Hợp đồng thử việc",
      "salary": "8000000",
      "position": "Quản lý kho",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca sáng",
          "startDate": "05/03/2025",
          "endDate": "07/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV003",
      "name": "Lê Minh Châu",
      "phone": "0912345678",
      "email": "chauminh@example.com",
      "address": "78 Trần Phú, Nha Trang, Khánh Hòa",
      "dob": "22/11/1997",
      "sex": "Nữ",
      "status": "Nghỉ việc",
      "contractType": "Cộng tác viên",
      "salary": "5000000",
      "position": "Huấn luyện viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca sáng",
          "startDate": "01/03/2025",
          "endDate": "03/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV004",
      "name": "Phạm Quốc Đạt",
      "phone": "0935123456",
      "email": "dat.pham@example.com",
      "address": "12 Lê Lợi, Đà Nẵng",
      "dob": "03/04/2000",
      "sex": "Nam",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "3000000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca tối",
          "startDate": "14/03/2025",
          "endDate": "16/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV046",
      "name": "Trần Thị Bảo",
      "phone": "0966334576",
      "email": "bao.tran@example.com",
      "address": "67 Trần Phú, Hà Nội",
      "dob": "28/02/1998",
      "sex": "Nữ",
      "status": "Đang làm",
      "contractType": "Hợp đồng lao động",
      "salary": "11900000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca sáng",
          "startDate": "20/03/2025",
          "endDate": "22/03/2025",
          "cycle": "Theo tuần"
        },
        {
          "scheduleName": "Ca sáng",
          "startDate": "16/03/2025",
          "endDate": "18/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV047",
      "name": "Lê Văn Khoa",
      "phone": "0977334577",
      "email": "khoa.le@example.com",
      "address": "98 Nguyễn Thái Học, Đà Nẵng",
      "dob": "10/06/2003",
      "sex": "Nam",
      "status": "Nghỉ việc",
      "contractType": "Hợp đồng thử việc",
      "salary": "7900000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca tối",
          "startDate": "07/03/2025",
          "endDate": "09/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV048",
      "name": "Phạm Thị Trang",
      "phone": "0988334578",
      "email": "trang.pham@example.com",
      "address": "19 Quang Trung, Hà Đông, Hà Nội",
      "dob": "19/08/2001",
      "sex": "Nữ",
      "status": "Đang làm",
      "contractType": "Cộng tác viên",
      "salary": "5900000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca chiều",
          "startDate": "06/03/2025",
          "endDate": "08/03/2025",
          "cycle": "luân phiên"
        },
        {
          "scheduleName": "Ca tối",
          "startDate": "16/03/2025",
          "endDate": "18/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV049",
      "name": "Vũ Văn Hưng",
      "phone": "0909334579",
      "email": "hung.vu@example.com",
      "address": "75 Nguyễn Chí Thanh, TP.HCM",
      "dob": "07/12/1996",
      "sex": "Nam",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "3400000",
      "position": "Huấn luyện viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca chiều",
          "startDate": "10/03/2025",
          "endDate": "12/03/2025",
          "cycle": "luân phiên"
        }
      ]
    },
    {
      "code": "NV050",
      "name": "Đỗ Thị Linh",
      "phone": "0910334580",
      "email": "linh.do@example.com",
      "address": "60 Lê Đại Hành, Hà Nội",
      "dob": "25/05/2004",
      "sex": "Nữ",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "13700000",
      "position": "Huấn luyện viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca chiều",
          "startDate": "04/03/2025",
          "endDate": "06/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV005",
      "name": "Nhân viên 5",
      "phone": "0909000005",
      "email": "nv5@example.com",
      "address": "Số 5 Đường ABC, TP.XYZ",
      "dob": "14/03/1999",
      "sex": "Nữ",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "5500000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca sáng",
          "startDate": "19/03/2025",
          "endDate": "21/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV006",
      "name": "Nhân viên 6",
      "phone": "0909000006",
      "email": "nv6@example.com",
      "address": "Số 6 Đường ABC, TP.XYZ",
      "dob": "30/09/2002",
      "sex": "Nam",
      "status": "Nghỉ việc",
      "contractType": "Thực tập",
      "salary": "5600000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca chiều",
          "startDate": "20/03/2025",
          "endDate": "22/03/2025",
          "cycle": "luân phiên"
        },
        {
          "scheduleName": "Ca sáng",
          "startDate": "19/03/2025",
          "endDate": "21/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV007",
      "name": "Nhân viên 7",
      "phone": "0909000007",
      "email": "nv7@example.com",
      "address": "Số 7 Đường ABC, TP.XYZ",
      "dob": "12/01/1997",
      "sex": "Nữ",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "5700000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca chiều",
          "startDate": "12/03/2025",
          "endDate": "14/03/2025",
          "cycle": "luân phiên"
        }
      ]
    },
    {
      "code": "NV008",
      "name": "Nhân viên 8",
      "phone": "0909000008",
      "email": "nv8@example.com",
      "address": "Số 8 Đường ABC, TP.XYZ",
      "dob": "08/06/2000",
      "sex": "Nam",
      "status": "Đang làm",
      "contractType": "Hợp đồng lao động",
      "salary": "5800000",
      "position": "Huấn luyện viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca chiều",
          "startDate": "01/03/2025",
          "endDate": "03/03/2025",
          "cycle": "luân phiên"
        },
        {
          "scheduleName": "Ca tối",
          "startDate": "09/03/2025",
          "endDate": "11/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV009",
      "name": "Nhân viên 9",
      "phone": "0909000009",
      "email": "nv9@example.com",
      "address": "Số 9 Đường ABC, TP.XYZ",
      "dob": "17/10/2003",
      "sex": "Nữ",
      "status": "Nghỉ việc",
      "contractType": "Thực tập",
      "salary": "5900000",
      "position": "Quản lý kho",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca chiều",
          "startDate": "11/03/2025",
          "endDate": "13/03/2025",
          "cycle": "luân phiên"
        }
      ]
    },
    {
      "code": "NV010",
      "name": "Nhân viên 10",
      "phone": "0909000010",
      "email": "nv10@example.com",
      "address": "Số 10 Đường ABC, TP.XYZ",
      "dob": "21/04/1996",
      "sex": "Nam",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "6000000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca sáng",
          "startDate": "18/03/2025",
          "endDate": "20/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV011",
      "name": "Nhân viên 11",
      "phone": "0909000011",
      "email": "nv11@example.com",
      "address": "Số 11 Đường ABC, TP.XYZ",
      "dob": "09/08/2001",
      "sex": "Nữ",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "6100000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca chiều",
          "startDate": "18/03/2025",
          "endDate": "20/03/2025",
          "cycle": "luân phiên"
        }
      ]
    },
    {
      "code": "NV012",
      "name": "Nhân viên 12",
      "phone": "0909000012",
      "email": "nv12@example.com",
      "address": "Số 12 Đường ABC, TP.XYZ",
      "dob": "04/12/1998",
      "sex": "Nam",
      "status": "Nghỉ việc",
      "contractType": "Hợp đồng lao động",
      "salary": "6200000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca sáng",
          "startDate": "18/03/2025",
          "endDate": "20/03/2025",
          "cycle": "Theo tuần"
        },
        {
          "scheduleName": "Ca sáng",
          "startDate": "04/03/2025",
          "endDate": "06/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV013",
      "name": "Nhân viên 13",
      "phone": "0909000013",
      "email": "nv13@example.com",
      "address": "Số 13 Đường ABC, TP.XYZ",
      "dob": "26/02/2004",
      "sex": "Nữ",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "6300000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca tối",
          "startDate": "18/03/2025",
          "endDate": "20/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV014",
      "name": "Nhân viên 14",
      "phone": "0909000014",
      "email": "nv14@example.com",
      "address": "Số 14 Đường ABC, TP.XYZ",
      "dob": "13/07/1995",
      "sex": "Nam",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "6400000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca sáng",
          "startDate": "03/03/2025",
          "endDate": "05/03/2025",
          "cycle": "Theo tuần"
        },
        {
          "scheduleName": "Ca sáng",
          "startDate": "15/03/2025",
          "endDate": "17/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV015",
      "name": "Nhân viên 15",
      "phone": "0909000015",
      "email": "nv15@example.com",
      "address": "Số 15 Đường ABC, TP.XYZ",
      "dob": "02/09/2002",
      "sex": "Nữ",
      "status": "Nghỉ việc",
      "contractType": "Thực tập",
      "salary": "6500000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca tối",
          "startDate": "17/03/2025",
          "endDate": "19/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV016",
      "name": "Nhân viên 16",
      "phone": "0909000016",
      "email": "nv16@example.com",
      "address": "Số 16 Đường ABC, TP.XYZ",
      "dob": "27/11/1997",
      "sex": "Nam",
      "status": "Đang làm",
      "contractType": "Hợp đồng lao động",
      "salary": "6600000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca chiều",
          "startDate": "03/03/2025",
          "endDate": "05/03/2025",
          "cycle": "luân phiên"
        },
        {
          "scheduleName": "Ca tối",
          "startDate": "15/03/2025",
          "endDate": "17/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV017",
      "name": "Nhân viên 17",
      "phone": "0909000017",
      "email": "nv17@example.com",
      "address": "Số 17 Đường ABC, TP.XYZ",
      "dob": "16/04/2000",
      "sex": "Nữ",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "6700000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca chiều",
          "startDate": "17/03/2025",
          "endDate": "19/03/2025",
          "cycle": "luân phiên"
        }
      ]
    },
    {
      "code": "NV018",
      "name": "Nhân viên 18",
      "phone": "0909000018",
      "email": "nv18@example.com",
      "address": "Số 18 Đường ABC, TP.XYZ",
      "dob": "05/06/2003",
      "sex": "Nam",
      "status": "Nghỉ việc",
      "contractType": "Thực tập",
      "salary": "6800000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca sáng",
          "startDate": "06/03/2025",
          "endDate": "08/03/2025",
          "cycle": "Theo tuần"
        },
        {
          "scheduleName": "Ca sáng",
          "startDate": "04/03/2025",
          "endDate": "06/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV019",
      "name": "Nhân viên 19",
      "phone": "0909000019",
      "email": "nv19@example.com",
      "address": "Số 19 Đường ABC, TP.XYZ",
      "dob": "23/08/1996",
      "sex": "Nữ",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "6900000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca sáng",
          "startDate": "09/03/2025",
          "endDate": "11/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV020",
      "name": "Nhân viên 20",
      "phone": "0909000020",
      "email": "nv20@example.com",
      "address": "Số 20 Đường ABC, TP.XYZ",
      "dob": "11/02/2001",
      "sex": "Nam",
      "status": "Đang làm",
      "contractType": "Hợp đồng lao động",
      "salary": "7000000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca chiều",
          "startDate": "06/03/2025",
          "endDate": "08/03/2025",
          "cycle": "luân phiên"
        },
        {
          "scheduleName": "Ca chiều",
          "startDate": "01/03/2025",
          "endDate": "03/03/2025",
          "cycle": "luân phiên"
        }
      ]
    },
    {
      "code": "NV021",
      "name": "Nhân viên 21",
      "phone": "0909000021",
      "email": "nv21@example.com",
      "address": "Số 21 Đường ABC, TP.XYZ",
      "dob": "29/10/2004",
      "sex": "Nữ",
      "status": "Nghỉ việc",
      "contractType": "Thực tập",
      "salary": "7100000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca chiều",
          "startDate": "09/03/2025",
          "endDate": "11/03/2025",
          "cycle": "luân phiên"
        },
        {
          "scheduleName": "Ca tối",
          "startDate": "07/03/2025",
          "endDate": "09/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV022",
      "name": "Nhân viên 22",
      "phone": "0909000022",
      "email": "nv22@example.com",
      "address": "Số 22 Đường ABC, TP.XYZ",
      "dob": "18/03/1998",
      "sex": "Nam",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "7200000",
      "position": "Quản lý kho",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca tối",
          "startDate": "18/03/2025",
          "endDate": "20/03/2025",
          "cycle": "Theo tuần"
        },
        {
          "scheduleName": "Ca tối",
          "startDate": "08/03/2025",
          "endDate": "10/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV023",
      "name": "Nhân viên 23",
      "phone": "0909000023",
      "email": "nv23@example.com",
      "address": "Số 23 Đường ABC, TP.XYZ",
      "dob": "06/05/2000",
      "sex": "Nữ",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "7300000",
      "position": "Huấn luyện viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca chiều",
          "startDate": "09/03/2025",
          "endDate": "11/03/2025",
          "cycle": "luân phiên"
        },
        {
          "scheduleName": "Ca tối",
          "startDate": "20/03/2025",
          "endDate": "22/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV024",
      "name": "Nhân viên 24",
      "phone": "0909000024",
      "email": "nv24@example.com",
      "address": "Số 24 Đường ABC, TP.XYZ",
      "dob": "24/12/2003",
      "sex": "Nam",
      "status": "Nghỉ việc",
      "contractType": "Hợp đồng lao động",
      "salary": "7400000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca tối",
          "startDate": "08/03/2025",
          "endDate": "10/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV025",
      "name": "Nhân viên 25",
      "phone": "0909000025",
      "email": "nv25@example.com",
      "address": "Số 25 Đường ABC, TP.XYZ",
      "dob": "12/01/1996",
      "sex": "Nữ",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "7500000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca tối",
          "startDate": "02/03/2025",
          "endDate": "04/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV026",
      "name": "Nhân viên 26",
      "phone": "0909000026",
      "email": "nv26@example.com",
      "address": "Số 26 Đường ABC, TP.XYZ",
      "dob": "30/07/2001",
      "sex": "Nam",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "7600000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca tối",
          "startDate": "17/03/2025",
          "endDate": "19/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV027",
      "name": "Nhân viên 27",
      "phone": "0909000027",
      "email": "nv27@example.com",
      "address": "Số 27 Đường ABC, TP.XYZ",
      "dob": "19/09/2004",
      "sex": "Nữ",
      "status": "Nghỉ việc",
      "contractType": "Thực tập",
      "salary": "7700000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca tối",
          "startDate": "18/03/2025",
          "endDate": "20/03/2025",
          "cycle": "Theo tuần"
        },
        {
          "scheduleName": "Ca chiều",
          "startDate": "18/03/2025",
          "endDate": "20/03/2025",
          "cycle": "luân phiên"
        }
      ]
    },
    {
      "code": "NV028",
      "name": "Nhân viên 28",
      "phone": "0909000028",
      "email": "nv28@example.com",
      "address": "Số 28 Đường ABC, TP.XYZ",
      "dob": "08/11/1998",
      "sex": "Nam",
      "status": "Đang làm",
      "contractType": "Hợp đồng lao động",
      "salary": "7800000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca tối",
          "startDate": "13/03/2025",
          "endDate": "15/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV029",
      "name": "Nhân viên 29",
      "phone": "0909000029",
      "email": "nv29@example.com",
      "address": "Số 29 Đường ABC, TP.XYZ",
      "dob": "26/03/2000",
      "sex": "Nữ",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "7900000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca sáng",
          "startDate": "16/03/2025",
          "endDate": "18/03/2025",
          "cycle": "Theo tuần"
        },
        {
          "scheduleName": "Ca sáng",
          "startDate": "15/03/2025",
          "endDate": "17/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV030",
      "name": "Nhân viên 30",
      "phone": "0909000030",
      "email": "nv30@example.com",
      "address": "Số 30 Đường ABC, TP.XYZ",
      "dob": "14/05/2003",
      "sex": "Nam",
      "status": "Nghỉ việc",
      "contractType": "Thực tập",
      "salary": "8000000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca chiều",
          "startDate": "18/03/2025",
          "endDate": "20/03/2025",
          "cycle": "luân phiên"
        },
        {
          "scheduleName": "Ca chiều",
          "startDate": "13/03/2025",
          "endDate": "15/03/2025",
          "cycle": "luân phiên"
        }
      ]
    },
    {
      "code": "NV031",
      "name": "Nhân viên 31",
      "phone": "0909000031",
      "email": "nv31@example.com",
      "address": "Số 31 Đường ABC, TP.XYZ",
      "dob": "03/08/1996",
      "sex": "Nữ",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "8100000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca sáng",
          "startDate": "06/03/2025",
          "endDate": "08/03/2025",
          "cycle": "Theo tuần"
        },
        {
          "scheduleName": "Ca sáng",
          "startDate": "17/03/2025",
          "endDate": "19/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV032",
      "name": "Nhân viên 32",
      "phone": "0909000032",
      "email": "nv32@example.com",
      "address": "Số 32 Đường ABC, TP.XYZ",
      "dob": "21/10/2001",
      "sex": "Nam",
      "status": "Đang làm",
      "contractType": "Hợp đồng lao động",
      "salary": "8200000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca tối",
          "startDate": "08/03/2025",
          "endDate": "10/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV033",
      "name": "Nhân viên 33",
      "phone": "0909000033",
      "email": "nv33@example.com",
      "address": "Số 33 Đường ABC, TP.XYZ",
      "dob": "09/12/2004",
      "sex": "Nữ",
      "status": "Nghỉ việc",
      "contractType": "Thực tập",
      "salary": "8300000",
      "position": "Huấn luyện viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca tối",
          "startDate": "16/03/2025",
          "endDate": "18/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV034",
      "name": "Nhân viên 34",
      "phone": "0909000034",
      "email": "nv34@example.com",
      "address": "Số 34 Đường ABC, TP.XYZ",
      "dob": "28/02/1998",
      "sex": "Nam",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "8400000",
      "position": "Quản lý kho",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca chiều",
          "startDate": "17/03/2025",
          "endDate": "19/03/2025",
          "cycle": "luân phiên"
        }
      ]
    },
    {
      "code": "NV035",
      "name": "Nhân viên 35",
      "phone": "0909000035",
      "email": "nv35@example.com",
      "address": "Số 35 Đường ABC, TP.XYZ",
      "dob": "16/04/2000",
      "sex": "Nữ",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "8500000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca chiều",
          "startDate": "01/03/2025",
          "endDate": "03/03/2025",
          "cycle": "luân phiên"
        }
      ]
    },
    {
      "code": "NV036",
      "name": "Nhân viên 36",
      "phone": "0909000036",
      "email": "nv36@example.com",
      "address": "Số 36 Đường ABC, TP.XYZ",
      "dob": "04/06/2003",
      "sex": "Nam",
      "status": "Nghỉ việc",
      "contractType": "Hợp đồng lao động",
      "salary": "8600000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca tối",
          "startDate": "07/03/2025",
          "endDate": "09/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV037",
      "name": "Nhân viên 37",
      "phone": "0909000037",
      "email": "nv37@example.com",
      "address": "Số 37 Đường ABC, TP.XYZ",
      "dob": "22/08/1996",
      "sex": "Nữ",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "8700000",
      "position": "Huấn luyện viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca tối",
          "startDate": "14/03/2025",
          "endDate": "16/03/2025",
          "cycle": "Theo tuần"
        },
        {
          "scheduleName": "Ca tối",
          "startDate": "18/03/2025",
          "endDate": "20/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV038",
      "name": "Nhân viên 38",
      "phone": "0909000038",
      "email": "nv38@example.com",
      "address": "Số 38 Đường ABC, TP.XYZ",
      "dob": "10/10/2001",
      "sex": "Nam",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "8800000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca chiều",
          "startDate": "04/03/2025",
          "endDate": "06/03/2025",
          "cycle": "luân phiên"
        },
        {
          "scheduleName": "Ca tối",
          "startDate": "05/03/2025",
          "endDate": "07/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV039",
      "name": "Nhân viên 39",
      "phone": "0909000039",
      "email": "nv39@example.com",
      "address": "Số 39 Đường ABC, TP.XYZ",
      "dob": "29/12/2004",
      "sex": "Nữ",
      "status": "Nghỉ việc",
      "contractType": "Thực tập",
      "salary": "8900000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca tối",
          "startDate": "08/03/2025",
          "endDate": "10/03/2025",
          "cycle": "Theo tuần"
        },
        {
          "scheduleName": "Ca tối",
          "startDate": "16/03/2025",
          "endDate": "18/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV040",
      "name": "Nhân viên 40",
      "phone": "0909000040",
      "email": "nv40@example.com",
      "address": "Số 40 Đường ABC, TP.XYZ",
      "dob": "17/02/1998",
      "sex": "Nam",
      "status": "Đang làm",
      "contractType": "Hợp đồng lao động",
      "salary": "9000000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca tối",
          "startDate": "03/03/2025",
          "endDate": "05/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV041",
      "name": "Nhân viên 41",
      "phone": "0909000041",
      "email": "nv41@example.com",
      "address": "Số 41 Đường ABC, TP.XYZ",
      "dob": "05/04/2000",
      "sex": "Nữ",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "9100000",
      "position": "Quản lý kho",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca sáng",
          "startDate": "06/03/2025",
          "endDate": "08/03/2025",
          "cycle": "Theo tuần"
        },
        {
          "scheduleName": "Ca chiều",
          "startDate": "11/03/2025",
          "endDate": "13/03/2025",
          "cycle": "luân phiên"
        }
      ]
    },
    {
      "code": "NV042",
      "name": "Nhân viên 42",
      "phone": "0909000042",
      "email": "nv42@example.com",
      "address": "Số 42 Đường ABC, TP.XYZ",
      "dob": "23/06/2003",
      "sex": "Nam",
      "status": "Nghỉ việc",
      "contractType": "Thực tập",
      "salary": "9200000",
      "position": "Nhân viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca sáng",
          "startDate": "16/03/2025",
          "endDate": "18/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV043",
      "name": "Nhân viên 43",
      "phone": "0909000043",
      "email": "nv43@example.com",
      "address": "Số 43 Đường ABC, TP.XYZ",
      "dob": "11/08/1996",
      "sex": "Nữ",
      "status": "Đang làm",
      "contractType": "Thực tập",
      "salary": "9300000",
      "position": "Quản lý kho",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca sáng",
          "startDate": "02/03/2025",
          "endDate": "04/03/2025",
          "cycle": "Theo tuần"
        },
        {
          "scheduleName": "Ca chiều",
          "startDate": "06/03/2025",
          "endDate": "08/03/2025",
          "cycle": "luân phiên"
        }
      ]
    },
    {
      "code": "NV044",
      "name": "Nhân viên 44",
      "phone": "0909000044",
      "email": "nv44@example.com",
      "address": "Số 44 Đường ABC, TP.XYZ",
      "dob": "30/10/2001",
      "sex": "Nam",
      "status": "Đang làm",
      "contractType": "Hợp đồng lao động",
      "salary": "9400000",
      "position": "Huấn luyện viên",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca sáng",
          "startDate": "05/03/2025",
          "endDate": "07/03/2025",
          "cycle": "Theo tuần"
        },
        {
          "scheduleName": "Ca sáng",
          "startDate": "09/03/2025",
          "endDate": "11/03/2025",
          "cycle": "Theo tuần"
        }
      ]
    },
    {
      "code": "NV045",
      "name": "Nhân viên 45",
      "phone": "0909000045",
      "email": "nv45@example.com",
      "address": "Số 45 Đường ABC, TP.XYZ",
      "dob": "18/12/2004",
      "sex": "Nữ",
      "status": "Nghỉ việc",
      "contractType": "Thực tập",
      "salary": "9500000",
      "position": "Quản lý kho",
      "photo": "",
      "Shifts": [
        {
          "scheduleName": "Ca chiều",
          "startDate": "15/03/2025",
          "endDate": "17/03/2025",
          "cycle": "luân phiên"
        }
      ]
    }
  ];

  // Kiểm tra xem localStorage đã có dữ liệu chưa
  const existingEmployees = JSON.parse(localStorage.getItem('employees')) || [];

  // Nếu localStorage chưa có dữ liệu, lưu danh sách mẫu vào
  if (existingEmployees.length === 0) {
    localStorage.setItem('employees', JSON.stringify(sampleEmployees));
    console.log('Đã khởi tạo danh sách nhân viên mẫu vào localStorage.');
  } else {
    // Nếu localStorage có dữ liệu, đảm bảo mỗi nhân viên có thuộc tính shifts
    const updatedEmployees = existingEmployees.map(emp => ({
      ...emp,
      Shifts: emp.Shifts || []
    }));
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    console.log('Đã cập nhật shifts rỗng cho nhân viên hiện có trong localStorage.');
  }

  // In dữ liệu ra console để kiểm tra
  console.log('Danh sách nhân viên trong localStorage:', JSON.parse(localStorage.getItem('employees')));
})();