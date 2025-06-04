import Image from "next/image";
import styles from "./page.module.css";
import { fetchData } from "../utils/api"; import qs from "qs";
import { Teammember } from "../utils/interfaces/teammember.interface";
import { PlatzhalterMedia } from "../utils/interfaces/platzhalter_media.interface";
import MemberKachel from "@/app/components/member_kachel"

interface TeamPage {
  title: string,
  description: string,
}


export default async function Team() {

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
      },

    },
  })

  const strapiData1: any = await fetchData("team?")
  const teampage: TeamPage = strapiData1.data

  const strapiData2: any = await fetchData("teammitglieder?" + query)
  const members: Teammember[] = strapiData2.data



  /*Funktioniert noch nicht
  const strapiData3: any = await fetchData("platzhalter-medias?" + query)
  const platzhalters: PlatzhalterMedia[] = strapiData3.data
  const platzhalterAvatar = platzhalters.find(
    (p) => p.name === "PlatzhalterAvatar"
  );
*/





  return (
    <section>
      <section  className={styles.ueberschriftLeiste}>

        <h1 className={[styles.hero_section].join(" ")}>{teampage.title}</h1>

        {/*---------Hier kommen alle Professoren hin---------*/}
        <div className={styles.profList}>
          {members
            .filter(member =>
              Array.isArray(member.taetigkeit) &&
              member.taetigkeit.some(t => t.arbeit === "Professor")
            )
            .map(member => (
              <div key={member.id} className={styles.profBlock}>
                <Image
                  src={`https://www.legolab-karlsruhe.de${member.image.url}`}
                  alt={member.name}
                  width={128}
                  height={128}
                  className={styles.profAvatar}
                  title={member.name}
                />

                <span className={styles.name}>{member.name}</span>

                {member.name.includes("Uwe") && (
                  <span className={styles.profBeschreibung}>Beschreibung 1</span>
                )}
                {member.name.includes("Mruzek") && (
                  <span className={styles.profBeschreibung}>Beschreibung 2</span>
                )}
              </div>
            ))}
        </div>



      </section>

      <h3>{teampage.description}</h3>


      {/*Funktioniert noch nicht
      {platzhalterAvatar && platzhalterAvatar.image?.url && (
        <Image
          src={`https://www.legolab-karlsruhe.de${platzhalterAvatar.image.url}`}
          alt="Platzhalter Avatar"
          width={200}
          height={200}
        />
      )}
*/}







      {/*---------Hier kommen alle aktuellen Leute hin---------*/}
      <section className={styles.box_section}>

        {members.filter(member =>
          Array.isArray(member.taetigkeit) &&
          member.taetigkeit.some(t => t.semester === semesterString)
          &&
          member.taetigkeit.some(t => t.arbeit !== "Professor")
          
        )
          .map((member) => (

            <div className={styles.item_box} key={member.id}>


              <MemberKachel
                id={member.id}
                image={`https://www.legolab-karlsruhe.de${member.image.url}`}
                taetigkeit={member.taetigkeit}
                name={member.name}
                bots={member.bots} fach={member.fach}
                currentSemester={true}
              />

            </div>

          ))}

      </section>


      {/*---------Hier kommen alle Ehemaligen hin---------*/}
      <h3 className={styles.zweiteReihe}>
        Auf die haben wir gebaut:
      </h3>


      <section className={styles.box_section}>


        {members.filter(member =>
          !Array.isArray(member.taetigkeit) ||
          !member.taetigkeit.some(t => t.semester === semesterString)
          &&
          member.taetigkeit.some(t => t.arbeit !== "Professor")
        )
          .map((member) => {

            return (
              <div className={styles.item_box} key={member.id}>
                <MemberKachel
                  id={member.id}

                  image={`https://www.legolab-karlsruhe.de${member.image.url}`}
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