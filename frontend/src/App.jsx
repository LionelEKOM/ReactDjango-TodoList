import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [flashMessage, setFlashMessage] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [isInvalid, setIsInvalid] = useState(false);

  // Charger les todos au démarrage
  useEffect(() => {
    fetchTodos();
  }, []);

  // Afficher un message flash
  const showFlashMessage = (type, message) => {
    setFlashMessage({ show: true, type, message });
    setTimeout(() => {
      setFlashMessage({ show: false, type: "", message: "" });
    }, 3000);
  };

  // Récupérer tous les todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/todos/`);
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des tâches");
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  // Créer un nouveau todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      setIsInvalid(true);
      return;
    }
    setIsInvalid(false);
    try {
      const response = await axios.post(`${API_URL}/todos/create/`, {
        title: newTodo,
        status: false,
      });
      setTodos([...todos, response.data]);
      setNewTodo("");
      setError(null);
      showFlashMessage("success", "Tâche ajoutée avec succès !");
    } catch (err) {
      setError("Erreur lors de la création de la tâche");
      console.error("Erreur:", err);
    }
  };

  // Mettre à jour le statut d'un todo
  const toggleStatus = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);
      const response = await axios.put(`${API_URL}/todos/${id}/update/`, {
        ...todo,
        status: !todo.status,
      });
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
      setError(null);
    } catch (err) {
      setError("Erreur lors de la mise à jour de la tâche");
      console.error("Erreur:", err);
    }
  };

  // Éditer un todo
  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setNewTodo(todo.title);
  };

  // Sauvegarder l'édition
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      setIsInvalid(true);
      return;
    }
    setIsInvalid(false);
    if (editingTodo) {
      try {
        const response = await axios.put(
          `${API_URL}/todos/${editingTodo.id}/update/`,
          {
            ...editingTodo,
            title: newTodo,
          }
        );
        setTodos(
          todos.map((todo) =>
            todo.id === editingTodo.id ? response.data : todo
          )
        );
        setNewTodo("");
        setEditingTodo(null);
        setError(null);
        showFlashMessage("info", "Tâche modifiée avec succès !");
      } catch (err) {
        setError("Erreur lors de la modification de la tâche");
        console.error("Erreur:", err);
      }
    }
  };

  // Annuler l'édition
  const handleCancelEdit = () => {
    setEditingTodo(null);
    setNewTodo("");
    setIsInvalid(false);
  };

  // Supprimer un todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}/delete/`);
      setTodos(todos.filter((todo) => todo.id !== id));
      setError(null);
      showFlashMessage("danger", "Tâche supprimée avec succès !");
    } catch (err) {
      setError("Erreur lors de la suppression de la tâche");
      console.error("Erreur:", err);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 position-relative">
          {/* Message Flash */}
          {flashMessage.show && (
            <div
              className={`alert alert-${flashMessage.type} alert-dismissible fade show position-absolute shadow-sm`}
              role="alert"
              style={{
                top: "-70px",
                zIndex: 1000,
                animation:
                  "slideDown 0.3s ease-out, fadeOut 0.3s ease-out 2.7s forwards",
                borderRadius: "8px",
                border: "none",
                width: "100%",
                left: 0,
                right: 0,
              }}
            >
              <div className="d-flex align-items-center">
                <i
                  className={`bi ${
                    flashMessage.type === "success"
                      ? "bi-check-circle-fill"
                      : flashMessage.type === "danger"
                      ? "bi-x-circle-fill"
                      : "bi-info-circle-fill"
                  } me-2`}
                ></i>
                {flashMessage.message}
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={() =>
                  setFlashMessage({ show: false, type: "", message: "" })
                }
                style={{ fontSize: "0.8rem" }}
              ></button>
            </div>
          )}

          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Ma TodoList</h3>
            </div>
            <div className="card-body">
              {/* Message d'erreur */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {/* Formulaire d'ajout/édition */}
              <form
                onSubmit={editingTodo ? handleSaveEdit : handleSubmit}
                className="mb-4 needs-validation"
                noValidate
              >
                <div className="position-relative">
                  <div className="input-group">
                    <input
                      type="text"
                      className={`form-control ${
                        isInvalid ? "is-invalid" : ""
                      }`}
                      placeholder={
                        editingTodo
                          ? "Modifier la tâche..."
                          : "Ajouter une nouvelle tâche..."
                      }
                      value={newTodo}
                      onChange={(e) => {
                        setNewTodo(e.target.value);
                        setIsInvalid(false);
                      }}
                      required
                    />
                    <button className="btn btn-primary" type="submit">
                      {editingTodo ? "Modifier" : "Ajouter"}
                    </button>
                    {editingTodo && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancelEdit}
                      >
                        Annuler
                      </button>
                    )}
                  </div>
                  {isInvalid && (
                    <div className="invalid-feedback d-block">
                      Veuillez saisir une tâche avant de valider.
                    </div>
                  )}
                </div>
              </form>

              {/* Indicateur de chargement */}
              {loading && (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                  </div>
                </div>
              )}

              {/* Liste des todos */}
              {!loading && (
                <div className="list-group">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="form-check-input me-3"
                          checked={todo.status}
                          onChange={() => toggleStatus(todo.id)}
                        />
                        <span
                          className={
                            todo.status
                              ? "text-decoration-line-through text-muted"
                              : ""
                          }
                        >
                          {todo.title}
                        </span>
                      </div>
                      <div className="btn-group">
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(todo)}
                          title="Modifier"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteTodo(todo.id)}
                          title="Supprimer"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Message si pas de todos */}
              {!loading && todos.length === 0 && (
                <div className="text-center text-muted mt-4">
                  Aucune tâche pour le moment. Ajoutez-en une !
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style>
        {`
          @keyframes slideDown {
            from {
              transform: translateY(-20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes fadeOut {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }

          .alert {
            backdrop-filter: blur(5px);
            background-color: rgba(255, 255, 255, 0.95);
          }

          .alert-success {
            background-color: rgba(25, 135, 84, 0.85) !important;
            color: white;
          }

          .alert-danger {
            background-color: rgba(220, 53, 69, 0.85) !important;
            color: white;
          }

          .alert-info {
            background-color: rgba(13, 202, 240, 0.85) !important;
            color: white;
          }

          .btn-close {
            filter: brightness(0) invert(1);
          }
        `}
      </style>
    </div>
  );
}

export default App;
