import Link from "next/link";
import CustomButton from "../CustomButton/CustomButton";
import PokeballButton from "../PokeballButton/PokeballButton"
import { ButtonWrapper, HeaderWrapper, RightWrapper } from "./style";

const Header: React.FC = () => {
  const queryParams = { title: 'Quem Somos' };

  return (
    <HeaderWrapper>
      <PokeballButton />

      <RightWrapper>
        <Link href={{ pathname: "/about", query: queryParams }}>Quem Somos</Link>

        <Link href={{ pathname: 'scheduleForm', query: { title: "Agendar Consulta" } }}>
          <ButtonWrapper>
            <CustomButton label="Agendar Consulta" />
          </ButtonWrapper>
        </Link>
      </RightWrapper>
    </HeaderWrapper >
  )
}

export default Header;