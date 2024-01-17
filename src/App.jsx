import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import TasksPages from "./pages/TaskPage";
import TaskForm from "./pages/TaskForm";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";

import ProtectedRoute from "./ProtectedRoute";

import {AuthProvider} from "./context/auth.context";
import {TaskProvider} from "./context/TasksContext";
import NavBar from "./components/NavBar";
const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<TasksPages />} />
            <Route path="/task/new" element={<TaskForm />} />
            <Route path="/tasks/:id" element={<TaskForm />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
