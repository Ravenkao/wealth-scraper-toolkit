
import { motion } from "framer-motion";

const Instructions = () => {
  return (
    <motion.div 
      className="max-w-lg mx-auto mb-8 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.7 }}
    >
      <h2 className="text-lg font-medium mb-4 text-center">How to Use</h2>
      <div className="space-y-4">
        <InstructionStep number={1} text="Install the Chrome extension" />
        <InstructionStep number={2} text="Log in to your Wealthsimple account" />
        <InstructionStep number={3} text="Click the extension icon in your browser" />
        <InstructionStep number={4} text="Press 'Scan for TFSA Accounts'" />
      </div>
      <motion.p 
        className="text-sm text-center text-gray-500 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        WealthScraper scans your dashboard to detect if you have TFSA accounts
        <br />
        <span className="text-xs">Your data remains in your browser and is not sent anywhere</span>
      </motion.p>
    </motion.div>
  );
};

interface InstructionStepProps {
  number: number;
  text: string;
}

const InstructionStep = ({ number, text }: InstructionStepProps) => (
  <motion.div 
    className="flex items-center gap-4"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 + (number * 0.1), duration: 0.5 }}
  >
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium">
      {number}
    </div>
    <p>{text}</p>
  </motion.div>
);

export default Instructions;
