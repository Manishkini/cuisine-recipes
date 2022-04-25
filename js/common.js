const upsertFavourite = (id, meal, page) => {
  const favouriteIcon = document.getElementById(id);

  let existingMeals = [];
  if (localStorage.length) {
    existingMeals = JSON.parse(localStorage.getItem('favourite-meals'));
  }
  if (existingMeals.length) {
    const foundFavouriteMeal = existingMeals.find(
      (obj) => Number(obj.idMeal) === Number(id)
    );

    if (foundFavouriteMeal && foundFavouriteMeal.idMeal) {
      existingMeals = existingMeals.filter(
        (obj) => obj.idMeal !== foundFavouriteMeal.idMeal
      );
      localStorage.setItem('favourite-meals', JSON.stringify(existingMeals));
      favouriteIcon.className =
        page === 'details'
          ? 'favourite fa-regular fa-heart cursor-pointer'
          : 'favourite fa-regular fa-heart flex grow justify-center items-center text-lg md:text-xl lg:text-2xl cursor-pointer';
    } else {
      existingMeals.push(meal);
      localStorage.setItem('favourite-meals', JSON.stringify(existingMeals));
      favouriteIcon.className =
        page === 'details'
          ? 'favourite fa-solid fa-heart cursor-pointer'
          : 'favourite fa-solid fa-heart flex grow justify-center items-center text-lg md:text-xl lg:text-2xl cursor-pointer';
    }
  } else {
    existingMeals.push(meal);
    localStorage.setItem('favourite-meals', JSON.stringify(existingMeals));
    favouriteIcon.className =
      page === 'details'
        ? 'favourite fa-solid fa-heart cursor-pointer'
        : 'favourite fa-solid fa-heart flex grow justify-center items-center text-lg md:text-xl lg:text-2xl cursor-pointer';
  }
};

const isFavourite = (id, page) => {
  const favouriteIcon = document.getElementById(id);

  let existingMeals = [];
  if (localStorage.length) {
    existingMeals = JSON.parse(localStorage.getItem('favourite-meals'));
  }
  if (existingMeals.length) {
    const foundFavouriteMeal = existingMeals.find(
      (obj) => Number(obj.idMeal) === Number(id)
    );

    if (foundFavouriteMeal && foundFavouriteMeal.idMeal) {
      favouriteIcon.className =
        page === 'details'
          ? 'favourite fa-solid fa-heart cursor-pointer'
          : 'favourite fa-solid fa-heart flex grow justify-center items-center text-lg md:text-xl lg:text-2xl cursor-pointer';
    } else {
      favouriteIcon.className =
        page === 'details'
          ? 'favourite fa-regular fa-heart cursor-pointer'
          : 'favourite fa-regular fa-heart flex grow justify-center items-center text-lg md:text-xl lg:text-2xl cursor-pointer';
    }
  }
};
