console.log("%c HI", "color: firebrick");
const imgURL = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

function fetchRandomDogs() {
  fetch(imgURL)
    .then((res) => res.json())
    .then((json) => {
      addImg(json.message);
    });
}

function fetchAllDogs() {
  fetch(breedUrl)
    .then((res) => res.json())
    .then((json) => {
      const dogBreeds = Object.keys(json.message);
      const breedUL = document.querySelector("#dog-breeds");
      const filterDropDown = document.getElementById("breed-dropdown");

      addBreedToList(dogBreeds, breedUL);

      breedUL.addEventListener("click", (e) => (e.target.style.color = "red"));

      filterDropDown.addEventListener("change", (e) => {
        const filterBy = e.target.value;
        filterBreed(dogBreeds, breedUL, filterBy);
      });
    });
}

function addImg(dogs) {
  const dogBreedsList = document.querySelector("#dog-image-container");
  dogs.forEach((dog) => {
    const newImg = document.createElement("img");
    newImg.src = dog;
    dogBreedsList.append(newImg);
  });
}

function addBreedToList(breedList, breedUL) {
  breedList.forEach((breed) => {
    const newLI = document.createElement("li");
    newLI.append(breed);
    breedUL.append(newLI);
  });
}

function filterBreed(breeds, breedUL, filterBy) {
  breedUL.innerHTML = "";
  const newBreedList = breeds.filter((breed) => breed.startsWith(filterBy));
  addBreedToList(newBreedList, breedUL);
}

document.addEventListener("DOMContentLoaded", function () {
  fetchRandomDogs();
  fetchAllDogs();
});
