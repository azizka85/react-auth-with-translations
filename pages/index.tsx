import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useSession, signOut, signout } from 'next-auth/client';
import { useTranslations } from 'use-intl'

const Home: NextPage = () => {
  const t = useTranslations('Index')
  const [session] = useSession()  

  return (
    <div className={styles.container}>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {t('welcome')}
        </h1>

        {!session && (
          <p className={styles.description}>
            {t('start')}{' '}
            <Link href="/auth/signin">
              <a style={{color: 'red'}}>
                {t('signin')}
              </a>
            </Link>
          </p>
        )}

        {session && (
          <p className={styles.description}>
            {t('finish', {email: session.user?.email})}{' '}            
            <a 
              style={{color: 'red', cursor: 'pointer'}}
              onClick={() => signOut()}
            >
              Sign Out
            </a>            
          </p>
        )}

        <p className={styles.description}>
          Change locale to {' '}
          <Link href="/ru/">
            <a style={{color: 'lime'}}>Russian</a>
          </Link>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export function getStaticProps({ locale }: {locale: string}) {
  return {
    props: {
      messages: {
        ...require(`../messages/index/${locale}.json`)
      }
    }
  }
}

export default Home
