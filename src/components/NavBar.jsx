import {Link} from "react-router-dom";
import {useAuth} from "../context/auth.context";

function NavBar() {
  const {isAuthenticated, user, logout} = useAuth();
  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10">
      <Link to={
        isAuthenticated ? '/tasks' : '/'
      }>
        <h1 className="text-2xl font-bold">Tasks Manager</h1>
      </Link>
      {isAuthenticated ? (
        <>
          <ul className="flex gap-x-2">
            <li>Welcome {user.username}</li>
            <li>
              <Link to="/task/new">Create task</Link>
            </li>
            <li>
              <Link
                className="bg-indigo-500 px-4 py-1 rounded-sm"
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul className="flex gap-x-2">
            <li>
              <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                Register
              </Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
}

export default NavBar;
