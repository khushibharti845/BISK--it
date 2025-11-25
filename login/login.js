// Switch between login and signup boxes
function showSignup() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "block";
}
function showLogin() {
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

// LOGIN
const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Error logging in.");
  }
});

// SIGNUP
const signupBtn = document.getElementById("signupBtn");
signupBtn.addEventListener("click", async () => {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("signupConfirmPassword").value;

  if(password !== confirmPassword){
    alert("Passwords do not match!");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      alert("Signup successful!");
      window.location.href = "index.html";
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Error signing up.");
  }
});
