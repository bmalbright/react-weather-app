// this is to decode a token and get the user's information out of it
import decode from "jwt-decode";

// creates a new class to personalize for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // check to see if user is logged in
  loggedIn() {
    // checks to see if there is a saved token and if it's current
    const token = this.getToken();
    return !!token && this.isTokenExpired(token);
  }

  // checks to see if the token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
      // retrieves the user token from local storage
      return localStorage.getItem('id_token');
  }

  login(idToken) {
      // saves the use token to local storage
      localStorage.setItem('id_token', idToken);
      window.location.assign('/');
  }

  logout() {
      // clears the user token and profile data from local storage
      localStorage.removeItem('it_token');
      // this will reload the page and reset the state of the application
      window.location.assign('/');
  }
}

export default new AuthService();