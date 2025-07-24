import Image from "next/image";
import styles from "./page.module.css";
import { fetchData } from "../utils/api"; import qs from "qs";
import { Teammember } from "../utils/interfaces/teammember.interface";
import { PlatzhalterMedia } from "../utils/interfaces/platzhalter_media.interface";
import MemberKachel from "@/app/components/member_kachel"
import { getImageUrl } from "../utils/getImageUrl";

interface TeamPage {
  title: string,
  description: string,
  second_subtitle: string,
}


export default async function Team() {


  //Bekomme das aktuelle Semester
  const currentYear = new Date().getFullYear().toString();
  const month = new Date().getMonth() + 1;
  const currentSemester = month >= 4 && month <= 9 ? "SoSe" : "WiSe";
  const semesterString = `${currentSemester}${currentYear}`;



  const query = qs.stringify({
    populate: {
      image: {
        fields: ['url'],
      },


      taetigkeit: {
        fields: ['arbeit', 'semester'],
      },

      bots: {
      fields: ['name', 'slug'],
      populate: {
        image: {
          fields: ['url'],
        },
        category: {
          populate: {
            parent: {
              fields: ['name']
            }
          }
        }
      }
    }

    },
  })

  const query2 = qs.stringify({
    populate: {
      bild: {
        fields: ['url'],
      },


    }

  })


  const strapiData1: any = await fetchData("team?")
  const teampage: TeamPage = strapiData1.data

  const strapiData2: any = await fetchData("teammitglieder?" + query)
  const members: Teammember[] = strapiData2.data

  const strapiData3: any = await fetchData("platzhalter-medias?" + query2)
  const platzhalters: PlatzhalterMedia[] = strapiData3.data
  const platzhalterAvatar = platzhalters.find(
    (p) => p.name === "PlatzhalterAvatar"
  );


  //Mache eine Liste an aktuellen Mitgliedern, 
  // um zu schauen ob der erste Block angezeigt werden soll
  const aktuelleMitglieder = members.filter(member =>
    Array.isArray(member.taetigkeit) &&
    member.taetigkeit.some(t => t.semester === semesterString) &&
    member.taetigkeit.some(t => t.arbeit !== "Leitung")
  );




  return (
    <section>
      <section className={styles.ueberschriftLeiste}>




        <h1 className={[styles.hero_section].join(" ")}>{teampage.title}</h1>

        {/*---------Hier kommen alle Professoren hin---------*/}
        <div className={styles.profList}>
          {members
            .filter(member =>
              Array.isArray(member.taetigkeit) &&
              member.taetigkeit.some(t => {
                return t.arbeit === "Leitung";
              })
            )
            .map(member => (
              <div key={member.id} className={styles.profBlock}>
                {/*Bild*/}
                <Image
                  src={getImageUrl(member.image, platzhalterAvatar)}
                  alt={member.name}
                  width={128}
                  height={128}
                  className={styles.profAvatar}
                  title={member.name}
                />
                {/*Beschreibung*/}
                <span className={styles.name}>{member.name}</span>

                {member.name.includes("Uwe Haneke") && (
                  <span className={styles.profBeschreibung}>Gesamtleitung</span>
                )}
                {member.name.includes("Matthias Mruzek-Vering") && (
                  <span className={styles.profBeschreibung}>Operative Leitung</span>
                )}
              </div>
            ))}
        </div>



      </section>







      {/*---------Hier kommen alle aktuellen Leute hin---------*/}
      {aktuelleMitglieder.length > 0 && ( // Nur anzeigen, wenn es aktuelle Mitglieder gibt
        <section>
          {/*Erste Unterüberschrift*/}
          <h3>{teampage.description}</h3>

          {/*Filtert alle Mitglieder, die dieses Semester haben und keine Profs sind*/}
          <section className={styles.box_section}>
            {members.filter(member =>
              Array.isArray(member.taetigkeit) &&
              member.taetigkeit.some(t => t.semester === semesterString)
              &&
              member.taetigkeit.some(t => t.arbeit !== "Leitung")
            )
              .map((member) => (
                <div className={styles.item_box} key={member.id}>


                  <MemberKachel
                    id={member.id}
                    image={getImageUrl(member.image, platzhalterAvatar)}
                    taetigkeit={member.taetigkeit}
                    name={member.name}
                    bots={member.bots} fach={member.fach}
                    currentSemester={true}
                  />

                </div>
              ))}
          </section>
        </section>
      )}

      {/*---------Hier kommen alle Ehemaligen hin---------*/}
      <h3 className={styles.zweiteReihe}>
        {teampage.second_subtitle}
      </h3>


      <section className={styles.box_section}>


        {members.filter(member =>
          !Array.isArray(member.taetigkeit) ||
          !member.taetigkeit.some(t => t.semester === semesterString)
          &&
          member.taetigkeit.some(t => t.arbeit !== "Leitung")
        )
          .map((member) => {

            return (
              <div className={styles.item_box} key={member.id}>
                <MemberKachel
                  id={member.id}

                  image={getImageUrl(member.image, platzhalterAvatar)}
                  taetigkeit={member.taetigkeit}
                  name={member.name}
                  bots={member.bots}
                  fach={member.fach}
                  currentSemester={false}
                />

              </div>
            );
          })}
      </section>



    </section>
  );

}