import { TAX, UNIT_VALUE } from "../constants";

const formatValue = (value: number) => {
  let tempValue = value * UNIT_VALUE;

  tempValue += TAX;

  if (isNaN(tempValue) || tempValue <= 0) {
    return false;
  }

  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(tempValue);

  return formattedValue;
};

export default formatValue;
