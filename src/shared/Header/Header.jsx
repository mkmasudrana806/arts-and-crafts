
import {  Container, Nav, Navbar} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import { useContext } from 'react';
import { authContext } from '../../providers/AuthProvider/AuthProvider';

const Header = () => {

  const navigate=useNavigate();
  const {user,SignOut}=useContext(authContext);



  const signOut=()=>{
    SignOut()
    .then(()=>
        {
          console.log('sign out success');
          navigate('/');
        }
    )
    .catch(error=>console.log(error))
  }

  return (
    <Navbar className='nav_link' collapseOnSelect expand="lg" style={{backgroundColor:"#0C134F"}} variant="dark">
      <Container>
        <Navbar.Brand ><Link className='text-decoration-none text-light' to={'/'}><img style={{width:"80px"}} src='https://img.freepik.com/free-vector/font-design-word-art-craft-with-colorful-crayons_1308-44267.jpg?size=626&ext=jpg&ga=GA1.2.116927386.1683121921&semt=ais' alt='Art and Craft'></img></Link></Navbar.Brand>
        <Navbar.Brand ><Link className='text-decoration-none text-light' to={'/'}>Art And Craft</Link></Navbar.Brand>
    
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto navbar_custom">
          <Link className='text-decoration-none text-light' to={'/'}>Home</Link>
            <Link className='text-decoration-none text-light' to={'/instructors'}>Instructors</Link>
           
               <Link className='text-decoration-none text-light ' to={'/classes'}>Classes</Link>
          </Nav>
          <Nav className='align-items-center'>
            {
                user &&
                <Link className='text-light ' to={'/dashboard'}>Dashboard</Link>
            }
            {
              user &&
              
                <Link className='text-light ' onClick={signOut}>
              LogOut
            </Link>
              }
                {
              !user && <Nav className='me-auto navbar_custom'>
              <Link style={{backgroundColor:"#6772e5",borderRadius:"4px"}} className='text-decoration-none text-light' to={'/login'}>Login</Link>
  
            </Nav>
                }
           {user && <div className="profile">
           <img style={{width:"60px"}} className='img-img-fluid profile_img rounded-circle' src={user?.photoURL} alt="" />
            <Link className='profile_name'  href="#memes">
            {user?.displayName}
          </Link>
           </div>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header