import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }`;

    export const ADD_USER = gql`
        mutation addUser($username: String!, $email: String!, $password: String!) {
            addUser(username: $username, email: $email. password: $password) {
                token
                user{
                    _id
                    username
                }
            }
        }`;

    export const SAVE_CITY = gql`
        mutation saveCity($cityData: CityInput!) {
            saveCity(cityData: $cityData) {
                _id
                username
                email
                savedCities {
                    cityId
                    cityName
                }
            }
        }`;

    export const REMOVE_CITY = gql`
        mutation removeCity($cityId: ID!) {
            removeCity(cityId: $cityId) {
                _id
                username
                email
                savedCities {
                    cityId
                    cityName
                }
            }
        }`;