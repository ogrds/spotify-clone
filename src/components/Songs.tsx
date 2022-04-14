import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import Song from './Song'

function Songs() {
  const playlist = useRecoilValue(playlistState)

  const filteredSongs = playlist?.tracks?.items.filter(
    (track) => track.track !== null
  )

  return (
    <div className="flex-col space-y-1 px-8 pb-28 text-white">
      {filteredSongs?.map((track, i) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  )
}

export default Songs
