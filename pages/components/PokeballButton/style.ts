import styled, { keyframes } from "styled-components";
import Image from "next/image";

const buttonAnimation = keyframes`
  0% {
    width: 263px;
  }
  100% {
    width: 34px;
    border-radius: 50px;
    padding-right: 40.5px;
    padding-left: 5px;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const PokeballButtonWrapper = styled.button`
  width: 263px;
  height: 100%;

  border-radius: 50px;
  background: #e40f0f;
  outline: none;
  border: none;
  padding: 10px 10px;
  overflow: hidden;

  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  position: relative;

  span {
    a {
      text-decoration: none;
      color: #fff;
      font-size: 15px;
      font-weight: 600;
    }
  }

  & {
    animation: ${buttonAnimation} 1s ease-out forwards;
    animation-delay: 5s;
  }
  &:hover {
    animation: none;

    & span {
      animation: none; /* Remover a animação do span no hover */
    }
  }

  & span {
    opacity: 1;
    animation: ${fadeOut} 1s ease-out forwards;
    animation-delay: 5s;
  }
`;

const PokeballImage = styled(Image)`
  width: 34px;
  height: 34px;
`;

export { PokeballButtonWrapper, PokeballImage };
