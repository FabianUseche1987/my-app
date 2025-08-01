import { useEffect, useState } from "react";
import ModalDelete from "./components/ModalDelete";
import UsersTable from "./components/UsersTable";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // Modo edición
      await fetch(`http://localhost:5000/users/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      setEditingId(null); // limpiamos el modo edición
    } else {
      // Modo creación
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    }

    setForm({ name: "", email: "", age: "" });
    fetchUsers(); // Refrescamos
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setIsOpen(true);
  };

  const deleteUser = async () => {
    await fetch(`http://localhost:5000/users/${userToDelete._id}`, {
      method: "DELETE",
    });
    setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
    setIsOpen(false);
    setUserToDelete(null);
  };

  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      age: user.age,
    });
    setEditingId(user._id);
  };

  const handleDelete = (user) => {
    confirmDelete(user);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Usuarios registrados</h2>

        {/* Tabla de usuarios */}
        <div className="mb-8">
          <UsersTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <h3 className="text-xl font-semibold mb-4">
          {" "}
          {editingId ? "Actualizar Usuario" : "Agregar nuevo usuario"}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow"
        >
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600"
          />
          <input
            type="number"
            name="age"
            placeholder="Edad"
            value={form.age}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded w-full transition-colors duration-200 shadow-sm font-medium"
          >
            {editingId ? "Actualizar Usuario" : "Guardar Usuario"}
          </button>
        </form>
        <ModalDelete
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={deleteUser}
          user={userToDelete}
        />
      </div>
    </div>
  );
};

export default Users;
