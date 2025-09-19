// ====================== 1. DỮ LIỆU MẪU ======================
const packages = [
  { id: "GT001", name: "Gói người lớn 1 tháng", duration: 30, price: 450000 },
  { id: "GT002", name: "Gói người lớn 3 tháng", duration: 90, price: 1080000 },
  { id: "GT003", name: "Gói người lớn 6 tháng", duration: 180, price: 2000000 },
  { id: "GT004", name: "Gói người lớn 12 tháng", duration: 365, price: 3780000 },
  { id: "GT005", name: "Gói học sinh 1 tháng", duration: 30, price: 350000 },
  { id: "GT006", name: "Gói học sinh 3 tháng", duration: 90, price: 840000 },
  { id: "GT007", name: "Gói học sinh 6 tháng", duration: 180, price: 1570000 },
  { id: "GT008", name: "Gói học sinh 12 tháng", duration: 365, price: 2900000 },
];

const sampleCustomers = [
  {
    id: "KH0001",
    name: "Nguyễn Văn A",
    birthdate: "1995-03-12",
    gender: "Nam",
    address: "123 Lê Lợi, Q1, TP.HCM",
    phone: "0909123456",
    cardType: "Gói người lớn 12 tháng",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "",
  },
  {
    id: "KH0002",
    name: "Trần Thị B",
    birthdate: "1990-07-25",
    gender: "Nữ",
    address: "45 Nguyễn Huệ, Q1, TP.HCM",
    phone: "0911222333",
    cardType: "Gói người lớn 3 tháng",
    startDate: "2023-05-15",
    endDate: "2023-08-15",
    status: "",
  },
];

if (!localStorage.getItem("customers")) {
  localStorage.setItem("customers", JSON.stringify(sampleCustomers));
}
if (!localStorage.getItem("packages")) {
  localStorage.setItem("packages", JSON.stringify(packages));
}

// ====================== 2. HELPER FUNCTIONS ======================
function formatToDisplayDate(yyyyMMdd) {
  if (!yyyyMMdd) return "";
  const [year, month, day] = yyyyMMdd.split("-");
  return `${day}/${month}/${year}`;
}

function formatToInputDate(ddmmyyyy) {
  const [day, month, year] = ddmmyyyy.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function getStatusByEndDate(endDateStr) {
  const endDate = new Date(endDateStr);
  const today = new Date();
  return endDate >= today ? "Còn hạn" : "Hết hạn";
}

function calculateEndDateByCardType(startDate, cardType) {
  const start = new Date(startDate);
  const match = cardType.match(/(\d+)\s*tháng/i);
  const monthsToAdd = match ? parseInt(match[1]) : 1;

  if (monthsToAdd === 12) {
    start.setFullYear(start.getFullYear() + 1);
  } else {
    start.setMonth(start.getMonth() + monthsToAdd);
  }

  return start.toISOString().split("T")[0];
}

function generateCustomerID(customers) {
  const existingIDs = customers.map(c => parseInt(c.id.replace("KH", ""))).filter(num => !isNaN(num));
  const maxID = existingIDs.length > 0 ? Math.max(...existingIDs) : 0;
  return `KH${String(maxID + 1).padStart(4, "0")}`;
}

function updateEndDateInEditForm() {
  const startDate = document.getElementById("edit-startDate").value;
  const cardType = document.getElementById("edit-cardType").value;
  if (startDate && cardType) {
    document.getElementById("edit-endDate").value = calculateEndDateByCardType(startDate, cardType);
  }
}

// ====================== 3. RENDER KHÁCH HÀNG ======================
function renderCustomers(keyword = "") {
  let customers = JSON.parse(localStorage.getItem("customers")) || [];
  customers = customers.map(c => ({
    ...c,
    status: getStatusByEndDate(c.endDate)
  }));

  if (keyword) {
    const search = keyword.toLowerCase();
    customers = customers.filter(c =>
      c.name.toLowerCase().includes(search) ||
      c.phone.includes(search) ||
      c.address.toLowerCase().includes(search) ||
      c.id.toLowerCase().includes(search)
    );
  }
  
  const tbody = document.createElement("tbody");
  customers.forEach((c, i) => {
    const row = document.createElement("tr");
    const statusClass = c.status === "Còn hạn" ? "active" : "expired";
    row.innerHTML = `
      <td>${c.id}</td>
      <td>${c.name}</td>
      <td>${formatToDisplayDate(c.birthdate)}</td>
      <td>${c.gender}</td>
      <td>${c.address}</td>
      <td>${c.phone}</td>
      <td>${c.cardType}</td>
      <td>${formatToDisplayDate(c.startDate)}</td>
      <td>${formatToDisplayDate(c.endDate)}</td>
      <td><span class="status ${statusClass}">${c.status}</span></td>
      <td>
        <button class="btn-edit" data-index="${i}"><i class="fa-solid fa-pen"></i></button>
        <button class="btn-delete" data-index="${i}"><i class="fa-solid fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(row);
  });

  const table = document.querySelector(".customer-table");
  table.querySelector("tbody")?.remove();
  table.appendChild(tbody);

  attachActionEvents(customers);
}

// ====================== 4. SỰ KIỆN ======================
function attachActionEvents(customers) {
  document.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.closest("button").dataset.index;
      if (confirm("Bạn có chắc muốn xóa khách hàng này?")) {
        customers.splice(idx, 1);
        localStorage.setItem("customers", JSON.stringify(customers));
        renderCustomers();
      }
    });
  });

  document.querySelectorAll(".btn-edit").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.closest("button").dataset.index;
      openEditForm(customers[idx]);
    });
  });
}

function populateCardTypes() {
  const addSelect = document.getElementById("addCardType");
  const editSelect = document.getElementById("edit-cardType");
  [addSelect, editSelect].forEach(select => {
    select.innerHTML = "";
    packages.forEach(pkg => {
      const opt = document.createElement("option");
      opt.value = pkg.name;
      opt.textContent = pkg.name;
      select.appendChild(opt);
    });
  });
}

// ====================== 5. FORM ADD & EDIT ======================
document.querySelector(".btn-add").addEventListener("click", () => {
  document.getElementById("add-form").style.display = "block";
  document.getElementById("add-form-overlay").style.display = "block";
});

function closeAddForm() {
  document.getElementById("add-form").style.display = "none";
  document.getElementById("add-form-overlay").style.display = "none";
}

function closeEditForm() {
  document.getElementById("edit-form").style.display = "none";
  document.getElementById("edit-form-overlay").style.display = "none";
}

function openEditForm(customer) {
  document.getElementById("edit-id").value = customer.id;
  document.getElementById("edit-name").value = customer.name;
  document.getElementById("edit-birthdate").value = customer.birthdate;
  document.getElementById("edit-gender").value = customer.gender;
  document.getElementById("edit-address").value = customer.address;
  document.getElementById("edit-phone").value = customer.phone;
  document.getElementById("edit-cardType").value = customer.cardType;
  document.getElementById("edit-startDate").value = customer.startDate;
  updateEndDateInEditForm();

  document.getElementById("edit-form").style.display = "block";
  document.getElementById("edit-form-overlay").style.display = "block";
}

// ====================== 6. SUBMIT FORM ======================
document.getElementById("customer-add-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const customers = JSON.parse(localStorage.getItem("customers")) || [];

  const newCustomer = {
    id: generateCustomerID(customers),
    name: document.getElementById("addName").value,
    birthdate: document.getElementById("addBirthdate").value,
    gender: document.getElementById("addGender").value,
    address: document.getElementById("addAddress").value,
    phone: document.getElementById("addPhone").value,
    cardType: document.getElementById("addCardType").value,
    startDate: document.getElementById("addStartDate").value,
  };
  newCustomer.endDate = calculateEndDateByCardType(newCustomer.startDate, newCustomer.cardType);
  newCustomer.status = getStatusByEndDate(newCustomer.endDate);

  customers.push(newCustomer);
  localStorage.setItem("customers", JSON.stringify(customers));
  renderCustomers();
  closeAddForm();
});

document.getElementById("customer-edit-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const id = document.getElementById("edit-id").value;
  const index = customers.findIndex(c => c.id === id);

  if (index !== -1) {
    customers[index] = {
      id,
      name: document.getElementById("edit-name").value,
      birthdate: document.getElementById("edit-birthdate").value,
      gender: document.getElementById("edit-gender").value,
      address: document.getElementById("edit-address").value,
      phone: document.getElementById("edit-phone").value,
      cardType: document.getElementById("edit-cardType").value,
      startDate: document.getElementById("edit-startDate").value,
    };
    customers[index].endDate = calculateEndDateByCardType(customers[index].startDate, customers[index].cardType);
    customers[index].status = getStatusByEndDate(customers[index].endDate);
  }

  localStorage.setItem("customers", JSON.stringify(customers));
  renderCustomers();
  closeEditForm();
});

// ====================== 7. INIT APP ======================
document.addEventListener("DOMContentLoaded", () => {
  populateCardTypes();
  renderCustomers();

  document.querySelector(".btn-search").addEventListener("click", () => {
    const keyword = document.getElementById("searchInput").value;
    renderCustomers(keyword);
  });

  document.getElementById("searchInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      document.querySelector(".btn-search").click();
    }
  });

  document.getElementById("edit-startDate").addEventListener("change", updateEndDateInEditForm);
  document.getElementById("edit-cardType").addEventListener("change", updateEndDateInEditForm);
});
