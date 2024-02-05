import styled from "styled-components";

const HeaderWrapper = styled.div`
  padding: 15px 5rem;

  display: flex;
  justify-content: space-between;

  a {
    text-decoration: none;
  }
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  a {
    text-decoration: none;
    color: #000;
  }
`;

const ButtonWrapper = styled.div`
  width: 263px;
`;

export { HeaderWrapper, RightWrapper, ButtonWrapper };
