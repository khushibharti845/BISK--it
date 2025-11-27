document.getElementById("uploadForm").addEventListener("submit", async (e) => {

  e.preventdefault();
 const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const ingredients = document.getElementById("ingredients").value;
  const steps = document.getElementById("instructions").value;
  const imageUrl = document.getElementById("imageUrl").value;
 const token = localStorage.getItem("token");
 if (!token) {
    alert("Please login first!");
    window.location.href = "../login/login.html";
    return;
  }
 try {
    const res = await fetch("http://localhost:4000/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        title,
        description,
        ingredients,
        steps,
        image: imageUrl  
        // upload field
      })
    });
 const data = await res.json();
    if (res.ok && data.id) {
      alert("Recipe uploaded successfully!");
      window.location.href = "../recipe/recipe.html";
    } else {
      alert(data.error || "Failed to upload recipe.");
    }
  } catch (err) {
    console.error(err);
    alert("Error uploading recipe.");
  }
});
