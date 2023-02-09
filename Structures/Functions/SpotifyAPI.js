require('dotenv').config();
const spotify_secret = process.env.spotify_secret;
let SpotifyWebApi = require('spotify-web-api-node');

class SpotifyAPI {
    track;
    token_data;
    constructor(name) {
        this.spotifyApi = new SpotifyWebApi({
            clientId: '18f7f65ca9ca4a76b0d02759811f0c43',
            clientSecret: spotify_secret,
            redirectUri: 'http://localhost:8888/callback'
        });
        this.expireTime = 0;
        this.index = 0;
        this.name = name;
    }

    async getTrack() {
        if (this.expireTime <= Date.now() - 6e4) {
            this.token_data = await this.spotifyApi.refreshAccessToken().catch(() => this.spotifyApi.clientCredentialsGrant());
            this.expireTime = Date.now() + this.token_data.body['expires_in'] * 1e3;
            this.spotifyApi.setAccessToken(this.token_data.body['access_token']);
        } else {
            this.spotifyApi.setAccessToken(this.token_data.body['access_token']);
        }
        // use api 
        this.track = await this.spotifyApi.searchTracks(this.name)
            .then(data => data.body)
            .catch(err => console.error(err));
    }

    getName() {
        return this.track.tracks.items[0].name;
    }

    getArtist() { 
        let str = '';
        var artist = this.track.tracks.items[0].artists;
        for (let person of artist)
            str += person.name + ', ';
        return str.slice(0,-2);
    }
}

module.exports = SpotifyAPI