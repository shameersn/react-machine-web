import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import Employees from "./pages/Employees";
import EmployeeAddEdit from "./pages/EmployeeAddEdit";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeDetails from "./pages/EmployeeDetails";
import { AuthProvider } from "./utils/auth";
import RequireAuth from "./components/RequireAuth";
import Header from "./components/Header";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Header />
        <Box p={6}>
          <Routes>
            <Route
              path="/employee"
              element={
                <RequireAuth>
                  <Employees />
                </RequireAuth>
              }
            />
            <Route
              path="/employee/add"
              element={
                <RequireAuth>
                  <EmployeeAddEdit />
                </RequireAuth>
              }
            />
            <Route
              path="/employee/:id"
              element={
                <RequireAuth>
                  <EmployeeDetails />
                </RequireAuth>
              }
            />
            <Route
              path="/employee/:id/edit"
              element={
                <RequireAuth>
                  <EmployeeAddEdit />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
