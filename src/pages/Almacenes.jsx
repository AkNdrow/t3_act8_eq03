import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  getProducts, 
  searchProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../services/api';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';

function Almacenes() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Extraer parámetros de la URL o usar valores por defecto
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const currentLimit = parseInt(searchParams.get('limit')) || 10;
  const currentSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados para Modales
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Formulario temporal
  const [formData, setFormData] = useState({ title: '', category: '', price: 0 });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentLimit, currentSearch]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let data;
      if (currentSearch) {
        // DummyJSON pagination con search está medio limitada, pero funciona
        data = await searchProducts(currentSearch);
        // Cuando buscamos ignoramos la paginación para simplificar, 
        // pero seteamos el total correcto.
      } else {
        const skip = (currentPage - 1) * currentLimit;
        data = await getProducts(currentLimit, skip);
      }
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      setError('No se pudieron cargar los datos. Revisa tu conexión.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    Object.keys(updates).forEach(key => {
      if (updates[key]) {
        newParams.set(key, updates[key]);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  const handleSearch = (e) => {
    updateParams({ search: e.target.value, page: 1 }); // reset page on search
  };

  // ----- ACCIONES CRUD -----

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProd = await createProduct(formData);
      // Actualizamos estado local
      setProducts([newProd, ...products]);
      setIsAddModalOpen(false);
      setFormData({ title: '', category: '', price: 0 });
    } catch (err) {
      alert("Error al crear");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProd = await updateProduct(selectedProduct.id, formData);
      // Actualizamos estado local
      setProducts(products.map(p => p.id === updatedProd.id ? updatedProd : p));
      setIsEditModalOpen(false);
    } catch (err) {
      alert("Error al actualizar");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProduct(selectedProduct.id);
      // Actualizamos estado local
      setProducts(products.filter(p => p.id !== selectedProduct.id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      alert("Error al eliminar");
    }
  };

  return (
    <section className="almacenes-page">
      <div className="almacenes-header">
        <h2>Gestión de Productos (Almacenes)</h2>
        <button 
          className="btn-primary" 
          onClick={() => {
            setFormData({ title: '', category: '', price: 0 });
            setIsAddModalOpen(true);
          }}
        >
          + Nuevo Producto
        </button>
      </div>

      <div className="filters-container">
        <input 
          type="text" 
          placeholder="Buscar por nombre..." 
          value={currentSearch} 
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {error && <div className="error-alert">{error}</div>}

      <Table 
        data={products} 
        isLoading={isLoading} 
        onEdit={(prod) => {
          setSelectedProduct(prod);
          setFormData({ title: prod.title, category: prod.category, price: prod.price });
          setIsEditModalOpen(true);
        }}
        onDelete={(prod) => {
          setSelectedProduct(prod);
          setIsDeleteModalOpen(true);
        }}
      />

      {!currentSearch && (
        <Pagination 
          total={total}
          currentLimit={currentLimit}
          currentPage={currentPage}
          onPageChange={(page) => updateParams({ page })}
          onLimitChange={(limit) => updateParams({ limit, page: 1 })}
        />
      )}

      {/* --- MODALES --- */}
      <Modal 
        isOpen={isAddModalOpen} 
        title="Añadir Nuevo Producto" 
        onClose={() => setIsAddModalOpen(false)}
      >
        <form onSubmit={handleAddSubmit} className="crud-form">
          <label>Título:</label>
          <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          
          <label>Categoría:</label>
          <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
          
          <label>Precio ($):</label>
          <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          
          <button type="submit" className="btn-primary">Guardar Producto</button>
        </form>
      </Modal>

      <Modal 
        isOpen={isEditModalOpen} 
        title="Editar Producto" 
        onClose={() => setIsEditModalOpen(false)}
      >
        <form onSubmit={handleEditSubmit} className="crud-form">
          <label>Título:</label>
          <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          
          <label>Categoría:</label>
          <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
          
          <label>Precio ($):</label>
          <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          
          <button type="submit" className="btn-primary">Actualizar Cambios</button>
        </form>
      </Modal>

      <Modal 
        isOpen={isDeleteModalOpen} 
        title="" 
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="warning-icon-container">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="warning-icon">
            <path d="M12 2L1 21H23L12 2Z" fill="#e14040" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M12 9V14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="18" r="1.5" fill="#ffffff"/>
          </svg>
        </div>
        <div className="modal-text-center">
          <p>Esta a apunto de borrar este registro ({selectedProduct?.title})</p>
          <br/>
          <p>¿Esta seguro de proceder con esta accion?</p>
        </div>
        <div className="modal-actions">
          <button onClick={() => setIsDeleteModalOpen(false)} className="btn-secondary">Cancelar</button>
          <button onClick={handleDeleteConfirm} className="btn-delete-modal">Si, eliminar</button>
        </div>
      </Modal>

    </section>
  );
}

export default Almacenes;
