import {makeAutoObservable} from "mobx";

export default class GameStore {
    constructor() {
        this._countries = []
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
