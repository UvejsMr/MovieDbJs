document.addEventListener("DOMContentLoaded", () => {
  displayUserInfo();
});

const displayUserInfo = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Check if the user is logged in
  if (loggedInUser) {
    document.getElementById("userInfo").style.display = "block";
    document.getElementById("loginButton").style.display = "none";
    document.getElementById("signupButton").style.display = "none";
    document.getElementById("logoutButton").style.display = "block";
    document.getElementById(
      "userInfoText"
    ).innerText = `Logged in as: ${loggedInUser.email}`;
  } else {
    document.getElementById("userInfo").style.display = "none";
    document.getElementById("loginButton").style.display = "block";
    document.getElementById("signupButton").style.display = "block";
    document.getElementById("logoutButton").style.display = "none";
  }
};

window.onload = () => {
  displayUserInfo();
};

// Login function
const login = (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const users = [
    { email: "admin@example.com", password: "admin123", role: "admin" },
    { email: "user@example.com", password: "user123", role: "user" },
  ];

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    const expirationTime = new Date().getTime() + 30 * 60 * 1000; // 30 minutes
    const loggedInUser = { ...user, expiresAt: expirationTime };
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    alert("Login successful!");
    window.location.href = user.role === "admin" ? "admin.html" : "index.html";
  } else {
    alert("Invalid email or password. Please try again.");
  }
};

// Logout function
const logout = () => {
  localStorage.removeItem("loggedInUser");
  alert("Logged out successfully.");
  window.location.href = "index.html";
};

// Check if user is logged in and handle session expiration
const checkAuthentication = (requiredRole = null) => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // If no user is logged in, redirect to login page
  if (!loggedInUser) {
    alert("You must be logged in to access this page.");
    window.location.href = "login.html";
    return;
  }

  // Check for session expiry
  if (loggedInUser.expiresAt < new Date().getTime()) {
    alert("Your session has expired. Please log in again.");
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
    return;
  }

  // Check if the user has the required role
  if (requiredRole && loggedInUser.role !== requiredRole) {
    alert("You do not have access to this page.");
    window.location.href = "index.html"; // Or any other page for unauthorized access
    return;
  }
};

// Event listeners for login form
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", login);
}
