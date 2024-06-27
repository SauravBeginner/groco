import { LoginForm, Quotes } from "../components";

const Login = () => {
  return (
    <div className="mt-10 pt-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-7xl py-12 md:py-24">
          <div className="grid items-center justify-items-center gap-x-4 gap-y-10 grid-cols-1 lg:grid-cols-4">
            {/* contact from */}
            <LoginForm />
            <Quotes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
