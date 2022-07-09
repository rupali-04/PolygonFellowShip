
import './Home.css';
import { Link } from "react-router-dom";

function Home() {

  return (
    <div className="App">
      <header className="App-header">
       <h2>Decentralized Social Media</h2>
       <div>
        <Link to="/explore">
            <button className="View">View All</button>
        </Link>
        <Link to="/create">

        
       <button className="Post">Create New+</button>
       </Link>
       </div>
      </header>
    </div>
  );
}

export default Home;
