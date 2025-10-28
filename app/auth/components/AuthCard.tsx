// "use client";
// import React, { ReactNode } from "react";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import Link from "next/link";

// type Props = {
//   title: string;
//   subtitle?: string;
//   children: ReactNode;
//   asideLink?: { href: string; label: string };
// };

// export default function AuthCard({ title, subtitle, children, asideLink }: Props) {
//   return (
//     <Card className="w-full max-w-md  bg-slate-900/70 border border-slate-800 shadow-xl backdrop-blur-sm">
//       <CardHeader>
//         <CardTitle className="text-2xl font-semibold text-slate-50">{title}</CardTitle>
//         {subtitle && <CardDescription className="text-slate-400">{subtitle}</CardDescription>}
//       </CardHeader>
//       <CardContent>
//         {children}
//         {asideLink && (
//           <p className="text-sm text-center text-slate-400 mt-6">
//             <Link href={asideLink.href} className="text-sky-400 hover:underline">
//               {asideLink.label}
//             </Link>
//           </p>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  asideLink?: { href: string; label: string };
};

export default function AuthCard({
  title,
  subtitle,
  children,
  asideLink,
}: Props) {
  return (
    <Card
      //   className="w-full h-[40.4rem] p-6 m-0 bg-slate-900/70 relative rounded-none border-0 border-slate- shadow-2xl
      //  backdrop-blur-md p- md:p-"
      className="relative w-full h-[40.4rem] p-8   md:p-10 bg-slate-950/80 border border-slate-800
       shadow-[0_0_50px_-15px_rgba(56,189,248,0.4)] backdrop-blur-xl overflow-hidden rounded-none"
    >
      {/* Glowing Lights */}
      <div className="absolute inset-0 -z-10">
        {/* Top Right Light */}
        <div className="absolute top-[-4rem] right-[-4rem] w-72 h-72 bg-cyan-500/50 rounded-full blur-[8rem]" />

        {/* Bottom Left Light */}
        <div className="absolute bottom-[-3rem] left-[-4rem] w-60 h-60 bg-cyan-500/50 rounded-full blur-[8rem]" />

        {/* Center Soft Aura */}
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-slate-700/40 -translate-x-1/2 -translate-y-1/2 
        rounded-full blur-[11rem]" />
      </div>
      {/* <div className="absolute  -inset-1 bg-sky-600 w-24  h-32 blur-[4rem] "></div> */}
      {/* <div className="relative "> */}
      <CardHeader className="space-y-2 text-center ">
        <CardTitle className="text-3xl font-semibold text-slate-50 tracking-tight">
          {title}
        </CardTitle>
        {subtitle && (
          <CardDescription className="text-slate-400 text-base">
            {subtitle}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-6 mt-4">
        {children}
        {asideLink && (
          <p className="text-sm text-center text-slate-400 mt-8">
            <Link
              href={asideLink.href}
              className="text-sky-400 hover:text-sky-300 transition-colors underline-offset-2 hover:underline"
            >
              {asideLink.label}
            </Link>
          </p>
        )}
      </CardContent>
      {/* </div> */}
    </Card>
  );
}
