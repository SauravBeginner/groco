import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";

const AuthLayout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth?.isAuthenticated
  );
  console.log(isAuthenticated);
  return (
    <main>
      <Navbar />
      <main className="mt-10">
        <Outlet />
      </main>
      <Footer />
    </main>
  );
};

export default AuthLayout;
