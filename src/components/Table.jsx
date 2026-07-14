import React from 'react';

function Table({ data, isLoading, onEdit, onDelete }) {
  if (isLoading) {
    return <div className="table-loading">Cargando datos...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="table-empty">No se encontraron registros.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="crud-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Título</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <img 
                  src={item.thumbnail || 'https://placehold.co/40x40'} 
                  alt={item.title} 
                  className="table-img" 
                />
              </td>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>${item.price}</td>
              <td>
                <div className="table-actions">
                  <button onClick={() => onEdit(item)} className="btn-edit">Editar</button>
                  <button onClick={() => onDelete(item)} className="btn-delete">Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
