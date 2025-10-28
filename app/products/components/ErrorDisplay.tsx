"use client"
import { motion } from 'framer-motion';
import { ArrowDown, ArrowLeftIcon, DockIcon, HomeIcon, SquaresExclude, XCircleIcon } from 'lucide-react';
import { useState } from 'react';

interface ErrorDisplayProps {
  title?: string;
  message: string;
  errorCode?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  onGoBack?: () => void;
  showDetails?: boolean;
  className?: string;
}

export function ErrorDisplay({
  title = "Something went wrong",
  message,
  errorCode,
  onRetry,
  onGoHome,
  onGoBack,
  showDetails = false,
  className = ""
}: ErrorDisplayProps) {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyErrorDetails = async () => {
    const errorDetails = `Error: ${message}\nCode: ${errorCode}\nTime: ${new Date().toISOString()}`;
    await navigator.clipboard.writeText(errorDetails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Error Icon */}
      <motion.div
        className="flex justify-center mb-6"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-lg"></div>
          <SquaresExclude className="h-16 w-16 text-red-400 relative z-10" />
        </div>
      </motion.div>

      {/* Error Content */}
      <div className="text-center mb-8">
        <motion.h1
          className="text-2xl font-bold text-slate-200 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h1>
        
        <motion.p
          className="text-slate-400 text-lg leading-relaxed mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {message}
        </motion.p>

        {errorCode && (
          <motion.div
            className="inline-flex items-center gap-2 bg-slate-700/50 px-3 py-1 rounded-full border border-slate-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <XCircleIcon className="h-4 w-4 text-slate-400" />
            <span className="text-slate-300 text-sm font-mono">{errorCode}</span>
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {onRetry && (
          <motion.button
            onClick={onRetry}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowDown className="h-5 w-5" />
            Try Again
          </motion.button>
        )}

        {onGoBack && (
          <motion.button
            onClick={onGoBack}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-all duration-200 font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Go Back
          </motion.button>
        )}

        {onGoHome && (
          <motion.button
            onClick={onGoHome}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-all duration-200 font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <HomeIcon className="h-5 w-5" />
            Go Home
          </motion.button>
        )}
      </motion.div>

      {/* Technical Details */}
      {showDetails && (
        <motion.div
          className="border-t border-slate-700/50 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-300 text-sm font-medium mb-3 transition-colors"
          >
            <DockIcon className="h-4 w-4" />
            {showTechnicalDetails ? 'Hide Technical Details' : 'Show Technical Details'}
          </button>

          {showTechnicalDetails && (
            <motion.div
              className="bg-slate-900/50 rounded-lg p-4 border border-slate-700"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-slate-300 text-sm font-medium">Error Details:</h4>
                <button
                  onClick={copyErrorDetails}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-300 transition-colors"
                >
                  <DockIcon className="h-3 w-3" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="text-xs text-slate-400 overflow-auto">
                {JSON.stringify({
                  message,
                  errorCode,
                  timestamp: new Date().toISOString(),
                  userAgent: navigator.userAgent
                }, null, 2)}
              </pre>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}