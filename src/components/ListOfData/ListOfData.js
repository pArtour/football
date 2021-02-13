import React, { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Input,
  DatePicker,
  Space,
  Card,
  List,
  Typography,
} from "antd";
import { useFetchList } from "../../hooks/useFetchList";
import Breadcrumbs from "react-router-dynamic-breadcrumbs";
import routes from "../Breadcrumbs/routes";

const { Text } = Typography;

// Сделать фильтрацию по имени и году
// Сохранять все в get параматрах чтобы при обновлении всё сохранялось

const filterLeagues = (year, leagueName, leagueArr) => {
  if (!leagueName.length && !year.length) return leagueArr;
  if (year.length && leagueName.length) {
    return leagueArr.filter(
      (item) =>
        item.season_start.split("-")[0] === year &&
        item.name.includes(leagueName)
    );
  } else if (!leagueName.length) {
    return leagueArr.filter((item) => item.season_start.split("-")[0] === year);
  } else if (!year.length) {
    return leagueArr.filter((item) => item.name.includes(leagueName));
  }
};

const ListOfData = ({ typeOfData }) => {
  const searchInput = useRef(null);

  const [leaguesMemoryData, setLeaguesData] = useState(null);
  const [leaguesDataActive, setLeaguesDataActive] = useState(null);

  const [year, setYear] = useState("");
  const { id } = useParams();

  useFetchList(setLeaguesDataActive, setLeaguesData, typeOfData, id);

  const onSearchChange = () => {
    const filteredByNameArr = filterLeagues(
      year,
      searchInput.current.input.value,
      leaguesMemoryData[typeOfData]
    );
    setLeaguesDataActive({
      results: filteredByNameArr.length,
      [typeOfData]: filteredByNameArr,
    });
  };

  const onYearChange = (date, dateString) => {
    setYear(dateString);
    if (dateString) {
      const filteredLeaguesData = filterLeagues(
        dateString,
        searchInput.current.input.value,
        leaguesMemoryData[typeOfData]
      );
      setLeaguesDataActive({
        results: filteredLeaguesData.length,
        [typeOfData]: filteredLeaguesData,
      });
    }
  };

  if (leaguesDataActive) {
    return (
      <Space
        direction="vertical"
        size={24}
        style={{ width: "100%", height: "100%" }}
      >
        <Breadcrumbs
          WrapperComponent={(props) => (
            <ul className="breadcrumb">{props.children}</ul>
          )}
          ActiveLinkComponent={(props) => (
            <li className="active">{props.children}</li>
          )}
          LinkComponent={(props) => <li>{props.children}</li>}
          mappedRoutes={routes}
        />
        <Space
          direction={window.innerWidth < 567 ? "vertical" : "horizontal"}
          wrap
        >
          <Input
            ref={searchInput}
            placeholder="Enter the name"
            style={{ width: "330px" }}
            onChange={onSearchChange}
          />
          <DatePicker
            picker="year"
            value={year ? moment(year) : ""}
            onChange={onYearChange}
            allowClear={false}
          />
        </Space>
        <List
          dataSource={leaguesDataActive[typeOfData]}
          grid={{
            gutter: 24,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          pagination={{
            total: leaguesDataActive.results,
            pageSize: 32,
            style: { textAlign: "left" },
          }}
          renderItem={(item) => (
            <List.Item
              key={item[`${typeOfData.split("").slice(0, -1).join("")}_id`]}
            >
              {typeOfData === "leagues" ? (
                <Card
                  title={item.name}
                  size="small"
                  extra={
                    <Link
                      to={`/${typeOfData}/${typeOfData
                        .split("")
                        .slice(0, -1)
                        .join("")}-${
                        item[`${typeOfData.split("").slice(0, -1).join("")}_id`]
                      }`}
                    >
                      More
                    </Link>
                  }
                >
                  <Space
                    direction="horizontal"
                    size={12}
                    align="center"
                    style={{ width: "100%" }}
                  >
                    <Text>Country: {item.country}</Text>
                    {item.flag ? (
                      <img
                        style={{ width: 20 }}
                        src={item.flag}
                        alt={item.country_code}
                      />
                    ) : null}
                  </Space>
                  {item.season_start && item.season_end ? (
                    <Space>
                      <Text>
                        {item.season_start.split("-").reverse().join(".")} -
                        {item.season_end.split("-").reverse().join(".")}
                      </Text>
                    </Space>
                  ) : null}
                </Card>
              ) : (
                <Card>
                  <Link
                    to={`/${typeOfData}/${typeOfData
                      .split("")
                      .slice(0, -1)
                      .join("")}-${
                      item[`${typeOfData.split("").slice(0, -1).join("")}_id`]
                    }`}
                    style={{color: "#141414", fontSize: 18}}
                  >
                    {item.name}
                  </Link>
                </Card>
              )}
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

ListOfData.propTypes = {
  typeOfData: PropTypes.string.isRequired,
};

export default ListOfData;
