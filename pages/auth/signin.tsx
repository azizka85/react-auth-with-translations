import { createRef, FormEvent, useEffect, useState } from "react"
import { getSession, signIn } from 'next-auth/client'
import styles from '../../styles/Auth.SignIn.module.css'
import { useRouter } from "next/dist/client/router"

export default function SignIn() {
  const emailRef = createRef<HTMLInputElement>()
  const passwordRef = createRef<HTMLInputElement>()
  
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    getSession().then(session => {
      if(session) {
        console.log(session);        
        router.replace('/')
      }
    })
  })

  async function onFormSubmit(evt: FormEvent) {
    evt.preventDefault()

    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    setLoading(true)

    const status = await signIn('credentials', {
      redirect: false,
      email, password
    })   

    setLoading(false)

    console.log(status)    
  }

  if(loading) {
    return <div>Loading</div>
  }

  return (
    <form onSubmit={onFormSubmit} className={styles.form}>
      <div>Login</div>
      <div>Your Email:</div>
      <div>
        <input type="email" ref={emailRef} />
      </div>
      <div>Your password:</div>
      <div>
        <input type="password" ref={passwordRef} />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

/* export function getStaticProps({ locale }: {locale: string}) {
  return {
    props: {
      messages: {

      }
    }
  }
} */
