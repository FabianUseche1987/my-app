import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalDelete from "./components/ModalDelete";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Usuarios registrados</h2>
        <ul className="space-y-2 mb-8">
          {users.map((user) => (
            <li
              key={user._id}
              className="bg-white dark:bg-gray-800 p-3 rounded-md shadow flex justify-between items-center"
            >
              <span>
                <strong>{user.name}</strong> ({user.email}) - Edad: {user.age}
              </span>
              <button
                onClick={() => {
                  setForm({
                    name: user.name,
                    email: user.email,
                    age: user.age,
                  });
                  setEditingId(user._id); // Guardamos el ID del usuario a editar
                }}
                className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
              >
                Editar
              </button>
              <button
                onClick={() => confirmDelete(user)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md ml-4"
              >
                Eliminar
              </button>
              <button
                onClick={() => navigate(`/usuarios/${user._id}/facturas`)}
                className="mt-2 px-4 py-1 bg-blue-500 rounded hover:bg-blue-600"
              >
                Ver facturas
              </button>
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mb-2">Agregar nuevo usuario</h3>
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
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            {editingId ? "Actualizar" : "Guardar"}
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
