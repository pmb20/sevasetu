
import React, { useState } from 'react';
import { analyzeGrievance } from '../services/geminiService';
import { AIAnalysisResult } from '../types';

export const FileGrievance = () => {
  const [description, setDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleAnalysis = async () => {
    if (!description.trim()) return;
    setAnalyzing(true);
    const result = await analyzeGrievance(description);
    setAnalysis(result);
    setAnalyzing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm p-12">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
          ✓
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Grievance Submitted</h2>
        <p className="text-gray-500 mt-4 mb-8">
          Your complaint has been successfully registered under ID: <b>SS-2023-7741</b>.
          You will receive updates via SMS and Email.
        </p>
        <button 
          onClick={() => { setSubmitted(false); setDescription(''); setAnalysis(null); }}
          className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-colors"
        >
          File Another Grievance
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Register a New Grievance</h1>
        <p className="text-gray-500 mt-2">Describe the issue clearly. Our AI will help categorize and direct it to the right department.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Issue Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="E.g. The street lights in Ward 5 have not been working for the past 3 days..."
                  className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                  required
                />
              </div>
              
              {!analysis ? (
                <button
                  type="button"
                  onClick={handleAnalysis}
                  disabled={analyzing || !description.trim()}
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2 transition-all"
                >
                  {analyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing with AI...</span>
                    </>
                  ) : (
                    <span>Analyze Grievance ✨</span>
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl hover:bg-green-700 transition-all"
                >
                  Submit Formal Complaint
                </button>
              )}
            </form>
          </div>
        </div>

        <div className="space-y-6">
          {analysis ? (
            <div className="bg-white p-8 rounded-3xl border-2 border-blue-100 shadow-lg animate-in zoom-in-95 duration-300">
              <div className="flex items-center space-x-2 mb-6 text-blue-600">
                <span className="text-xl">🤖</span>
                <span className="font-bold uppercase text-xs tracking-wider">AI Intelligence Insight</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-400 text-sm">Target Category</span>
                  <span className="font-semibold text-blue-800">{analysis.category}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-400 text-sm">Assigned Department</span>
                  <span className="font-semibold text-blue-800">{analysis.department}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-400 text-sm">Urgency Level</span>
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    analysis.priority === 'High' ? 'bg-red-100 text-red-600' : 
                    analysis.priority === 'Medium' ? 'bg-orange-100 text-orange-600' : 
                    'bg-green-100 text-green-600'
                  }`}>
                    {analysis.priority}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-400 text-sm">Est. Resolution</span>
                  <span className="font-semibold text-gray-800">{analysis.estimatedResolutionDays} Days</span>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 p-4 rounded-2xl">
                <p className="text-xs font-bold text-blue-600 mb-2">RECOMMENDED STEPS:</p>
                <ul className="text-sm text-blue-900 space-y-2">
                  {analysis.suggestions.map((step, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="mt-1 opacity-50">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => setAnalysis(null)}
                className="w-full mt-6 text-sm text-gray-400 font-medium hover:text-gray-600"
              >
                Reset & Re-edit description
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-3xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="font-bold text-gray-800">Smart Classification</h3>
              <p className="text-gray-400 text-sm mt-2 px-6">
                Fill out the description on the left. Our AI model trained on local municipal data will help you find the right track.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
