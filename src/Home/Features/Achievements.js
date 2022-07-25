import "./Achievements.css"
import { rtdb, auth } from "../../firebase/fire";
import { onValue, ref} from "firebase/database";
import { useEffect, useState } from "react";

function Achievements() {
    const [totalGames, setTotalGames] = useState(0);
    const [crewWins, setCrewWins] = useState(0);
    const [alienWins, setAlienWins] = useState(0);
    const [notcompleted, setNotCompleted] = useState([]);
    const [completed, setCompleted] = useState([]);


    useEffect(() => {
      const uid = auth.currentUser.uid;
      const statRef = ref(rtdb, '/profiles/' + uid + '/statistics/');
      onValue(statRef, (snapshot) => {
          const data = snapshot.val();
          setTotalGames(data.TotalGames);
          setCrewWins(data.WinAsCrew);
          setAlienWins(data.WinAsAlien);
      });

      const notcompletedquestRef = ref(rtdb, '/profiles/' + uid + '/quests/notcompleted');
      onValue(notcompletedquestRef, (snapshot) => {
        setNotCompleted(snapshot.val());
      });

      const completedquestRef = ref(rtdb, '/profiles/' + uid + '/quests/completed');
      onValue(completedquestRef, (snapshot) => {
        setCompleted(snapshot.val());
      });
    }, [])

    const twitter = `https://twitter.com/intent/tweet?text=I have ${(crewWins + alienWins) / totalGames * 100} percent win rate in CardiNUS. Join me at https://cardinus-99061.web.app/`
    return (
      <div className="cards">
        <div className="card card-1">
          <h1 className="card__icon">Statistics</h1>
          <div className="card__title">
          Win Rate: {(crewWins + alienWins) / totalGames}<br/>
          Games Won As Crew: {crewWins}<br/>
          Games Won As Alien: {alienWins} <br/>
          Total Games Played: {totalGames}
        </div>
        <div className="card__apply">  
          <a className="card__link" href={twitter}> Share it <i className="fa fa-twitter"></i></a>
        </div>
        </div>
        <div className="card card-2">
          <h1 className="card__icon">Quests</h1>
          <div className="card__title">
          <div>
            <i className="fa-solid fa-atom"></i>Not Completed : 
            {
              notcompleted.map(q => (<div>{q}</div>))
            }
            </div>
            <div>
            <br/>
            <i className="fa-solid fa-award"></i>Completed : 
            {
              completed.map(q => (<div>{q}</div>))
            }
            </div>
        </div>
        </div>
      </div>
    );
  }


export default Achievements;