import React, { useState, useEffect } from 'react'

export const DevForm = ({ onSubmit }) => {
    const [github_username, setGithubUsername] = useState('')
    const [techs, setTechs] = useState('')

    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords

                setLatitude(latitude)
                setLongitude(longitude)
            },
            (error) => {
                console.log('[getCurrentPosition]: ' + error)
            },
            {
                timeout: 30000
            }
        )
    }, [])

    const handleSubmit = async event => {
        event.preventDefault()

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        })

        setGithubUsername('')
        setTechs('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do GitHub</label>
                <input
                    name="github_username"
                    id="github_username"
                    value={github_username}
                    onChange={event => setGithubUsername(event.target.value)}
                    required />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input
                    name="techs"
                    id="techs"
                    value={techs}
                    onChange={event => setTechs(event.target.value)}
                    required />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="number"
                        name="latitude"
                        id="latitude"
                        value={latitude}
                        onChange={event => setLatitude(event.target.value)}
                        required />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">Latitude</label>
                    <input
                        type="number"
                        name="longitude"
                        id="longitude"
                        value={longitude}
                        onChange={event => setLongitude(event.target.value)}
                        required />
                </div>
            </div>

            <button type="submit">Salvar</button>
        </form>
    )
}