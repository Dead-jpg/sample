import React, { useState, useEffect, useRef } from "react";

// Helper for time formatting
const formatTime = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};

function VirtualStudyAssistant() {
  const [activeTab, setActiveTab] = useState("timetable");

  // Timetable Planner State
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput]);
      setTaskInput("");
    }
  };

  // Pomodoro Timer State
  const [seconds, setSeconds] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, seconds]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(1500);
  };

  // AI Explanation State
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");

  const getExplanation = () => {
    if (topic.trim()) {
      // Mock AI explanation
      setExplanation(`Explanation for "${topic}": This is a mock AI explanation to help you understand the topic.`);
    }
  };

  // Notes State
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    if (noteInput.trim()) {
      setNotes([...notes, noteInput]);
      setNoteInput("");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>📚 Virtual Study Assistant</h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
        {["timetable", "pomodoro", "ai", "notes"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === tab ? "#007bff" : "#e0e0e0",
              color: activeTab === tab ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {activeTab === "timetable" && (
          <div>
            <h2>🗓️ Timetable Planner</h2>
            <input
              type="text"
              placeholder="Add a task"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              style={{ width: "80%", padding: "8px" }}
            />
            <button onClick={addTask} style={{ padding: "8px 12px", marginLeft: "8px" }}>
              Add
            </button>
            <ul>
              {tasks.map((task, idx) => (
                <li key={idx}>• {task}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "pomodoro" && (
          <div>
            <h2>⏱️ Pomodoro Timer</h2>
            <h1 style={{ fontSize: "48px", margin: "20px 0" }}>{formatTime(seconds)}</h1>
            <button onClick={toggleTimer} style={{ padding: "10px 20px", marginRight: "10px" }}>
              {isRunning ? "Pause" : "Start"}
            </button>
            <button onClick={resetTimer} style={{ padding: "10px 20px" }}>
              Reset
            </button>
          </div>
        )}

        {activeTab === "ai" && (
          <div>
            <h2>🤖 AI Topic Explanation</h2>
            <input
              type="text"
              placeholder="Enter a topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={{ width: "80%", padding: "8px" }}
            />
            <button onClick={getExplanation} style={{ padding: "8px 12px", marginLeft: "8px" }}>
              Explain
            </button>
            {explanation && <p style={{ marginTop: "20px" }}>{explanation}</p>}
          </div>
        )}

        {activeTab === "notes" && (
          <div>
            <h2>📝 Note Organization</h2>
            <input
              type="text"
              placeholder="Write a note"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              style={{ width: "80%", padding: "8px" }}
            />
            <button onClick={addNote} style={{ padding: "8px 12px", marginLeft: "8px" }}>
              Save
            </button>
            <ul style={{ marginTop: "10px" }}>
              {notes.map((note, idx) => (
                <li key={idx}>• {note}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default VirtualStudyAssistant;

