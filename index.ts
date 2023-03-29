interface Product {
    Id: number;
    Title: string;
    Price: number;
    Description: string;
    Category: string;
  }
  
  async function fetchProducts(): Promise<Product[]> {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    return products;
  }
  
  async function createTable(): Promise<void> {
    const products = await fetchProducts();
  
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.style.border = '2px solid black';
  
    // Create table header
    const headerRow = table.insertRow();
    Object.keys(products[0]).forEach((key) => {
      if (key !== 'image' && key !== 'rating') {
        const headerCell = document.createElement('th');
        headerCell.style.border = '2px solid black';
        headerCell.style.padding = '10px';
        headerCell.style.textTransform="uppercase"
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
      }
    });
  
    // Create table body
    products.forEach((product) => {
      const bodyRow = table.insertRow();
      Object.entries(product).forEach(([key, value]) => {
        if (key !== 'image' && key !== 'rating') {
          const bodyCell = document.createElement('td');
          bodyCell.style.border = '1px solid black';
          bodyCell.style.padding = '10px';
          bodyCell.textContent = String(value);
          bodyRow.appendChild(bodyCell);
        }
      });
    });
  
    document.body.appendChild(table);
  }
  
  createTable();
  