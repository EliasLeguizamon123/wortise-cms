"use client"

import { useState } from "react"
import { LayoutDashboard, ChevronDown, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AuthService } from "@/services/auth.service"
import { useRouter } from "next/navigation"

interface NavbarProps {
  currentRoute: string
}

export default function Navbar({ currentRoute }: NavbarProps) {
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false)
    const userName = sessionStorage.getItem("user") || "Usuario"

    const router = useRouter()

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const handleViewArticles = () => {
        router.push("/articles")
        setIsDropdownOpen(false)
    }

    const handleNewArticle = () => {
        router.push("/articles/new")
        setIsDropdownOpen(false)
    }

    const handleLogOut = async () => {
        await AuthService.logout();
        window.location.reload();
        setIsDropdownOpen(false)
    }

    return (
        <nav className="bg-white shadow-md px-4 sm:px-8 h-16 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
                {/* Left section */}
                <div className="flex items-center gap-2">
                    <LayoutDashboard className="h-6 w-6 text-gray-700" />
                    <h1 className="text-lg font-semibold text-gray-900">{currentRoute}</h1>
                </div>

                {/* Right section */}
                <div className="relative">
                    <button
                        onClick={handleDropdownToggle}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200 cursor-pointer"
                    >
                        <User className="h-4 w-4" />
                        <span>{userName}</span>
                        <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {/* Dropdown menu with animation */}
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                key="dropdown"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-50 border border-gray-100 origin-top"
                            >
                                <button
                                    onClick={handleViewArticles}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 transition-colors duration-150 cursor-pointer"
                                >
                                    Ver mis artículos
                                </button>
                                <button
                                    onClick={handleNewArticle}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 transition-colors duration-150 cursor-pointer"
                                >
                                    Nuevo artículo
                                </button>
                                <hr className="my-1 border-gray-200" />
                                <button
                                    onClick={handleLogOut}
                                    className="w-full text-left text-red-500 px-4 py-2 hover:bg-red-300 hover:text-white text-sm transition-colors duration-150 cursor-pointer"
                                >
                                    Cerrar sesión
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Overlay para cerrar al clickear afuera */}
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                />
            )}
        </nav>
    )
}
