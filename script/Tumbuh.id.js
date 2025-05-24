function showScreen(screenId) {
  // Hide all screens
  const screens = document.querySelectorAll(".screen");
  screens.forEach((screen) => {
    screen.classList.remove("active");
  });

  // Show selected screen
  document.getElementById(screenId).classList.add("active");

  // Update navigation active state
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.classList.remove("active");
  });

  // Highlight active navigation
  if (screenId === "dashboard") {
    navItems[0]?.classList.add("active");
  } else if (screenId === "monitoring") {
    navItems[1]?.classList.add("active");
  } else if (screenId === "watering") {
    navItems[2]?.classList.add("active");
  } else if (screenId === "notifications") {
    navItems[3]?.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const markAllReadButton = document.querySelector("btn-notification");

  if (
    markAllReadButton &&
    markAllReadButton.textContent.includes("Tandai Semua Sudah Dibaca")
  ) {
    markAllReadButton.addEventListener("click", function () {
      document.querySelectorAll(".notification-item").forEach((item) => {
        item.style.opacity = "0.6";
        item.style.borderLeft = "4px solid #ccc";
      });

      markAllReadButton.textContent = "✅ Semua Notifikasi Sudah Dibaca";
      markAllReadButton.disabled = true;
      markAllReadButton.style.backgroundColor = "#e0e0e0";
      markAllReadButton.style.cursor = "default";
    });
  }
});

// Toggle switch functionality
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("toggle-switch")) {
    e.target.classList.toggle("active");
  }
});

// Camera button functionality
document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("camera-button") ||
    e.target.closest(".camera-button")
  ) {
    const imagePreview = document.querySelector(".image-preview");
    if (imagePreview) {
      imagePreview.innerHTML = `
                        <div style="text-align: center; color: #4CAF50;">
                            <div style="font-size: 48px;">📷</div>
                            <p>Foto berhasil diambil!</p>
                            <small>Menganalisis gambar...</small>
                        </div>
                    `;

      // Simulate analysis
      setTimeout(() => {
        imagePreview.innerHTML = `
                            <div style="text-align: center; color: #4CAF50;">
                                <div style="font-size: 48px;">✅</div>
                                <p><strong>Analisis Selesai</strong></p>
                                <small>Tanaman terlihat sehat</small>
                            </div>
                        `;
      }, 2000);
    }
  }
});

// Add some interactive features
document.addEventListener("click", function (e) {
  // Action cards hover effect
  if (e.target.closest(".action-card")) {
    const card = e.target.closest(".action-card");
    card.style.transform = "scale(0.95)";
    setTimeout(() => {
      card.style.transform = "translateY(-2px)";
    }, 100);
  }

  // Notification mark as read
  if (e.target.closest(".notification-item")) {
    const notification = e.target.closest(".notification-item");
    notification.style.opacity = "0.7";
    notification.style.borderLeftColor = "#e0e0e0";
  }
});

// Weather widget animation
setInterval(() => {
  const tempDisplay = document.querySelector(".temp-display");
  if (
    tempDisplay &&
    document.getElementById("dashboard").classList.contains("active")
  ) {
    const currentTemp = parseInt(tempDisplay.textContent);
    const variation = Math.random() > 0.5 ? 1 : -1;
    const newTemp = currentTemp + (Math.random() > 0.8 ? variation : 0);
    tempDisplay.textContent = newTemp + "°C";
  }
}, 5000);

// Progress bar animation for harvest screen
document.addEventListener("click", function (e) {
  if (e.target.textContent === "Jadwal Panen") {
    setTimeout(() => {
      const progressBars = document.querySelectorAll(".progress-fill");
      progressBars.forEach((bar) => {
        const currentWidth = parseInt(bar.style.width);
        if (currentWidth < 100) {
          bar.style.width = currentWidth + Math.random() * 2 + "%";
        }
      });
    }, 500);
  }
});

// Sensor data simulation
function updateSensorData() {
  const sensorValues = document.querySelectorAll(".sensor-value");
  const sensors = [
    { element: sensorValues[0], min: 22, max: 28 },
    { element: sensorValues[1], min: 40, max: 80 },
    { element: sensorValues[2], min: 6.0, max: 7.5 },
    { element: sensorValues[3], min: 75, max: 95 },
  ];

  sensors.forEach((sensor, index) => {
    if (
      sensor.element &&
      document.getElementById("monitoring").classList.contains("active")
    ) {
      const currentValue = parseFloat(sensor.element.textContent);
      const variation = (Math.random() - 0.5) * 2;
      let newValue = currentValue + variation;

      newValue = Math.max(sensor.min, Math.min(sensor.max, newValue));

      if (index === 0) {
        sensor.element.textContent = newValue.toFixed(0) + "°C";
      } else if (index === 1) {
        sensor.element.textContent = newValue.toFixed(0) + "%";
        // Update warning status
        const card = sensor.element.closest(".sensor-card");
        const status = card.querySelector("small");
        if (newValue < 50) {
          sensor.element.className = "sensor-value soil-warning";
          status.textContent = "Perlu Siram";
        } else if (newValue > 75) {
          sensor.element.className = "sensor-value soil-good";
          status.textContent = "Optimal";
        }
      } else if (index === 2) {
        sensor.element.textContent = newValue.toFixed(1);
      } else {
        sensor.element.textContent = newValue.toFixed(0) + "%";
      }
    }
  });
}

setInterval(updateSensorData, 3000);

// Initialize app
document.addEventListener("DOMContentLoaded", function () {
  // Show login screen first
  showScreen("login");

  // Add some welcome animations
  setTimeout(() => {
    const logo = document.querySelector(".logo");
    if (logo) {
      logo.style.animation = "pulse 2s infinite";
    }
  }, 1000);
});

// Add CSS animation for logo
const style = document.createElement("style");
style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            .action-card:active {
                transform: scale(0.95) !important;
            }
            
            .btn:active {
                transform: scale(0.98);
            }
            
            .nav-item:active {
                transform: scale(0.95);
            }
            
            .notification-item:hover {
                background: #f8f9fa;
                cursor: pointer;
            }
            
            .schedule-item:hover {
                background: #f8f9fa;
            }
            
            .sensor-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            }
            
            .status-card:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            }
            
            .form-input:focus {
                transform: scale(1.02);
            }
            
            .camera-button:hover {
                background: #1976D2;
                transform: translateY(-2px);
            }
            
            .weather-widget:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            }
        `;
document.head.appendChild(style);
