// File: main.js
// Integrasi Logika Data dan Render ke Elemen DOM
let projects = [
  {
    id: 1,
    title: "Sistem Inventaris Keuangan",
    category: "Web App",
    budget: 2500000,
    completed: true,
  },
  {
    id: 2,
    title: "Sistem Kasir Digital POS",
    category: "Desktop App",
    budget: 5000000,
    completed: true,
  },
  {
    id: 3,
    title: "Landing Page Profil Perusahaan",
    category: "Web App",
    budget: 1500000,
    completed: false,
  },
  {
    id: 4,
    title: "Aplikasi Presensi GPS Mobile",
    category: "Mobile App",
    budget: 4500000,
    completed: false,
  },
];
const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);
};
const updateStats = (dataList) => {
  const totalProjects = dataList.length;
  const totalBudget = dataList.reduce((acc, curr) => acc + curr.budget, 0);
  const completedCount = dataList.filter((item) => item.completed).length;
  document.getElementById("stat-total-projects").textContent = totalProjects;
  document.getElementById("stat-total-budget").textContent =
    formatRupiah(totalBudget);
  document.getElementById("stat-completed-projects").textContent =
    completedCount;
};

let currentCategory = "Semua";
let currentSearch = "";

const renderProjects = (filteredList) => {
  const container = document.getElementById("project-list");
  if (!container) return;
  if (filteredList.length === 0) {
    container.innerHTML =
      "<p style='text-align: center; color: #64748b; padding: 20px;'>Tidak ada proyek pada kategori ini.</p>";
    return;
  }
  const htmlString = filteredList
    .map((proj) => {
      const badgeClass = proj.completed ? "badge-success" : "badge-pending";
      const statusText = proj.completed ? "Selesai" : "Dalam Pengerjaan";
      return `
  <div class="project-card">
  <div class="project-info">
    <span class="project-category">${proj.category}</span>
    <h4>${proj.title}</h4>
    <p class="project-budget">${formatRupiah(proj.budget)}</p>
  </div>
 <div>
  <span class="badge ${badgeClass}">${statusText}</span>
  <button class="btn-action btn-toggle" onclick="toggleStatus(${proj.id})">Ubah Status</button>
  <button class="btn-action btn-delete" onclick="deleteProject(${proj.id})">Hapus</button>
 </div>
 </div>
 `;
    })
    .join("");
  container.innerHTML = htmlString;
};

// fungsi untuk menerapkan filter berdasarkan kategori dan pencarian
const applyFilters = () => {
  let result = projects;

  if (currentCategory !== "Semua") {
    result = result.filter(p => p.category === currentCategory);
  }

  if (currentSearch.trim() !== "") {
    result = result.filter(p => p.title.toLowerCase().includes(currentSearch.toLowerCase()));
  }

  renderProjects(result);
};

// fitur 1 Form Input Proyek Dinamis & Validasi
  const form = document.getElementById("project-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("input-title").value.trim();
      const category = document.getElementById("input-category").value;
      const budget = parseFloat(document.getElementById("input-budget").value);
      const completed = document.getElementById("input-completed").checked;

      // Validasi
      if (!title || isNaN(budget) || budget <= 0) {
        alert("Isi judul proyek dan anggaran.");
        return;
      }

      // Buat Objek Proyek Baru
      const newProject = {
        id: Date.now(),
        title,
        category,
        budget,
        completed
      };

      // Tambahkan ke Array
      projects = [...projects, newProject];

      // Reset Form & Update Tampilan
      form.reset();
      updateStats(projects);
      applyFilters();
    });
  }

  // fitur 2 Live Search
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      applyFilters();
    });
  }

// fitur 3 Interaktif kartu proyrek
// Ubah Status Proyek
const toggleStatus = (id) => {
  projects = projects.map(proj => {
    if (proj.id === id) {
      return { ...proj, completed: !proj.completed };
    }
    return proj;
  });
  updateStats(projects);
  applyFilters();
};

// Hapus Proyek
const deleteProject = (id) => {
  projects = projects.filter(proj => proj.id !== id);
  updateStats(projects);
  applyFilters();
};

document.addEventListener("DOMContentLoaded", () => {
  renderProjects(projects);
  updateStats(projects);

  const filterButtons = document.querySelectorAll(".btn-filter");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      const selectedCategory = e.target.getAttribute("data-category");
      if (selectedCategory === "Semua") {
        renderProjects(projects);
      } else {
        const filtered = projects.filter(
          (p) => p.category === selectedCategory,
        );
        renderProjects(filtered);
      }
    });
  });
});
