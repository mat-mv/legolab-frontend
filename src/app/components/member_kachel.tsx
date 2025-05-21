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
  bots: { name: string, image: any }[];
  currentSemester: boolean;
}

export default function MemberKachel({ id, image, taetigkeit, name, bots, fach, currentSemester }: Readonly<MemberData>) {



  const [isOverlayOpen, setIsOverlayOpen] = useState(false); // State für das Overlay
  const handleOpenOverlay = () => {
    setIsOverlayOpen(true); // Overlay öffnen
  };
  const handleCloseOverlay = () => {
    setIsOverlayOpen(false); // Overlay schließen
  };





  return (
    <>
      {/* Kacheln */}

      <div className={styles.item_box} key={id} onClick={handleOpenOverlay}>
        {image ? (<Image src={image} width={400} height={225} alt="Image" className={styles.image}></Image>) : ("")}


        <span className={styles.textKachel}>{name}</span>

        {/* ACHTUNG: NUR AUS LETZTEM EINTRAG! 
        SOLLTE MAN NOCH FIXEN, 
        FALLS DER LETZTE EINTRAG EIN NACHTRAG FÜR ÄLTERES SEMESTER IST ODER SO */}
        {/* Arbeit aus dem letzten Eintrag, falls aktuelles Semester */}
        {Array.isArray(taetigkeit) && currentSemester == true && taetigkeit.length > 0 && (
          <span className={styles.textKachel}>
            {taetigkeit[taetigkeit.length - 1].arbeit}
          </span>
        )}
        {/* Semester aus letztem Eintrag, falls nicht aktuelles Semester */}
        {Array.isArray(taetigkeit) && currentSemester == false && taetigkeit.length > 0 && (
          <span className={styles.textKachel}>
            {taetigkeit[taetigkeit.length - 1].semester}
          </span>
        )}

        <span className={styles.textKachel}>{fach}</span>




      </div>



      {/* Overlay */}

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
                <button className={styles.closeButton} onClick={handleCloseOverlay}>
                  X
                </button>
                <h2>{name}</h2>


                {taetigkeit.map((taet) =>
                  <ul key={taet.semester} >
                    {taet.semester}
                  </ul>
                )
                }

                {taetigkeit.map((taet) =>

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

                <p className={styles.botsKachel} key={bot.name} >
                  {image ? (<Image
                    src={`https://www.legolab-karlsruhe.de${bot.image.url}`}
                    width={400}
                    height={225}
                    alt="Image"
                    className={styles.imageBot}></Image>) : ("")}
                  {bot.name}
                </p>

              )
              }
            </div>
          </div>
        </div>
      )}

    </>
  );
}