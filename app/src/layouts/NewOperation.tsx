import { useQuery } from "@tanstack/react-query";
import { list } from "../services/routes";
import { MarketerOption, OperationTypeOpt } from "../types/types";
import Select, { SingleValue } from "react-select";
import CurrencyInput from "react-currency-input-field";
import { ChangeEvent, useState } from "react";
import "../css/NewOperation.css";
import { crearOperacion } from "../ts/crearOperacion";
import { listMarketersOptions } from "../ts/listarMarketers";

function NewOperation() {

  const { data, isLoading, isError } = useQuery({
        queryKey: ['marketers'],
        queryFn: () => list("marketers"),
  });

  const [marketer_id, setMarketerId] = useState(0);
  const [client_id, setClientId] = useState(0);
  const [type, setType] = useState('');
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  if(isLoading) {
    return <div className="text-center">Cargando...</div>
  }
  if(isError) {
    return <div className="text-center">Error al cargar los marketers</div>
  }

  const marketers: MarketerOption[] = listMarketersOptions(data);

  const operationTypes: OperationTypeOpt[] = [
    { value: 'Compra', label: 'Compra'},
    { value: 'Venta', label: 'Venta'}
  ];

  return (
    <div className="NewOperation">
        <h1 className="text-center my-3">Crear operación</h1>
        <form className="row g-4 mx-5">
            <Select className="col-6 ps-0" id="marketer_id" options={marketers} placeholder="Proveedor" onChange={(e: SingleValue<MarketerOption>) => setMarketerId(e!.value)} />
            <Select className="col-6 pe-0" id="client_id" options={marketers} placeholder="Cliente" onChange={(e: SingleValue<MarketerOption>) => setClientId(e!.value)}/>
            <Select className="p-0 text-center" id="type" options={operationTypes} placeholder="Tipo de operación" onChange={(e:SingleValue<OperationTypeOpt>) => setType(e!.value)}/>
            <div className="col-12 d-flex p-0 gap-4">
              <CurrencyInput className="form-control" id="amount" placeholder="Cantidad de gas (L)" min={0} suffix={' L'} groupSeparator="," decimalSeparator="." allowDecimals={false} allowNegativeValue={false} onChange={(e:ChangeEvent<HTMLInputElement>) => setAmount(parseInt(e.target.value.replace(',', '')))}/>
              <CurrencyInput className="form-control" id="price" placeholder="Precio total (€)" min={0} decimalsLimit={2} suffix=" €" groupSeparator="," decimalSeparator="." allowNegativeValue={false} onChange={(e:ChangeEvent<HTMLInputElement>) => setPrice(parseFloat(e.target.value.replace(',', '')))}/>
            </div>
            <button className="btn btn-primary" onClick={(event) => {event?.preventDefault(); crearOperacion(marketer_id, client_id, type, amount, price)}}>Crear operación</button>
            <span className="p-0 text-danger text-center" id="error-message"></span>
        </form>
    </div>
  )
}

export default NewOperation;