
// ===== STATE =====
// Mengambil data tugas dari localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];


// ===== DOM ELEMENTS =====
// Menghubungkan JavaScript dengan elemen HTML
const form = document.querySelector("#form-todo");
const input = document.querySelector("#input-todo");
const list = document.querySelector("#list-todo");
const stats = document.querySelector("#stats");


// ===== FUNCTIONS =====

// Fungsi menyimpan data
function simpan() {
    localStorage.setItem("todos", JSON.stringify(todos));
}


// Fungsi menampilkan daftar tugas
function render() {
    list.innerHTML = "";

    if (todos.length === 0) {
        list.innerHTML = "<li><span class='teks'>Belum ada tugas. Tambahkan!</span></li>";
        stats.textContent = "0 tugas belum selesai";
        return;
    }

    todos.forEach((todo) => {
        const li = document.createElement("li");

        if (todo.selesai) {
            li.classList.add("selesai");
        }

        li.innerHTML = `
            <input type="checkbox" ${todo.selesai ? "checked" : ""} data-id="${todo.id}">
            <span class="teks">${todo.teks}</span>
            <button class="hapus" data-id="${todo.id}">Hapus</button>
        `;

        list.appendChild(li);
    });

    const belum = todos.filter(t => !t.selesai).length;
    stats.textContent = `${belum} tugas belum selesai`;
}


// Fungsi menambahkan tugas
function tambahTodo(teks) {
    todos.push({
        id: Date.now(),
        teks: teks.trim(),
        selesai: false
    });

    simpan();
    render();
}


// Fungsi menghapus tugas
function hapusTodo(id) {
    todos = todos.filter(t => t.id !== id);

    simpan();
    render();
}


// Fungsi mengubah status tugas
function toggleSelesai(id) {
    const todo = todos.find(t => t.id === id);

    if (todo) {
        todo.selesai = !todo.selesai;

        simpan();
        render();
    }
}


// ===== EVENTS =====

// Event untuk menambahkan tugas
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value.trim()) {
        tambahTodo(input.value);
        input.value = "";
    }
});


// Event untuk checkbox selesai
list.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
        toggleSelesai(Number(e.target.dataset.id));
    }
});


// Event untuk menghapus tugas
list.addEventListener("click", (e) => {
    if (e.target.classList.contains("hapus")) {
        hapusTodo(Number(e.target.dataset.id));
    }
});


// ===== INIT =====
// Menampilkan data ketika halaman pertama kali dibuka
render();
