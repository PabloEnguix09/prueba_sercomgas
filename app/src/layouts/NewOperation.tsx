import { useQuery } from "@tanstack/react-query";
import { createOperation, listMarketers } from "../services/routes";
import { Marketer } from "../types/types";
import Select from "react-select";
import CurrencyInput from "react-currency-input-field";
import { useState } from "react";
import "../css/NewOperation.css";

async function crearOperacion(marketer_id: number, client_id: number, type: string, amount: number, price: number) {
  
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
        window.location.href = 'http://localhost:3001/';
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

function NewOperation() {

  const { data, isLoading, isError } = useQuery({
        queryKey: ['marketers'],
        queryFn: listMarketers
  });

  const [marketer_id, setMarketerId] = useState(0);
  const [client_id, setClientId] = useState(0);
  const [type, setType] = useState('');
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  if(isLoading) {
    return <div>Cargando...</div>
  }
  if(isError) {
    return <div>Error al cargar los marketers</div>
  }

  const marketers = data.map((marketer: Marketer) => {
    return {
      value: marketer.id,
      label: marketer.name
    }
  });
  const operationTypes = [{
    value: 'Compra',
    label: 'Compra'
  },
  {
    value: 'Venta',
    label: 'Venta'
  }];

  return (
    <div className="NewOperation">
        <h1 className="text-center my-3">Crear operación</h1>
        <form className="row g-4 mx-5">
            <Select className="col-6 ps-0" id="marketer_id" options={marketers} placeholder="Proveedor" onChange={(e: any) => setMarketerId(e?.value)} />
            <Select className="col-6 pe-0" id="client_id" options={marketers} placeholder="Cliente" onChange={(e: any) => setClientId(parseInt(e?.value))}/>
            <Select className="p-0 text-center" id="type" options={operationTypes} placeholder="Tipo de operación" onChange={(e: any) => setType(e?.value)}/>
            <div className="col-12 d-flex p-0 gap-4">
              <CurrencyInput className="form-control" id="amount" placeholder="Cantidad de gas (L)" min={0} suffix={' L'} groupSeparator="," decimalSeparator="." allowDecimals={false} allowNegativeValue={false} onChange={(e:any) => setAmount(parseInt(e.target.value.replace(',', '')))}/>
              <CurrencyInput className="form-control" id="price" placeholder="Precio total (€)" min={0} decimalsLimit={2} suffix=" €" groupSeparator="," decimalSeparator="." allowNegativeValue={false} onChange={(e:any) => setPrice(parseFloat(e.target.value.replace(',', '')))}/>
            </div>
            <button className="btn btn-primary" onClick={(event) => {event?.preventDefault(); crearOperacion(marketer_id, client_id, type, amount, price)}}>Crear operación</button>
            <span className="p-0 text-danger text-center" id="error-message"></span>
        </form>
    </div>
  )
}

export default NewOperation;