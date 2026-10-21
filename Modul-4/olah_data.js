// File: olah_data.js
// Praktik Manipulasi Array, Object dengan ES6+

const projects = [
    {
        id: 1,
        tittle: "Sistem Inventaris Keuangan",
        category: "Web APP",
        budget: 2500000,
        completed: true
    },
    {
        id: 2,
        tittle: "Sistem Kasir Digital POS",
        category: "Desktop APP",
        budget: 5000000,
        completed: true
    },
    {
        id: 3,
        tittle: "Landng Page Profil Perusahaan",
        category: "Web APP",
        budget: 1500000,
        completed: false
    },
    {
        id: 4,
        tittle: "Aplikasi Presensi GPS Mobile",
        category: "Mobile APP",
        budget: 4500000,
        completed: false
    }

];

// Helper Function format Rupiah
const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(angka);
};

console.log("=== 1. SEMUA DAFTAR PROYEK (forEach) ===");
projects.forEach((proj, idx) => {
    const status = proj.completed ? "[Selesai]" : "[Proses]";
    console.log(`${idx + 1}. ${status} ${proj.tittle} (${proj.category}) - ${formatRupiah(proj.budget)}`);
});

console.log("\n=== 2. PROYEK KATEGORI WEB APP (filter) ===");
const webProjects = projects.filter(proj => proj.category === "Web APP");
console.log(webProjects);

console.log("\n=== 3. RINGKASAN NAMA & ANGGARAN (map) ===");
const ringkasanProyek = projects.map(proj => ({
 nama: proj.tittle,
 status: proj.completed ? "Selesai" : "Proses",
 biaya: formatRupiah(proj.budget)
}));
console.table(ringkasanProyek);

console.log("\n=== 4. TOTAL ANGGARAN SEMUA PROYEK (reduce) ===");
const totalAnggaran = projects.reduce((total, proj) => total + proj.budget, 0);
console.log(`Total Estimasi Anggaran Portofolio: ${formatRupiah(totalAnggaran)}`);

const totalSelesai = projects
    .filter(proj => proj.completed)
    .reduce((total, proj) => total + proj.budget, 0);
console.log(`Total Anggaran Proyek Selesai: ${formatRupiah(totalSelesai)}`);
