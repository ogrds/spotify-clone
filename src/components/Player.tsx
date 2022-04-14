import { ReplyIcon, SwitchHorizontalIcon } from '@heroicons/react/outline'
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
  VolumeUpIcon,
  VolumeOffIcon,
} from '@heroicons/react/solid'
import { debounce } from 'lodash'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songsAtom'
import useSongInfo from '../hooks/useSongInfo'
import useSpotify from '../hooks/useSpotify'
import { toast } from '../utils/toast'

function Player() {
  // API
  const spotifyApi = useSpotify()

  // SESSION
  const { data: session, status } = useSession()

  // CONTEXT TRACK
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)

  // CONTEXT TRACK IS PLAYING
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  // TRACK VOLUME
  const [volume, setVolume] = useState(20)

  // SONG INFO
  const songInfo = useSongInfo()

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data?.body?.item?.id || null)

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data?.body?.is_playing || false)
        })
      })
    }
  }

  const handleRandomOrderTrack = () => {
    toast({
      message: '"Random Order" option is in development...',
      mode: 'info',
    })
  }

  const handlePreviousTrack = () => {
    //   back to a previous track
    // spotifyApi.skipToPrevious()
    toast({
      message: '"Back to previous" track option is in development...',
      mode: 'info',
    })
  }

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data?.body?.is_playing) {
        spotifyApi
          .pause()
          .then(() => setIsPlaying(false))
          .catch(({ body }) => {
            if (body.error.reason === 'NO_ACTIVE_DEVICE') {
              toast({
                message: 'You need to start a song on your device',
                mode: 'warn',
              })
            } else {
              toast({
                message: body.error.message,
                mode: 'error',
              })
            }
          })
      } else {
        spotifyApi
          .play()
          .then(() => setIsPlaying(true))
          .catch(({ body }) => {
            if (body.error.reason === 'NO_ACTIVE_DEVICE') {
              toast({
                message: 'You need to start a song on your device',
                mode: 'warn',
              })
            } else {
              toast({
                message: body.error.message,
                mode: 'error',
              })
            }
          })
      }
    })
  }

  const handleNextTrack = () => {
    //   skip to a next track
    // spotifyApi.skipToNext()
    toast({
      message: '"Go to next track" option is in development...',
      mode: 'info',
    })
  }

  const handleRepeatTrack = () => {
    toast({
      message: '"Repeat track" option is in development...',
      mode: 'info',
    })
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong()
      setVolume(20)
    }
  }, [currentTrackId, spotifyApi, session])

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume])

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch(({ body }) => {
        if (body.error.reason === 'NO_ACTIVE_DEVICE') {
          toast({
            message: 'You need to start a song on your device',
            mode: 'warn',
          })
        } else {
          toast({
            message: body.error.message,
            mode: 'error',
          })
        }
      })
    }, 500),
    []
  )

  return (
    <div className="border-t-1 grid h-24 grid-cols-3 border border-gray-900 bg-gradient-to-b from-black to-gray-900 px-2 text-xs text-white md:px-8">
      {/* Left */}
      <div className="flex items-center space-x-4 text-gray-500">
        <img
          className="hidden h-10 w-10 md:inline"
          src={songInfo?.album?.images[0].url}
          alt="Album Image"
        />
        <div>
          <h3 className="mb-1 text-white">{songInfo?.name}</h3>
          <p>{songInfo?.artists[0].name}</p>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon
          className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125"
          onClick={handleRandomOrderTrack}
        />
        <RewindIcon
          className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125"
          onClick={handlePreviousTrack}
        />

        {isPlaying ? (
          <PauseIcon
            className="h-10 w-10 transform cursor-pointer transition duration-100 ease-out hover:scale-125"
            onClick={handlePlayPause}
          />
        ) : (
          <PlayIcon
            className="h-10 w-10 transform cursor-pointer transition duration-100 ease-out hover:scale-125"
            onClick={handlePlayPause}
          />
        )}

        <FastForwardIcon
          className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125"
          onClick={handleNextTrack}
        />

        <ReplyIcon
          className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125"
          onClick={handleRepeatTrack}
        />
      </div>

      {/* Right */}
      <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
        <VolumeOffIcon
          className="h-4 w-4 transform cursor-pointer transition duration-100 ease-out hover:scale-125"
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />

        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
        />

        <VolumeUpIcon
          className="h-4 w-4 transform cursor-pointer transition duration-100 ease-out hover:scale-125"
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  )
}

export default Player
