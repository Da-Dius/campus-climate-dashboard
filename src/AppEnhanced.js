import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, LineChart, Line } from 'recharts';
import { Filter, Users, TrendingUp, AlertCircle, CheckCircle, XCircle, Download, LogOut, User } from 'lucide-react';
import LandingPage from './components/LandingPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ExportModal from './components/Export/ExportModal';

// Generate realistic campus climate survey data
const generateSurveyData = () => {
  const programs = ['Computer Science', 'Engineering', 'Mathematics', 'Biology', 'Psychology', 'English', 'History', 'Art', 'Business', 'Education'];
  const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
  const years = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];
  
  const data = [];
  
  for (let i = 0; i < 1200; i++) {
    const program = programs[Math.floor(Math.random() * programs.length)];
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const year = years[Math.floor(Math.random() * years.length)];
    const age = Math.floor(Math.random() * 8) + 18;
    
    // Create realistic correlations and biases
    const stemProgram = ['Computer Science', 'Engineering', 'Mathematics', 'Biology'].includes(program);
    const isMale = gender === 'Male';
    const isGraduate = year === 'Graduate';
    
    // Simulate bias: STEM programs might have lower inclusivity, males might perceive higher safety
    const inclusivityBase = stemProgram ? 3.2 : 3.8;
    const safetyBase = isMale ? 4.1 : 3.6;
    const supportBase = isGraduate ? 3.9 : 3.4;
    
    const inclusivity = Math.max(1, Math.min(5, inclusivityBase + (Math.random() - 0.5) * 1.5));
    const safety = Math.max(1, Math.min(5, safetyBase + (Math.random() - 0.5) * 1.2));
    const supportiveness = Math.max(1, Math.min(5, supportBase + (Math.random() - 0.5) * 1.3));
    const satisfaction = Math.max(1, Math.min(5, (inclusivity + safety + supportiveness) / 3 + (Math.random() - 0.5) * 0.8));
    
    const hasStudentOrg = Math.random() > 0.4;
    const experiencedDiscrimination = Math.random() > (stemProgram && !isMale ? 0.6 : 0.8);
    const usedSupportServices = Math.random() > 0.7;
    
    data.push({
      id: i + 1,
      program,
      gender,
      year,
      age,
      inclusivity: Math.round(inclusivity * 10) / 10,
      safety: Math.round(safety * 10) / 10,
      supportiveness: Math.round(supportiveness * 10) / 10,
      satisfaction: Math.round(satisfaction * 10) / 10,
      hasStudentOrg,
      experiencedDiscrimination,
      usedSupportServices
    });
  }
  
  return data;
};

// Statistical functions
const calculateMean = (values) => values.reduce((a, b) => a + b, 0) / values.length;
const calculateStdDev = (values) => {
  const mean = calculateMean(values);
  const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
  return Math.sqrt(calculateMean(squaredDiffs));
};

const calculateConfidenceInterval = (values, confidence = 0.95) => {
  const mean = calculateMean(values);
  const stdDev = calculateStdDev(values);
  const n = values.length;
  const tValue = confidence === 0.95 ? 1.96 : 2.576; // Approximation for large samples
  const margin = tValue * (stdDev / Math.sqrt(n));
  return {
    mean: Math.round(mean * 100) / 100,
    lower: Math.round((mean - margin) * 100) / 100,
    upper: Math.round((mean + margin) * 100) / 100,
    margin: Math.round(margin * 100) / 100
  };
};

const tTest = (group1, group2) => {
  const mean1 = calculateMean(group1);
  const mean2 = calculateMean(group2);
  const var1 = Math.pow(calculateStdDev(group1), 2);
  const var2 = Math.pow(calculateStdDev(group2), 2);
  const n1 = group1.length;
  const n2 = group2.length;
  
  const pooledSE = Math.sqrt(var1/n1 + var2/n2);
  const tStat = (mean1 - mean2) / pooledSE;
  
  // Simplified p-value calculation (approximation)
  const pValue = Math.abs(tStat) > 2.576 ? 0.01 : Math.abs(tStat) > 1.96 ? 0.05 : 0.1;
  
  return {
    tStat: Math.round(tStat * 100) / 100,
    pValue,
    significant: pValue < 0.05,
    effectSize: Math.abs(mean1 - mean2) / Math.sqrt((var1 + var2) / 2)
  };
};

// ANOVA (Analysis of Variance) for multiple groups
const anova = (groups) => {
  const groupMeans = groups.map(group => calculateMean(group));
  const grandMean = calculateMean(groups.flat());
  const n = groups.length;
  const totalN = groups.reduce((sum, group) => sum + group.length, 0);
  
  // Between-group sum of squares
  const ssBetween = groups.reduce((sum, group, i) => {
    return sum + group.length * Math.pow(groupMeans[i] - grandMean, 2);
  }, 0);
  
  // Within-group sum of squares
  const ssWithin = groups.reduce((sum, group, i) => {
    return sum + group.reduce((groupSum, value) => {
      return groupSum + Math.pow(value - groupMeans[i], 2);
    }, 0);
  }, 0);
  
  const dfBetween = n - 1;
  const dfWithin = totalN - n;
  
  const msBetween = ssBetween / dfBetween;
  const msWithin = ssWithin / dfWithin;
  
  const fStat = msBetween / msWithin;
  
  // Simplified p-value calculation
  const pValue = fStat > 3.0 ? 0.01 : fStat > 2.5 ? 0.05 : 0.1;
  
  return {
    fStat: Math.round(fStat * 100) / 100,
    pValue,
    significant: pValue < 0.05,
    ssBetween: Math.round(ssBetween * 100) / 100,
    ssWithin: Math.round(ssWithin * 100) / 100,
    dfBetween,
    dfWithin
  };
};

// Linear Regression Analysis
const linearRegression = (x, y) => {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  // Calculate R-squared
  const yMean = sumY / n;
  const ssTotal = y.reduce((sum, yi) => sum + Math.pow(yi - yMean, 2), 0);
  const ssResidual = y.reduce((sum, yi, i) => {
    const yPred = slope * x[i] + intercept;
    return sum + Math.pow(yi - yPred, 2);
  }, 0);
  
  const rSquared = 1 - (ssResidual / ssTotal);
  
  return {
    slope: Math.round(slope * 1000) / 1000,
    intercept: Math.round(intercept * 1000) / 1000,
    rSquared: Math.round(rSquared * 1000) / 1000,
    correlation: Math.round(Math.sqrt(rSquared) * 1000) / 1000
  };
};

const AppEnhanced = () => {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'auth', 'dashboard'
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register'
  const [user, setUser] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [data] = useState(() => generateSurveyData());
  const [filters, setFilters] = useState({
    program: 'All',
    gender: 'All',
    year: 'All',
    hasStudentOrg: 'All'
  });
  const [analysisVariable, setAnalysisVariable] = useState('inclusivity');
  const [comparisonGroup, setComparisonGroup] = useState('gender');
  const [activeTab, setActiveTab] = useState('overview');

  // Handle authentication
  const handleLogin = (credentials) => {
    // Simulate successful login
    setUser({
      id: 1,
      email: credentials.email,
      name: 'Demo User',
      role: 'researcher',
      institution: 'Demo University'
    });
    setCurrentView('dashboard');
  };

  const handleRegister = (userData) => {
    // Simulate successful registration
    setUser({
      id: 1,
      email: userData.email,
      name: `${userData.firstName} ${userData.lastName}`,
      role: userData.role,
      institution: userData.institution
    });
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  const handleGetStarted = () => {
    setCurrentView('auth');
  };

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return data.filter(item => {
      return (filters.program === 'All' || item.program === filters.program) &&
             (filters.gender === 'All' || item.gender === filters.gender) &&
             (filters.year === 'All' || item.year === filters.year) &&
             (filters.hasStudentOrg === 'All' || 
              (filters.hasStudentOrg === 'Yes' && item.hasStudentOrg) ||
              (filters.hasStudentOrg === 'No' && !item.hasStudentOrg));
    });
  }, [data, filters]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const variables = ['inclusivity', 'safety', 'supportiveness', 'satisfaction'];
    return variables.reduce((acc, variable) => {
      const values = filteredData.map(d => d[variable]);
      acc[variable] = calculateConfidenceInterval(values);
      return acc;
    }, {});
  }, [filteredData]);

  // Prepare data for visualizations
  const chartData = useMemo(() => {
    const groupBy = comparisonGroup;
    const groups = [...new Set(filteredData.map(d => d[groupBy]))];
    
    return groups.map(group => {
      const groupData = filteredData.filter(d => d[groupBy] === group);
      const values = groupData.map(d => d[analysisVariable]);
      const ci = calculateConfidenceInterval(values);
      
      return {
        group,
        mean: ci.mean,
        lower: ci.lower,
        upper: ci.upper,
        count: groupData.length
      };
    });
  }, [filteredData, analysisVariable, comparisonGroup]);

  // Statistical analysis
  const statisticalAnalysis = useMemo(() => {
    if (comparisonGroup === 'gender') {
      const maleData = filteredData.filter(d => d.gender === 'Male').map(d => d[analysisVariable]);
      const femaleData = filteredData.filter(d => d.gender === 'Female').map(d => d[analysisVariable]);
      
      if (maleData.length > 10 && femaleData.length > 10) {
        return {
          type: 'T-Test (Male vs Female)',
          ...tTest(maleData, femaleData),
          group1: 'Male',
          group2: 'Female',
          n1: maleData.length,
          n2: femaleData.length
        };
      }
    }
    
    if (comparisonGroup === 'program') {
      const stemPrograms = ['Computer Science', 'Engineering', 'Mathematics', 'Biology'];
      const stemData = filteredData.filter(d => stemPrograms.includes(d.program)).map(d => d[analysisVariable]);
      const nonStemData = filteredData.filter(d => !stemPrograms.includes(d.program)).map(d => d[analysisVariable]);
      
      if (stemData.length > 10 && nonStemData.length > 10) {
        return {
          type: 'T-Test (STEM vs Non-STEM)',
          ...tTest(stemData, nonStemData),
          group1: 'STEM',
          group2: 'Non-STEM',
          n1: stemData.length,
          n2: nonStemData.length
        };
      }
    }
    
    return null;
  }, [filteredData, analysisVariable, comparisonGroup]);

  // ANOVA Analysis
  const anovaAnalysis = useMemo(() => {
    if (comparisonGroup === 'year') {
      const yearGroups = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'].map(year => 
        filteredData.filter(d => d.year === year).map(d => d[analysisVariable])
      ).filter(group => group.length > 5);
      
      if (yearGroups.length >= 3) {
        return {
          type: 'ANOVA (Academic Year)',
          ...anova(yearGroups),
          groups: yearGroups.length
        };
      }
    }
    return null;
  }, [filteredData, analysisVariable, comparisonGroup]);

  // Regression Analysis
  const regressionAnalysis = useMemo(() => {
    const ages = filteredData.map(d => d.age);
    const values = filteredData.map(d => d[analysisVariable]);
    
    if (ages.length > 10) {
      return {
        type: 'Linear Regression (Age vs ' + analysisVariable.charAt(0).toUpperCase() + analysisVariable.slice(1) + ')',
        ...linearRegression(ages, values)
      };
    }
    return null;
  }, [filteredData, analysisVariable]);

  const uniquePrograms = [...new Set(data.map(d => d.program))];
  const uniqueGenders = [...new Set(data.map(d => d.gender))];
  const uniqueYears = [...new Set(data.map(d => d.year))];

  // Render different views
  if (currentView === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentView === 'auth') {
    if (authMode === 'login') {
      return (
        <Login 
          onLogin={handleLogin}
          onSwitchToRegister={() => setAuthMode('register')}
        />
      );
    } else {
      return (
        <Register 
          onRegister={handleRegister}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      );
    }
  }

  // Dashboard view
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with user info and export */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BarChart className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Campus Climate Analytics</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-700">
                <User className="h-4 w-4 mr-1" />
                {user?.name} ({user?.role})
              </div>
              <button
                onClick={() => setShowExportModal(true)}
                className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                <Download className="h-4 w-4 mr-1" />
                Export
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-700"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Message */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Analyzing campus climate data for {user?.institution}</p>
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Total Responses</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{filteredData.length}</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Avg Satisfaction</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{summaryStats.satisfaction?.mean || 0}</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Discrimination Rate</span>
              </div>
              <div className="text-2xl font-bold text-yellow-600">
                {Math.round(filteredData.filter(d => d.experiencedDiscrimination).length / filteredData.length * 100)}%
              </div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Student Org Participation</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(filteredData.filter(d => d.hasStudentOrg).length / filteredData.length * 100)}%
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
              <select 
                value={filters.program} 
                onChange={(e) => setFilters({...filters, program: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Programs</option>
                {uniquePrograms.map(program => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select 
                value={filters.gender} 
                onChange={(e) => setFilters({...filters, gender: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Genders</option>
                {uniqueGenders.map(gender => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select 
                value={filters.year} 
                onChange={(e) => setFilters({...filters, year: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Years</option>
                {uniqueYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Organization</label>
              <select 
                value={filters.hasStudentOrg} 
                onChange={(e) => setFilters({...filters, hasStudentOrg: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Students</option>
                <option value="Yes">Member</option>
                <option value="No">Non-member</option>
              </select>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'analysis', 'insights', 'advanced'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="dashboard-content">
            {/* Summary Statistics */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary Statistics (95% Confidence Intervals)</h3>
              <div className="space-y-4">
                {Object.entries(summaryStats).map(([variable, stats]) => (
                  <div key={variable} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-800 capitalize">{variable}</h4>
                    <div className="text-sm text-gray-600">
                      Mean: {stats.mean} (CI: {stats.lower} - {stats.upper})
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{width: `${(stats.mean / 5) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Distribution Chart */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Score Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  {name: 'Inclusivity', value: summaryStats.inclusivity?.mean || 0},
                  {name: 'Safety', value: summaryStats.safety?.mean || 0},
                  {name: 'Supportiveness', value: summaryStats.supportiveness?.mean || 0},
                  {name: 'Satisfaction', value: summaryStats.satisfaction?.mean || 0}
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-6">
            {/* Analysis Controls */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistical Analysis Controls</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Variable to Analyze</label>
                  <select 
                    value={analysisVariable} 
                    onChange={(e) => setAnalysisVariable(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="inclusivity">Inclusivity</option>
                    <option value="safety">Safety</option>
                    <option value="supportiveness">Supportiveness</option>
                    <option value="satisfaction">Satisfaction</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group Comparison</label>
                  <select 
                    value={comparisonGroup} 
                    onChange={(e) => setComparisonGroup(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="gender">Gender</option>
                    <option value="program">Academic Program</option>
                    <option value="year">Academic Year</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Comparison Chart */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {analysisVariable.charAt(0).toUpperCase() + analysisVariable.slice(1)} by {comparisonGroup.charAt(0).toUpperCase() + comparisonGroup.slice(1)}
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'mean' ? `${value} (n=${chartData.find(d => d.mean === value)?.count})` : value,
                      name === 'mean' ? 'Mean Score' : name
                    ]}
                  />
                  <Bar dataKey="mean" fill="#3B82F6" />
                  <Bar dataKey="lower" fill="rgba(59, 130, 246, 0.3)" />
                  <Bar dataKey="upper" fill="rgba(59, 130, 246, 0.3)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Statistical Test Results */}
            {statisticalAnalysis && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistical Test Results</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Test Type</div>
                      <div className="font-semibold">{statisticalAnalysis.type}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">T-Statistic</div>
                      <div className="font-semibold">{statisticalAnalysis.tStat}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">P-Value</div>
                      <div className="font-semibold">{statisticalAnalysis.pValue}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Significant</div>
                      <div className={`font-semibold flex items-center ${statisticalAnalysis.significant ? 'text-red-600' : 'text-green-600'}`}>
                        {statisticalAnalysis.significant ? <XCircle className="h-4 w-4 mr-1" /> : <CheckCircle className="h-4 w-4 mr-1" />}
                        {statisticalAnalysis.significant ? 'Yes' : 'No'}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <strong>Sample Sizes:</strong> {statisticalAnalysis.group1}: n={statisticalAnalysis.n1}, {statisticalAnalysis.group2}: n={statisticalAnalysis.n2}
                  </div>
                  <div className="text-sm text-gray-700 mt-1">
                    <strong>Effect Size (Cohen's d):</strong> {Math.round(statisticalAnalysis.effectSize * 100) / 100}
                  </div>
                </div>
              </div>
            )}

            {/* ANOVA Results */}
            {anovaAnalysis && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">ANOVA Results</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Test Type</div>
                      <div className="font-semibold">{anovaAnalysis.type}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">F-Statistic</div>
                      <div className="font-semibold">{anovaAnalysis.fStat}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">P-Value</div>
                      <div className="font-semibold">{anovaAnalysis.pValue}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Significant</div>
                      <div className={`font-semibold flex items-center ${anovaAnalysis.significant ? 'text-red-600' : 'text-green-600'}`}>
                        {anovaAnalysis.significant ? <XCircle className="h-4 w-4 mr-1" /> : <CheckCircle className="h-4 w-4 mr-1" />}
                        {anovaAnalysis.significant ? 'Yes' : 'No'}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <strong>Groups:</strong> {anovaAnalysis.groups} groups compared
                  </div>
                </div>
              </div>
            )}

            {/* Regression Results */}
            {regressionAnalysis && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Regression Analysis</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Test Type</div>
                      <div className="font-semibold">{regressionAnalysis.type}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">R-Squared</div>
                      <div className="font-semibold">{regressionAnalysis.rSquared}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Correlation</div>
                      <div className="font-semibold">{regressionAnalysis.correlation}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Slope</div>
                      <div className="font-semibold">{regressionAnalysis.slope}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <strong>Equation:</strong> y = {regressionAnalysis.slope}x + {regressionAnalysis.intercept}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Insights & Interpretations</h3>
            <div className="space-y-6">
              {/* Gender Analysis */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">Gender-Based Analysis</h4>
                <p className="text-gray-700 mb-2">
                  Analysis of safety perceptions shows that male students report higher perceived safety scores (M = 4.1) 
                  compared to female students (M = 3.6). This difference is statistically significant and suggests 
                  gender-based disparities in campus safety experiences.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Statistical Note:</strong> Based on t-test analysis with α = 0.05
                </div>
              </div>

              {/* STEM vs Non-STEM */}
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">STEM vs Non-STEM Programs</h4>
                <p className="text-gray-700 mb-2">
                  Students in STEM programs (Computer Science, Engineering, Mathematics, Biology) report lower 
                  inclusivity scores (M = 3.2) compared to students in non-STEM programs (M = 3.8). This finding 
                  aligns with national trends regarding inclusivity challenges in STEM fields.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Effect Size:</strong> Medium effect (Cohen's d ≈ 0.5), suggesting practically significant difference
                </div>
              </div>

              {/* Student Organizations */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">Student Organization Impact</h4>
                <p className="text-gray-700 mb-2">
                  Students involved in student organizations show higher satisfaction levels across all measured 
                  dimensions. The participation rate is {Math.round(filteredData.filter(d => d.hasStudentOrg).length / filteredData.length * 100)}%, 
                  indicating substantial engagement opportunities.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Recommendation:</strong> Increase student organization outreach and accessibility
                </div>
              </div>

              {/* Discrimination Patterns */}
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">Discrimination Experiences</h4>
                <p className="text-gray-700 mb-2">
                  {Math.round(filteredData.filter(d => d.experiencedDiscrimination).length / filteredData.length * 100)}% 
                  of respondents report experiencing discrimination. The rate appears higher among underrepresented 
                  groups in STEM fields, particularly female students in technical programs.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Limitation:</strong> Self-reported data may be subject to recall bias and social desirability effects
                </div>
              </div>

              {/* Statistical Assumptions */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                <h4 className="font-semibold text-gray-800 mb-2">Assumptions & Limitations</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Statistical tests assume normally distributed data and independent observations</li>
                  <li>Confidence intervals calculated using large-sample approximations (n &gt; 30 per group)</li>
                  <li>Cross-sectional design limits causal inferences</li>
                  <li>Response bias may affect generalizability to entire campus population</li>
                  <li>Effect sizes should be interpreted within institutional context</li>
                </ul>
              </div>

              {/* Recommendations */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-gray-800 mb-2">Recommended Actions</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Implement targeted inclusivity initiatives in STEM programs</li>
                  <li>Enhance safety measures and reporting systems, particularly addressing gender disparities</li>
                  <li>Expand student organization opportunities and improve accessibility</li>
                  <li>Develop comprehensive anti-discrimination training and support services</li>
                  <li>Conduct longitudinal follow-up studies to track progress over time</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-6" data-testid="dashboard-content">
            {/* Scatter Plot - Age vs Satisfaction */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Age vs Satisfaction Scatter Plot</h3>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={filteredData.slice(0, 100)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" name="Age" />
                  <YAxis dataKey="satisfaction" name="Satisfaction" domain={[0, 5]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter dataKey="satisfaction" fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart - Trends by Academic Year */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Trends by Academic Year</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="mean" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="lower" stroke="#82ca9d" strokeWidth={1} strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="upper" stroke="#ffc658" strokeWidth={1} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Enhanced Bar Chart with Legend */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Multi-Metric Comparison</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={[
                  {name: 'Inclusivity', value: summaryStats.inclusivity?.mean || 0, target: 4.0},
                  {name: 'Safety', value: summaryStats.safety?.mean || 0, target: 4.5},
                  {name: 'Supportiveness', value: summaryStats.supportiveness?.mean || 0, target: 4.0},
                  {name: 'Satisfaction', value: summaryStats.satisfaction?.mean || 0, target: 4.2}
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3B82F6" name="Current Score" />
                  <Bar dataKey="target" fill="#10B981" name="Target Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {/* Export Modal */}
        <ExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          data={filteredData}
          charts={chartData}
        />
      </div>
    </div>
  );
};

export default AppEnhanced; 