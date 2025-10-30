"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Menu as MenuIcon, X } from "lucide-react";
import Link from "next/link";

const MainHeader: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-slate-900 text-slate-100 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold">ShopMaster</h1>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/products" className="hover:text-slate-300">Products</Link>
                        <Link href="/categories" className="hover:text-slate-300">Categories</Link>
                        <Link href="/about" className="hover:text-slate-300">About</Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Input type="text" placeholder="Search..." className="hidden md:block w-64 border-slate-600" />

                        <Button variant="ghost" className="relative">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">3</span>
                        </Button>

                        {/* <Menu>
                            <Avatar>
                                <AvatarImage src="/avatar.png" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </Menu> */}

                        {/* Mobile menu toggle */}
                        <Button
                            variant="ghost"
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <nav className="md:hidden bg-slate-800 px-4 py-2 flex flex-col gap-2">
                    <Link href="/products" className="hover:text-slate-300">Products</Link>
                    <Link href="/categories" className="hover:text-slate-300">Categories</Link>
                    <Link href="/about" className="hover:text-slate-300">About</Link>
                    <Input type="text" placeholder="Search..." className="w-full mt-2" />
                </nav>
            )}
        </header>
    );
};

export default MainHeader;
