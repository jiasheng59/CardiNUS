import "./Achievements.css"
import { rtdb, auth } from "../../firebase/fire";
import { onValue, ref} from "firebase/database";

function Achievements() {
    var totalGames = 0;
    var crewWins = 0;
    var alienWins = 0;

    const uid = auth.currentUser.uid;
    const statRef = ref(rtdb, '/profiles/' + uid + '/statistics/');
    onValue(statRef, (snapshot) => {
        const data = snapshot.val();
        totalGames = (data.TotalGames);
        crewWins = (data.WinAsCrew);
        alienWins = (data.WinAsAlien);
    });

    return (
      <div className="cards">
        <div className="card card-1">
          <h1 className="card__icon">Statistics</h1>
          <p className="card__title">
          Win Rate: {(crewWins + alienWins) / totalGames}<br/>
          Games Won As Crew: {crewWins}<br/>
          Games Won As Alien: {alienWins} <br/>
          Total Games Played: {totalGames}
        </p>
        </div>
      </div>
    );
  }


export default Achievements;