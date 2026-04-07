/ Display Principal Gadgets & Accessories
const productsContainer = document.getElementById('productsContainer');
const estateContainer = document.getElementById('estateContainer');

const products = JSON.parse(localStorage.getItem('products') || '[]');

if(productsContainer){
  const phoneItems = products.filter(p => p.type === 'phone'); // filter phone products
  phoneItems.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('product-item');
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" width="150">
      <h3>${p.name}</h3>
      <p>₦${p.price}</p>
    `;
    productsContainer.appendChild(div);
  });
}

// Display Properties / Estate
if(estateContainer){
  const estateItems = products.filter(p => p.type === 'estate'); // filter estate properties
  estateItems.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('product-item');
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" width="150">
      <h3>${p.name}</h3>
      <p>${p.price}</p>
    `;
    estateContainer.appendChild(div);
  });
}
