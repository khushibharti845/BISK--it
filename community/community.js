const postsContainer = document.getElementById("posts");

// Example: Fetch posts from backend
async function loadPosts() {
  try {
    const res = await fetch("http://localhost:5000/api/posts"); // replace with your backend endpoint
    const data = await res.json();

    postsContainer.innerHTML = data.map(post => `
      <div class="post-card">
        <h3>${post.username}</h3>
        <p>${post.content}</p>
      </div>
    `).join('');
  } catch (err) {
    console.error(err);
    postsContainer.innerHTML = "<p>Failed to load community posts.</p>";
  }
}

// Call on page load
loadPosts();

// Optional: Join button click (example)
document.getElementById("joinBtn").addEventListener("click", () => {
  alert("Join feature coming soon!"); // you can later link this to a signup modal or forum
});
