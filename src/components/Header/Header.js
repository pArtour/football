import React from 'react'
import { Layout, Typography } from "antd";
import styles from './Header.module.css'

const { Title } = Typography;
const { Header } = Layout;

export const HeaderComponent = () => {
    return (
        <Header className={styles.Header}>
        <Title className={styles.Title} style={{fontSize: "20px"}}>Tournament statistics</Title>
      </Header>
    )
}
