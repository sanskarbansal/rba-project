// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Admin from "./components/Admin";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
    <AuthProvider>
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route
                    index
                    element={
                        <ProtectedRoute roles={["user"]}>
                            <PostList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/create-post"
                    element={
                        <ProtectedRoute roles={["user"]}>
                            <CreatePost />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute roles={["admin"]}>
                            <Admin />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    </AuthProvider>
);

export default App;
