import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { Spin, Tabs } from "antd";
import { useSelector } from "react-redux";

const menuItems = [
    {
        key: '/newOrder',
        label: `Fature e re`,
        children: <Outlet />
    },
    {
        key: '/products',
        label: `Produktet`,
        children: <Outlet />
    },
    {
        key: '/settings',
        label: `Settings`,
        children: <Outlet />
    },
    {
        key: '/orders',
        label: `Faturat`,
        children: <Outlet />
    },
    {
        key: '/users',
        label: `Perdoruesit`,
        children: <Outlet />
    },
    {
        key: '/profile',
        label: `Profili`,
        children: <Outlet />
    },
    {
        key: '/logout',
        label: `Dil`,
        children: <Outlet />
    },
];
export const MainContainer = () => {
    const navigate = useNavigate()
    const { isLogged, user, settings } = useSelector((state) => state.auth)
    console.log(settings)
    if (!isLogged && !Object.keys(user)?.length) return <Navigate to='/login' />
    if (settings !== false && !settings._id) return <Navigate to='/settings' />

    return <div className="main-container">
        <Tabs items={menuItems} onChange={navigate} />
    </div>
}