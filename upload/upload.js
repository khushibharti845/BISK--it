const uploadForm = document.getElementById("uploadForm");

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const cuisine = document.getElementById("cuisine").value;
  const ingredients = document.getElementById("ingredients").value;
  const instructions = document.getElementById("instructions").value;
  const imageFile = document.getElementById("image").files[0];

  const formData = new FormData();
  formData.append("title", title);
  formData.append("cuisine", cuisine);
  formData.append("ingredients", ingredients);
  formData.append("instructions", instructions);
  if(imageFile) formData.append("image", imageFile);

  try {
    const token = localStorage.getItem("token"); // If using authentication
    const res = await fetch("http://localhost:5000/api/recipes", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}` // optional
      },
      body: formData
    });
    const data = await res.json();
    if(res.ok){
      alert("Recipe uploaded successfully!");
      uploadForm.reset();
    } else {
      alert(data.message || "Failed to upload recipe.");
    }
  } catch(err){
    console.error(err);
    alert("Error uploading recipe.");
  }
});
