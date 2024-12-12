# Project Overview
Dollarfar is a web-based financial application developed to provide users with various financial calculators to manage, visualize, and analyze their financial data. The platform offers seven key calculators, each designed to help users make informed decisions about their finances. These calculators include:

1. Compound Interest Rate Calculator
2. Net Worth Calculator
3. Budget Calculator
4. Comprehensive Retirement Income Calculator
5. Registered Retirement Savings Plan (RRSP) Calculator
6. Registered Retirement Income Fund (RRIF) Calculator
7. Cost of Living Calculator 

Each calculator is equipped with relevant graphical representations to enhance the user experience and provide visual insights into their financial data. The application is built using modern web technologies such as React, Redux, TypeScript, Vite, and TailwindCSS, ensuring optimal performance and a responsive user interface.

# Table of Contents
1. Project Setup
2. Technologies Used
3. Features
4. Running the Application
5. Building and Deployment

# Project Setup
This section outlines the steps to set up the Dollarfar project locally for development and testing.

## Prerequisites
Node.js (v16 or higher)<br>
npm or yarn (preferably npm)

## Clone the repository
git clone https://github.com/RetireHow/dollarfar<br/>
cd dollarfar

## Install dependencies
Run the following command to install the necessary dependencies:<br>
npm install

# Technologies Used
Dollarfar is built using modern JavaScript and TypeScript technologies. The core stack includes:

- **React:** A JavaScript library for building user interfaces.<br>
- **TypeScript:** A statically typed superset of JavaScript.<br>
- **Vite:** A fast development build tool and bundler for modern web projects.<br>
- **TailwindCSS:** A utility-first CSS framework for styling the application.<br>
- **Chart.js:** A JavaScript library used to create interactive and animated charts for the financial calculators.<br>
- **React-Redux:**  A state management library to manage the state of the application efficiently.
- **React Hook Form:** A library to manage forms and validation in React.<br>
- **Yup:** A JavaScript schema validation library used in conjunction with React Hook Form.<br>
- **ESLint:** A tool for identifying and fixing problems in JavaScript and TypeScript code.<br>

# Features
Dollarfar provides the following calculators, each equipped with user-friendly inputs and visualizations:

1. **Compound Interest Rate Calculator**<br>
Calculates the compound interest earned over a period of time based on principal, interest rate, and compounding frequency. Displays the results on a graph that shows the growth of the investment.

2. **Net Worth Calculator**<br>
Helps users calculate their overall financial health by summing assets and liabilities. Displays a pie chart representing the proportion of assets vs. liabilities.

3. **Budget Calculator**<br>
Assists users in tracking income and expenses and helps them budget effectively. Visualizes the data in bar charts, showing expenses vs. income.

4. **Comprehensive Retirement Income Calculator**<br>
Estimates retirement income based on current savings, investment growth, and other factors. The results are presented in a graph showing expected retirement income over time.

5. **RRSP Calculator**<br>
Estimates the potential growth of an individual's Registered Retirement Savings Plan (RRSP) based on contributions and investment returns. Results are displayed using interactive graphs.

6. **RRIF Calculator**<br>
Calculates required minimum withdrawals from a Registered Retirement Income Fund (RRIF) based on user inputs. The results are presented visually to track withdrawal amounts over time.

7. **Cost of Living Calculator**<br>
This calculator helps users compare the cost of living between two cities by showing the difference in expenses like housing, food, transportation, and utilities. It displays the data in a visual format to make comparisons easier. The user can input details for both cities and see the visual representation of the cost difference.

# Running the Application
## Development Environment
To run the application in the development environment, use:<br>
npm run dev<br>
This will start a local development server, typically accessible at http://localhost:5173. Any changes made to the code will automatically be reflected in the browser thanks to hot module replacement (HMR).

# Building and Deployment
To build the project for production, run:<br>
npm run build

This will generate an optimized production build in the dist directory. To serve the production build, use:<br>
npm run serve
