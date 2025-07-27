import qs from "qs";
import { fetchData } from "../utils/api";
import { Button as ButtonInterface } from "../utils/interfaces/button.interface";
import { Image as ImageInterface } from "../utils/interfaces/image.interface";
import styles from "./BuchBanner.module.css";
import Button from "./button";
import Image from "next/image";

interface Banner {
    title: string,
    subTitle: string,
    image: ImageInterface,
    ctaButton: ButtonInterface,
}

export default async function BuchBanner() {

    const query = qs.stringify({
        populate: {
            image: {
                fields: ['url', 'width', 'height'],
            },
            ctaButton: {
                fields:['href', 'secondary', 'label']
            }
        }
    });

    const strapiData: any = await fetchData("buch-banner?" + query);
    const banner: Banner = strapiData.data;

    return (
        <div className={styles.banner}>
            <Image className={styles.image} width={banner.image.width} height={banner.image.height} src={`https://www.legolab-karlsruhe.de${banner.image.url}`} alt={"Buch-Cover"}></Image>
            <div className={styles.wrapper}>
            <div className={styles.content}>
                <p>{banner.title}</p>
                <p>{banner.subTitle}</p>
            </div>
            <div className={styles.ctaButton}>
                <Button href={banner.ctaButton.href} secondary={banner.ctaButton.secondary}>{banner.ctaButton.label}</Button>
            </div>
            </div>
        </div>
    )
}