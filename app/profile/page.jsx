"use client";
import Heading from "@/components/Heading";
import styles from "./profile.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import Loader from "@/components/Loader/loader";

export default function page() {
  const { user, isLoading } = useUser();

  return (
    <div className={styles.profile__section}>
      <Heading title="PROFILE" />
      {isLoading ? (
        <div className="flex flex-center">
          <Loader />
        </div>
      ) : (
        <div>
          <div className={styles.profile__image}>
            <img src={user.picture} alt="Profile image" />
          </div>
          <p className={styles.profile__name}>Name: {user.name}</p>
          <p className={styles.profile__email}>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}
