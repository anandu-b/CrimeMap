import React from 'react';
import { Link } from 'react-router-dom';
import style from './Sidebar.module.css';
import HomeIcon from '@mui/icons-material/Home';
import { Home } from '@mui/icons-material';
import CollapseButton from '../collapseButton/CollapseButton';

const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <div className={style.collapsebuttonbox}>
        <CollapseButton/>
      </div>
      {/* <div className={style.link}>
        <Link to={'/user/home'} className={style.Link1}>
          <HomeIcon className={style.icon}/>
          Home
        </Link>
      </div> */}
      <div className={style.link}>
        <Link to={'/user/addcrime'} className={style.Link1}>
          Add Crime
        </Link>
      </div>
      <div className={style.link}>
        <Link to={'/user/showmap'} className={style.Link1}>
          View Map
        </Link>
      </div>
      <div className={style.link}>
        <Link to={'/user/listcrime'} className={style.Link1}>
          Recent Crimes
        </Link>
      </div>
      <div className={style.link}>
        <Link to={'/user/profile'} className={style.Link1}>
          View Profile
        </Link>
      </div>
      <div className={style.link}>
        <Link to={'/user/editprofile'} className={style.Link1}>
          Edit Profile
        </Link>
      </div>
      <div className={style.link}>
        <Link to={'/user/changepassword'} className={style.Link1}>
          Change Password
        </Link>
      </div>
      <div className={style.link}>
        <Link to={'/user/notification'} className={style.Link1}>
          Notifications
        </Link>
      </div>
      <div className={style.link}>
        <Link to={'./../../guest'} className={style.Link1}>
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;