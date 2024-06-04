interface ReactProps {
  children: React.ReactNode;
}
export const WrapperLayout: React.FC<ReactProps> = ({ children }) => {
  return <div>{children}</div>;
};
