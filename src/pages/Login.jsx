import {useForm} from "react-hook-form";
import {useAuth} from "../context/auth.context";
import {useEffect} from "react";
import {useNavigate} from "react-router";

function Login() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const {singin, errors: LoginErrors, isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    singin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-3xl font-bold my-2">Login</h1>
        <form onSubmit={onSubmit}>
          <div className="bg-red-500 text-white">
            {LoginErrors.map((error, i) => {
              return <div key={i}>{error}</div>;
            })}
          </div>
          <input
            type="email"
            name="email"
            {...register("email", {required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is rquiered</p>}
          <input
            type="password"
            name="password"
            {...register("password", {required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is rquiered</p>
          )}
          <button className="bg-sky-500 hover:bg-sky-600 text-white px-2 py-2 rounded-md my-2" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
