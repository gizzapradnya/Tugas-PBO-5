let fishList = [];
let currentIndex = null;

// Fungsi untuk render data ikan ke tabel
function renderFish() {
    const fishTableBody = document.getElementById('fishTableBody');
    const fishListElement = document.getElementById('fishList');
    
    fishTableBody.innerHTML = ''; // Menghapus isi tabel sebelumnya
    fishListElement.innerHTML = ''; // Menghapus isi daftar ikan sebelumnya

    fishList.forEach((fish, index) => {
        // Render ke dalam tabel
        const row = document.createElement('tr'); // Membuat baris baru
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${fish.name}</td>
            <td>${fish.type}</td>
            <td>${fish.weight}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editFish(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteFish(${index})">Delete</button>
            </td>
        `;
        fishTableBody.appendChild(row); // Menambahkan baris ke tabel

        // Render ke dalam daftar
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerText = `${fish.name} (${fish.type}, ${fish.weight} kg)`;
        fishListElement.appendChild(listItem); // Menambahkan item ke daftar
    });
}

// Fungsi untuk menambah ikan
function addFish(name, type, weight) {
    fishList.push({ name, type, weight }); // Menambah ikan baru ke array
    renderFish(); // Memperbarui tampilan tabel dan daftar
}

// Fungsi untuk mengedit ikan
function editFish(index) {
    currentIndex = index; // Menyimpan index ikan yang akan diedit
    const fish = fishList[index];

    // Mengisi form dengan data ikan yang dipilih
    document.getElementById('fishName').value = fish.name;
    document.getElementById('fishType').value = fish.type;
    document.getElementById('fishWeight').value = fish.weight;
}

// Fungsi untuk mengupdate ikan
function updateFish(name, type, weight) {
    fishList[currentIndex] = { name, type, weight }; // Mengupdate ikan yang telah diedit
    currentIndex = null; // Reset index saat selesai
    renderFish(); // Memperbarui tampilan tabel dan daftar
}

// Fungsi untuk menghapus ikan
function deleteFish(index) {
    fishList.splice(index, 1); // Menghapus ikan dari array
    renderFish(); // Memperbarui tampilan tabel dan daftar
}

// Event listener untuk form tambah dan update ikan
document.getElementById('fishForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Mencegah form dikirim secara default

    const name = document.getElementById('fishName').value;
    const type = document.getElementById('fishType').value;
    const weight = document.getElementById('fishWeight').value;

    // Menentukan apakah kita akan menambah atau mengupdate ikan
    if (currentIndex === null) {
        addFish(name, type, weight); // Tambah ikan baru
    } else {
        updateFish(name, type, weight); // Update ikan yang ada
    }

    // Reset form
    document.getElementById('fishForm').reset();
});
