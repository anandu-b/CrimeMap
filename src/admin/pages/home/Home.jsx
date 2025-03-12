import Sidebar from "../../componets/sidebar/Sidebar";
import Navbar from "../../componets/navbar/Navbar";
import "./home.scss";
import Widget from "../../componets/widget/Widget";
import Featured from "../../componets/featured/Featured";
import Chart from "../../componets/chart/Chart";
import Table from "../../componets/table/Table";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          
        </div>
        
        <div className="listContainer">
          <div className="listTitle">Recent Crimes</div>
            {/*<Table />*/}
        </div>

        <div className="details" class="cardd">
              <Typography gutterBottom sx={{ color: 'text.secondary'}} className="cardtitle">
                About
              </Typography>
              <Typography sx={{ color: 'text.primary'}} className = "text2">
              Crime Radar is a platform for real-time crime reporting and mapping. It allows users to report incidents, and receive live alerts about nearby threats.
              </Typography>
        </div>
      </div>
    </div>
  );
};

export default Home;
