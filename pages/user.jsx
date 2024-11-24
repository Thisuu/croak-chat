import { getSession, signOut } from "next-auth/react";
import LoggedIn from "../components/loggedIn";
import styles from "../styles/App.module.css";
import Link from "next/link";

function User({ user }) {
  return (
    <section className={styles.header}>
      <section className={styles.header_section}>
        <h1 className={styles.croak_chat}>
          Croak
          <Link href="/">
            <div className={styles.frog_wrap}>
              <div className={styles.text_center}>
                <div className={styles.wrap}>
                  <div className={styles.head}>
                    <span className={styles.eyes}>
                      <div className={`${styles.eye} ${styles.o}`}></div>
                      <div className={`${styles.eye} ${styles.t}`}></div>
                    </span>
                    <div className={styles.m}></div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          Chat
        </h1>
        <button
          className={styles.connect_btn}
          onClick={() => signOut({ redirect: "/signin" })}
        >
          Sign out
        </button>
      </section>
      <LoggedIn />
    </section>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}

export default User;

