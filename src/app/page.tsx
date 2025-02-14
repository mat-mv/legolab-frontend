import Image from "next/image";
import styles from "./page.module.css";
import Button from "./components/button";
import TextBox from "./components/text_box"

export default function Home() {
  return (
    <section>
      <section className={[styles.hero_section].join(" ")}>
        <div>
          <h1>lego::lab Karlsruhe</h1>
          <p>Spielend zur Informatik mit LEGO® MINDSTORMS®</p>
          <div className={styles.ctas}>
            <Button href="/bots" secondary={false}>Zu den Bots</Button>
            <Button href="/contact" secondary={true}>Kontakt aufnehmen</Button></div>
        </div>
        <div>
          <Image className={styles.img} src="https://images.pexels.com/photos/28184434/pexels-photo-28184434/free-photo-of-meer-natur-wasser-blau.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" width={400} height={225} alt="Picture"></Image>
        </div>
      </section>
      <section className={styles.slider}>
        <TextBox href="/" icon="/next.svg" title="Test">
          <p>
            Test
          </p>
        </TextBox>
        <TextBox href="/" icon="/next.svg" title="Test">
          <p>
            Test
          </p>
        </TextBox>
        <TextBox href="/" icon="/next.svg" title="Test">
          <p>
            Test
          </p>
        </TextBox>
      </section>
    </section>
  );
}
