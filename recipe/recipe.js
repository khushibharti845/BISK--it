const recipes = document.querySelectorAll('.recipe-card');
const favPanel = document.querySelector('.favorites-panel');
const favList = document.querySelector('.fav-list');

function toggleFavorites() {
  favPanel.style.display = favPanel.style.display === 'block' ? 'none' : 'block';
}

recipes.forEach(recipe => {
  recipe.addEventListener('click', () => {
    const name = recipe.dataset.name;
    if(!favList.innerHTML.includes(name)) {
      const div = document.createElement('div');
      div.textContent = name;
      favList.appendChild(div);
    }
  });
});

function searchRecipe() {
  const input = document.getElementById('search').value.toLowerCase();
  recipes.forEach(recipe => {
    const name = recipe.dataset.name.toLowerCase();
    recipe.style.display = name.includes(input) ? 'flex' : 'none';
  });
}

function filterCuisine(checkbox) {
  const cuisine = checkbox.value;
  recipes.forEach(recipe => {
    if (checkbox.checked) {
      recipe.style.display = recipe.dataset.cuisine === cuisine ? 'flex' : 'none';
    } else {
      recipe.style.display = 'flex';
    }
  });
}
