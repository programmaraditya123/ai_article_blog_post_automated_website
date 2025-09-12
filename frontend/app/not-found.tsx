import Link from "next/link";
import styles from "./page.module.css";
import LoadMoreButton from "@/components/ui/load_more_button/Load_More_Button";
import { link } from "fs";

const NotFound = ({ message }: { message?: string }) => {
  return (
    <div className={styles.main_container}>
      <div className={styles.container}>
        <div className={styles.msg}>
          <p className={`${styles.message1}`}>404</p>
          {
            <p className={styles.message2}>
              {message ?? "We can’t find the page you are looking for"}
            </p>
          }
        </div>
        {/* <Link href='/'>
        <button>Back to Home</button>
          </Link> */}
          <Link href='/'>
          <LoadMoreButton text="Back To Home"/>
        </Link>
        {/* <Button
          variant="primary"
          buttonBackground={
            "border-image-source: linear-gradient(151.14deg, #B67064 17.11%, #1D0602 84.54%)"
          }
          buttonBackgroundPrimary="border-image-source: linear-gradient(151.14deg, #B67064 17.11%, #1D0602 84.54%)"
          fullRound={false}
          label="Back to Home"
          innerBorderRadius="30px"
          outerBorderRadius="30px"
          dimensionH={"42px"}
          dimensionW={"140px"}
          onClick={ () => navigate(-2)}
        /> */}
      </div>
    </div>
  );
};

export default NotFound;