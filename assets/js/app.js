// ===== Hamburger menu =====
function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");

    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}

// ===== Konfirmasi hapus (event delegation, baris dirender dinamis) =====
function initHapusConfirm() {
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".btn-hapus");
        if (!btn) return;

        const row = btn.closest("tr");
        const nama = row ? row.querySelector("td")?.textContent : "data ini";
        const yakin = confirm("Yakin ingin menghapus \"" + nama + "\"?");
        if (yakin && row) {
            row.remove();
        }
    });
}

// ===== Filter tabel (kolom pencarian) =====
function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");

    if (!input || !table) return;

    input.addEventListener("keyup", function () {
        const keyword = input.value.toLowerCase();
        const rows = table.querySelectorAll("tbody tr");

        rows.forEach(function (row) {
            const teks = row.textContent.toLowerCase();
            row.style.display = teks.includes(keyword) ? "" : "none";
        });
    });
}

// ===== Muat Daftar Laptop =====
async function muatDaftarLaptop() {
    const tbody = document.querySelector(".table-responsive table tbody");
    const loading = document.getElementById("loading-indicator");
    if (!tbody) return;

    if (loading) loading.style.display = "block";
    tbody.innerHTML = "";

    try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const res = await fetch("../data/laptop.json");
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }
        const daftarLaptop = await res.json();

        daftarLaptop.forEach(function (laptop) {
            const tr = document.createElement("tr");
            tr.innerHTML =
                "<td>" + laptop.merk + "</td>" +
                "<td>" + laptop.seri + "</td>" +
                "<td>" + laptop.tahun + "</td>" +
                "<td>" + laptop.stok + "</td>" +
                "<td>" +
                "<button type=\"button\">Edit</button> " +
                "<button type=\"button\" class=\"btn-hapus\">Hapus</button>" +
                "</td>";
            tbody.appendChild(tr);
        });
    } catch (err) {
        tbody.innerHTML =
            "<tr><td colspan=\"5\">Gagal memuat data: " + err.message + "</td></tr>";
    } finally {
        if (loading) loading.style.display = "none";
    }
}

// ===== Muat Daftar Best Seller =====
async function muatDaftarBestSeller() {
    const tbody = document.querySelector(".table-responsive table tbody");
    const loading = document.getElementById("loading-indicator");
    if (!tbody) return;

    if (loading) loading.style.display = "block";
    tbody.innerHTML = "";

    try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const res = await fetch("../data/bestseller.json");
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }
        const daftarBestSeller = await res.json();

        daftarBestSeller.forEach(function (item) {
            const tr = document.createElement("tr");
            tr.innerHTML =
                "<td>" + item.merk + "</td>" +
                "<td>" + item.seri + "</td>" +
                "<td>" + item.total_penjualan + " unit</td>" +
                "<td><span class=\"rating-star\">&#9733;</span> " + item.rating + "</td>" +
                "<td>" +
                "<button type=\"button\">Edit</button> " +
                "<button type=\"button\" class=\"btn-hapus\">Hapus</button>" +
                "</td>";
            tbody.appendChild(tr);
        });
    } catch (err) {
        tbody.innerHTML =
            "<tr><td colspan=\"5\">Gagal memuat data: " + err.message + "</td></tr>";
    } finally {
        if (loading) loading.style.display = "none";
    }
}
async function muatDaftarLaptop() {
    const tbody = document.querySelector(".table-responsive table tbody");
    const loading = document.getElementById("loading-indicator");
    if (!tbody) return;

    if (loading) loading.style.display = "block";
    tbody.innerHTML = "";

    try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const res = await fetch("../data/laptop.json");
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }
        const daftarLaptop = await res.json();

        daftarLaptop.forEach(function (laptop) {
            const tr = document.createElement("tr");
            tr.innerHTML =
                "<td>" + laptop.merk + "</td>" +
                "<td>" + laptop.seri + "</td>" +
                "<td>" + laptop.tahun + "</td>" +
                "<td>Rp" + Number(laptop.harga).toLocaleString("id-ID") + "</td>" +
                "<td>" + laptop.stok + "</td>" +
                "<td>" +
                "<button type=\"button\">Edit</button> " +
                "<button type=\"button\" class=\"btn-hapus\">Hapus</button>" +
                "</td>";
            tbody.appendChild(tr);
        });
    } catch (err) {
        tbody.innerHTML =
            "<tr><td colspan=\"6\">Gagal memuat data: " + err.message + "</td></tr>";
    } finally {
        if (loading) loading.style.display = "none";
    }
}
// ===== Jalankan semua fungsi =====
document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();

    const path = window.location.pathname;

    if (path.includes("laptop")) {
        muatDaftarLaptop();
    } else if (path.includes("bestseller")) {
        muatDaftarBestSeller();
    }
});
