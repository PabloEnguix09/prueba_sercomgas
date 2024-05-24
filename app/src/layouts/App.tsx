import '../css/App.css';
import { useQueries } from '@tanstack/react-query';
import { listMarketers, listOperations } from '../services/routes';
import { Marketer, Operation } from '../types/types';
import { useState } from 'react';

function App() {
  const [currPage, setCurrPage] = useState(1);
  let limit = 10;

  const [marketersQuery, operationsQuery] = useQueries({
    queries: [
      {
        queryKey: ['marketers'],
        queryFn: listMarketers,
      },
      {
        queryKey: ['operations', limit, currPage],
        queryFn: () => listOperations(limit, currPage),
      }
    ]
  })

  if(marketersQuery.isLoading || operationsQuery.isLoading) {
    return <div className='text-center'>Cargando...</div>
  }
  if(marketersQuery.isError || operationsQuery.isError) {
    return <div className='text-center'>{marketersQuery.error ? 'Error en marketers: ' + marketersQuery.error.message : 'Error en operaciones: ' + operationsQuery.error?.message}</div>
  }
  return (
    <div className="App">

      <h1 className='my-3'>Operaciones</h1>
      <table className='table table-responsive table-striped table-hover table-bordered'>
        <thead className='table-dark'>
          <tr>
            <th>Proveedor</th>
            <th>Cliente</th>
            <th>Litros de gas</th>
            <th>Precio total</th>
            <th>Operación</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {operationsQuery.data.map((operation: Operation) => {
            let created_at = new Date(operation.created_at);
            return (
              <tr className='table-data' key={operation.id}>
                <td>{marketersQuery.data.find((marketer: Marketer) => marketer.id === operation.marketer_id)?.name}</td>
                <td>{marketersQuery.data.find((marketer: Marketer) => marketer.id === operation.client_id)?.name}</td>
                <td>{operation.amount.toLocaleString('es-ES', { maximumFractionDigits: 2, useGrouping: true })} L</td>
                <td>{operation.price.toLocaleString('es-ES', { maximumFractionDigits: 2, useGrouping: true, style: 'currency', currency: 'EUR' })}</td>
                <td>{operation.type}</td>
                <td>{created_at.toLocaleDateString()}</td>
              </tr>
            )
          })} 
          <tr>
            <td colSpan={100}>
              <ul className="pagination justify-content-center m-0">
                <li className={`page-item ${currPage === 1 ? 'disabled' : ''}`}><button className="page-link" onClick={() => setCurrPage(currPage - 1)}>&laquo;</button></li>
                <li className="page-item"><span className="page-link">Página {currPage}</span></li>
                <li className={`page-item ${operationsQuery.data.length < limit ? 'disabled' : ''}`}><button className="page-link" onClick={() => setCurrPage(currPage + 1)}>&raquo;</button></li>
              </ul>
            </td>
          </tr>
        </tbody>
        <tfoot className='table-dark'>
          <tr>
            <td colSpan={100}>
              <button className='btn btn-primary' onClick={() => window.location.href = '/new_operation'}>Crear operación</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
