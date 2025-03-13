
import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import ScanButton from "../components/ScanButton";
import ResultCard from "../components/ResultCard";
import Instructions from "../components/Instructions";
import ExtensionInfo from "../components/ExtensionInfo";
import scraperService from "../services/scraper-service";
import { ScrapingResult } from "../models/wealth-simple";

const Index = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScrapingResult | null>(null);
  
  const handleScan = async () => {
    setIsScanning(true);
    try {
      // In the actual extension, we'd use scraperService.scrapeWealthsimple()
      // But for the demo, we use simulate
      const scanResult = await scraperService.simulateScraping();
      setResult(scanResult);
    } catch (error) {
      console.error("Scanning error:", error);
    } finally {
      setIsScanning(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-4"
        >
          <Instructions />
          
          <ScanButton onScan={handleScan} isScanning={isScanning} />
          
          {result && <ResultCard result={result} />}
          
          <ExtensionInfo />
          
          <footer className="text-center text-gray-500 text-sm my-8">
            <p>WealthScraper TFSA Detection Tool</p>
            <p className="mt-1 text-xs">For demonstration purposes only. Not affiliated with Wealthsimple.</p>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
