import { useEffect } from "react";
export const useFetchList = (setDataFunc, setMemoryDataFunc, dataStr, id) => {
  useEffect(() => {
    let mounted = true;
    let url;
    switch (dataStr) {
      case "leagues":
        url = "https://api-football-v1.p.rapidapi.com/v2/leagues";
        break;
      case "teams":
        url = "https://api-football-v1.p.rapidapi.com/v2/teams/league/" + id;
        break;
      case "leagueFixtures":
        url = "https://api-football-v1.p.rapidapi.com/v2/fixtures/league/" + id;
        break;
      case "teamFixtures":
        url = "https://api-football-v1.p.rapidapi.com/v2/fixtures/team/" + id;
        break;
      default:
        break;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.REACT_APP_KEY,
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          },
        });
        const data = await response.json();
        if (mounted) {
          setDataFunc(data.api);
          setMemoryDataFunc(data.api);
        }
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
    return () => mounted = false;
  }, [setDataFunc, setMemoryDataFunc, dataStr, id]);
};

