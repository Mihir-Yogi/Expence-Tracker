let expenseChartInstance = null;

const loadChart = () => {

    const userData = localStorage.getItem("isLoggedIn") ? JSON.parse(localStorage.getItem("currentUser")) : JSON.parse(sessionStorage.getItem("currentUser"))
    
    const categoryTotals = {}
if (userData.expens && Array.isArray(userData.expens)) {
    userData.expens.forEach(exp => {
      const category = exp.category
      const amount = parseFloat(exp.amount)
    
      if (categoryTotals[category]) {
        categoryTotals[category] += amount
      } else {
        categoryTotals[category] = amount
      }
    })
    
    const labels = Object.keys(categoryTotals)      
    const data = Object.values(categoryTotals)       
    const ctx = document.getElementById('expenseChart');
    if (expenseChartInstance) {
        expenseChartInstance.destroy();
    }

    expenseChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Expenses by Category',
          data: data,
          backgroundColor: [
              '#6366F1', // Indigo
              '#10B981', // Emerald
              '#F59E0B', // Amber
              '#F43F5E', // Rose
              '#38BDF8', // Sky
              '#8B5CF6', // Violet
              '#64748B'  // Slate
            ],
            borderColor: document.body.classList.contains("dark-mode") ? '#F9FAFB' : '#5b6885',
            borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `₹${context.raw.toLocaleString('en-IN')}`
              }
            }
          }
        },
        scales: {
            x: {
              ticks: {
                color: document.body.classList.contains("dark-mode") ? '#D1D5DB' : '#374151' // light gray in dark mode
              },
              grid: {
                color: document.body.classList.contains("dark-mode") ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: document.body.classList.contains("dark-mode") ? '#D1D5DB' : '#374151',
                callback: function (value) {
                  return `₹${value.toLocaleString('en-IN')}`;
                }
              },
              grid: {
                color: document.body.classList.contains("dark-mode") ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
              }
            }
          }
        }
    });
    }
}
