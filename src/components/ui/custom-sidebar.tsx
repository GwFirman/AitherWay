"use client"

import React, { useState } from "react"
import {
    Bot,
    MessageSquarePlus,
    History,
    Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const SidebarChat = () => {
    const [expanded, setExpanded] = useState(false)

    const toggleSidebar = () => {
        setExpanded(!expanded)
    }

    return (
        <TooltipProvider>
            <aside
                onClick={toggleSidebar}
                className={cn(
                    "h-screen flex flex-col bg-white border-r shadow-sm transition-all duration-300 ease-in-out cursor-pointer",
                    expanded ? "w-72" : "w-16"
                )}
            >
                {/* Top - Brand */}
                <div className="flex items-center space-x-2 p-4 border-b">
                    <div className="bg-rose-500 text-white rounded-lg p-2">
                        <Bot className="w-5 h-5" />
                    </div>
                    <div
                        className={cn(
                            "overflow-hidden transition-all duration-300",
                            expanded ? "opacity-100 ml-2 max-w-[180px]" : "opacity-0 ml-0 max-w-0"
                        )}
                    >
                        <p className="text-sm font-semibold whitespace-nowrap">Let's Travel!</p>
                        <p className="text-[11px] text-rose-500 whitespace-nowrap">Plan with AitherWay</p>
                    </div>

                </div>

                {/* New Chat */}
                <div className="p-3">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                className={cn(
                                    "w-full justify-start bg-rose-500 hover:bg-rose-600 text-white shadow",
                                    !expanded && "justify-center"
                                )}
                            >
                                <MessageSquarePlus className="w-4 h-4" />
                                {expanded && <span className="ml-2">New Chat</span>}
                            </Button>
                        </TooltipTrigger>
                        {!expanded && (
                            <TooltipContent side="right">
                                <p>New Chat</p>
                            </TooltipContent>
                        )}
                    </Tooltip>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 space-y-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start hover:bg-rose-50 text-sm text-gray-700",
                                    !expanded && "justify-center"
                                )}
                            >
                                <History className="w-4 h-4" />
                                {expanded && <span className="ml-2">Chat History</span>}
                            </Button>
                        </TooltipTrigger>
                        {!expanded && (
                            <TooltipContent side="right">
                                <p>Chat History</p>
                            </TooltipContent>
                        )}
                    </Tooltip>
                </nav>

                {/* Footer */}
                <div className="border-t p-3 space-y-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start hover:bg-rose-50 text-sm text-gray-700",
                                    !expanded && "justify-center"
                                )}
                            >
                                <Settings className="w-4 h-4" />
                                {expanded && <span className="ml-2">Settings</span>}
                            </Button>
                        </TooltipTrigger>
                        {!expanded && (
                            <TooltipContent side="right">
                                <p>Settings</p>
                            </TooltipContent>
                        )}
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                className={cn(
                                    "flex items-center gap-2 p-2 rounded-md hover:bg-rose-50 cursor-pointer",
                                )}
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div
                                    className={cn(
                                        "overflow-hidden transition-all duration-300",
                                        expanded ? "opacity-100 ml-3 max-w-[150px]" : "opacity-0 ml-0 max-w-0"
                                    )}
                                >
                                    <p className="text-sm font-medium whitespace-nowrap">John Doe</p>
                                    <p className="text-xs text-gray-500 whitespace-nowrap">Traveler</p>
                                </div>

                            </div>
                        </TooltipTrigger>
                        {!expanded && (
                            <TooltipContent side="right">
                                <p>John Doe</p>
                            </TooltipContent>
                        )}
                    </Tooltip>
                </div>
            </aside>
        </TooltipProvider>
    )
}

export default SidebarChat
