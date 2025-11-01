// "use client";

// import { Slider } from "@/components/ui/slider";
// import { motion } from "framer-motion";
// import { Coins } from "lucide-react";
// import { useQueryState } from "nuqs";
// import { useState } from "react";

// interface FiltersPriceProps {
//     min?: number;
//     max?: number;
//     onChange?: (range: [number, number]) => void;
// }

// export function FiltersPrice({
//     min = 0,
//     max = 1000,
//     onChange,
// }: FiltersPriceProps) {
//     const [value, setValue] = useState<[number, number]>([min, max]);

//     const handleChange = (newValue: [number, number]) => {
//         setValue(newValue);
//         onChange?.(newValue);
//     };

//     const [priceMin, setPriceMin] = useQueryState("minPrice", {
//         defaultValue: String(min),
//     });
//     const [priceMax, setPriceMax] = useQueryState("maxPrice", {
//         defaultValue: String(max),
//     });

//     return (
//         <motion.div
//             layout
//             className="space-y-4 b-slate-500/10 p-4 rounded-md borde border-slate-500/40"
//         >
//             <div className="flex items-center gap-2">
//                 <Coins className="h-5 w-5 text-amber-400" />
//                 <h4 className="text-slate-300 text-sm font-semibold">Price Range</h4>
//             </div>

//             <Slider
//                 value={value}
//                 onValueChange={handleChange}
//                 min={min}
//                 max={max}
//                 step={10}
//                 className="mt-2 bg-sky-300"
//             />

//             <div className="flex justify-between text-xs text-slate-500">
//                 {/* <span>${min}</span>
//                 <span>${max}</span> */}
//                 <span>{value[0]}</span>
//                 <span>{value[1]}</span>
//                 {/* <span className="text-slate-500 text-sm"> */}
//                 {/* (${value[0]} – ${value[1]}) */}
//                 {/* </span> */}

//             </div>
//         </motion.div>
//     );
// }



"use client";

import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Coins } from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

interface FiltersPriceProps {
    min?: number;
    max?: number;
    onChange?: (range: [number, number]) => void;
}

export function FiltersPrice({
    min = 0,
    max = 1000,
    onChange,
}: FiltersPriceProps) {
    // nuqs URL state
    const [priceMin, setPriceMin] = useQueryState("minPrice", {
        defaultValue: String(min),
    });
    const [priceMax, setPriceMax] = useQueryState("maxPrice", {
        defaultValue: String(max),
    });

    // local state
    const [value, setValue] = useState<[number, number]>([
        Number(priceMin) || min,
        Number(priceMax) || max,
    ]);

    // sync slider with URL
    const handleChange = (newValue: [number, number]) => {
        setValue(newValue);
        setPriceMin(String(newValue[0]));
        setPriceMax(String(newValue[1]));
        onChange?.(newValue);
    };

    // update local state if URL changes externally
    useEffect(() => {
        setValue([Number(priceMin) || min, Number(priceMax) || max]);
    }, [priceMin, priceMax, min, max]);

    return (
        <motion.div
            layout
            className="space-y-4 bg-slate-500/10 p-4 rounded-md border border-slate-500/40"
        >
            <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-amber-400" />
                <h4 className="text-slate-300 text-sm font-semibold">Price Range</h4>
            </div>

            <Slider
                value={value}
                onValueChange={handleChange}
                min={min}
                max={max}
                step={10}
                className="mt-2 bg-sky-300"
            />

            <div className="flex justify-between text-xs text-slate-500">
                <span>{value[0]}</span>
                <span>{value[1]}</span>
            </div>
        </motion.div>
    );
}
