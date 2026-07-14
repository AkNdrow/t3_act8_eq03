const API_URL = 'https://dummyjson.com/products';

export const getProducts = async (limit = 10, skip = 0) => {
  try {
    const res = await fetch(`${API_URL}?limit=${limit}&skip=${skip}`);
    if (!res.ok) throw new Error('Error al obtener productos');
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchProducts = async (query) => {
  try {
    const res = await fetch(`${API_URL}/search?q=${query}`);
    if (!res.ok) throw new Error('Error en la búsqueda');
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const res = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('Error al crear producto');
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('Error al actualizar producto');
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar producto');
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
