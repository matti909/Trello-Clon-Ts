type Props = {
  text: string;
};

export const Card = ({ text }: Props) => {
  return (
    <div className="@apply bg-white cursor-pointer max-w-[300px] shadow-[#091e4240_0px_1px_0px_0px] mb-2 px-4 py-2 rounded-[3px]">
      {text}
    </div>
  );
};
