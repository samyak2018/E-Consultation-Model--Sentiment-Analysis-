import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, Filter, Download, Upload, RefreshCw, TrendingUp, MessageSquare, FileText, AlertCircle, Menu, X, Home, BarChart3, FileSpreadsheet, Settings, Bell, User, Trash2 } from 'lucide-react';

const EConsultationDashboard = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [fileHeaders, setFileHeaders] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [recentFiles, setRecentFiles] = useState([
    { id: 1, name: 'stakeholder_feedback_2024.csv', date: '2025-11-03' },
    { id: 2, name: 'consultation_comments_oct.xlsx', date: '2025-10-28' },
    { id: 3, name: 'policy_reviews_sept.csv', date: '2025-09-15' }
  ]);

  // Empty state - will be populated from ML models and database
  const [analyzedComments, setAnalyzedComments] = useState({
    positive: [],
    neutral: [],
    negative: []
  });

  const [sentimentData, setSentimentData] = useState([
    { name: 'Positive', value: 0, color: '#10b981' },
    { name: 'Neutral', value: 0, color: '#6b7280' },
    { name: 'Negative', value: 0, color: '#ef4444' }
  ]);

  const [topKeywords, setTopKeywords] = useState([]);
  const [aiSummary, setAiSummary] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const rows = text.split('\n').filter(row => row.trim() !== '');
        
        if (rows.length === 0) {
          alert('File is empty');
          return;
        }

        // Parse headers - handle both comma and semicolon separators
        const separator = rows[0].includes(';') ? ';' : ',';
        const headers = rows[0].split(separator).map(h => h.trim().replace(/['"]/g, ''));
        
        // Parse data rows
        const data = rows.slice(1).map((row, index) => {
          const values = row.split(separator).map(v => v.trim().replace(/['"]/g, ''));
          const rowData = { _id: index + 1 };
          headers.forEach((header, i) => {
            rowData[header] = values[i] || '';
          });
          return rowData;
        });

        setFileHeaders(headers);
        setFileData(data);
        
        const newFile = {
          id: Date.now(),
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          date: new Date().toISOString().split('T')[0],
          status: 'Uploaded',
          rowCount: data.length
        };
        
        setUploadedFiles([...uploadedFiles, newFile]);
        setSelectedFile(newFile.id);

        // Add to recent files
        const recentFile = {
          id: Date.now(),
          name: file.name,
          date: new Date().toISOString().split('T')[0]
        };
        setRecentFiles([recentFile, ...recentFiles.slice(0, 4)]);
      } catch (error) {
        console.error('Error parsing file:', error);
        alert('Error reading file. Please ensure it is a valid CSV file.');
      }
    };

    reader.readAsText(file);
  };

  const handleAnalyzeFiles = () => {
    // This will connect to ML models later
    setUploadedFiles(uploadedFiles.map(file => 
      file.status === 'Uploaded' ? { ...file, status: 'Analyzing...' } : file
    ));
    
    // Simulate analysis (will be replaced with actual ML model call)
    setTimeout(() => {
      setUploadedFiles(uploadedFiles.map(file => 
        file.status === 'Analyzing...' ? { ...file, status: 'Analyzed' } : file
      ));
      alert('Analysis will be processed by ML models. Results will appear in the sentiment sections below.');
    }, 1000);
  };

  const handleClearFiles = () => {
    if (window.confirm('Are you sure you want to clear all uploaded files?')) {
      setUploadedFiles([]);
      setFileData([]);
      setFileHeaders([]);
      setSelectedFile(null);
      setAnalyzedComments({
        positive: [],
        neutral: [],
        negative: []
      });
      setSentimentData([
        { name: 'Positive', value: 0, color: '#10b981' },
        { name: 'Neutral', value: 0, color: '#6b7280' },
        { name: 'Negative', value: 0, color: '#ef4444' }
      ]);
      setTopKeywords([]);
      setAiSummary('');
    }
  };

  const handleRemoveFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter(f => f.id !== fileId));
    if (selectedFile === fileId) {
      setFileData([]);
      setFileHeaders([]);
      setSelectedFile(null);
    }
  };

  const navigateTo = (section) => {
    setActiveSection(section);
    // Routes will be added later
    console.log(`Navigating to: ${section}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden flex flex-col`}>
        {/* Profile Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Analyst</h3>
              <p className="text-xs text-gray-500">Policy Analyst</p>
            </div>
          </div>
        </div>

        {/* MCA Logo */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="text-white" size={20} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">MCA21</h2>
              <p className="text-xs text-gray-500">eConsultation</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => navigateTo('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg ${
              activeSection === 'dashboard' 
                ? 'text-white bg-blue-600' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Home size={18} />
            Dashboard
          </button>
          <button 
            onClick={() => navigateTo('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg ${
              activeSection === 'analytics' 
                ? 'text-white bg-blue-600' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BarChart3 size={18} />
            Analytics
          </button>
          <button 
            onClick={() => navigateTo('reports')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg ${
              activeSection === 'reports' 
                ? 'text-white bg-blue-600' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FileSpreadsheet size={18} />
            Reports
          </button>
          <button 
            onClick={() => navigateTo('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg ${
              activeSection === 'notifications' 
                ? 'text-white bg-blue-600' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Bell size={18} />
            Notifications
          </button>
          <button 
            onClick={() => navigateTo('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg ${
              activeSection === 'settings' 
                ? 'text-white bg-blue-600' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings size={18} />
            Settings
          </button>
        </nav>

        {/* Actions */}
        <div className="p-4 border-t border-gray-200 space-y-4">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">Actions</h3>
            <label className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg cursor-pointer mb-2">
              <Upload size={18} />
              Import CSV/Excel
              <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} className="hidden" />
            </label>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg">
              <Download size={18} />
              Export Analysis
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg mt-2">
              <Filter size={18} />
              Advanced Filters
            </button>
          </div>

          {/* Recent Files */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">Recent Files</h3>
            <div className="space-y-1">
              {recentFiles.map(file => (
                <div key={file.id} className="px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded cursor-pointer">
                  <p className="font-medium text-gray-700 truncate">{file.name}</p>
                  <p className="text-gray-400">{file.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700">
                  {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Analyst Dashboard</h1>
                  <p className="text-sm text-gray-500 mt-1">eConsultation Analysis System</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <select 
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                  <option value="custom">Custom Range</option>
                </select>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <RefreshCw size={16} />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* File Upload Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload & Analyze Files</h3>
              <div className="flex items-center gap-2">
                {uploadedFiles.length > 0 && (
                  <button 
                    onClick={handleClearFiles}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Clear All
                  </button>
                )}
                <button 
                  onClick={handleAnalyzeFiles}
                  disabled={uploadedFiles.length === 0}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-lg flex items-center gap-2 ${
                    uploadedFiles.length === 0 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  <TrendingUp size={16} />
                  Analyze Files
                </button>
              </div>
            </div>
            
            {/* Excel-like Data Viewer */}
            {fileData.length > 0 ? (
              <div className="border border-gray-300 rounded-lg overflow-hidden mb-4 max-h-96">
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">
                    Dataset Preview - {fileData.length} rows × {fileHeaders.length} columns
                  </span>
                  <span className="text-xs text-gray-500">Showing all data</span>
                </div>
                <div className="overflow-auto max-h-80">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b-2 border-gray-300 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase border-r border-gray-300 bg-gray-100">#</th>
                        {fileHeaders.map((header, index) => (
                          <th key={index} className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase border-r border-gray-300 bg-gray-100 whitespace-nowrap">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {fileData.map((row, rowIndex) => (
                        <tr key={rowIndex} className={`border-b border-gray-200 hover:bg-blue-50 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="px-4 py-3 text-gray-600 font-medium border-r border-gray-200">{rowIndex + 1}</td>
                          {fileHeaders.map((header, colIndex) => (
                            <td key={colIndex} className="px-4 py-3 text-gray-700 border-r border-gray-200">
                              {row[header]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 bg-gray-50 text-center mb-4">
                <Upload className="mx-auto text-gray-400 mb-3" size={48} />
                <p className="text-sm text-gray-600 mb-2">No file uploaded</p>
                <p className="text-xs text-gray-500 mb-4">Upload a CSV or Excel file to view data here</p>
                <label className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg cursor-pointer">
                  <Upload size={16} />
                  Choose File
                  <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            )}

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Uploaded Files ({uploadedFiles.length})</h4>
                <div className="space-y-2">
                  {uploadedFiles.map(file => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-3">
                        <FileSpreadsheet className="text-green-600" size={20} />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size} • {file.rowCount} rows • {file.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          file.status === 'Analyzed' 
                            ? 'bg-green-100 text-green-700' 
                            : file.status === 'Analyzing...'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {file.status}
                        </span>
                        <button 
                          onClick={() => handleRemoveFile(file.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Analyzed Comments Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Analysis Results</h3>
            {analyzedComments.positive.length === 0 && analyzedComments.neutral.length === 0 && analyzedComments.negative.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <MessageSquare className="mx-auto mb-3 text-gray-400" size={48} />
                <p className="text-sm">No analyzed data yet. Upload and analyze files to see results here.</p>
                <p className="text-xs mt-2">Results will be fetched from ML models and database after analysis.</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {/* Positive Comments */}
                <div className="border border-green-200 rounded-lg bg-green-50">
                  <div className="p-4 bg-green-100 border-b border-green-200">
                    <h4 className="font-semibold text-green-800 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Positive Comments ({analyzedComments.positive.length})
                    </h4>
                  </div>
                  <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                    {analyzedComments.positive.map(comment => (
                      <div key={comment.id} className="bg-white p-3 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-700 mb-2">{comment.text}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{comment.stakeholder}</span>
                          <span>{comment.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Neutral Comments */}
                <div className="border border-gray-300 rounded-lg bg-gray-50">
                  <div className="p-4 bg-gray-100 border-b border-gray-300">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                      Neutral Comments ({analyzedComments.neutral.length})
                    </h4>
                  </div>
                  <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                    {analyzedComments.neutral.map(comment => (
                      <div key={comment.id} className="bg-white p-3 rounded-lg border border-gray-300">
                        <p className="text-sm text-gray-700 mb-2">{comment.text}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{comment.stakeholder}</span>
                          <span>{comment.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Negative Comments */}
                <div className="border border-red-200 rounded-lg bg-red-50">
                  <div className="p-4 bg-red-100 border-b border-red-200">
                    <h4 className="font-semibold text-red-800 flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      Negative Comments ({analyzedComments.negative.length})
                    </h4>
                  </div>
                  <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                    {analyzedComments.negative.map(comment => (
                      <div key={comment.id} className="bg-white p-3 rounded-lg border border-red-200">
                        <p className="text-sm text-gray-700 mb-2">{comment.text}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{comment.stakeholder}</span>
                          <span>{comment.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Word Cloud & Summary Section */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Word Cloud */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Word Cloud</h3>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 h-80 flex items-center justify-center">
                {topKeywords.length === 0 ? (
                  <div className="text-center text-gray-500">
                    <p className="text-sm">No keywords generated yet</p>
                    <p className="text-xs mt-2">Analyze files to generate word cloud</p>
                  </div>
                ) : (
                  <div className="text-center">
                    {topKeywords.map((keyword, idx) => (
                      <span 
                        key={idx}
                        className="inline-block mx-3 my-2 font-bold text-blue-700 hover:text-blue-900 cursor-pointer transition-colors"
                        style={{ fontSize: `${32 - idx * 3}px` }}
                      >
                        {keyword.word}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* AI Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Generated Summary</h3>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 h-80 overflow-y-auto">
                {aiSummary === '' ? (
                  <div className="flex items-center justify-center h-full text-center text-gray-500">
                    <div>
                      <p className="text-sm">No summary available</p>
                      <p className="text-xs mt-2">Analyze files to generate AI summary</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl">🤖</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Analysis Summary</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{aiSummary}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Comments</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {sentimentData.reduce((acc, curr) => acc + curr.value, 0)}
                  </p>
                </div>
                <MessageSquare className="text-blue-600" size={32} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Positive</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {sentimentData[0]?.value || 0}
                  </p>
                </div>
                <TrendingUp className="text-green-600" size={32} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Neutral</p>
                  <p className="text-3xl font-bold text-gray-600 mt-2">
                    {sentimentData[1]?.value || 0}
                  </p>
                </div>
                <FileText className="text-gray-600" size={32} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Negative</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {sentimentData[2]?.value || 0}
                  </p>
                </div>
                <AlertCircle className="text-red-600" size={32} />
              </div>
            </div>
          </div>

          {/* Sentiment Distribution Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Positive', value: 1, color: '#10b981' },
                    { name: 'Neutral', value: 1, color: '#6b7280' },
                    { name: 'Negative', value: 1, color: '#ef4444' }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name }) => `${name}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#e5e7eb" />
                  <Cell fill="#d1d5db" />
                  <Cell fill="#9ca3af" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">No data analyzed yet</p>
              <p className="text-xs text-gray-400 mt-1">Chart will update after file analysis</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EConsultationDashboard;