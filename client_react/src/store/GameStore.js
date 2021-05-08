import {makeAutoObservable} from "mobx";

export default class GameStore {
    constructor() {
        this._countries = [
            {id: 1, name: "Russia"},
            {id: 2, name: "USA"},
            {id: 3, name: "Kazakhstan"},
            {id: 4, name: "South Korea"}
        ]
        this._sessions = [
            {id: 1, score: "18", time_session: "00:09"},
            {id: 2, score: "38", time_session: "00:19"},
            {id: 3, score: "28", time_session: "00:10"},
        ]
        this._gamers = [
            {id: 1, nickname: "Roma"},
            {id: 2, nickname: "Jan"},
        ]
        makeAutoObservable(this)
    }

    setCountries(countries) {
        this._countries = countries
    }

    setSessions(sessions) {
        this._sessions = sessions
    }

    get countries() {
        return this._countries
    }

    get sessions() {
        return this._sessions
    }
}
