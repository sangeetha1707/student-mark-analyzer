let subjects = [];
let marks = [];
let chart;

// Load saved data from localStorage
window.onload = function() {
  const savedData = JSON.parse(localStorage.getItem("marksData"));
  if (savedData) {
    subjects = savedData.subjects;
    marks = savedData.marks;
    updateSummary();
    updateChart();
  }
};

function addMark() {
  const subject = document.getElementById("subject").value.trim();
  const mark = parseInt(document.getElementById("mark").value);

  if (!subject || isNaN(mark)) {
    alert("Please enter both subject name and mark!");
    return;
  }

  subjects.push(subject);
  marks.push(mark);

  // Save to localStorage
  localStorage.setItem("marksData", JSON.stringify({ subjects, marks }));

  // Update UI
  updateSummary();
  updateChart();

  document.getElementById("subject").value = "";
  document.getElementById("mark").value = "";
}

function updateSummary() {
  const total = marks.length;
  const average = total ? (marks.reduce((a, b) => a + b, 0) / total).toFixed(2) : 0;
  const highest = total ? Math.max(...marks) : 0;
  const lowest = total ? Math.min(...marks) : 0;

  document.getElementById("total").innerText = total;
  document.getElementById("average").innerText = average;
  document.getElementById("highest").innerText = highest;
  document.getElementById("lowest").innerText = lowest;
}

function updateChart() {
  if (chart) {
    chart.destroy();
  }

  chart = new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels: subjects,
      datasets: [{
        label: "Marks",
        data: marks,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }]
    },
    options: {
      responsive: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}
