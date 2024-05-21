import './App.css';
import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { listMarketers, listOperations, createMarketer, createOperation } from './routes';
import { Marketer } from './types/types';

function crearOperacion() {
	const marketer_id = (document.getElementById('marketer_id') as HTMLInputElement).value;
	const client_id = (document.getElementById('client_id') as HTMLInputElement).value;
	const type = (document.getElementById('type') as HTMLInputElement).value;
	const amount = (document.getElementById('amount') as HTMLInputElement).value;
	const price = (document.getElementById('price') as HTMLInputElement).value;
	createOperation(Number(marketer_id), Number(client_id), type, Number(amount), Number(price))
}

function App() {
  const queryClient = useQueryClient();

  const [marketersQuery, operationsQuery] = useQueries({
    queries: [
      {
        queryKey: ['marketers'],
        queryFn: listMarketers
      },
      {
        queryKey: ['operations'],
        queryFn: listOperations
      }
    ]
  })

  if(marketersQuery.isLoading || operationsQuery.isLoading) {
    return <div>Cargando...</div>
  }
  if(marketersQuery.isError || operationsQuery.isError) {
    return <div>{marketersQuery.error ? 'Error en marketers: ' + marketersQuery.error.message : 'Error en operaciones: ' + operationsQuery.error?.message}</div>
  }
  return (
    <div className="App">

      <h1>Operaciones</h1>
      <table className='table table-responsive table-striped table-hover table-bordered'>
        <thead className='table-dark'>
          <tr>
            <th>Proveedor</th>
            <th>Cliente</th>
            <th>Importe</th>
            <th>Precio</th>
            <th>Tipo</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {operationsQuery.data.map((operation: any) => {
            let created_at = new Date(operation.created_at);            
            return (
              <tr key={operation.id}>
                <td>{marketersQuery.data.find((marketer: Marketer) => marketer.id === operation.marketer_id)?.name}</td>
                <td>{marketersQuery.data.find((marketer: Marketer) => marketer.id === operation.client_id)?.name}</td>
                <td>{operation.amount}</td>
                <td>{operation.price}</td>
                <td>{operation.type}</td>
                <td>{created_at.toLocaleDateString()}</td>
              </tr>
            )
          })} 
          <tr>
            <td colSpan={100}>
              <ul className="pagination justify-content-center m-0">
                <li className="page-item"><button className="page-link">&laquo;</button></li>
                <li className="page-item"><button className="page-link">1</button></li>
                <li className="page-item"><button className="page-link">2</button></li>
                <li className="page-item"><button className="page-link">3</button></li>
                <li className="page-item"><button className="page-link">&raquo;</button></li>
              </ul>
            </td>
          </tr>
        </tbody>
        <tfoot className='table-dark'>
          <tr>
            <td colSpan={100}>
              <button className='btn btn-primary' onClick={() => window.location.href = 'http://localhost:3001/new_operation'}>Crear operación</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
