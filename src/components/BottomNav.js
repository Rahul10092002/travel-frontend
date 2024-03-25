import React, { useEffect, useRef, useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BedIcon from "@mui/icons-material/Bed";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import ClusterMap from "./map/ClusterMap";
import Rooms from "./rooms/Rooms";
// import AddRooms from "./addRooms/addRooms";

import AddRooms from "./AddRooms/AddRooms";
import Protected from "./protected/Protected";

function BottomNav() {
  const [value, setvalue] = useState(0);
  const ref = useRef();

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);
  return (
    <Box ref={ref}>
      {
        {
          0: <ClusterMap />,
          1: <Rooms />,
          2: (
            <Protected>
              <AddRooms setPage={setvalue} />
            </Protected>
          ),
        }[value]
      }
      <Paper
        elevation={3}
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 2 }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e, newValue) => setvalue(newValue)}
        >
          <BottomNavigationAction label="Map" icon={<LocationOnIcon />} />
          <BottomNavigationAction label="Rooms" icon={<BedIcon />} />
          <BottomNavigationAction label="Add" icon={<AddLocationAltIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default BottomNav;

