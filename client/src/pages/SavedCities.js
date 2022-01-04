import React from 'react';
import {
    Jumbotron,
    Container,
    CardColumns,
    Card,
    Button,
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_CITY } from '../utils/mutations';
import { removeCityID } from '../utils/localStorage';

import Auth from '../utils/auth';

Const SavedCities = () => {
    const {loading, data } = useQuery(QUERY_ME);
    const [removeCity, { error }] = useMutation(REMOVE_CITY);

    const userData = data?.me || {};

    // creates function that accepts city's mondoDB _id value as param and deletes the city from the database
    const handleDeleteCity = async (cityId) => {
        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await removeCity({
                variables: { cityId },
            });

            // upon success, removes a city id from local storage
            removeCityID(cityId);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
        <Jumbotron fluid className="text-light bg-dark">
            <Container>
                <h1>Viewing {userData.username}'s cities</h1>
            </Container>
        </Jumbotron>
        <Container>
            <h2>
                {userData.savedCities?.length
                    ? `Viewing ${userData.savedCities.length} saved ${
                    userData.savedCities.length === 1 ? 'city' : 'cities'
                }:`
                : 'You have no saved cities'}
            </h2>
            <CardColumns>
                {userData.savedCities?.map((city) => {
                    return (
                        <Card key={city.cityId} border="dark">
                            {city.image ? (
                                <Card.Img
                                src={city.image}
                                alt={`Image of the ${city.name}`}
                                variant="top"
                                />
                            ) : null}
                            <Card.Body>
                                <Card.Title> {city.name}</Card.Title>
                                <p className="small"> Cities: {city.names}</p>
                                <Card.Text>{city.forcast}</Card.Text>
                                <Button
                                    className="btn-block btn-danger"
                                    onClick={() => handleDeleteCity(city.cityId)}
                                    >
                                        Delete this city
                                    </Button>
                            </Card.Body>
                        </Card>
                    );
                })}
            </CardColumns>
        </Container>
        </>
    );
};

export default SavedCities;