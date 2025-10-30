"use client";

import React from "react";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title = "Our Collection",
  subtitle = "Discover amazing products tailored just for you",
}) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
        {title}
      </h1>
      <p className="text-slate-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
};

export default PageHeader;


