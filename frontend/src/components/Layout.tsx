import React from 'react';
import { AppSidebar } from './app-sidebar';
import { Search, Bell } from "lucide-react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <AppSidebar />
            <main className="flex-1 min-w-0 flex flex-col">
                <header className="h-16 border-b border-rule bg-surface/80 backdrop-blur sticky top-0 z-10 flex items-center justify-between px-6 lg:px-10">
                    <div className="flex items-center gap-3 text-sm">
                        <span className="text-ink-muted">HemoFlow</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="size-9 grid place-items-center rounded-lg text-ink-muted hover:text-ink hover:bg-surface-elevated transition-colors">
                            <Search className="size-4" />
                        </button>
                        <button className="size-9 grid place-items-center rounded-lg text-ink-muted hover:text-ink hover:bg-surface-elevated transition-colors relative">
                            <Bell className="size-4" />
                            <span className="absolute top-2 right-2 size-1.5 rounded-full bg-blood-600" />
                        </button>
                        <div className="ml-2 flex items-center gap-3 pl-3 border-l border-rule">
                            <div className="text-right leading-tight">
                                <p className="text-xs font-semibold">Dr. A. Lefebvre</p>
                                <p className="text-[10px] text-ink-muted">Médecin Chef</p>
                            </div>
                            <div className="size-9 rounded-full bg-gradient-to-br from-blood-500 to-blood-700 grid place-items-center text-white text-xs font-bold">
                                AL
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 flex flex-col">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
