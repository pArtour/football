import React from 'react';
import { Typography, Space } from "antd";
import PropTypes from "prop-types";

const { Text, Title } = Typography;

const CalendarHeader = ({leagueData, title, id}) => {
  if (leagueData) {
    const getTitleName = title => {
      if (title === "team") {
        return  `team ${leagueData.homeTeam.team_id === parseInt(id) ? leagueData.homeTeam.team_name : leagueData.awayTeam.team_name}`;
      } else {
        return leagueData.league.name;
      }
    } 

    return (
      <Space direction="vertical">
        <Space direction="horizontal" size={12} align="end" wrap>
            <Title level={2}>
              Calendar of {getTitleName(title)}
            </Title>
            <img
              src={leagueData.league.logo}
              alt="League logo"
              style={{ width: "100px" }}
            />
          </Space>
          <Space direction="horizontal" wrap>
            <Text>Country: {leagueData.league.country}</Text>
            {leagueData.league.flag ? (
              <img
                style={{ width: 30 }}
                src={leagueData.league.flag}
                alt={leagueData.league.country}
              />
            ) : null}
          </Space>
      </Space>
    )
  }
  return <Title level={2}>No data</Title>
}
CalendarHeader.propTypes = {
  leagueData: PropTypes.object,
  title: PropTypes.string.isRequired,
  id: PropTypes.string
};
export default CalendarHeader
