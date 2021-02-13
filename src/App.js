import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import ListOfData from "./components/ListOfData/ListOfData";
import Calendar from "./components/Calendar/Calendar";
import Home from "./components/Home/Home";
import { HeaderComponent as Header } from "./components/Header/Header";
import { Layout } from "antd";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const createLeague = () => <Calendar typeOfData={"leagueFixtures"} />
const createTeams = () => <Calendar typeOfData={"teamFixtures"} />


const App = () => {
  return (
    <Router>
      <Layout className="layout" style={{ background: "none" }}>
        <Header />
        <Layout.Content className="main" style={{ flex: "1 0 auto" }}>
          <Switch>
            <Route exact path="/teams/team-:id" component={createTeams}/>
            <Route exact path="/leagues/league-:id/teams" component={() => <ListOfData typeOfData="teams"/>}/>
            <Route path="/leagues/league-:id" component={createLeague}/>
            <Route exact path="/leagues" component={() => <ListOfData typeOfData="leagues"/>} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Layout.Content>
      </Layout>
    </Router>
  );
}

export default App;
