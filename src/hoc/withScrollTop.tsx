import { useEffect } from "react";

const withScrollTop = (WrapperComponent: any) => {
  return (props: any) => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return <WrapperComponent {...props} />;
  };
};

export default withScrollTop;
