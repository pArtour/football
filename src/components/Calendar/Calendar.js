import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import { DatePicker, List, Space } from "antd";
import CalendarHeader from "./CalendarHeader";
import { useFetchList } from "../../hooks/useFetchList";
import Breadcrumbs from "react-router-dynamic-breadcrumbs";
import routes from "../Breadcrumbs/routes";

const { RangePicker } = DatePicker;

const Calendar = ({ typeOfData }) => {
  const [fixtures, setFixtures] = useState(null);
  const [fixturesMemory, setFixturesMemory] = useState(null);

  const { id } = useParams();

  useFetchList(setFixtures, setFixturesMemory, typeOfData, id);

  const onDateChange = (_, dateStrings) => {
    const oldState = { ...fixturesMemory };
    const [date1, date2] = dateStrings;

    if (!date2.length || !date1.length) {
      setFixtures(oldState);
      return;
    }
    const toTimestamp = (strDate) => Date.parse(strDate) / 1000;

    const date1Timestamp = toTimestamp(
      `${date1.split(".").reverse().join(" ")} 00:00:00`
    );
    const date2Timestamp = toTimestamp(
      `${date2.split(".").reverse().join(" ")} 23:59:59`
    );
    const filteredData = (dataObj) =>
      dataObj.fixtures.filter(
        (item) =>
          item.event_timestamp >= date1Timestamp &&
          item.event_timestamp <= date2Timestamp
      );
    const filteredFixturesArr = filteredData(oldState);
    setFixtures({
      results: filteredFixturesArr.length,
      fixtures: filteredFixturesArr,
    });
  };
  const convertDate = (ISOdate) => {
    const date = new Date(ISOdate);
    const validateDate = (num) => (num > 9 ? num : "0" + num);
    return `${validateDate(date.getUTCDate())}.${validateDate(
      date.getUTCMonth() + 1
    )}.${date.getUTCFullYear()} ${validateDate(
      date.getUTCHours()
    )}:${validateDate(date.getUTCMinutes())}`;
  };
  if (fixtures) {
    return (
      <Space size={24} direction="vertical" style={{ width: "100%" }}>
        <Space direction="vertical" size={12}>
          {typeOfData === "teamFixtures" ? (
            <Link to="/leagues">Back to leagues</Link>
          ) : null}
          {typeOfData === "teamFixtures" ? null : (
            <Breadcrumbs
              WrapperComponent={(props) => (
                <ul className="breadcrumb">{props.children}</ul>
              )}
              ActiveLinkComponent={(props) => (
                <li className="breadcrumb-active">{props.children}</li>
              )}
              LinkComponent={(props) => <li>{props.children}</li>}
              mappedRoutes={routes}
            />
          )}

          {typeOfData === "leagueFixtures" ? (
            <Link to={`/leagues/league-${id}/teams`}>Watch league teams</Link>
          ) : null}
          <RangePicker format="DD.MM.YYYY" onChange={onDateChange} />
        </Space>
        <CalendarHeader
          leagueData={fixtures.fixtures[0]}
          title={typeOfData === "teamFixtures" ? "team" : "league"}
          id={id}
        />
        
        <List
          size="medium"
          pagination={{
            total: fixtures.results,
            pageSize: 8,
            style: { textAlign: "left" },
          }}
          itemLayout="vertical"
          dataSource={fixtures.fixtures}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={`${item.homeTeam.team_name} - ${item.awayTeam.team_name}`}
                description={
                  item.goalsHomeTeam !== null && item.goalsawayTeam !== null
                    ? `Score: ${item.goalsHomeTeam}:${
                        item.goalsAwayTeam
                      } Date: ${convertDate(item.event_date)} Status: ${
                        item.status
                      }`
                    : `Score: -:-
                      Date: ${convertDate(item.event_date)} Status: ${
                        item.status
                      }`
                }
              />
            </List.Item>
          )}
        />
      </Space>
    );
  }
  return (
    <Space
      direction="vertical"
      size={24}
      style={{ width: "100%", height: "100%" }}
    >
      <h1>Loading...</h1>
    </Space>
  );
};

Calendar.propTypes = {
  typeOfData: PropTypes.string.isRequired,
};

export default Calendar;
