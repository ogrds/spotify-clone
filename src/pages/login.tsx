import { getProviders, signIn } from 'next-auth/react'
import { GetServerSideProps, NextPage } from 'next'

interface ILoginProps {
  providers: {
    callbackUrl: string
    id: string
    name: string
    signinUrl: string
    type: string
  }[]
}

const Login: NextPage<ILoginProps> = ({ providers }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
      <img
        className="mb-5 w-52"
        src="https://links.papareact.com/9xl"
        alt="Spotify Logo"
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="cursor-pointer rounded-full bg-[#18d860] p-5 text-white"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >{`Login with ${provider.name}`}</button>
        </div>
      ))}
    </div>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
