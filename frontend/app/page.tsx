import AppBar from '@/components/AppBar'
import Hero from '@/components/Hero'
import HeroVideo from '@/components/HeroVideo'
import { SessionProvider } from "next-auth/react"
import React from 'react'

export default function Home({
  pageProps: { session, ...pageProps },
}:{pageProps: { session: any }}) {
  return (
    <SessionProvider session={session}>
      <AppBar signup={true} Login={true} contactSales={true} threeLines={true} network={true} />
      <Hero />
      <HeroVideo />
    </SessionProvider>
  );
}