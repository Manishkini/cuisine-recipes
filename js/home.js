const loadSearchBox = () => {
  // hide recipe list div
  document.getElementById('recipe-list').style.display = 'none';

  const searchBoxDiv = document.getElementById('search-box');

  const outterDiv = document.createElement('div');
  outterDiv.setAttribute(
    'class',
    'search-div flex justify-center items-center'
  );
  outterDiv.setAttribute('id', 'search-div');

  const innerDiv = document.createElement('div');
  innerDiv.setAttribute(
    'class',
    'search-box flex w-5/6 place-content-center md:w-3/6 lg:2/6'
  );

  const inputElement = document.createElement('input');
  inputElement.setAttribute('class', 'search');
  inputElement.setAttribute('placeholder', 'Please Search The Recipes');
  inputElement.setAttribute('type', 'text');
  inputElement.addEventListener('keyup', (event) => {
    searchTheRecipes(event);
  });

  innerDiv.appendChild(inputElement);
  outterDiv.appendChild(innerDiv);
  searchBoxDiv.appendChild(outterDiv);
};

const searchTheRecipes = async (event) => {
  const outterDiv = document.getElementById('search-div');
  if (event.target.value && event.target.value != '') {
    document.getElementById('recipe-list').style.display = 'block';
    const response = await fetchData(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=' +
        event.target.value.trim()
    );
    setMealsIntoDiv(response.meals);
    outterDiv.className = 'typed-search-div flex justify-center items-center';
  } else {
    document.getElementById('recipe-list').style.display = 'none';
    outterDiv.className = 'search-div flex justify-center items-center';
  }
};

const setMealsIntoDiv = (meals) => {
  const receipeListDiv = document.getElementById('recipe-list');
  if (receipeListDiv.firstElementChild) {
    receipeListDiv.removeChild(receipeListDiv.firstElementChild);
  }

  if (meals && meals.length) {
    const recipes = document.createElement('div');
    recipes.setAttribute(
      'class',
      'mx-[20px] md:mx-[30px] ld:mx-[50px] grid grid-cols-1 lg:grid-cols-2 gap-2'
    );

    for (const meal of meals) {
      //   MEAL SINGLE RECIPE DIV- START
      const singleRecipes = document.createElement('div');
      singleRecipes.setAttribute(
        'class',
        'single-recipe flex flex-row justify-between w-full min-h-[96px] gap-2 p-2 md:h-30 md:gap-4 md:p-3 lg:h-40 lg:gap-6 lg:p-4 bg-gradient-to-l from-indigo-500'
      );

      // MEAL IMAGE - START
      const mealImg = document.createElement('img');
      mealImg.setAttribute('src', meal.strMealThumb);
      mealImg.setAttribute('alt', meal.strMeal);
      mealImg.setAttribute(
        'class',
        'cursor-pointer max-w-[60px] md:max-w-[100px] lg:max-w-[160px]'
      );
      mealImg.addEventListener(
        'click',
        () =>
          (window.location.href =
            '/cuisine-recipes/recipe-detail.html?id=' + meal.idMeal)
      );
      // MEAL IMAGE - END

      // MEAL INFO DIV - START
      const mealInfoDiv = document.createElement('div');
      mealInfoDiv.setAttribute(
        'class',
        'recipe-info flex flex-col place-content-center grow-[2] gap-2 cursor-pointer'
      );
      mealInfoDiv.addEventListener(
        'click',
        () =>
          (window.location.href =
            '/cuisine-recipes/recipe-detail.html?id=' + meal.idMeal)
      );

      // MEAL NAME - START
      const strongDiv = document.createElement('strong');
      strongDiv.innerText = meal.strMeal;
      strongDiv.setAttribute('class', 'text-base md:text-lg lg:text-xl');
      // MEAL NAME - END

      // MEAL LOCATION DIV - START
      const mealLocationDiv = document.createElement('div');
      mealLocationDiv.setAttribute(
        'class',
        'recipe-location flex flex-row justify-start gap-2'
      );

      // Meal location icon
      const locationIcon = document.createElement('i');
      locationIcon.setAttribute(
        'class',
        'fa-solid fa-map-pin text-sm md:text-base lg:text-lg text-red-600'
      );

      // Meal location name
      const mealLocation = document.createElement('span');
      mealLocation.innerText = meal.strArea;
      mealLocation.setAttribute('class', 'text-sm md:text-base lg:text-lg');

      mealLocationDiv.appendChild(locationIcon);
      mealLocationDiv.appendChild(mealLocation);
      // MEAL LOCATION DIV - END

      // MEAL TAGS DIV - START
      const mealTagsDiv = document.createElement('div');
      mealTagsDiv.setAttribute(
        'class',
        'recipe-tags flex flex-row flex-wrap justify-start gap-2'
      );

      // id tags avaliable then only tags div needs to show
      if (meal.strTags && meal.strTags.length) {
        // Meal Tag icon - start
        const mealTagIcon = document.createElement('i');
        mealTagIcon.setAttribute(
          'class',
          'fa-solid fa-tags text-sm md:text-base lg:text-lg'
        );
        mealTagsDiv.appendChild(mealTagIcon);
        // Meal Tag icon - end

        for (const mealTag of meal.strTags.split(',')) {
          // single Tag
          const singleTag = document.createElement('div');
          singleTag.innerText = mealTag;
          singleTag.setAttribute(
            'class',
            'bg-clip-content border-2 border-slate-600 border-dotted text-slate-600 text-sm md:text-base lg:text-lg md:p-0.5 lg:p-0.5'
          );
          mealTagsDiv.appendChild(singleTag);
        }
      }
      // MEAL TAGS DIV - END

      mealInfoDiv.appendChild(strongDiv);
      mealInfoDiv.appendChild(mealLocationDiv);
      mealInfoDiv.appendChild(mealTagsDiv);
      // MEAL INFO DIV - END

      // MEAL FAVOURITE ICON - START
      const favouriteIcon = document.createElement('i');
      favouriteIcon.setAttribute(
        'class',
        'favourite fa-regular fa-heart flex grow justify-center items-center text-lg md:text-xl lg:text-2xl cursor-pointer'
      );
      favouriteIcon.setAttribute('id', meal.idMeal);
      favouriteIcon.addEventListener('click', () =>
        upsertFavourite(meal.idMeal, meal, 'home')
      );
      // MEAL FAVOURITE ICON - END

      singleRecipes.appendChild(mealImg);
      singleRecipes.appendChild(mealInfoDiv);
      singleRecipes.appendChild(favouriteIcon);
      // MEAL SINGLE RECIPE DIV- START

      // append single recipe into the outter grid div
      recipes.appendChild(singleRecipes);
    }

    // append recipes to the recipe list div
    receipeListDiv.appendChild(recipes);
    for (const meal of meals) {
      // Check wheather the current meal is already favourited or not
      isFavourite(meal.idMeal, 'home');
    }
  } else {
    const noRecipeFound = document.createElement('p');
    noRecipeFound.innerText = "No Recipe's Found";
    noRecipeFound.setAttribute(
      'class',
      'text-center text-lg md:text-xl md:text-2xl'
    );
    receipeListDiv.appendChild(noRecipeFound);
  }
};
