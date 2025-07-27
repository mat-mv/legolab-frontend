"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Bot_focus_kachel.module.css";
import { fetchData } from "../utils/api";
import qs from "qs";
import { Url } from "url";

interface bot_focus {
  tip: string;
  botName?: string;
  platzhalterAnleitung?: string;
  platzhalterBildUrl?: string;
}

export default function BotFocusKachel({ tip, platzhalterAnleitung, platzhalterBildUrl, botName }: Readonly<bot_focus>) {


  const [isOverlayOpen, setIsOverlayOpen] = useState(false); // State für das Overlay
  const handleOpenOverlay = () => {
    setIsOverlayOpen(true); // Overlay öffnen
  };
  const handleCloseOverlay = () => {
    setIsOverlayOpen(false); // Overlay schließen
  };





  return (
    <>
      {/* Clickable: */}

      <div className={styles.item_box} onClick={handleOpenOverlay}>


        <span className={styles.pageText}>
          {tip}
        </span>
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
            <div >
              <div className={styles.title}>
                {botName}
              </div>
              <div className={styles.text}>
                {platzhalterAnleitung}
              </div>

              {platzhalterBildUrl && (
                <Image
                  src={platzhalterBildUrl}
                  width={120}
                  height={80}
                  alt="Platzhalter-Bild"
                  className={styles.image}
                />
              )}
            </div>
          </div>
        </div >
      )
      }

    </>
  );
}