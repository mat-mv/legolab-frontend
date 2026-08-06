/* Hier werden die Daten der Teammitglieder aus "team" übergeben und als einzelne Kachel
generiert. 
*/
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Member_kachel.module.css";
import { Teammember } from "../utils/interfaces/teammember.interface";
import { fetchData } from "../utils/api";
import qs from "qs";
import { Url } from "url";

interface MemberData {
  fach: string;
  name: string;
  image: string;
  taetigkeit: { arbeit: string, semester: any }[];
  id: number;
  bots: { name: string, image: any, slug: string}[];
  currentSemester: boolean;
  semesterString?: string;
}

export default function MemberKachel({ id, image, taetigkeit, name, bots,  fach, currentSemester, semesterString }: Readonly<MemberData>) {



  const [isOverlayOpen, setIsOverlayOpen] = useState(false); // State für das Overlay
  const handleOpenOverlay = () => {
    setIsOverlayOpen(true); // Overlay öffnen
  };
  const handleCloseOverlay = () => {
    setIsOverlayOpen(false); // Overlay schließen
  };
  


//Funktion um tätigkeiten nach deren Semester zu sortieren
  function semesterSort(a: { semester: string }, b: { semester: string }) {
    const matchA = a.semester?.match(/(WiSe|SoSe)(\d{4})/);
    const matchB = b.semester?.match(/(WiSe|SoSe)(\d{4})/);
    if (!matchA) return 1;
    if (!matchB) return -1;
    const valueA = parseInt(matchA[2], 10) * 2 + (matchA[1] === "WiSe" ? 1 : 0);
    const valueB = parseInt(matchB[2], 10) * 2 + (matchB[1] === "WiSe" ? 1 : 0);
    return valueA - valueB;
  }
  const sortedTaetigkeit = Array.isArray(taetigkeit)
    ? [...taetigkeit].sort(semesterSort)
    : [];




  return (
    <>
      {/* Kacheln */}
      <div className={styles.item_box} key={id} onClick={handleOpenOverlay}>
        {image ? (<Image src={image} width={400} height={225} alt="Image" className={styles.image}></Image>) : ("")}



        <span className={styles.textKachelLinksOben}>{name}
          {/* Wenn Aktuelles Semester, Zeige die Tätigkeit, die zum aktuellen Semester passt */}
          {Array.isArray(taetigkeit) && currentSemester === true && taetigkeit.length > 0 && semesterString && (
            <span className={styles.textKachelRechtsOben}>
              {taetigkeit.find(t => t.semester === semesterString)?.arbeit}
            </span>
          )}
        </span>


        <span className={styles.textKachelLinksUnten}>
          {/* Semester aus letztem Eintrag, falls nicht aktuelles Semester */}
          {Array.isArray(taetigkeit) && currentSemester == false && taetigkeit.length > 0 && (
            <span>{taetigkeit[taetigkeit.length - 1].semester}</span>
          )}
          {Array.isArray(taetigkeit) && currentSemester == true && taetigkeit.length > 0 && (
            <span>{" "}</span>
          )}

          <span className={styles.textKachelRechtsUnten}>{fach}</span>
        </span>
      </div>



      {/* Overlay/Fokus-Ansicht */}

      {isOverlayOpen && (
        <div
          className={styles.overlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseOverlay();
            }
          }}
        >

          <div className={styles.overlayContent}>
            <div className={styles.innerStructure}>
              {/*------Bild------*/}

              <Image
                src={image}
                width={400}
                height={225}
                alt="Image"
                className={styles.image}
              />

              {/*------Text------*/}
              <div className={styles.text}>


                <h3 className={styles.titel}>{name}</h3>
                <p>Studiengang: {fach}</p>

                {/* Semester und Studiengang, nach Semester sortiert */}
                <div className={styles.semesterList}>
                  {sortedTaetigkeit.map((taet) => taet.semester).join(", ")}
                </div>
                {sortedTaetigkeit.map((taet) =>
                  taet.arbeit && (<p className={styles.semesterKachel} key={taet.semester}>
                    {taet.arbeit}
                  </p>
                  )
                )}
              </div>
            </div>



            {/*------Bots------*/}
            <div className={styles.bots}>

              {bots.map((bot) =>

                <Link className={styles.botsKachel} key={bot.name} href={`/labor/${bot.slug}`}>
                  {image ? (<Image
                    src={`https://www.legolab-karlsruhe.de${bot.image.url}`}
                    width={400}
                    height={225}
                    alt="Image"
                    className={styles.imageBot}></Image>) : ("")}
                  <span className={styles.botsName}>
                  {bot.name}
                  </span>
                </Link>

              )
              }
            </div>
          </div>
        </div >
      )
      }

    </>
  );
}