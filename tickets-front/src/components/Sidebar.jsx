import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Ticket,
  Tags,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar({ usuario }) {
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      {/* MOBILE BUTTON */}

      <button
        className="mobile-menu-btn"
        onClick={() => setOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* OVERLAY */}

      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`sidebar ${open ? "sidebar-open" : ""}`}
      >
        <button
          className="sidebar-close"
          onClick={() => setOpen(false)}
        >
          <X size={22} />
        </button>

        <div className="brand">
          <div className="brand-icon">🎫</div>

          <div>
            <h2>Tickets UTP</h2>
            <span>{usuario?.rol}</span>
          </div>
        </div>

        <nav className="menu">
          <NavLink to="/dashboard">
            <LayoutDashboard size={19} />
            Dashboard
          </NavLink>

          <NavLink to="/tickets">
            <Ticket size={19} />
            Tickets
          </NavLink>

          <NavLink to="/usuarios">
            <Users size={19} />
            Usuarios
          </NavLink>

          <NavLink to="/categorias">
            <Tags size={19} />
            Categorías
          </NavLink>

          <NavLink to="/reportes">
            <BarChart3 size={19} />
            Reportes
          </NavLink>

          <NavLink to="/perfil">
            <User size={19} />
            Mi Perfil
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-box">
            <div className="avatar">
              {usuario?.nombreCompleto?.charAt(0) || "A"}
            </div>

            <div>
              <strong>{usuario?.nombreCompleto}</strong>
              <small>{usuario?.email}</small>
            </div>
          </div>

          <button
            onClick={logout}
            className="logout-btn"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}