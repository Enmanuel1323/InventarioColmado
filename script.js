let products = [
    { id: 1, name: "Arroz Premium", stock: 20, price: 25.00 },
    { id: 2, name: "Aceite Manicero", stock: 15, price: 150.00 },
    { id: 3, name: "Habichuelas Goya", stock: 30, price: 50.00 },
    { id: 4, name: "Azúcar Blanca", stock: 25, price: 20.00 },
    { id: 5, name: "Salami Induveca", stock: 10, price: 125.00 },
    { id: 6, name: "Café Santo Domingo", stock: 18, price: 100.00 },
    { id: 7, name: "Chocolate Embajador", stock: 20, price: 30.00 },
    { id: 8, name: "Pan Sobao", stock: 15, price: 10.00 },
    { id: 9, name: "Sardinas Victorina", stock: 12, price: 45.00 },
    { id: 10, name: "Pastas Milano", stock: 22, price: 25.00 },
    { id: 11, name: "Maíz enlatado Rico", stock: 14, price: 35.00 },
    { id: 12, name: "Mayonesa Baldom", stock: 8, price: 60.00 },
    { id: 13, name: "Avena Quaker", stock: 20, price: 45.00 },
    { id: 14, name: "Leche Rica UHT", stock: 16, price: 55.00 },
    { id: 15, name: "Refresco Merengue", stock: 25, price: 15.00 },
    { id: 16, name: "Galletas de Soda Hatuey", stock: 30, price: 25.00 },
    { id: 17, name: "Mantequilla Sosúa", stock: 12, price: 70.00 },
    { id: 18, name: "Queso Blanco Criollo", stock: 10, price: 85.00 },
    { id: 19, name: "Pica Pollo", stock: 20, price: 100.00 },
    { id: 20, name: "Yuca", stock: 15, price: 20.00 },
];

let editingIndex = null;

document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const stock = parseInt(document.getElementById("productStock").value);

    if (editingIndex === null) {
        addProduct(name, price, stock);
    } else {
        editProduct(editingIndex, name, price, stock);
    }

    clearForm();
    renderTable();
});

function addProduct(name, price, stock) {
    const id = products.length ? products[products.length - 1].id + 1 : 1;
    products.push({ id, name, price, stock });
}

function editProduct(index, name, price, stock) {
    products[index] = { ...products[index], name, price, stock };
    editingIndex = null;
}

function deleteProduct(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        products.splice(index, 1);
        renderTable();
    }
}

function startEditing(index) {
    const product = products[index];
    document.getElementById("productName").value = product.name;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productStock").value = product.stock;
    editingIndex = index;
}

function clearForm() {
    document.getElementById("productName").value = '';
    document.getElementById("productPrice").value = '';
    document.getElementById("productStock").value = '';
}

function renderTable() {
    const tableBody = document.querySelector("#productTable tbody");
    tableBody.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement("tr");
        row.classList.add("fade-in");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price.toFixed(2)} DOP</td>
            <td>${product.stock}</td>
            <td>
                <button onclick="startEditing(${index})">Editar</button>
                <button onclick="deleteProduct(${index})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Renderizar la tabla inicial con los productos
renderTable();
