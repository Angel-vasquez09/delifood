import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Collapse, ListItem, useMediaQuery } from '@mui/material';
import { SideMenuDashboard } from 'components';
import { AuthContext, UiContext } from 'context';
import Head from 'next/head';
import { AdminPanelSettings, CategoryOutlined, ConfirmationNumber, ConfirmationNumberOutlined, ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { ListItemDrawer, MyListItem } from '../ui';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


interface Props {
    title: string;
    pageDescripcion: string;
}

export const DashboardLayout: React.FC<Props> = ({ children,title,pageDescripcion }) => {
    const theme = useTheme();
    const matches = useMediaQuery('(max-width:600px)');
    const [open, setOpen] = React.useState(false);
    const [openList, setOpenList] = React.useState(true);
    const [ openCollapse, setOpenCollapse ] = React.useState({
        openUser     : false,
        openProductos: false
    });
    const { openUser, openProductos } = openCollapse;

    const handleCollapse = ( collapse: string, open: boolean ) => {
        setOpenCollapse({
            ...openCollapse,
            [collapse]: open
        });
    }
    const handleClick = () => {
        setOpenList(!openList);
    };

    const { isMenuDashOpen, toggleSideMenuDash } = React.useContext(UiContext);

    const handleDrawerOpen = () => {
        if(matches){
            console.log("Mostrar Drawer");
            toggleSideMenuDash();
            return;
        }
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>

            <Head>
                <title>{title}</title>

                <meta name="description" content={pageDescripcion}/>
                <meta name="og:title" content={title}/>
                <meta name="og:description" content={pageDescripcion}/>
            </Head>

            <SideMenuDashboard />

            <main>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />


                    <AppBar position="fixed" open={open}>
                        <Toolbar sx={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}>
                            <IconButton
                                color="primary"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 5,
                                    ...(open && { display: 'none' })
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography sx={{ color: 'black' }} variant="h6" noWrap component="div">
                                Dashboard | Angel
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <Drawer sx={{ display: { xs: 'none', sm: 'block'}}} variant="permanent" open={open}>
                        <DrawerHeader sx={{ display: 'flex', justifyContent: 'space-between'}}>
                            <Typography variant="h6">Food|Angel</Typography>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </DrawerHeader>
                        <Divider />
                        {/* onClick={ () => navigateTo('/orders/history') } */}
                        <ListItemDrawer open={ open }/>
                        {/* <Divider /> */}

                    </Drawer>



                    <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, sm: 3 } }}>
                        <DrawerHeader />
                        <Box>{ children }</Box>
                    </Box>
                </Box>
            </main>
        </>
    );
}
