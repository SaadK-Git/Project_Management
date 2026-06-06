import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000/api";

const STATUSES = ["To Do", "In Progress", "Done"];
const PRIORITIES = ["High", "Medium", "Low"];

const priorityColor = {
  High: "#ff4d4d",
  Medium: "#f5a623",
  Low: "#4da6ff",
};

const s = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#f0f0f0",
    padding: "40px 48px",
    fontFamily: "'Space Mono', monospace",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottom: "1px solid #222",
    paddingBottom: "24px",
    marginBottom: "32px",
  },
  backBtn: {
    background: "transparent",
    border: "none",
    color: "#888",
    cursor: "pointer",
    fontSize: "13px",
    padding: 0,
    marginBottom: "8px",
    display: "block",
  },
  label: {
    fontSize: "12px",
    color: "#c8f135",
    letterSpacing: "0.1em",
    marginBottom: "6px",
  },
  title: {
    fontSize: "48px",
    fontWeight: "800",
    margin: 0,
    letterSpacing: "-1px",
  },
  newBtn: {
    background: "#1a1a1a",
    color: "#f0f0f0",
    border: "1px solid #333",
    borderRadius: "8px",
    padding: "12px 20px",
    cursor: "pointer",
    fontSize: "14px",
  },
  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  filterBtn: (active) => ({
    background: active ? "#f0f0f0" : "#111",
    color: active ? "#0a0a0a" : "#888",
    border: "1px solid #222",
    borderRadius: "20px",
    padding: "6px 16px",
    cursor: "pointer",
    fontSize: "13px",
  }),
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  taskCard: {
    background: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: "10px",
    padding: "18px 22px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  taskTitle: {
    fontSize: "15px",
    fontWeight: "700",
    margin: 0,
    flex: 1,
  },
  badge: (color) => ({
    fontSize: "11px",
    color,
    border: `1px solid ${color}33`,
    borderRadius: "20px",
    padding: "3px 10px",
    whiteSpace: "nowrap",
  }),
  statusSelect: {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    color: "#f0f0f0",
    borderRadius: "6px",
    padding: "6px 10px",
    fontSize: "12px",
  },
  deleteBtn: {
    background: "transparent",
    border: "1px solid #2a2a2a",
    color: "#555",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: "12px",
  },
  empty: {
    background: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: "12px",
    padding: "60px",
    textAlign: "center",
    color: "#444",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  modal: {
    background: "#111",
    border: "1px solid #2a2a2a",
    borderRadius: "16px",
    padding: "32px",
    width: "460px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  modalLabel: {
    fontSize: "11px",
    color: "#c8f135",
    letterSpacing: "0.12em",
    marginBottom: "4px",
  },
  modalTitle: {
    fontSize: "24px",
    fontWeight: "800",
    margin: 0,
  },
  input: {
    width: "100%",
    background: "#0d0d0d",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    padding: "12px 14px",
    color: "#f0f0f0",
    fontSize: "14px",
  },
  priorityGroup: {
    display: "flex",
    gap: "10px",
  },
  priorityBtn: (active) => ({
    flex: 1,
    padding: "10px",
    background: active ? "#f5a623" : "#0d0d0d",
    color: active ? "#0a0a0a" : "#888",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    cursor: "pointer",
  }),
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  cancelBtn: {
    background: "transparent",
    border: "1px solid #333",
    color: "#f0f0f0",
    borderRadius: "8px",
    padding: "10px 20px",
  },
  submitBtn: {
    background: "#c8f135",
    color: "#0a0a0a",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontWeight: "700",
  },
};

/* ================= MAIN COMPONENT ================= */

export default function TaskPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", priority: "Medium" });

  /* FETCH PROJECT + TASKS */
  const fetchData = async () => {
    const res1 = await fetch(`${API}/projects/${projectId}`);
    const projectData = await res1.json();

    const res2 = await fetch(`${API}/projects/${projectId}/tasks`);
    const taskData = await res2.json();

    setProject(projectData);
    setTasks(taskData);
  };

  useEffect(() => {
    if (projectId) fetchData();
  }, [projectId]);

  const createTask = async () => {
    if (!form.title.trim()) return;

    await fetch(`${API}/projects/${projectId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        priority: form.priority,
        status: "To Do",
        project_id: projectId,
      }),
    });

    setForm({ title: "", priority: "Medium" });
    setShowModal(false);
    fetchData();
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
    fetchData();
  };

  const updateStatus = async (id, status) => {
    await fetch(`${API}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  if (!project) {
    return <div style={{ color: "#888", padding: 40 }}>Loading...</div>;
  }

  const filtered =
    filter === "All"
      ? tasks
      : tasks.filter((t) => t.priority === filter);

  const done = tasks.filter((t) => t.status === "Done").length;

  return (
    <div style={s.page}>
      {/* HEADER */}
      <div style={s.header}>
        <div>
          <button style={s.backBtn} onClick={() => navigate("/")}>
            ← Back to projects
          </button>

          <div style={s.label}>
            {done}/{tasks.length} DONE
          </div>

          <h1 style={s.title}>{project.name}</h1>
        </div>

        <button style={s.newBtn} onClick={() => setShowModal(true)}>
          + New task
        </button>
      </div>

      {/* FILTERS */}
      <div style={s.filters}>
        {["All", ...PRIORITIES].map((p) => (
          <button
            key={p}
            style={s.filterBtn(filter === p)}
            onClick={() => setFilter(p)}
          >
            {p}
          </button>
        ))}
      </div>

      {/* TASK LIST */}
      {filtered.length === 0 ? (
        <div style={s.empty}>No tasks yet.</div>
      ) : (
        <div style={s.taskList}>
          {filtered.map((task) => (
            <div key={task.id} style={s.taskCard}>
              <h4 style={s.taskTitle}>{task.title}</h4>

              <span style={s.badge(priorityColor[task.priority])}>
                {task.priority}
              </span>

              <select
                style={s.statusSelect}
                value={task.status}
                onChange={(e) => updateStatus(task.id, e.target.value)}
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>

              <button
                style={s.deleteBtn}
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <div>
              <div style={s.modalLabel}>NEW TASK</div>
              <h2 style={s.modalTitle}>Create task</h2>
            </div>

            <input
              style={s.input}
              placeholder="Task title..."
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <div style={s.priorityGroup}>
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  style={s.priorityBtn(form.priority === p)}
                  onClick={() => setForm({ ...form, priority: p })}
                >
                  {p}
                </button>
              ))}
            </div>

            <div style={s.modalFooter}>
              <button
                style={s.cancelBtn}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button style={s.submitBtn} onClick={createTask}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}