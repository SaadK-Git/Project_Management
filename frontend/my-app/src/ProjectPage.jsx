import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000/api";

/* --- styles unchanged --- */
const s = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#f0f0f0",
    padding: "40px 48px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottom: "1px solid #222",
    paddingBottom: "24px",
    marginBottom: "32px",
  },
  label: { fontSize: "12px", color: "#c8f135", letterSpacing: "0.1em", marginBottom: "6px" },
  title: { fontSize: "48px", fontWeight: "800", margin: 0, letterSpacing: "-1px" },
  newBtn: {
    background: "#1a1a1a",
    color: "#f0f0f0",
    border: "1px solid #333",
    borderRadius: "8px",
    padding: "12px 20px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px",
  },
  card: {
    background: "#111",
    border: "1px solid #222",
    borderRadius: "12px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  cardTitle: { fontSize: "18px", fontWeight: "700", margin: 0 },
  cardDesc: { fontSize: "13px", color: "#888", margin: 0, lineHeight: "1.5" },
  progress: { fontSize: "12px", color: "#c8f135", letterSpacing: "0.05em" },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingTop: "12px",
    borderTop: "1px solid #1e1e1e",
  },
  viewBtn: {
    background: "#c8f135",
    color: "#0a0a0a",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "700",
    fontFamily: "inherit",
  },
  deleteBtn: {
    background: "transparent",
    color: "#555",
    border: "1px solid #2a2a2a",
    borderRadius: "6px",
    padding: "8px 14px",
    cursor: "pointer",
    fontSize: "12px",
    fontFamily: "inherit",
  },
  empty: {
    background: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: "12px",
    padding: "60px",
    textAlign: "center",
    color: "#444",
    fontSize: "14px",
  },
  emptyLink: {
    color: "#c8f135",
    cursor: "pointer",
    textDecoration: "underline",
    background: "none",
    border: "none",
    fontFamily: "inherit",
    fontSize: "14px",
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
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  modalLabel: { fontSize: "11px", color: "#c8f135", letterSpacing: "0.12em", marginBottom: "4px" },
  modalTitle: { fontSize: "24px", fontWeight: "800", margin: 0 },
  closeBtn: {
    background: "#1a1a1a",
    border: "1px solid #333",
    color: "#f0f0f0",
    borderRadius: "6px",
    width: "32px",
    height: "32px",
    cursor: "pointer",
    fontSize: "16px",
  },
  fieldLabel: { fontSize: "11px", letterSpacing: "0.1em", color: "#888", marginBottom: "8px" },
  input: {
    width: "100%",
    background: "#0d0d0d",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    padding: "12px 14px",
    color: "#f0f0f0",
    fontSize: "14px",
    fontFamily: "inherit",
  },
  textarea: {
    width: "100%",
    background: "#0d0d0d",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    padding: "12px 14px",
    color: "#f0f0f0",
    fontSize: "14px",
    fontFamily: "inherit",
    minHeight: "90px",
  },
  modalFooter: { display: "flex", justifyContent: "flex-end", gap: "10px" },
  cancelBtn: {
    background: "transparent",
    border: "1px solid #333",
    color: "#f0f0f0",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
  },
  submitBtn: {
    background: "#c8f135",
    color: "#0a0a0a",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
    fontWeight: "700",
  },
};

export default function ProjectPage() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });

  const fetchProjects = async () => {
    const res = await fetch(`${API}/projects`);
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    if (!form.name.trim()) return;

    await fetch(`${API}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", description: "" });
    setShowModal(false);
    fetchProjects();
  };

  const deleteProject = async (id) => {
    await fetch(`${API}/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  };

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <div style={s.label}>{projects.length} PROJECTS</div>
          <h1 style={s.title}>Project Board</h1>
        </div>

        <button style={s.newBtn} onClick={() => setShowModal(true)}>
          + New project
        </button>
      </div>

      {/* Grid */}
      {projects.length === 0 ? (
        <div style={s.empty}>
          no projects yet.{" "}
          <button style={s.emptyLink} onClick={() => setShowModal(true)}>
            create one
          </button>
        </div>
      ) : (
        <div style={s.grid}>
          {projects.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onView={() => navigate(`/projects/${p.id}`)}
              onDelete={() => deleteProject(p.id)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <div style={s.modalHeader}>
              <div>
                <div style={s.modalLabel}>NEW PROJECT</div>
                <h2 style={s.modalTitle}>Create project</h2>
              </div>
              <button style={s.closeBtn} onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <div>
              <div style={s.fieldLabel}>NAME *</div>
              <input
                style={s.input}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <div style={s.fieldLabel}>DESCRIPTION</div>
              <textarea
                style={s.textarea}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div style={s.modalFooter}>
              <button style={s.cancelBtn} onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button style={s.submitBtn} onClick={createProject}>
                + Create project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Card */
function ProjectCard({ project, onView, onDelete }) {
  const { name, description, completed_tasks, total_tasks } = project;

  return (
    <div style={s.card}>
      <div style={s.progress}>
        {completed_tasks}/{total_tasks} DONE
      </div>

      <h3 style={s.cardTitle}>{name}</h3>

      {description && <p style={s.cardDesc}>{description}</p>}

      <div style={s.cardFooter}>
        <button style={s.viewBtn} onClick={onView}>
          View tasks →
        </button>

        <button style={s.deleteBtn} onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}