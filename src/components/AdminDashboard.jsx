import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Admin.css";

Modal.setAppElement("#root");

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "User" },
    { id: 2, name: "Alice Smith", role: "Store Owner" },
    { id: 3, name: "Bob Johnson", role: "Admin" },
  ]);

  const [stores, setStores] = useState([
    { id: 1, name: "Tech Store", owner: "Alice Smith", rating: 4.2 },
    { id: 2, name: "Gadget Hub", owner: "John Doe", rating: 3.8 },
  ]);

  const [filterRole, setFilterRole] = useState("");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ id: null, name: "", role: "" });
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [newStore, setNewStore] = useState({ name: "", owner: "", rating: 5 });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.role) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (isEditingUser) {
      setUsers(users.map((user) => (user.id === newUser.id ? newUser : user)));
      toast.success("User updated successfully!");
    } else {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
      toast.success("User added successfully!");
    }
    setNewUser({ id: null, name: "", role: "" });
    setIsEditingUser(false);
    setIsUserModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    toast.success("User deleted successfully!");
  };

  const handleEditUser = (user) => {
    setNewUser(user);
    setIsEditingUser(true);
    setIsUserModalOpen(true);
  };

  const handleAddStore = () => {
    if (!newStore.name || !newStore.owner) {
      toast.error("Please fill in all fields.");
      return;
    }
    setStores([...stores, { id: stores.length + 1, ...newStore }]);
    toast.success("Store added successfully!");
    setNewStore({ name: "", owner: "", rating: 5 });
    setIsStoreModalOpen(false);
  };

  const handleDeleteStore = (id) => {
    setStores(stores.filter((store) => store.id !== id));
    toast.success("Store deleted successfully!");
  };

  const handleLogout = () => {
    toast.info("Logout successful!"); 
    setTimeout(() => {
      navigate("/");
    }, 1500); 
  };

  return (
    <div className="dashboard-container">
      <ToastContainer />
      <div className="header-container">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="dashboard-summary">
        <p>Total Users: {users.length}</p>
        <p>Total Stores: {stores.length}</p>
      </div>
      <div className="dashboard-actions">
        <button
          className="add-user-btn"
          onClick={() => setIsUserModalOpen(true)}
        >
          Add User
        </button>
        <button
          className="add-store-btn"
          onClick={() => setIsStoreModalOpen(true)}
        >
          Add Store
        </button>
      </div>
      <div className="dashboard-filter">
        <label>Filter by Role: </label>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">All</option>
          <option value="User">User</option>
          <option value="Store Owner">Store Owner</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div className="users-list-container">
        <h3>Users List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => (filterRole ? user.role === filterRole : true))
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="update-btn"
                      onClick={() => handleEditUser(user)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="stores-list-container">
        <h3>Stores List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Owner</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id}>
                <td>{store.name}</td>
                <td>{store.owner}</td>
                <td>
                  {[...Array(Math.round(store.rating))].map((_, index) => (
                    <FaStar key={index} color="gold" />
                  ))}
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteStore(store.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isUserModalOpen}
        onRequestClose={() => setIsUserModalOpen(false)}
      >
        <div className="admin-modals">
          <h2>{isEditingUser ? "Edit User" : "Add User"}</h2>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="User">User</option>
            <option value="Store Owner">Store Owner</option>
            <option value="Admin">Admin</option>
          </select>
          <button className="update-btn" onClick={handleAddUser}>
            {isEditingUser ? "Update" : "Add"}
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isStoreModalOpen}
        onRequestClose={() => setIsStoreModalOpen(false)}
      >
        <div className="admin-modals">
          <h2>Add Store</h2>
          <input
            type="text"
            placeholder="Store Name"
            value={newStore.name}
            onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Owner"
            value={newStore.owner}
            onChange={(e) =>
              setNewStore({ ...newStore, owner: e.target.value })
            }
          />
          <div className="star-rating">
            <label>Rating: {newStore.rating}</label>
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <FaStar
                  key={ratingValue}
                  size={15}
                  color={ratingValue <= newStore.rating ? "gold" : "#ccc"}
                  onClick={() =>
                    setNewStore({ ...newStore, rating: ratingValue })
                  }
                  style={{ cursor: "pointer", marginRight: "5px" }}
                />
              );
            })}
          </div>
          <button className="add-store-btn" onClick={handleAddStore}>
            Add Store
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
