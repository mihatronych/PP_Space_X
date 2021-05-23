import {makeAutoObservable} from "mobx";

export default class GameStore {
    constructor() {
        this._countries = [
            {id: 1, name: "Russia"},
            {id: 3, name: "USA"},
            {id: 4, name: "Kazakhstan"},
            {id: 5, name: "South Korea"}
        ]
        this._sessions = []
        this._gamers = []
        makeAutoObservable(this)
    }

    setCountries(countries) {
        this._countries = countries
    }

    setSessions(sessions) {
        this._sessions = sessions
    }
    setGamers(gamers) {
        this._gamers = gamers
    }

    get countries() {
        return this._countries
    }

    get sessions() {
        return this._sessions
    }
    get gamers() {
        return this._gamers
    }
}
