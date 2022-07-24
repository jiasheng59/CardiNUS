import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import "./Drawer.css";

export default function TemporaryDrawer(props) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="drawer">

        <h2 className="conceptTitle">Main Concept</h2>
        <div className="concept">
          <div>
            Initially, only Mr. D knows everyone's identity.
          </div>
          <div>
            All the crews including the astronauts and the alien do not know their identity (whether they are the alien or not).
          </div>
          Hence, each crew will need to identify themselves to know their respective win conditions!
        </div>
        <Divider />

        <h2 className="conceptTitle">Win Conditions</h2>
        <div className="concept">
          <h3>
            Astronauts:
          </h3>
          <div>
            The captain can choose to call for a vote if he thinks that the identity of the alien is clear.
          </div>
          If the voted player is the alien, the astronauts win.
          Else, the captain will be disqualified from the game.
        </div>
        <div className="concept">
          <h3>
            Alien and Mr. D:
          </h3>
          <div>
            If the alien successfully swap all his attire (meaning all his attire are different from what he started with), he wins.
          </div>
          Mr. D wins when Alien wins.
        </div>

        <img className="logoDrawer" src={require("../../img/cardinus.png")} height={"200"} width={"200"} alt="" />
      </div>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <button className="howToPlay" onClick={toggleDrawer(anchor, true)}>How To Play</button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}