"use client"

import { useState } from "react"
import Ribbon from "@/components/Ribbon"
import Sidebar from "@/components/Sidebar"
import TaskList from "@/components/TaskList"
import TaskDetail from "@/components/TaskDetail"
import AddTaskModal from "@/components/AddTaskModal"

interface Task {
  id: number
  title: string
  startDate: string
  dueDate: string
  status: string
  priority: string
  percentComplete: number
  owner: string
  subTasks: string[]
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Monthly Production Planning – Line A",
    startDate: "01/05/2026",
    dueDate: "01/10/2026",
    status: "Completed",
    priority: "High",
    percentComplete: 100,
    owner: "Production Planning",
    subTasks: [
      "Review demand forecast",
      "Finalize daily production targets",
      "Allocate manpower per shift",
    ],
  },
  {
    id: 2,
    title: "Raw Material Procurement – Steel Coils",
    startDate: "01/08/2026",
    dueDate: "01/15/2026",
    status: "In Progress",
    priority: "High",
    percentComplete: 55,
    owner: "Procurement Team",
    subTasks: [
      "Confirm supplier quotations",
      "Approve purchase order",
      "Schedule inbound delivery",
    ],
  },
  {
    id: 3,
    title: "Preventive Maintenance – CNC Machines",
    startDate: "01/12/2026",
    dueDate: "01/18/2026",
    status: "Not Started",
    priority: "Medium",
    percentComplete: 0,
    owner: "Maintenance Department",
    subTasks: [
      "Inspect spindle alignment",
      "Lubrication system check",
      "Replace worn tooling",
    ],
  },
  {
    id: 4,
    title: "Quality Audit – Finished Goods (Batch FG-1024)",
    startDate: "01/14/2026",
    dueDate: "01/16/2026",
    status: "In Progress",
    priority: "High",
    percentComplete: 70,
    owner: "Quality Assurance",
    subTasks: [
      "Dimensional inspection",
      "Surface finish verification",
      "Update inspection report",
    ],
  },
  {
    id: 5,
    title: "Dispatch Planning – Export Shipment",
    startDate: "01/16/2026",
    dueDate: "01/20/2026",
    status: "Not Started",
    priority: "Medium",
    percentComplete: 0,
    owner: "Logistics Team",
    subTasks: [
      "Finalize packing list",
      "Coordinate with freight forwarder",
      "Prepare export documentation",
    ],
  },
  {
    id: 6,
    title: "Inventory Reconciliation – Warehouse 2",
    startDate: "01/18/2026",
    dueDate: "01/22/2026",
    status: "Not Started",
    priority: "Low",
    percentComplete: 0,
    owner: "Stores & Inventory",
    subTasks: [
      "Physical stock verification",
      "Reconcile ERP quantities",
      "Report variances",
    ],
  },
];


export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [selectedTask, setSelectedTask] = useState<Task | null>(initialTasks[0])
  const [activeSidebarItem, setActiveSidebarItem] = useState("Tasks")
  const [toastMessage, setToastMessage] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(""), 3000)
  }

  const handleDeleteTask = () => {
    if (selectedTask) {
      const updatedTasks = tasks.filter((t) => t.id !== selectedTask.id)
      setTasks(updatedTasks)
      setSelectedTask(updatedTasks.length > 0 ? updatedTasks[0] : null)
      showToast(`Task "${selectedTask.title}" deleted`)
    }
  }

  const handleMarkComplete = () => {
    if (selectedTask) {
      const updatedTasks = tasks.map((t) =>
        t.id === selectedTask.id ? { ...t, status: "Completed", percentComplete: 100 } : t,
      )
      setTasks(updatedTasks)
      const updated = updatedTasks.find((t) => t.id === selectedTask.id)
      if (updated) setSelectedTask(updated)
      showToast(`Task marked as completed`)
    }
  }

  const handleUpdateTask = (updates: Partial<Task>) => {
    if (selectedTask) {
      const updatedTasks = tasks.map((t) => (t.id === selectedTask.id ? { ...t, ...updates } : t))
      setTasks(updatedTasks)
      const updated = updatedTasks.find((t) => t.id === selectedTask.id)
      if (updated) setSelectedTask(updated)
    }
  }

  const handleAddTask = (newTask: Omit<Task, "id">) => {
    const id = Math.max(...tasks.map((t) => t.id), 0) + 1
    const taskWithId: Task = { ...newTask, id }
    const updatedTasks = [...tasks, taskWithId]
    setTasks(updatedTasks)
    setSelectedTask(taskWithId)
    setShowAddModal(false)
    showToast(`Task "${newTask.title}" added`)
  }

  return (
    <div className="flex flex-col h-screen bg-[#1f1f1f] text-[#e6e6e6] font-sans">
      {/* Ribbon */}
      <Ribbon
        onRibbonAction={showToast}
        selectedTask={selectedTask}
        onDelete={handleDeleteTask}
        onMarkComplete={handleMarkComplete}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeSidebarItem={activeSidebarItem}
          onNavigate={(item) => {
            setActiveSidebarItem(item)
            showToast(`Navigated to ${item}`)
          }}
        />

        {/* Task List */}
        <TaskList tasks={tasks} onSelectTask={setSelectedTask} onAddTaskClick={() => setShowAddModal(true)} />

        {/* Task Detail */}
        <TaskDetail task={selectedTask} onTaskUpdate={showToast} onUpdateTask={handleUpdateTask} />
      </div>

      {/* Add Task Modal */}
      {showAddModal && <AddTaskModal onAdd={handleAddTask} onClose={() => setShowAddModal(false)} />}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#0078d4] text-white px-4 py-2 rounded text-sm z-50">
          {toastMessage}
        </div>
      )}
    </div>
  )
}
