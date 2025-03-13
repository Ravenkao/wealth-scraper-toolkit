
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ScanButtonProps {
  onScan: () => void;
  isScanning: boolean;
}

const ScanButton = ({ onScan, isScanning }: ScanButtonProps) => {
  return (
    <div className="flex justify-center my-8">
      <AnimatePresence mode="wait">
        {isScanning ? (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-3 py-3 px-6 rounded-full bg-blue-50 text-blue-700"
          >
            <div className="animate-pulse-glow w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="font-medium">Scanning Wealthsimple...</span>
          </motion.div>
        ) : (
          <motion.div
            key="scan-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onScan}
              className="text-base font-medium py-6 px-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isScanning}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Scan for TFSA Accounts
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScanButton;
