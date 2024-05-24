import { createOperation } from "../services/routes";

export async function crearOperacion(marketer_id: number, client_id: number, type: string, amount: number, price: number) {
  
    try {
  
      if(marketer_id === 0 || client_id === 0 || type === '' || amount === 0 || price === 0) {
        throw new Error('Todos los campos son obligatorios');
      }
      if(marketer_id === client_id) {
        throw new Error('El cliente no puede ser el mismo que el proveedor');
      }
      if(amount < 0 || amount === 0 || isNaN(amount)) {
        throw new Error('La cantidad de gas debe ser un número mayor que 0');
      }
      if(price < 0 || price === 0 || isNaN(price)) {
        throw new Error('El precio debe ser un número mayor que 0');
      }
      await createOperation(marketer_id, client_id, type, amount, price).then((res) => {
        if(res.status === 201) {
          window.location.href = '/';
        }
        else if(res.status === 412) {
          throw new Error('Operación ya existente');
        }
        else {
          throw new Error('Error al crear la operación');
        }
      });
    } catch (error) {
      const err = error instanceof Error ? error.message : 'Error al crear la operación';
          const errorElement = document.getElementById('error-message');
          errorElement!.innerHTML = err;
    }
  }