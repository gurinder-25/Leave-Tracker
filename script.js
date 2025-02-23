function generatePivotTable(data) {
    let departmentMap = {};

    for (let key in data.records) {
        let record = data.records[key];
        let emp = record.Employee;
        if (!employeeData[emp]) continue;
        let depts = employeeData[emp].split(",");
        let totalLeave = 0;

        for (let day of Object.values(record.Days)) {
            totalLeave += parseFloat(day.LeaveCount) || 0;
        }

        depts.forEach(dept => {
            if (!departmentMap[dept]) {
                departmentMap[dept] = { total: 0, employees: {} };
            }
            departmentMap[dept].total += totalLeave;
            departmentMap[dept].employees[emp] = (departmentMap[dept].employees[emp] || 0) + totalLeave;
        });
    }

    let tableBody = document.getElementById("leaveTableBody");
    tableBody.innerHTML = "";

    for (let dept in departmentMap) {
        let employees = departmentMap[dept].employees;
        let row = document.createElement("tr");

        let deptCell = document.createElement("td");
        deptCell.textContent = dept;
        row.appendChild(deptCell);

        let totalDeptCell = document.createElement("td");
        totalDeptCell.textContent = departmentMap[dept].total;
        row.appendChild(totalDeptCell);

        let toggleButton = document.createElement("button");
        toggleButton.textContent = "Show Employees";
        toggleButton.onclick = function () {
            let employeeRows = document.querySelectorAll(".employees-" + dept.replace(/\s+/g, '-'));
            employeeRows.forEach(row => row.classList.toggle("hidden"));
            toggleButton.textContent = toggleButton.textContent === "Show Employees" ? "Hide Employees" : "Show Employees";
        };

        let buttonCell = document.createElement("td");
        buttonCell.appendChild(toggleButton);
        row.appendChild(buttonCell);

        tableBody.appendChild(row);

        for (let emp in employees) {
            let empRow = document.createElement("tr");
            empRow.classList.add("hidden", "employees-" + dept.replace(/\s+/g, '-'));

            let empCell = document.createElement("td");
            empCell.textContent = emp;
            empCell.colSpan = 2;
            empRow.appendChild(empCell);

            let leaveCell = document.createElement("td");
            leaveCell.textContent = employees[emp];
            empRow.appendChild(leaveCell);

            tableBody.appendChild(empRow);
        }
    }
}

window.onload = function () {
    if (typeof leavesData !== "undefined") {
        generatePivotTable(leavesData);
    } else {
        console.error("Error loading leave data.");
    }
};
