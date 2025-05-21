import Image from "next/image";
import styles from "./page.module.css";
import { fetchData } from "../utils/api"; import qs from "qs";
import { Teammember } from "../utils/interfaces/teammember.interface";
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


  return (
    <section>
      <section className={[styles.hero_section].join(" ")}>
        <h1>{teampage.title}</h1>
        <p>{teampage.description}</p>
      </section>


      {/*---------Hier kommen alle aktuellen Leute hin---------*/}
      <section className={styles.box_section}>


        {members.filter(member =>
          Array.isArray(member.taetigkeit) &&
          member.taetigkeit.some(t => t.semester === semesterString)
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
      <section className={styles.h3}>
        Auf die haben wir gebaut:
      </section>


      <section className={styles.box_section}>


        {members.filter(member =>
          !Array.isArray(member.taetigkeit) ||
          !member.taetigkeit.some(t => t.semester === semesterString)
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