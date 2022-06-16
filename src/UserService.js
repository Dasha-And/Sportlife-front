import axios from "axios";

// const API_BASE_URL = "https://sport-life.herokuapp.com"
export const API_BASE_URL = "http://localhost:8080"
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const USER_PASSWORD = 'password'
export const USER_ID = 0
export const USER_FULLNAME = ''

class UserService {

    login(email, password) {
        return axios.get(API_BASE_URL + "/login",
            { headers: { authorization: this.createBasicAuthToken(email, password) } })
    }

    registerSuccessfulLogin(email, password, id) {
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, email)
        localStorage.setItem(USER_PASSWORD, password)
        localStorage.setItem(USER_ID, id)
    }

    saveFullName(name, surname) {
        localStorage.setItem(USER_FULLNAME, name + ' ' + surname)
    }

    createBasicAuthToken(email, password) {
        return 'Basic ' + window.btoa(email + ":" + password)
    }

    logout() {
        localStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        localStorage.removeItem(USER_PASSWORD);
        localStorage.removeItem(USER_FULLNAME);
        localStorage.removeItem(USER_ID);
    }

    isUserLoggedIn() {
        let user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    getSports() {
        let sports = []
        fetch(API_BASE_URL + "/sports",
            {method: "GET", headers: { "Content-Type": "application/json" , "Authorization": this.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD))}})
            .then(response => response.json())
            .then(json => {sports = json})
        return sports
    }

    createEvent(event) {
        return axios.post(API_BASE_URL + "/event", event, { headers: { authorization: this.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD)) }})
    }
    createUserTeam(userTeam) {
        return axios.post(API_BASE_URL + "/user-team", userTeam, { headers: { authorization: this.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD)) }})
    }
    createTeam(team) {
        return axios.post(API_BASE_URL + "/team", team, { headers: { authorization: this.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD)) }})

    }
    createUserEvent(userEvent) {
        return axios.post(API_BASE_URL + "/user-event", userEvent, { headers: { authorization: this.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD)) }})
    }
    getEvent(id) {
        return axios.get(API_BASE_URL + "/event/" + id, { headers: { authorization: this.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD)) }})
    }
    getUsers() {
        return axios.get(API_BASE_URL + "/users", { headers: { authorization: this.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD)) }} )
    }

    addUser(user) {
        return axios.post(API_BASE_URL + "/add_user", user, { headers: { authorization: this.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD)) }})
    }

    editUser(user) {
        return axios.put(API_BASE_URL + "/edit_user", user, { headers: { authorization: this.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD)) }})
    }

    getRoles() {
        return axios.get(API_BASE_URL + "/roles", { headers: { authorization: this.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD)) }})
    }

    getRoleByName(name) {
        return axios.get(API_BASE_URL + "/role?name=" + name, { headers: { authorization: this.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD)) }})
    }

    getUserById(id) {
        return axios.get(API_BASE_URL + "/user/" + id, { headers: { authorization: this.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD)) }})
    }

    getUserByEmail(email) {
        return axios.get(API_BASE_URL + "/user?email=" + email,  { headers: { authorization: this.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD)) }})
    }

    deleteUser(id) {
        return axios.delete(API_BASE_URL + "/delete_user/" + id, { headers: { authorization: this.createBasicAuthToken(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), localStorage.getItem(USER_PASSWORD)) }})
    }

    registration(user) {
        return axios.post(API_BASE_URL + "/registration", user)
    }
}

export default new UserService()