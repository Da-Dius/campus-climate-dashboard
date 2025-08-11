# Campus Climate Survey Analysis Dashboard

 ## Project Structure

```
SA-DASHBOARD/
├── public/
│   └── index.html              # Main HTML entry point
├── src/
│   ├── App.js                  # Main React component with dashboard logic
│   ├── index.js                # React application entry point
│   └── index.css               # Global styles and Tailwind imports
├── package.json                # Project dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
└── README.md                   # Project documentation
```

A comprehensive, interactive web application for analyzing campus climate survey data with advanced statistical analysis, data visualization, and insights generation.

## Description

The Campus Climate Survey Analysis Dashboard is a React-based web application designed to help educational institutions analyze and visualize campus climate survey data. The dashboard provides interactive tools for exploring inclusivity, safety, supportiveness, and satisfaction metrics across different demographic groups and academic programs.

### Problem Solved
Educational institutions often struggle to effectively analyze and present campus climate survey data in a meaningful way. This dashboard addresses this challenge by providing:
- Real-time data filtering and analysis
- Statistical significance testing
- Interactive visualizations
- Actionable insights and recommendations
- Professional reporting capabilities

## 🚀 Live Demo

[View Live Application](https://campus-climate-analysis.netlify.app/)

### Local Development
To run the application locally:
1. Follow the installation instructions below
2. Navigate to `http://localhost:3000` in your browser
3. Explore the interactive features and visualizations

## Features

### 📊 **Data Visualization**
- Interactive bar charts with confidence intervals
- Scatter plots for correlation analysis
- Line charts for trend analysis
- Multi-metric comparison charts
- Responsive design for all screen sizes

### 🔍 **Advanced Analytics**
- Real-time statistical analysis with t-tests
- Confidence interval calculations (95% CI)
- Effect size calculations (Cohen's d)
- Significance testing with p-values
- Sample size considerations

### 🎛️ **Interactive Controls**
- Multi-dimensional data filtering (Program, Gender, Year, Student Organization)
- Dynamic variable selection for analysis
- Group comparison tools
- Real-time data updates

### 📈 **Comprehensive Reporting**
- Summary statistics with confidence intervals
- Statistical test results with interpretations
- Key insights and recommendations
- Limitations and assumptions documentation

### 🎨 **User Experience**
- Modern, responsive UI with Tailwind CSS
- Tabbed navigation for organized content
- Professional color scheme and typography
- Intuitive data exploration tools

### 🔐 **Authentication & Security**
- User registration and login system
- Role-based access (Researcher, Administrator, Faculty, Student)
- Institution-specific dashboards
- Secure session management

### 📤 **Export & Reporting**
- PDF report generation
- Excel spreadsheet export
- High-resolution chart images
- Customizable report content

### 📊 **Advanced Statistical Analysis**
- ANOVA (Analysis of Variance) for multiple groups
- Linear regression analysis
- Correlation analysis
- Enhanced statistical testing capabilities

### 🌐 **Real-time Features**
- Live data updates
- Interactive filtering
- Dynamic chart generation
- Real-time statistical calculations

### Dashboard Navigation

The dashboard is organized into four main sections:

#### 1. **Overview Tab**
- View summary statistics with confidence intervals
- See score distribution across key metrics
- Monitor key performance indicators

#### 2. **Analysis Tab**
- Select variables to analyze (Inclusivity, Safety, Supportiveness, Satisfaction)
- Choose comparison groups (Gender, Academic Program, Academic Year)
- View statistical test results and significance levels

#### 3. **Insights Tab**
- Read detailed interpretations of findings
- Review recommendations for improvement
- Understand limitations and assumptions

#### 4. **Advanced Tab**
- Explore scatter plots for correlation analysis
- View trend analysis with line charts
- Compare current scores against target benchmarks

### Data Filtering

Use the filter controls to:
- Filter by academic program (Computer Science, Engineering, etc.)
- Filter by gender identity
- Filter by academic year
- Filter by student organization membership

### Interpreting Results

- **Confidence Intervals**: Show the range where the true population mean likely falls
- **P-values**: Indicate statistical significance (< 0.05 is significant)
- **Effect Sizes**: Measure practical significance (Cohen's d > 0.5 is medium effect)
- **Sample Sizes**: Ensure adequate power for statistical tests

## Technologies Used

### Frontend Framework
- **React 18.2.0** - Modern JavaScript library for building user interfaces
- **React DOM** - React rendering for web applications

### Data Visualization
- **Recharts 2.7.2** - Composable charting library built on React components
  - BarChart, LineChart, ScatterChart components
  - ResponsiveContainer for adaptive sizing
  - Tooltip, Legend, and CartesianGrid components

### UI/UX
- **Tailwind CSS 3.3.2** - Utility-first CSS framework
- **Lucide React 0.263.1** - Beautiful & consistent icon toolkit
- **PostCSS 8.4.24** - CSS transformation tool
- **Autoprefixer 10.4.14** - CSS vendor prefixing

### Development Tools
- **Create React App 5.0.1** - React application boilerplate
- **ESLint** - JavaScript linting utility
- **Web Vitals 2.1.4** - Web performance metrics

### Testing
- **Jest** - JavaScript testing framework
- **React Testing Library 13.3.0** - Testing utilities for React
- **User Event 13.5.0** - Simulate user interactions



### Key Components

- **CampusClimateDashboard**: Main component containing all dashboard functionality
- **Data Generation**: Realistic survey data generation with statistical correlations
- **Statistical Functions**: Mean, standard deviation, confidence intervals, t-tests
- **Visualization Components**: Charts and graphs using Recharts
- **Filter System**: Multi-dimensional data filtering
- **Analysis Engine**: Statistical analysis and significance testing

## Contributing

We welcome contributions to improve the Campus Climate Survey Analysis Dashboard!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed
4. **Commit your changes**
   ```bash
   git commit -m "Add: description of your changes"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request**

### Development Guidelines

- Use meaningful commit messages
- Follow React best practices
- Ensure responsive design
- Add appropriate error handling
- Include JSDoc comments for complex functions
- Test across different browsers

### Areas for Improvement

- Add data import capabilities

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The MIT License is a permissive license that allows for:
- Commercial use
- Modification
- Distribution
- Private use

## Credits

### Libraries and Tools
- **Recharts** - For beautiful, responsive charts
- **Tailwind CSS** - For utility-first styling
- **Lucide React** - For consistent iconography
- **Create React App** - For the development environment

### Data and Research
- Statistical methods based on standard educational research practices
- Survey design principles from campus climate assessment literature
- Visualization best practices from data science community

### Development
- Built with modern React patterns and hooks
- Responsive design principles
- Accessibility considerations
- Performance optimization techniques

---

**Note**: This dashboard uses simulated data for demonstration purposes. In production use, replace the data generation functions with real survey data sources.

For questions or support, please open an issue in the repository. 
