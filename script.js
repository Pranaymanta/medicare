// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")

      // Animate hamburger
      const spans = hamburger.querySelectorAll("span")
      if (navMenu.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu) {
        navMenu.classList.remove("active")
        // Reset hamburger animation
        const spans = hamburger.querySelectorAll("span")
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  })

  // Header scroll effect
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header")
    if (header) {
      if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.98)"
        header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
      } else {
        header.style.background = "rgba(255, 255, 255, 0.95)"
        header.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)"
      }
    }
  })

  // Form submissions
  const appointmentForm = document.getElementById("appointmentForm")
  const contactForm = document.getElementById("contactForm")
  const loginForm = document.getElementById("loginForm")
  const registerForm = document.getElementById("registerForm")

  if (appointmentForm) {
    appointmentForm.addEventListener("submit", (e) => {
      e.preventDefault()
      showAlert("Appointment request submitted successfully! We will contact you soon.", "success")
      appointmentForm.reset()
    })
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      showAlert("Thank you for your message! We will get back to you soon.", "success")
      contactForm.reset()
    })
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      
      const userRole = document.getElementById("userRole").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      
      // Demo credentials validation
      const validCredentials = {
        admin: { email: "admin@medicare.com", password: "admin123" },
        doctor: { email: "doctor@medicare.com", password: "doctor123" },
        user: { email: "user@medicare.com", password: "user123" }
      }
      
      if (!userRole) {
        showAlert("Please select a role!", "error")
        return
      }
      
      const roleCredentials = validCredentials[userRole]
      if (email === roleCredentials.email && password === roleCredentials.password) {
        // Store user session
        localStorage.setItem("userRole", userRole)
        localStorage.setItem("userEmail", email)
        
        showAlert("Login successful! Redirecting...", "success")
        
        setTimeout(() => {
          // Redirect based on role
          switch(userRole) {
            case "admin":
              window.location.href = "admin-dashboard.html"
              break
            case "doctor":
              window.location.href = "doctor-dashboard.html"
              break
            case "user":
              window.location.href = "user-dashboard.html"
              break
            default:
              window.location.href = "index.html"
          }
        }, 2000)
      } else {
        showAlert("Invalid credentials! Please check your email and password.", "error")
      }
    })
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirmPassword").value

      if (password !== confirmPassword) {
        showAlert("Passwords do not match!", "error")
        return
      }

      showAlert("Account created successfully! Redirecting to login...", "success")
      setTimeout(() => {
        window.location.href = "login.html"
      }, 2000)
    })
  }

  // Set minimum date for appointment booking
  const appointmentDate = document.getElementById("appointmentDate")
  if (appointmentDate) {
    const today = new Date().toISOString().split("T")[0]
    appointmentDate.min = today
  }
})

// Alert system
function showAlert(message, type = "info") {
  // Remove existing alerts
  const existingAlerts = document.querySelectorAll(".alert-toast")
  existingAlerts.forEach((alert) => alert.remove())

  const alert = document.createElement("div")
  alert.className = `alert-toast alert-${type}`
  alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getAlertColor(type)};
        color: ${getAlertTextColor(type)};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `

  const icon = getAlertIcon(type)
  alert.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="
            background: none;
            border: none;
            color: inherit;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: auto;
        ">&times;</button>
    `

  document.body.appendChild(alert)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alert.parentElement) {
      alert.style.animation = "slideOutRight 0.3s ease-out"
      setTimeout(() => alert.remove(), 300)
    }
  }, 5000)
}

function getAlertColor(type) {
  const colors = {
    success: "#d1fae5",
    error: "#fee2e2",
    warning: "#fef3c7",
    info: "#dbeafe",
  }
  return colors[type] || colors.info
}

function getAlertTextColor(type) {
  const colors = {
    success: "#065f46",
    error: "#991b1b",
    warning: "#92400e",
    info: "#1e40af",
  }
  return colors[type] || colors.info
}

function getAlertIcon(type) {
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  }
  return icons[type] || icons.info
}

// Add CSS for animations
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)
