# Leave Management Pivot Table

This project is a simple web-based Leave Management Pivot Table that visualizes employee leave data by department. It allows users to toggle employee-specific leave details within each department.

## Features
- Displays total leave taken by each department.
- Allows toggling employee-specific leave details within a department.
- Uses JavaScript to dynamically generate the table.
- Styled with a simple CSS table format.

## Files
- `index.html` - The main HTML structure.
- `script.js` - JavaScript logic for processing and displaying leave data.
- `style.css` - CSS for styling the table.
- `employees.js` - Contains employee data.
- `leaves.js` - Contains leave records.


## How It Works
1. The system reads employee data from `employees.js` and leave records from `leaves.js`.
2. `script.js` processes the data and generates a pivot table grouping leave counts by department.
3. Users can toggle to view employee-specific leave records.
