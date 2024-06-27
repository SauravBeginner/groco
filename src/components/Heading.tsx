interface Props {
  children: React.ReactNode;
}
export const Heading: React.FC<Props> = ({ children }) => {
  return (
    <h1 className="text-center text-3xl text-gray-800 mb-8">{children}</h1>
  );
};
