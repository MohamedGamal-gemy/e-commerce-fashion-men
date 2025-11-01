"use client";

import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProductsFilters } from "./ProductsFilters";
import type { Color, Subcategory } from "@/types/filter";

interface MobileSheetProps {
    subcategories?: Subcategory[];
    colors?: Color[];
    selectedColors?: string[];
    selectedSubcategories?: string[];
    onToggleColor?: (value: string) => void;
    onToggleSubcategory?: (value: string) => void;
    onClearAll?: () => void;
}

export const FiltersMobileSheet: React.FC<MobileSheetProps> = ({
    subcategories,
    colors,
    selectedColors = [],
    selectedSubcategories = [],
    onToggleColor,
    onToggleSubcategory,
    onClearAll,
}) => {
    const [open, setOpen] = useState(false);
    const totalSelected = (selectedColors?.length || 0) + (selectedSubcategories?.length || 0);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 bg-slate-800/40 px-3 py-2 
                rounded-full shadow-md">
                    <Filter className="w-4 h-4 text-slate-100" />
                    <span className="text-sm text-slate-100">{totalSelected > 0 ? `Filters (${totalSelected})` : "Filters"}</span>
                </Button>
            </SheetTrigger>
            {/* <ScrollArea className="h-80 p-4"> */}

            <SheetContent side="bottom" className="p-0 w-ful w-80 h-[80vh] rounded-t-2xl
             bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
                <SheetHeader className="p-4 border-b border-slate-800">
                    <SheetTitle className="text-lg font-semibold text-slate-100">Filters</SheetTitle>
                </SheetHeader>

                <ScrollArea className="h-[calc(80vh-72px)] p-4">
                    <ProductsFilters
                        subcategories={subcategories}
                        colors={colors}
                        selectedColors={selectedColors}
                        selectedSubcategories={selectedSubcategories}
                        onToggleColor={onToggleColor}
                        onToggleSubcategory={onToggleSubcategory}
                        onClearAll={onClearAll}
                    />
                    <ScrollBar className="bg-slate-400 w-1 hover:bg-slate-500 rounded-full" />
                </ScrollArea>
            </SheetContent>
            {/* </ScrollArea> */}

        </Sheet>
    );
};
