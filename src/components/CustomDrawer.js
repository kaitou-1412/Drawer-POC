import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import "./CustomDrawer.css";

export const CustomDrawer = () => {
  const [view, setView] = React.useState("list");
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const viewFilterPanel = React.useRef(true);

  const list1 = ["Inbox", "Starred", "Send email", "Drafts"];
  const list2 = ["Inbox 2", "Starred 2", "Send email 2", "Drafts 2"];
  const secondList1 = ["All mail", "Trash", "Spam"];
  const secondList2 = ["All mail 2", "Trash 2", "Spam 2"];

  const handleChange = (event, nextView) => {
    console.log(nextView, "nextView");
    viewFilterPanel.current = nextView !== "module" ? true : false;
    setView(nextView);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (viewTab) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer("right", false)}
      onKeyDown={toggleDrawer("right", false)}
    >
      <List>
        {(viewTab ? list1 : list2).map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {(viewTab ? secondList1 : secondList2).map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key="right">
        <ToggleButtonGroup
          className={
            state["right"] ? "toggle-button-2 slide-left" : "toggle-button"
          }
          orientation="vertical"
          value={view}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton
            value="list"
            aria-label="list"
            onClick={toggleDrawer("right", true)}
          >
            <ViewListIcon />
          </ToggleButton>
          <ToggleButton
            value="module"
            aria-label="module"
            onClick={toggleDrawer("right", true)}
          >
            <ViewModuleIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <Drawer
          anchor="right"
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list(viewFilterPanel.current)}
        </Drawer>
      </React.Fragment>
    </div>
  );
};
