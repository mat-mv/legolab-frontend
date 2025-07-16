"use client";

import { LinksPerChapter } from "@/app/utils/interfaces/links_per_chapter";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import styles from "./LinksTabs.module.css";

export default function LinksTabs({ links_per_chapter }: { links_per_chapter: LinksPerChapter[] }) {
  return (
    <Tabs>
      <div className={styles.tabsHeader}>
        <h2>Links je Kapitel im Buch</h2>
        <TabList className={styles.tabList}>
          {links_per_chapter.map((links) => (
            <Tab key={links.id} className={styles.tab} selectedClassName={styles.selectedTab}>
              {links.chapter}
            </Tab>
          ))}
        </TabList>
      </div>
        
        {links_per_chapter.map((links) => (
          <TabPanel key={links.id} className={styles.tabPanel}>
            {links.linkList.map((link) => (
              <li key={link.id}><a href={link.href} target={link.target}>{link.label}</a></li>
            ))}
          </TabPanel>
        ))}
      </Tabs>
  )
}