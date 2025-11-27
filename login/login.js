// Switch between login and signup boxes
function showSignup() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "block";
}
function showLogin() {
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

// ---------------------------
// LOGIN (BISK-IT BACKEND) 
// ---------------------------
const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", async () => {

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    console.log("LOGIN RESPONSE:", data);

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");

      // redirect to recipe page
     setTimeout(() => {
  window.location.href = "../recipe/recipe.html";
}, 300);

    } else {
      alert(data.error || "Invalid login!");
    }
  } catch (err) {
    console.error(err);
    alert("Error logging in.");
  }
});

// ---------------------------
// SIGNUP (BISK-IT BACKEND)
// ---------------------------
const signupBtn = document.getElementById("signupBtn");
signupBtn.addEventListener("click", async () => {

  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("signupConfirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const res = await fetch("http://localhost:4000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    console.log("SIGNUP RESPONSE:", data);

    if (res.ok && data.id) {
      alert("Signup successful! You can now login.");
      showLogin();
    } else {
      alert(data.error || "Signup failed!");
    }
  } catch (err) {
    console.error(err);
    alert("Error signing up.");
  }
});
