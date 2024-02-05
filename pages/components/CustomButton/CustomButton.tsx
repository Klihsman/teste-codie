import Link from "next/link";
import { CustomButtonWrapper } from "./style";

interface IProps {
  label: string;
  onClickCallback?: () => void;
}

const CustomButton: React.FC<IProps> = (props) => {
  const { label, onClickCallback } = props;

  return (
    <CustomButtonWrapper onClick={onClickCallback}>
      {label}
    </CustomButtonWrapper >
  )
}

export default CustomButton;