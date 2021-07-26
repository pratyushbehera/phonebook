import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PhoneGrid from "./PhoneGrid";

import "./PhoneBook.css";

const PhoneBook = () => {
  return (
    <div className="phoneBook">
      <div className="phoneBook-header">Phone Numbers</div>
      <Tabs>
        <TabList>
          <Tab>General</Tab>
          <Tab>Change History</Tab>
        </TabList>

        <TabPanel>
          <PhoneGrid />
        </TabPanel>
        <TabPanel>
          <div className="toDo">Not Implemented</div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PhoneBook;
