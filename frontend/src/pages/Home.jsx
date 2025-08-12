import React from 'react';
import { UploadCloud, Database, FileText, BarChart2, BrainCircuit } from 'lucide-react';

// This is now the Home component
export default function Home() {
  const [file, setFile] = React.useState(null);
  const [isDragging, setIsDragging] = React.useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleRemoveFile = () => {
    setFile(null);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
            Unlock Your Data's Potential
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-400">
            Our AI automatically analyzes your data, suggests the best visualizations, and generates powerful insights in seconds.
          </p>
        </header>

        {/* Main Content */}
        <main>
          <div className="bg-gray-800/50 rounded-2xl shadow-2xl backdrop-blur-lg border border-gray-700/50 p-6 sm:p-8 lg:p-12">
            
            {/* File Uploader */}
            <div 
              className={`relative border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all duration-300 ${isDragging ? 'border-blue-400 bg-gray-700/50' : 'border-gray-600'}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept=".csv"
              />
              
              {!file ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <UploadCloud className="w-16 h-16 text-gray-500" />
                  <p className="text-xl font-semibold text-gray-300">Drag & drop your CSV file here</p>
                  <p className="text-gray-400">or</p>
                  <label htmlFor="file-upload" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer transition-colors">
                    Browse Files
                  </label>
                   <p className="text-xs text-gray-500 mt-2">Max file size: 50MB</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <FileText className="w-16 h-16 text-blue-400" />
                  <p className="text-xl font-semibold text-gray-200">{file.name}</p>
                  <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <div className="flex space-x-4 mt-4">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                      Analyze
                    </button>
                    <button 
                      onClick={handleRemoveFile}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Separator */}
            <div className="flex items-center my-8">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="flex-shrink mx-4 text-gray-500">Or connect a data source</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>

            {/* Data Source Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <DataSourceCard icon={<Database />} title="Database" subtitle="PostgreSQL, MySQL..." />
              <DataSourceCard icon={<div className="font-bold text-xl">API</div>} title="API" subtitle="Connect to any REST API" />
              <DataSourceCard icon={<img src="https://www.gstatic.com/images/branding/product/1x/sheets_48dp.png" alt="Google Sheets" className="w-8 h-8"/>} title="Google Sheets" subtitle="Import from your spreadsheets" />
              <DataSourceCard icon={<img src="https://www.gstatic.com/images/branding/product/1x/drive_48dp.png" alt="Google Drive" className="w-8 h-8"/>} title="Google Drive" subtitle="Connect files from Drive" />
            </div>
          </div>
          
          {/* How it works section */}
          <section className="mt-16 sm:mt-24 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-200 mb-10">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
              <HowItWorksStep 
                icon={<UploadCloud className="w-12 h-12 text-blue-400"/>}
                title="1. Upload Your Data"
                description="Securely upload your CSV file or connect to a data source. Your data is encrypted and private."
              />
              <HowItWorksStep 
                icon={<BrainCircuit className="w-12 h-12 text-teal-300"/>}
                title="2. AI-Powered Analysis"
                description="Our intelligent engine processes your data, identifying patterns, trends, and key metrics automatically."
              />
              <HowItWorksStep 
                icon={<BarChart2 className="w-12 h-12 text-blue-400"/>}
                title="3. Get Instant Insights"
                description="Receive auto-generated charts and actionable insights tailored specifically to your dataset."
              />
            </div>
          </section>

        </main>
        
        {/* Footer */}
        <footer className="text-center mt-16 sm:mt-24 py-6 border-t border-gray-800">
            <p className="text-gray-500">&copy; {new Date().getFullYear()} InsightGenius. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

// Reusable card component for data sources
const DataSourceCard = ({ icon, title, subtitle }) => (
  <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4 border border-gray-700 hover:border-blue-500 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer opacity-60">
    <div className="bg-gray-900 p-3 rounded-lg">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-gray-200">{title}</h3>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  </div>
);

// Reusable component for the "How It Works" steps
const HowItWorksStep = ({ icon, title, description }) => (
    <div className="flex flex-col items-center">
        <div className="bg-gray-800/60 rounded-full p-5 mb-4 border border-gray-700">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-200 mb-2">{title}</h3>
        <p className="text-gray-400 max-w-xs">{description}</p>
    </div>
);
