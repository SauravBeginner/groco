import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";

const AuthLayout = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default AuthLayout;
