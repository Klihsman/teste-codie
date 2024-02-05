import styled from "styled-components";

const FormTitle = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 2rem;
`;

const FormWrapper = styled.form`
  padding: 20px 42rem 50rem 42rem;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 12px;
    font-weight: 700;
  }

  input,
  select {
    border-radius: 5px;
    border: none;
    outline: none;
    border: 1px solid #ddd;
    padding: 10px;
  }
`;

const PokemonFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3%;
  label {
    width: 20%;
    font-size: 12px;
    font-weight: 700;
  }

  select {
    width: 80%;
    border-radius: 5px;
    border: none;
    outline: none;
    border: 1px solid #ddd;
    padding: 10px;
  }
`;

const AddPokemonButton = styled.button`
  border: none;
  outline: none;
  border: 1px solid #000;
  background-color: transparent;
  border-radius: 30px;
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 4% 0px;
`;

const InformationsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
`;

const InsideTitle = styled.div`
  margin-top: 8rem;
  margin-bottom: 1rem;

  h1 {
    font-size: 12px;
    font-weight: 700;
    margin: 0;
    margin-bottom: 3px;
  }

  span {
    font-size: 12px;
    color: #ccc;
  }
`;

const PriceContainer = styled.div`
  padding: 30px 0px;
  border-top: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 4% 0px;

  div {
    display: flex;
    justify-content: space-between;

    span {
      color: #808080;
    }
  }

  :last-child {
    font-size: 10px;
    color: #808080;
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 20px;
    font-weight: 700;
  }
`;

const SubmitButtonWrapper = styled.div`
  width: 50%;
  height: 50%;
`;

const SubmittedStatusWrapper = styled.div`
  padding: 50px 45rem 50rem 45rem;
`;

const SubmittedStatusContainer = styled.div`
  padding: 8px;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  border: 1px solid #e40f0f;

  h1 {
    font-size: 24px;
  }

  span {
    font-size: 14px;
    color: #808080;
  }

  button {
    margin-top: 30px;
  }
`;

export {
  FieldWrapper,
  FormWrapper,
  InformationsWrapper,
  PokemonFieldWrapper,
  AddPokemonButton,
  FormTitle,
  InsideTitle,
  SubmitContainer,
  SubmitButtonWrapper,
  PriceContainer,
  SubmittedStatusWrapper,
  SubmittedStatusContainer,
};
