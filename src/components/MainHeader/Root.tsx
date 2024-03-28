import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function Root() {
  return (
    <>
      {/* Todo: Add Header */}
      <header id="main-header">
        <h1>React Classes</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''} end>Our Mission</NavLink>
            </li>
            <li>
              <NavLink to="/sessions" className={({isActive}) => isActive ? 'active' : ''}>Browse Sessions</NavLink>
            </li>
            <li>
              {/* <Button onClick={showUpcomingSessions}>Upcoming Sessions</Button> */}
              <button >Upcoming Sessions</button>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
} 