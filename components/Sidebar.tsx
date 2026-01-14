"use client"

import type React from "react"
import { ChevronLeft, ChevronRight, Inbox, CheckSquare, Calendar } from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  activeSidebarItem: string
  onNavigate: (item: string) => void
}

export default function Sidebar({ activeSidebarItem, onNavigate }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={`bg-[#252526] border-r border-[#333333] flex flex-col transition-all duration-300 ${isCollapsed ? "w-16" : "w-56"}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-[#333333]">
        <div className="flex items-center gap-2 justify-between">
          <h2
            className={`font-semibold text-[#e6e6e6] text-sm transition-opacity ${isCollapsed ? "opacity-0 w-0" : "opacity-100"}`}
          >
            My Tasks
          </h2>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-[#999999] hover:text-[#e6e6e6] transition-colors p-1 hover:bg-[#333333] rounded"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2">
        <NavItem
          icon={<Inbox size={18} />}
          label="To-Do List"
          isActive={activeSidebarItem === "To-Do List"}
          onClick={() => onNavigate("To-Do List")}
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<CheckSquare size={18} />}
          label="Tasks"
          isActive={activeSidebarItem === "Tasks"}
          onClick={() => onNavigate("Tasks")}
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<Calendar size={18} />}
          label="Calendar"
          isActive={activeSidebarItem === "Calendar"}
          onClick={() => onNavigate("Calendar")}
          isCollapsed={isCollapsed}
        />
      </nav>

      {/* Footer */}
      <div
        className={`p-4 border-t border-[#333333] text-[11px] text-[#999999] transition-opacity ${isCollapsed ? "opacity-0" : "opacity-100"}`}
      >
        <p>Tasks synced</p>
      </div>
    </div>
  )
}

function NavItem({
  icon,
  label,
  isActive,
  onClick,
  isCollapsed,
}: {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
  isCollapsed: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-medium transition-colors justify-center ${
        isCollapsed ? "justify-center" : ""
      } ${isActive ? "bg-[#3e3e42] text-[#e6e6e6]" : "text-[#999999] hover:bg-[#333333] hover:text-[#e6e6e6]"}`}
      title={isCollapsed ? label : ""}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </button>
  )
}
