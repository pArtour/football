import React from "react";
import { Typography, Space, Button } from "antd";
import {Link} from 'react-router-dom';
import styles from './Home.module.css'

const Home = () => {
  return (
    <Space direction="vertical" align="center" style={{height: "100%", width: "100%", justifyContent: "center"}}>
        <Typography.Title className={styles.Title} level={2}>
          Welcome to the website for viewing statistics of the leading European football tournaments
        </Typography.Title>
        <Button type="primary">
            <Link to="/leagues">Start</Link>
        </Button>
          <ul className={styles.List}>
            <li className={styles.ListItem}>All European leagues</li>
            <li className={styles.ListItem}>Match calendar for each league</li>
            <li className={styles.ListItem}>Team Schedule</li>
          </ul>
      </Space>
  );
};
export default Home;