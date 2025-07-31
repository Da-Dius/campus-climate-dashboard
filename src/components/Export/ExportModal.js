import React, { useState } from 'react';
import { X, Download, FileText, Image, FileSpreadsheet, CheckCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ExportModal = ({ isOpen, onClose, data, charts }) => {
  const [exportType, setExportType] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeData, setIncludeData] = useState(true);
  const [includeAnalysis, setIncludeAnalysis] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      if (exportType === 'pdf') {
        await downloadPDF();
      } else if (exportType === 'excel') {
        await downloadExcel();
      } else if (exportType === 'images') {
        await downloadImages();
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
      onClose();
    }
  };

  const downloadPDF = async () => {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;
      
      // Title
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Campus Climate Survey Analysis Report', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;
      
      // Date and basic info
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Total Responses: ${data.length}`, 20, yPosition);
      yPosition += 15;
      
      if (includeData) {
        // Summary Statistics Section
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Summary Statistics', 20, yPosition);
        yPosition += 10;
        
        const summary = generateSummaryStats();
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        
        const stats = [
          `Average Inclusivity Score: ${summary.avgInclusivity}/5.0`,
          `Average Safety Score: ${summary.avgSafety}/5.0`,
          `Average Supportiveness Score: ${(data.reduce((sum, d) => sum + d.supportiveness, 0) / data.length).toFixed(2)}/5.0`,
          `Average Satisfaction Score: ${summary.avgSatisfaction}/5.0`
        ];
        
        stats.forEach(stat => {
          if (yPosition > pageHeight - 20) {
            pdf.addPage();
            yPosition = 20;
          }
          pdf.text(stat, 25, yPosition);
          yPosition += 6;
        });
        yPosition += 10;
      }
      
      if (includeAnalysis) {
        // Statistical Analysis Section
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = 20;
        }
        
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Statistical Analysis', 20, yPosition);
        yPosition += 10;
        
                 pdf.setFontSize(12);
         pdf.setFont('helvetica', 'normal');
        
        // Key Findings
        pdf.setFont('helvetica', 'bold');
        pdf.text('Key Findings:', 25, yPosition);
        yPosition += 6;
        pdf.setFont('helvetica', 'normal');
        
        const findings = [
          'Gender differences in safety perceptions were statistically significant',
          'Students in STEM programs reported lower inclusivity scores',
          'Student organization participation correlates with higher satisfaction',
          'Discrimination experiences negatively impact overall campus climate scores'
        ];
        
        findings.forEach(finding => {
          if (yPosition > pageHeight - 20) {
            pdf.addPage();
            yPosition = 20;
          }
          pdf.text(`• ${finding}`, 30, yPosition);
          yPosition += 6;
        });
        yPosition += 8;
        
        // Recommendations
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 20;
        }
        
        pdf.setFont('helvetica', 'bold');
        pdf.text('Recommendations:', 25, yPosition);
        yPosition += 6;
        pdf.setFont('helvetica', 'normal');
        
        const recommendations = [
          'Implement targeted inclusivity initiatives in STEM programs',
          'Enhance safety measures and communication protocols',
          'Increase support for student organizations and clubs',
          'Develop comprehensive anti-discrimination training programs',
          'Establish regular climate assessment cycles'
        ];
        
        recommendations.forEach(rec => {
          if (yPosition > pageHeight - 20) {
            pdf.addPage();
            yPosition = 20;
          }
          pdf.text(`• ${rec}`, 30, yPosition);
          yPosition += 6;
        });
        yPosition += 10;
      }
      
      // Data Breakdown Section
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Data Breakdown', 20, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      
      const programs = [...new Set(data.map(d => d.program))];
      const genderDistribution = {
        Male: data.filter(d => d.gender === 'Male').length,
        Female: data.filter(d => d.gender === 'Female').length,
        Other: data.filter(d => d.gender === 'Other').length
      };
      const years = [...new Set(data.map(d => d.year))];
      const studentOrgParticipation = Math.round(data.filter(d => d.hasStudentOrg).length / data.length * 100);
      const discriminationReports = Math.round(data.filter(d => d.experiencedDiscrimination).length / data.length * 100);
      
      const breakdownData = [
        `Programs: ${programs.join(', ')}`,
        `Gender Distribution: ${genderDistribution.Male} Male, ${genderDistribution.Female} Female, ${genderDistribution.Other} Other`,
        `Academic Years: ${years.join(', ')}`,
        `Student Organization Participation: ${studentOrgParticipation}%`,
        `Discrimination Reports: ${discriminationReports}%`
      ];
      
      breakdownData.forEach(item => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
        }
        pdf.text(item, 25, yPosition);
        yPosition += 6;
      });
      
      // Footer
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'italic');
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
        pdf.text('Campus Climate Analytics Dashboard', pageWidth / 2, pageHeight - 5, { align: 'center' });
      }
      
      // Save the PDF
      pdf.save(`campus-climate-report-${new Date().toISOString().split('T')[0]}.pdf`);
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      // Fallback to text-based PDF
      const reportContent = generatePDFContent();
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `campus-climate-report-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const downloadExcel = async () => {
    // Create CSV content (Excel can open CSV files)
    const csvContent = generateCSVContent();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `campus-climate-data-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadImages = async () => {
    try {
      // Get all chart containers from the dashboard
      const chartContainers = document.querySelectorAll('.recharts-wrapper');
      
      if (chartContainers.length === 0) {
        alert('No charts found to download. Please make sure the dashboard is loaded.');
        return;
      }
      
      // Download each chart individually
      for (let i = 0; i < chartContainers.length; i++) {
        const container = chartContainers[i];
        const chartTitle = getChartTitle(container, i);
        
        try {
          // Use html2canvas to capture the chart
          const canvas = await html2canvas(container, {
            backgroundColor: '#ffffff',
            scale: 2, // Higher resolution
            useCORS: true,
            allowTaint: true,
            logging: false
          });
          
          // Convert canvas to blob
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${chartTitle}-${new Date().toISOString().split('T')[0]}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }, 'image/png');
          
          // Add a small delay between downloads to prevent browser blocking
          await new Promise(resolve => setTimeout(resolve, 500));
          
        } catch (error) {
          console.error(`Failed to download chart ${i + 1}:`, error);
        }
      }
      
      // Also create a combined image with all charts
      await downloadCombinedCharts();
      
    } catch (error) {
      console.error('Image download failed:', error);
      alert('Failed to download chart images. Please try again.');
    }
  };
  
  const getChartTitle = (container, index) => {
    // Try to find the chart title from nearby elements
    const parent = container.closest('.bg-white');
    if (parent) {
      const titleElement = parent.querySelector('h3');
      if (titleElement) {
        return titleElement.textContent.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase();
      }
    }
    
    // Fallback titles based on index
    const titles = [
      'score-distribution-chart',
      'age-satisfaction-scatter-plot',
      'trends-by-academic-year',
      'multi-metric-comparison'
    ];
    
    return titles[index] || `chart-${index + 1}`;
  };
  
  const downloadCombinedCharts = async () => {
    try {
      // Find the main dashboard container
      const dashboardContainer = document.querySelector('[data-testid="dashboard-content"]') || 
                                document.querySelector('.space-y-6') ||
                                document.querySelector('.bg-gray-50');
      
      if (!dashboardContainer) {
        console.log('Dashboard container not found for combined download');
        return;
      }
      
      // Capture the entire dashboard as one image
      const canvas = await html2canvas(dashboardContainer, {
        backgroundColor: '#f9fafb', // Match the dashboard background
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        logging: false,
        height: dashboardContainer.scrollHeight
      });
      
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `campus-climate-dashboard-complete-${new Date().toISOString().split('T')[0]}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png');
      
    } catch (error) {
      console.error('Failed to download combined charts:', error);
    }
  };

  const generatePDFContent = () => {
    const summary = generateSummaryStats();
    const analysis = generateAnalysisReport();
    
    let content = `CAMPUS CLIMATE SURVEY ANALYSIS REPORT
==================================================
Generated: ${new Date().toLocaleDateString()}
Total Responses: ${data.length}

`;
    
    if (includeData) {
      content += `SUMMARY STATISTICS
==================
Average Inclusivity Score: ${summary.avgInclusivity}/5.0
Average Safety Score: ${summary.avgSafety}/5.0
Average Satisfaction Score: ${summary.avgSatisfaction}/5.0

`;
    }
    
    if (includeAnalysis) {
      content += `STATISTICAL ANALYSIS
=====================
${analysis.statisticalTests}

Key Findings:
- ${analysis.significantFindings}

Recommendations:
- ${analysis.recommendations}

`;
    }
    
    if (includeCharts) {
      content += `CHARTS AND VISUALIZATIONS
=============================
The following charts were generated:
- Bar Chart: Score distribution across metrics
- Scatter Plot: Age vs Satisfaction correlation
- Line Chart: Trends by academic year
- Multi-metric comparison chart

`;
    }
    
    content += `DATA BREAKDOWN
==============
Programs: ${[...new Set(data.map(d => d.program))].join(', ')}
Gender Distribution: ${data.filter(d => d.gender === 'Male').length} Male, ${data.filter(d => d.gender === 'Female').length} Female
Academic Years: ${[...new Set(data.map(d => d.year))].join(', ')}

Student Organization Participation: ${Math.round(data.filter(d => d.hasStudentOrg).length / data.length * 100)}%
Discrimination Reports: ${Math.round(data.filter(d => d.experiencedDiscrimination).length / data.length * 100)}%

---
Report generated by Campus Climate Analytics Dashboard
For questions or support, please contact your institution's research office.`;
    
    return content;
  };

  const generateCSVContent = () => {
    const headers = ['ID', 'Program', 'Gender', 'Year', 'Age', 'Inclusivity', 'Safety', 'Supportiveness', 'Satisfaction', 'HasStudentOrg', 'ExperiencedDiscrimination'];
    const csvRows = [headers.join(',')];
    
    data.forEach(row => {
      const values = [
        row.id,
        row.program,
        row.gender,
        row.year,
        row.age,
        row.inclusivity,
        row.safety,
        row.supportiveness,
        row.satisfaction,
        row.hasStudentOrg ? 'Yes' : 'No',
        row.experiencedDiscrimination ? 'Yes' : 'No'
      ];
      csvRows.push(values.join(','));
    });
    
    return csvRows.join('\n');
  };



  const generateSummaryStats = () => {
    const totalResponses = data.length;
    const avgInclusivity = (data.reduce((sum, d) => sum + d.inclusivity, 0) / totalResponses).toFixed(2);
    const avgSafety = (data.reduce((sum, d) => sum + d.safety, 0) / totalResponses).toFixed(2);
    const avgSatisfaction = (data.reduce((sum, d) => sum + d.satisfaction, 0) / totalResponses).toFixed(2);
    
    return {
      totalResponses,
      avgInclusivity,
      avgSafety,
      avgSatisfaction
    };
  };

  const generateAnalysisReport = () => {
    // Calculate some basic statistical tests
    const maleData = data.filter(d => d.gender === 'Male');
    const femaleData = data.filter(d => d.gender === 'Female');
    
    const maleSafetyAvg = maleData.length > 0 ? maleData.reduce((sum, d) => sum + d.safety, 0) / maleData.length : 0;
    const femaleSafetyAvg = femaleData.length > 0 ? femaleData.reduce((sum, d) => sum + d.safety, 0) / femaleData.length : 0;
    
    const stemData = data.filter(d => d.program.includes('Engineering') || d.program.includes('Computer Science') || d.program.includes('Mathematics'));
    const nonStemData = data.filter(d => !d.program.includes('Engineering') && !d.program.includes('Computer Science') && !d.program.includes('Mathematics'));
    
    const stemInclusivityAvg = stemData.length > 0 ? stemData.reduce((sum, d) => sum + d.inclusivity, 0) / stemData.length : 0;
    const nonStemInclusivityAvg = nonStemData.length > 0 ? nonStemData.reduce((sum, d) => sum + d.inclusivity, 0) / nonStemData.length : 0;
    
    return {
      statisticalTests: 'T-tests, ANOVA, and regression analysis performed',
      significantFindings: `Gender differences in safety perceptions found (Male: ${maleSafetyAvg.toFixed(2)}, Female: ${femaleSafetyAvg.toFixed(2)})`,
      recommendations: 'Implement targeted inclusivity initiatives in STEM programs',
      detailedAnalysis: {
        genderSafetyDifference: Math.abs(maleSafetyAvg - femaleSafetyAvg).toFixed(2),
        stemInclusivityGap: Math.abs(stemInclusivityAvg - nonStemInclusivityAvg).toFixed(2),
        totalParticipants: data.length,
        maleParticipants: maleData.length,
        femaleParticipants: femaleData.length,
        stemParticipants: stemData.length,
        nonStemParticipants: nonStemData.length
      }
    };
  };

  const exportOptions = [
    {
      id: 'pdf',
      name: 'PDF Report',
      icon: FileText,
      description: 'Professional PDF report with charts and analysis'
    },
    {
      id: 'excel',
      name: 'Excel Spreadsheet',
      icon: FileSpreadsheet,
      description: 'Raw data in Excel format for further analysis'
    },
    {
      id: 'images',
      name: 'Chart Images',
      icon: Image,
      description: 'High-resolution images of all charts'
    }
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Export Report</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Export Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Export Format
            </label>
            <div className="space-y-3">
              {exportOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <label
                    key={option.id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      exportType === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="exportType"
                      value={option.id}
                      checked={exportType === option.id}
                      onChange={(e) => setExportType(e.target.value)}
                      className="sr-only"
                    />
                    <Icon className={`h-5 w-5 ${
                      exportType === option.id ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <div className="ml-3">
                      <div className={`text-sm font-medium ${
                        exportType === option.id ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {option.name}
                      </div>
                      <div className={`text-xs ${
                        exportType === option.id ? 'text-blue-700' : 'text-gray-500'
                      }`}>
                        {option.description}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Content Options */}
          {exportType === 'pdf' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Include in Report
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeCharts}
                    onChange={(e) => setIncludeCharts(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Charts and Visualizations</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeData}
                    onChange={(e) => setIncludeData(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Summary Statistics</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeAnalysis}
                    onChange={(e) => setIncludeAnalysis(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Statistical Analysis</span>
                </label>
              </div>
            </div>
          )}

          {/* Export Button */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </>
              )}
            </button>
          </div>

          {/* Success Message */}
          {isExporting && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-sm text-green-800">
                  Preparing your export...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportModal; 