import { ChevronDownIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import { COLORS_GRADIENT } from '../utils'
import useSpotify from '../hooks/useSpotify'
import Songs from './Songs'

const Center: React.FC = () => {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState<string | undefined>(undefined)

  const playlistId = useRecoilValue(playlistIdState)

  const [playlist, setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    setColor(shuffle(COLORS_GRADIENT).pop())
  }, [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then(({ body }) => {
        setPlaylist(body)
      })
      .catch((err) => console.log('Something went wrong!', err))
  }, [spotifyApi, playlistId])

  return (
    <div className="h-screen flex-grow overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 text-white opacity-90 hover:opacity-80"
          onClick={() => signOut()}
        >
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={session?.user.image || '/user.png'}
            alt="Profile Picture"
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`from- flex h-80 items-end space-x-7 bg-gradient-to-b ${color} to-black p-8 text-white`}
      >
        <img
          className="h-44 w-44 object-cover shadow-2xl"
          src={
            playlist?.images
              ? playlist?.images[0]?.url
              : 'https://via.placeholder.com/200x200?text=No+Image'
          }
          alt="Playlist Image"
        />

        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl font-semibold md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Center
