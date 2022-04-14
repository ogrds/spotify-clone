import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next'
import { getSession } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import Center from '../components/Center'
import Player from '../components/Player'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <>
      <Toaster />
      <div className="h-screen overflow-hidden bg-black">
        <main className="flex">
          <Sidebar />
          <Center />
        </main>

        <div className="sticky bottom-0">
          <Player />
        </div>
      </div>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx)
  return {
    props: {
      session,
    },
  }
}
