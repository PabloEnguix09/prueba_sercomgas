import { useQuery } from "@tanstack/react-query";
import { createOperation, listMarketers } from "../routes";
import { Marketer } from "../types/types";
import Select from "react-select";
import CurrencyInput from "react-currency-input-field";
import { useState } from "react";
import "../css/NewOperation.css";

async function crearOperacion(marketer_id: number, client_id: number, type: string) {

	const amount = parseInt((document.getElementById('amount') as HTMLInputElement).value);
	const price = parseFloat((document.getElementById('price') as HTMLInputElement).value);
	await createOperation(marketer_id, client_id, type, amount, price).then(() => {
		window.location.href = 'http://localhost:3001/';
	}).catch((error) => {
		const err = error instanceof Error ? error.message : 'Error al crear la operación';
		const errorElement = document.getElementById('error-message');
		errorElement!.innerHTML = err;
	});
}

function NewOperation() {

  const { data, isLoading, isError } = useQuery({
        queryKey: ['marketers'],
        queryFn: listMarketers
  })

  const [marketer_id, setMarketerId] = useState(0);
  const [client_id, setClientId] = useState(0);
  const [type, setType] = useState('');

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
  })
  const operationTypes = [{
    value: 'Compra',
    label: 'Compra'
  },
  {
    value: 'Venta',
    label: 'Venta'
  }]

  return (
    <div className="NewOperation">
        <form>
            <h1>Crear operación</h1>
            <Select id="marketer_id" options={marketers} placeholder="Proveedor" onChange={(e: any) => setMarketerId(e?.value)} />
            <Select id="client_id" options={marketers} placeholder="Cliente" onChange={(e: any) => setClientId(parseInt(e?.value))}/>
            <Select id="type" options={operationTypes} placeholder="Tipo de operación" onChange={(e: any) => setType(e?.value)}/>
            <CurrencyInput id="amount" placeholder="Cantidad de gas (L)" min={0} suffix={'L'} allowNegativeValue={false}/>
            <CurrencyInput id="price" placeholder="Precio total (€)" min={0} decimalsLimit={2} decimalSeparator="," groupSeparator="." suffix={'€'} allowNegativeValue={false}/>
            <button onClick={(event) => {event?.preventDefault(); crearOperacion(marketer_id, client_id, type)}}>Crear operación</button>
            <span id="error-message"></span>
        </form>
    </div>
  );
}

export default NewOperation;