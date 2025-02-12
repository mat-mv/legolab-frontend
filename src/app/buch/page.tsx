"use client";

import React, { useRef, useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import BotSliderItem from "../components/bot_slider_item";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import {Navigation, Pagination } from 'swiper/modules';

export default function Home() {


  return (
    <section>
      <h1>Das LEGO-Mindstorms-Handbuch: Spielend zur Informatik mit EV3-Robotern</h1>
      <section className={styles.easy_bots}>
        <h4>Einfache Bots</h4>
        <div className={styles.slider_container}>
          <span id="prev_button_1" className={["material-symbols-outlined", styles.prev_button].join(" ")}>chevron_left</span>
          <Swiper slidesPerView={3} spaceBetween={32} navigation={{enabled: true, nextEl:"#next_button_1", prevEl:"#prev_button_1"}} pagination={{clickable: true,}} modules={[Pagination, Navigation]}>
            <SwiperSlide><BotSliderItem href="/" title="Test 1" build_difficulty={1} code_difficulty={2} image="https://images.pexels.com/photos/28184434/pexels-photo-28184434/free-photo-of-meer-natur-wasser-blau.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et</p></BotSliderItem></SwiperSlide>
            <SwiperSlide><BotSliderItem href="/" title="Test 2" build_difficulty={2} code_difficulty={2} image="https://images.pexels.com/photos/28184434/pexels-photo-28184434/free-photo-of-meer-natur-wasser-blau.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et</p></BotSliderItem></SwiperSlide>
            <SwiperSlide><BotSliderItem href="/" title="Test 3" build_difficulty={3} code_difficulty={2} image="https://images.pexels.com/photos/28184434/pexels-photo-28184434/free-photo-of-meer-natur-wasser-blau.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et</p></BotSliderItem></SwiperSlide>
            <SwiperSlide><BotSliderItem href="/" title="Test 4" build_difficulty={4} code_difficulty={2} image="https://images.pexels.com/photos/28184434/pexels-photo-28184434/free-photo-of-meer-natur-wasser-blau.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et</p></BotSliderItem></SwiperSlide>
            <SwiperSlide><BotSliderItem href="/" title="Test 5" build_difficulty={5} code_difficulty={2} image="https://images.pexels.com/photos/28184434/pexels-photo-28184434/free-photo-of-meer-natur-wasser-blau.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et</p></BotSliderItem></SwiperSlide>
          </Swiper>
          <span id="next_button_1" className={["material-symbols-outlined", styles.next_button].join(" ")}>chevron_right</span>
        </div>
      </section>
      <section>
        <h4>Fortgeschrittene Bots</h4>
        <div className={styles.slider_container}>
          <span id="prev_button_2" className={["material-symbols-outlined", styles.prev_button].join(" ")}>chevron_left</span>
          <Swiper slidesPerView={3} spaceBetween={32} navigation={{enabled: true, nextEl:"#next_button_2", prevEl:"#prev_button_2"}} pagination={{clickable: true,}} modules={[Pagination, Navigation]}>
            <SwiperSlide><BotSliderItem href="/" title="Test 1" build_difficulty={1} code_difficulty={2} image="https://images.pexels.com/photos/28184434/pexels-photo-28184434/free-photo-of-meer-natur-wasser-blau.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et</p></BotSliderItem></SwiperSlide>
            <SwiperSlide><BotSliderItem href="/" title="Test 2" build_difficulty={2} code_difficulty={2} image="https://images.pexels.com/photos/28184434/pexels-photo-28184434/free-photo-of-meer-natur-wasser-blau.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et</p></BotSliderItem></SwiperSlide>
            <SwiperSlide><BotSliderItem href="/" title="Test 3" build_difficulty={3} code_difficulty={2} image="https://images.pexels.com/photos/28184434/pexels-photo-28184434/free-photo-of-meer-natur-wasser-blau.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et</p></BotSliderItem></SwiperSlide>
            <SwiperSlide><BotSliderItem href="/" title="Test 4" build_difficulty={4} code_difficulty={2} image="https://images.pexels.com/photos/28184434/pexels-photo-28184434/free-photo-of-meer-natur-wasser-blau.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et</p></BotSliderItem></SwiperSlide>
            <SwiperSlide><BotSliderItem href="/" title="Test 5" build_difficulty={5} code_difficulty={2} image="https://images.pexels.com/photos/28184434/pexels-photo-28184434/free-photo-of-meer-natur-wasser-blau.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et</p></BotSliderItem></SwiperSlide>
          </Swiper>
          <span id="next_button_2" className={["material-symbols-outlined", styles.next_button].join(" ")}>chevron_right</span>
        </div>
      </section>
    </section>
    
  );
}
