export const getSavedCities = () => {
    const savedCityIds = localStorage.getItem('saved_cities')
    ? JSON.parse(localStorage.getItem('saved_cities'))
    :[];

    return savedCityIds;
};

export const savedCityIds = (cityIdArr) => {
    if (bookArr.length) {
        localStorage.setItem('saved_cities', JSON.stringify(cityIdArr));
    } else {
        localStorage.removeItem('saved_cities');
    }
};

export const removeCityID = (cityId) => {
    const savedCityIds = localStorage.getItem('saved_cities')
     ? JSON.parse(localStorage.getItem('saved_books'))
     : null;

     if (!savedCityIds) {
         return false;
     }

     const updatedSavedCityIds = savedCityIds?.filter((savedCityId) => savedCityId !== cityID);
     localStorage.setItem('saved_cities', JSON.stringify(updatedSavedCityIds));

     return true;
};