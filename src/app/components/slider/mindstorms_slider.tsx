"use client";

import styles from "./BotSlider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { usePathname } from "next/navigation";
import { Mindstorm } from "@/app/utils/interfaces/mindstorm.interface";
import MindstormsSliderItem from "./items/mindstorms_slider_item";



export default function MindstormsSlider({ mindstorms }: { mindstorms: Mindstorm[] }) {
  return (
    <div className={styles.slider_container}>
      <span id="prev_button_1" className={["material-symbols-outlined", styles.prev_button].join(" ")}>chevron_left</span>
      <Swiper slidesPerView={1} spaceBetween={0} breakpoints={{ 769: { slidesPerView: 2, spaceBetween: 32 }, 1025: { slidesPerView: 3, spaceBetween: 32 } }} navigation={{ enabled: true, nextEl: "#next_button_1", prevEl: "#prev_button_1" }} pagination={{ clickable: true, }} modules={[Pagination, Navigation]}>
        {mindstorms.map((mindstorm) => (
          <SwiperSlide key={mindstorm.id}><MindstormsSliderItem id={mindstorm.id} name={mindstorm.name} interfaces={mindstorm.interfaces} shortDescription={mindstorm.shortDescription} image={mindstorm.image} date={mindstorm.date} bots={mindstorm.bots} slug={usePathname() + "/" + mindstorm.slug} developerboard={mindstorm.developerboard} legoSetNumber={mindstorm.legoSetNumber} infrared={mindstorm.infrared} bluetooth={mindstorm.bluetooth} codingTypes={mindstorm.codingTypes} shotDescRTMD={mindstorm.shotDescRTMD} longDescRTMD={mindstorm.longDescRTMD}></MindstormsSliderItem></SwiperSlide>
        ))}
      </Swiper>
      <span id="next_button_1" className={["material-symbols-outlined", styles.next_button].join(" ")}>chevron_right</span>
    </div>
  )
}
