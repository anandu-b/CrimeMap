import React from 'react';
import style from './Navbar.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Avatar, Button, Card, Popover, Typography } from '@mui/material';
import img1 from '../../../assets/1.jpg';

const Navbar = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const navigate = useNavigate();
  const handlelogout = () => {
    navigate("/");
  }
  return (
    <div className={style.main}>
      <div className={style.inside}>
        <div className={style.Links}>
          <Link to={'/officials/landoff'} className={style.Link}>
            Home
          </Link>
        </div>
        <div className={style.Links}>
          <Link to={'/officials/crimelist'} className={style.Link}>
            Crime Listing
          </Link>
        </div>
      </div>
      <div className={style.inside}>
        <div className={style.Images}>
          <Avatar alt="Profile" src={img1} onClick={handleClick} className={style.avatar} />

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}

            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Card sx={{ width: 200, height: 190, pt: 2 }}>
              <div className={style.box}>
                <div className={style.box1}>
                  <Link to={'/officials/profile'}>
                    <Typography className={style.boxitem}>
                      My Profile
                    </Typography>
                  </Link>
                  <Typography className={style.boxitem}>
                    Edit Profile
                  </Typography>
                  <Typography className={style.boxitem}>
                    Change Password
                  </Typography>
                </div>
                <div className={style.box1}>
                  <Button variant="contained" onClick={handlelogout}>
                    Log Out
                  </Button>
                </div>
              </div>
            </Card>

          </Popover>

        </div>
      </div>
    </div>
  );
};

export default Navbar;