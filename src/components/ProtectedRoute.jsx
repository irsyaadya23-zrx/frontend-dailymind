import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <p>Loading...</p>;

    return user ? <Outlet /> : <Navigate to="/login" />
} 