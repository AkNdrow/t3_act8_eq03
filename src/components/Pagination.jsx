import React from 'react';

function Pagination({ total, currentLimit, currentPage, onPageChange, onLimitChange }) {
  const totalPages = Math.ceil(total / currentLimit);

  return (
    <div className="pagination-container">
      <div className="pagination-limit">
        <label htmlFor="limit-select">Mostrar:</label>
        <select 
          id="limit-select" 
          value={currentLimit} 
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="pagination-controls">
        <button 
          disabled={currentPage <= 1} 
          onClick={() => onPageChange(currentPage - 1)}
          className="btn-page"
        >
          Anterior
        </button>
        
        <span className="page-info">
          Página {currentPage} de {totalPages || 1}
        </span>
        
        <button 
          disabled={currentPage >= totalPages} 
          onClick={() => onPageChange(currentPage + 1)}
          className="btn-page"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Pagination;
