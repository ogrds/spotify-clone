import SpotifyWebApi from 'spotify-web-api-node'

const scopes = [
  'playlist-read-collaborative',
  'playlist-read-private',
  'streaming',
  'user-follow-read',
  'user-library-modify',
  'user-library-read',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-email',
  'user-library-modify',
  'user-read-playback-state',
  'user-read-private',
  'user-read-recently-played',
  'user-top-read',
  'user-read-playback-position',
  // 'app-remote-control',
].join(',')

const params = {
  scope: scopes,
}

const queryParamString = new URLSearchParams(params).toString()

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

export default spotifyApi

export { LOGIN_URL }
