import { UNIT_VALUE } from "../constants";

const formatSubTotal = (value: number) => {
  let tempValue = value * UNIT_VALUE;

  if (isNaN(tempValue)) {
    return false;
  }

  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(tempValue);

  return formattedValue;
};

export default formatSubTotal;
