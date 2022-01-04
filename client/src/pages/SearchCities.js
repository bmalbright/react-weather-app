import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { SAVE_CITY } from "../utils/mutations";
import { saveCityIds, getSavedCityIds } from "../utils/localStorage";

import Auth from "../utils/auth";

const SearchCities = () => {
  // creates a state for holding returned weather API data
  const [searchedCities, setSearchedCities] = useState([]);
  // creates a state for search field data
  const [searchInput, setSearchInput] = useState("");

  // creates a state to hold saved cityId values
  const [savedCityIds, setSavedCityIds] = useState(getSavedCityIds());

  const [saveCity, { error }] = useMutation(SAVE_CITY);

  // set up useEffect hook to save 'savedCityIds' list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => savedCityIds(savedCityIds);
  });

  // creates a method to search for cities and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=imperial`
      );

      if (!response.ok) {
        throw new Error("something went terribly wrong!");
      }

      const { items } = await response.json();

      const cityData = items.map((city) => ({
        cityId: city.id,
        currentDate: city.main.date,
        tempTag: city.main.humidity,
        humidityTag: city.main.humidity,
        windSpeedTag: city.main.wind_speed,
      }));

      setSearchedCities(cityData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // function to handle saving city to the database
  const handleSavedCity = async (cityId) => {
    // find the city in 'searchedBooks' state by matching id
    const cityToSave = searchedCities.find((city) => city.cityId === cityId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveCity({
        variables: { cityData: { ...cityToSave } },
      });
      console.log(savedCityIds);
      setSavedCityIds([...savedCityIds, cityToSave.cityId]);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1> Search for your favorite cities</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a city"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedCities.length
            ? `Viewing ${searchedCities.length} results`
            : "Search for a city to begin"}
        </h2>
        <CardColumns>
          {searchedCities.map((city) => {
            return (
              <Card key={city.cityId} border="dark">
                {city.image ? (
                  <Card.image
                    src={city.image}
                    alt={`view of ${city.name}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{city.name}</Card.Title>
                  <p className="small"> City</p>
                  <Card.Text>{city.temp}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedCityIds?.some(
                        (savedId) => savedId === city.cityId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveCity(city.cityId)}
                    >
                        {savedCityIds?.some((savedId) => savedId === city.cityId)
                            ? 'City already saved'
                            : 'Save this city'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchCities