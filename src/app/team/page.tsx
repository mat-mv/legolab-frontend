import Image from "next/image";
import styles from "./page.module.css";
import Button from "../components/button";
import TextBox from "../components/text_box"
import { fetchData } from "../utils/api";
import { Image as ImageInterface } from "../utils/interfaces/image.interface";
import { Button as ButtonInterface } from "../utils/interfaces/button.interface";
import { TextBox as TextBoxInterface } from "../utils/interfaces/text_box.interface";
import qs from "qs";
import { Teammember } from "../utils/interfaces/teammember.interface";


interface TeamPage {
  title: string,
  description: string,
}

export default async function Team() {
  

  const query = qs.stringify({
        populate: {
          image: {
            fields: ['url'],
          },
        },
      })

  const strapiData1:any = await fetchData("team?")
  const teampage:TeamPage = strapiData1.data

  const strapiData2:any = await fetchData("teammitglieder?" + query)
  const members:Teammember[] = strapiData2.data


  return (
      <section>
        <section className={[styles.hero_section].join(" ")}>
          <h1>{teampage.title}</h1>
          <p>{teampage.description}</p>
        </section>

        <section className={styles.box_section}>
        {members.map((member) => (
          
          <div className={styles.item_box}>
            {member.image ? (<Image src={`https://www.legolab-karlsruhe.de${member.image.url}`} width={400} height={225} alt="Image" className={styles.image}></Image>) : ("")}

            <div className={styles.row}>
              <span className={styles.name}>{member.name}</span>
              <span className={styles.semester}>{member.semester}</span>
            </div>
            
          </div>
        ))}
        
      </section>


      </section>
    );



}