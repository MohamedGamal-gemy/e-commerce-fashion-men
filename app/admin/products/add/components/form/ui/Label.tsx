const Label = ({
  children,
  id,
}: {
  children: string;
  id?: string | undefined;
}) => {
  return (
    <label
      htmlFor={id}
      className="block text-xs font-bold text-green-300 mb-1"
    >
      {children}
    </label>
  );
};

export default Label;