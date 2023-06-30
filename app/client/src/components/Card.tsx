import { CardContainer } from "./Styles";

interface CardProps {
  text: string;
  id: string;
}

export const Card = ({ text }: CardProps) => {
  return <CardContainer>{text}</CardContainer>;
};
