import { useEffect, useState } from "react";
import userDetailsApi from "./api/userDetailsApi";
import { UserData } from "@/common/types/userData";
import ErrorComponent from "@/common/components/ErrorComponent";
import LoaderComponent from "@/common/components/LoaderComponent";
import NewsFeed from "../NewsFeed";
import styles from "@styles/Profile.module.css";
import GridImages from "./GridImages";
import Image from "next/image";
import { relative } from "path";

const Profile: React.FC<{ userName?: string | string[] }> = ({ userName }) => {
  const [userDetails, setUserDetails] = useState<UserData>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isScroll, setIsScroll] = useState<boolean>(false);

  useEffect(() => {
    userDetailsApi({ userName })
      .then((res) => {
        setIsLoaded(true);
        setUserDetails(res?.data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  }, [userName]);

  if (error) {
    return <ErrorComponent error={error} />;
  } else if (!isLoaded) {
    return <LoaderComponent />;
  }

  return (
    <div className={styles.pf231root}>
      <div className={styles.pf235left}>
        <div className={styles.pf678imgCenter}>
          <div style={{ position: "relative", height: "30vh", width: "30vh" }}>
            <Image
              layout="fill"
              objectFit="cover"
              loading="lazy"
              src={userDetails?.profile_image.large}
              alt="profile Image"
              className={styles.pf236profilePic}
            />
          </div>
        </div>
        <div className={styles.pf675texts}>
          <div className={styles.pf237name}>{userDetails?.name}</div>
          <div className="">@{userName}</div>
          <div className={styles.pf238bio}>{userDetails?.bio}</div>
          <div className={styles.pf239location}>{userDetails?.location}</div>
          <div className=""></div>
          <div className={styles.pf240likes}>
            <i className="bi bi-heart"></i>
            &nbsp;
            {userDetails?.total_likes}
          </div>
          <div className={styles.photosCount}>
            <i className="bi bi-image"></i>
            &nbsp;
            {userDetails?.total_photos}
          </div>
          <div className={styles.collection}>
            <i className="bi bi-collection"></i>
            &nbsp;
            {userDetails?.total_collections}
          </div>
          <div className={styles.insta}>
            <i className="bi bi-instagram"></i>
            &nbsp;
            {userDetails?.instagram_username}
          </div>
        </div>

        {/* switch view */}
        <div className={styles.pf294switchViewPar}>
          {/* <div className={styles.pf295hideInSmall}></div> */}
          <button
            className={styles.pf241switchView}
            onClick={() => setIsScroll((prev) => !prev)}>
            Switch View &nbsp;
            {/* <i className="bi bi-grid-3x3-gap-fill"></i> */}
            {isScroll ? (
              <i className="bi bi-grid-3x3-gap-fill"></i>
            ) : (
              <i className="bi bi-justify"></i>
            )}
          </button>
        </div>
      </div>

      <div className={styles.pf982right}>
        {/* <GridImages urlString={`/users/${userName}/photos`} /> */}
        <NewsFeed urlString={`/users/${userName}/photos`} isScroll={isScroll} />
      </div>
    </div>
  );
};

export default Profile;
