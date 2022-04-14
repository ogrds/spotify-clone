import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songsAtom'
import useSpotify from '../hooks/useSpotify'
import { millis2MinutesAndSeconds } from '../utils'
import { toast } from '../utils/toast'

type SongProps = {
  order: number
  track: SpotifyApi.PlaylistTrackObject
}

function Song({ order, track }: SongProps) {
  const spotifyApi = useSpotify()

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = () => {
    setCurrentTrackId(track.track.id)
    setIsPlaying(true)
    spotifyApi
      .play({
        uris: [track.track.uri],
      })
      .catch((err) =>
        toast({
          message: err.message,
          mode: 'error',
        })
      )
  }

  return (
    <div className="grid cursor-pointer grid-cols-2 rounded-lg py-4 px-5 text-gray-500 hover:bg-gray-900">
      <div className="flex items-center space-x-4" onClick={playSong}>
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track?.track?.album?.images[0]?.url}
          alt="Album Track"
        />
        <div>
          <p className="w-36 truncate text-white lg:w-64">
            {track?.track?.name}
          </p>
          <p className="w-40 space-x-2">
            {track.track.explicit && (
              <span className="rounded-sm bg-gray-500 px-1 text-xs text-black">
                E
              </span>
            )}
            <span>{track.track.artists[0].name}</span>
          </p>
        </div>
      </div>

      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden w-40 md:inline">{track?.track?.album?.name}</p>
        <p>{millis2MinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song
