const getMealID = async () => {
  const params = new URLSearchParams(location.search);
  const mealId = params.get('id');
  if (mealId) {
    const response = await fetchData(
      'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealId
    );
    setRecipeDetailsIntoDiv(response.meals[0]);
  } else {
  }
};

const setRecipeDetailsIntoDiv = (meal) => {
  const recipeDetailsDiv = document.getElementById('recipe-details');
  recipeDetailsDiv.className =
    'flex flex-row flex-wrap md:flex-nowrap lg:flex-nowrap justify-between gap-4 m-4';

  // Recipe Image - start
  const recipeImg = document.createElement('img');
  recipeImg.setAttribute('src', meal.strMealThumb);
  recipeImg.setAttribute(
    'class',
    'w-full md:w-1/4 lg:w-1/4 p-4 h-72 bg-slate-100'
  );
  // Recipe Image - end

  // recipe info - start
  const recipeInfo = document.createElement('div');
  recipeInfo.setAttribute(
    'class',
    'flex flex-col justify-start w-full md:w-3/4 lg:w-3/4 p-4 gap-2 bg-slate-100'
  );

  // recipe name and favourite - start
  const recipeTitleDiv = document.createElement('div');
  recipeTitleDiv.setAttribute(
    'class',
    'flex flex-row justify-between items-center'
  );

  // recipe title - Start
  const recipeTitle = document.createElement('strong');
  recipeTitle.innerText = meal.strMeal;
  recipeTitle.setAttribute('class', 'text-xl md:text-2xl lg:text-3xl');
  // recipe title - End

  // recipe favourite icon - start
  const recipeFavIcon = document.createElement('i');
  recipeFavIcon.setAttribute(
    'class',
    'favourite fa-regular fa-heart cursor-pointer'
  );
  recipeFavIcon.setAttribute('id', meal.idMeal);
  recipeFavIcon.addEventListener('click', () =>
    upsertFavourite(meal.idMeal, meal, 'details')
  );
  // recipe favourite icon - end
  recipeTitleDiv.appendChild(recipeTitle);
  recipeTitleDiv.appendChild(recipeFavIcon);
  // recipe name and favourite - end

  // recipe location div - START
  const recipeLocationDiv = document.createElement('div');
  recipeLocationDiv.setAttribute(
    'class',
    'flex flex-row justify-start items-center gap-4'
  );

  // Meal location icon
  const locationIcon = document.createElement('i');
  locationIcon.setAttribute(
    'class',
    'fa-solid fa-map-pin text-red-600 text-sm md:text-base lg:text-lg'
  );

  // Meal location name
  const recipeLocation = document.createElement('span');
  recipeLocation.innerText = meal.strArea;
  recipeLocation.setAttribute('class', 'text-sm md:text-base lg:text-lg');

  recipeLocationDiv.appendChild(locationIcon);
  recipeLocationDiv.appendChild(recipeLocation);
  // recipe location div - END

  // recipe tags - START
  const recipeTagsDiv = document.createElement('div');
  recipeTagsDiv.setAttribute(
    'class',
    'recipe-tags flex flex-row justify-start gap-2'
  );

  // id tags avaliable then only tags div needs to show
  if (meal.strTags && meal.strTags.length) {
    // Meal Tag icon - start
    const mealTagIcon = document.createElement('i');
    mealTagIcon.setAttribute(
      'class',
      'fa-solid fa-tags text-sm md:text-base lg:text-lg'
    );
    recipeTagsDiv.appendChild(mealTagIcon);
    // Meal Tag icon - end

    for (const mealTag of meal.strTags.split(',')) {
      // single Tag
      const singleTag = document.createElement('div');
      singleTag.innerText = mealTag;
      singleTag.setAttribute(
        'class',
        'bg-clip-content border-2 border-slate-600 border-dashed text-slate-600 p-0.5 text-sm md:text-base lg:text-lg'
      );
      recipeTagsDiv.appendChild(singleTag);
    }
  }
  // recipe tags - END

  // recipe youtube video - start
  let iframeDiv = null;
  if (meal.strYoutube) {
    iframeDiv = document.createElement('iframe');
    iframeDiv.setAttribute(
      'class',
      'w-5/6 h-40 md:h-64 lg:h-96 place-self-center my-8'
    );
    iframeDiv.setAttribute(
      'src',
      'https://www.youtube.com/embed/' + meal.strYoutube.split('v=')[1]
    );
    // recipe youtube video - end
  }

  // recipe description - start
  const recipeDescription = document.createElement('p');
  recipeDescription.innerText = meal.strInstructions;
  recipeDescription.setAttribute('class', 'text-sm md:text-base lg:text-lg');
  // recipe description - end

  recipeInfo.appendChild(recipeTitleDiv);
  recipeInfo.appendChild(recipeLocationDiv);
  recipeInfo.appendChild(recipeTagsDiv);
  if (iframeDiv) recipeInfo.appendChild(iframeDiv);
  recipeInfo.appendChild(recipeDescription);

  // recipe info - end
  recipeDetailsDiv.appendChild(recipeImg);
  recipeDetailsDiv.appendChild(recipeInfo);

  // Check wheather the current meal is already favourited or not
  isFavourite(meal.idMeal, 'details');
};
