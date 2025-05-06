import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import { useThemeToggle } from "../../context/theme/ThemeContextProvider";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;
const navItems = [
  { label: "Home", path: "/" },
  { label: "Exchange Rates (LIVE)", path: "/exchange-rates" },
  { label: "Error", path: "/error" },
];

const NavBar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeToggle();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ py: 2 }}>
        <img
          src="https://noveloffice.in/wp-content/uploads/2023/08/novel-office-logo.webp"
          alt="Novel Logo"
          title="Novel Office"
          style={{ maxWidth: "200px", height: "auto" }}
        />
      </Box>
      <Divider sx={{ borderColor: "#ffffff30" }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", width: "100%", maxWidth: "1680px" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor:
            mode === "dark"
              ? theme.palette.background.default
              : theme.palette.primary.main,
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <img
              src="https://noveloffice.in/wp-content/uploads/2023/08/novel-office-logo.webp"
              alt="Novel Logo"
              title="Novel Office"
              style={{ maxWidth: "250px", height: "auto", padding: "5px" }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <label
              style={{
                color: theme.palette.common.white,
                marginRight: "10px",
              }}
            >
              {mode === "dark" ? "Dark Mode" : "Light Mode"}
            </label>
            <Switch
              checked={mode === "dark"}
              onChange={toggleTheme}
              color="default"
            />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                sx={{
                  color: theme.palette.common.white,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          anchor="right"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavBar;