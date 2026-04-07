// ELEMENTS
const loginForm = document.getElementById('loginForm');
const dashboard = document.getElementById('dashboard');
const addProductForm = document.getElementById('addProductForm');
const productList = document.getElementById('productList');
const logoutBtn = document.getElementById('logoutBtn');

// ADMIN CREDENTIALS
const adminUser = "admin";
const adminPass = "1234";

// LOGIN FUNCTION
loginForm.addEventListener('submit', function(e){
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if(username === adminUser && password === adminPass){
    loginForm.style.display = "none";
    dashboard.style.display = "block";
    loadProducts();
  } else {
    alert("Invalid username or password");
  }
});

// ADD PRODUCT FUNCTION
addProductForm.addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;
  const type = document.getElementById('productType').value;
  const file = document.getElementById('productFile').files[0];

  if(file){
    const reader = new FileReader();
    reader.onload = function(){
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      products.push({name, price, type, fileData: reader.result});
      localStorage.setItem('products', JSON.stringify(products));
      loadProducts();
      addProductForm.reset();
    }
    reader.readAsDataURL(file);
  }
});

// LOAD PRODUCTS FUNCTION
function loadProducts(){
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  productList.innerHTML = '';
  if(products.length === 0){
    productList.innerHTML = '<li>No products added yet.</li>';
  } else {
    products.forEach((p,index)=>{
      const li = document.createElement('li');
      li.innerHTML = `<strong>${p.name}</strong> - ₦${p.price} [${p.type}] <br>
        ${p.fileData.startsWith('data:video') 
          ? <video width="150" controls><source src="${p.fileData}"></video> 
          : `<img src="${p.fileData}" width="150">`} <br>
        <button onclick="deleteProduct(${index})">Delete</button>`;
      productList.appendChild(li);
    });
  }
}

// DELETE PRODUCT FUNCTION
function deleteProduct(index){
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  products.splice(index,1);
  localStorage.setItem('products', JSON.stringify(products));
  loadProducts();
}

// LOGOUT FUNCTION
logoutBtn.addEventListener('click', function(){
  dashboard.style.display = "none";
  loginForm.style.display = "block";
});
