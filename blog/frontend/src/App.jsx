import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddBlog, EditBlog, Home, Login, Register, ShowBlog } from "./pages";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <Toaster position='top-center' reverseOrder={false} />
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/add-blog'
            element={
              <ProtectedRoute>
                <AddBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path='/blogs/:id'
            element={
              <ProtectedRoute>
                <ShowBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path='/blogs/:id/edit'
            element={
              <ProtectedRoute>
                <EditBlog />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
