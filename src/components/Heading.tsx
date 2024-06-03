interface Props {
  children: React.ReactNode;
}
const Heading: React.FC<Props> = ({ children }) => {
  return (
    <h1 className="text-center text-3xl text-gray-800 mb-8">{children}</h1>
  );
};

export default Heading;
