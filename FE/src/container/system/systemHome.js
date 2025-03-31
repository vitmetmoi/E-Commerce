import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import { Navigate, useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DashBoard from './container/DashBoard';
import ManageOrder from './container/ManageOrder';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import './SystemHome.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHippo, faPlane, faUser, faSnowflake, faLock, faKey } from '@fortawesome/free-solid-svg-icons'
import CheckroomIcon from '@mui/icons-material/Checkroom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GroupsIcon from '@mui/icons-material/Groups';
import { SYSTEM_NAV } from '../../utils/constant';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import ManageAddNewClothes from './container/ManageAddNewClothes';
import { Scrollbar } from 'react-scrollbars-custom';
import { createTheme } from '@mui/material/styles';
import ManageClothes from './container/ManageClothes';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ManageSupport from './container/ManageSupport';
function SystemHome(props) {

    const navigate = useNavigate();
    const router = useSystemRouter('/dashboard');

    const NAVIGATION = [
        {
            kind: 'header',
            title: 'Main items',
        },
        {
            segment: SYSTEM_NAV.DASH_BOARD,
            title: 'Dashboard',
            icon: <DashboardIcon />,
        },
        {
            segment: SYSTEM_NAV.ORDERS,
            title: 'Orders',
            icon: <ShoppingCartIcon />,
        },

        {
            kind: 'divider',
        },

        {
            kind: 'header',
            title: 'Manage',
        },
        {
            segment: SYSTEM_NAV.CLOTHES,
            title: 'Clothes',
            icon: <CheckroomIcon />,
            children: [
                {
                    segment: SYSTEM_NAV.CREATE,
                    title: 'Create',
                    icon: <AddShoppingCartIcon />,
                },
                {
                    segment: SYSTEM_NAV.MENU,
                    title: 'Menu',
                    icon: <FormatListBulletedIcon />,
                },
            ],
        },

        {
            kind: 'divider',
        },
        {
            kind: 'header',
            title: 'Groups',
        },
        {
            segment: SYSTEM_NAV.SUPPORTS,
            title: 'Support',
            icon: <SupportAgentIcon />,
            children: [
                // {
                //     segment: SYSTEM_NAV.CREATE_CHAT,
                //     title: 'Create chat',
                //     icon: <MarkUnreadChatAltIcon />,
                // },
                {
                    segment: SYSTEM_NAV.LIST,
                    title: 'List',
                    // icon: <FormatListBulletedIcon />,
                    icon: <MarkUnreadChatAltIcon />
                },
            ],
        },
    ];



    function PageContent({ pathname }) {
        console.log('path', pathname)
        return (
            <Box
                sx={{
                    py: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                {pathname === `/${SYSTEM_NAV.DASH_BOARD}` && <DashBoard></DashBoard>}
                {pathname === `/${SYSTEM_NAV.ORDERS}` && <ManageOrder></ManageOrder>}
                {pathname === `/${SYSTEM_NAV.CLOTHES}/${SYSTEM_NAV.CREATE}` && <ManageAddNewClothes></ManageAddNewClothes>}
                {pathname === `/${SYSTEM_NAV.CLOTHES}/${SYSTEM_NAV.MENU}` && <ManageClothes></ManageClothes>}
                {pathname === `/${SYSTEM_NAV.CLOTHES}` && <ManageClothes></ManageClothes>}
                {pathname === `/${SYSTEM_NAV.SUPPORTS}` && <ManageSupport />}
                {pathname === `/${SYSTEM_NAV.SUPPORTS}/${SYSTEM_NAV.LIST}` && <ManageSupport />}
            </Box>
        );
    }

    const BRANDING = {
        homeUrl: '/dashboard',
        logo: (
            <>
                <div className='logo-container' onClick={() => { navigate('/') }}>
                    <FontAwesomeIcon className='middle-icon' icon={faSnowflake} />
                </div>
            </>
        ),
        title: 'System',
    };

    function useSystemRouter(initialPath) {
        const [pathname, setPathname] = React.useState(initialPath);

        const router = React.useMemo(() => {
            return {
                pathname,
                searchParams: new URLSearchParams(),
                navigate: (path) => setPathname(String(path)),
            };
        }, [pathname]);

        return router;
    }



    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            branding={BRANDING}
        >

            <DashboardLayout>
                <PageContent pathname={router.pathname} />
            </DashboardLayout>

        </AppProvider>
    );
}

export default SystemHome;