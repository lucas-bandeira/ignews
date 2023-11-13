import styles from '../Header/styles.module.scss'
import { SignInButton } from '../SignInButton';
import {ActiveLink} from "@/components/ActiveLink";

export function Header() {


  return(
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <img src="/images/logo.svg" alt="ig.news"/>
          <nav>
            <ActiveLink href={'/'} activeClassName={styles.active}>
              <p>Home</p>
            </ActiveLink>
            <ActiveLink href={'/posts'} activeClassName={styles.active}>
              <p>Posts</p>
            </ActiveLink>
          </nav>

          <SignInButton />
        </div>
      </header>
  );
}