import {useForm} from "react-hook-form";
import {useAuth} from "../context/auth.context";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Register() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const {singup, isAuthenticated, errors: registerError} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    singup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <h1 className="text-3xl font-bold my-2">Register</h1>
        <form onSubmit={onSubmit}>
        <div className="bg-red-500 text-white">
        {
          registerError.map((error, i) =>{
              return <div key={i}>{error}</div>
            })
        }
            </div>
          <input
            type="text"
            {...register("username", {required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">Username is rquiered</p>
          )}
          <input
            type="email"
            {...register("email", {required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500">Email is rquiered</p>
          )}
          <input
            type="password"
            {...register("password", {required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is rquiered</p>
          )}
          <button className="bg-sky-500 hover:bg-sky-600 text-white px-2 py-2 rounded-md my-3" type="submit">Register</button>
        </form>
      
      </div>
    </div>
    
  );
}

export default Register;
