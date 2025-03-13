
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ExtensionInfo = () => {
  return (
    <motion.div 
      className="max-w-2xl mx-auto mt-16 mb-10 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.7 }}
    >
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <h2 className="text-xl font-semibold text-center mb-4">Chrome Extension Installation</h2>
        
        <div className="space-y-4 mb-6">
          <p className="text-center text-gray-700">
            To use the WealthScraper tool on your Wealthsimple dashboard,
            download and install our Chrome extension.
          </p>
          
          <div className="rounded-lg border border-blue-200 p-4 bg-white flex items-start gap-4">
            <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">For Development</h3>
              <ol className="list-decimal ml-5 mt-2 text-sm text-gray-700 space-y-1">
                <li>Download the source code</li>
                <li>Go to chrome://extensions/</li>
                <li>Enable "Developer mode"</li>
                <li>Click "Load unpacked" and select the extension folder</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button className="rounded-full px-6 py-2 bg-blue-600 hover:bg-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Source Code
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExtensionInfo;
