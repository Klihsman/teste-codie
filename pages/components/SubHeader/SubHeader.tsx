import { SubHeaderWrapper, SubTitle, Title } from "./style";

interface IProps {
  title: string | string[] | undefined;
}

const SubHeader: React.FC<IProps> = (props) => {
  const { title } = props;
  return (
    <SubHeaderWrapper>
      <div>
        <span>Home &gt; </span>
        <span>{title}</span>
      </div>

      <Title>{title}</Title>
      <SubTitle>A maior rede de tratamento de pokémon</SubTitle>
    </SubHeaderWrapper>
  )
}

export default SubHeader;