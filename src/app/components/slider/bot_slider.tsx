"use client";

import styles from "./BotSlider.module.css";
import BotSliderItem from "./items/bot_slider_item";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Navigation, Pagination } from 'swiper/modules';
import { Bot } from "../../utils/interfaces/bot.interface";
import { usePathname } from "next/navigation";



export default function BotSlider({ bots }: { bots: Bot[] }) {
  return(
    <div className={styles.slider_container}>
      <span id="prev_button_1" className={["material-symbols-outlined", styles.prev_button].join(" ")}>chevron_left</span>
      <Swiper className={styles.swiper} slidesPerView={1} spaceBetween={0} breakpoints={{769: {slidesPerView: 2, spaceBetween: 32}, 1025: {slidesPerView: 3, spaceBetween: 32}}} navigation={{enabled: true, nextEl:"#next_button_1", prevEl:"#prev_button_1"}} pagination={{clickable: true,}} modules={[Pagination, Navigation]}>
        {bots.map((bot) => (
          <SwiperSlide key={bot.id}><BotSliderItem href={usePathname() + "/" + bot.slug} title={bot.name} build_difficulty={bot.buildDif} code_difficulty={bot.codeDif} image={bot.image} ><p>{bot.shortDescription}</p></BotSliderItem></SwiperSlide>
        ))}
      </Swiper>
      <span id="next_button_1" className={["material-symbols-outlined", styles.next_button].join(" ")}>chevron_right</span>
    </div>
  )
}
