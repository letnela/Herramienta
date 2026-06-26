import { useState } from "react";
import api from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email: form.email.trim(),
        password: form.password.trim(),
      });

      console.log("LOGIN:", res.data);

      const token = res.data.token || res.data.accessToken || res.data.jwt;

      if (!token) {
        alert("El backend no está enviando token");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("rol", res.data.rol || res.data.role || "ADMIN");
      localStorage.setItem("usuarioId", res.data.usuarioId || res.data.id || "");

      localStorage.setItem(
        "usuario",
        JSON.stringify({
          id: res.data.usuarioId || res.data.id,
          email: res.data.email || form.email,
          nombreCompleto: res.data.nombreCompleto || "Administrador",
          rol: res.data.rol || res.data.role || "ADMIN",
        })
      );

      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={login}>
        <h1>Sistema de Tickets</h1>
        <p>Gestión de incidencias universitarias</p>

        <input
          type="email"
          placeholder="Correo"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}