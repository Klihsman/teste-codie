import { PokeballButtonWrapper, PokeballImage } from "./style"
import pokeball from "../../../public/images/white-pokeball.svg";
import Link from "next/link";

const PokeballButton: React.FC = () => {
  return (
    <PokeballButtonWrapper>
      <PokeballImage alt="pokeball" src={pokeball}>
      </PokeballImage>

      <span>
        <Link href='/'>
          Centro Pokémon
        </Link>
      </span>
    </PokeballButtonWrapper>
  )
}

export default PokeballButton