import Header from '../shared/Header/Header'
import Footer from '../shared/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useState } from 'react';
const Main = () => {
  const [theme, setTheme] = useState('light');

  const darkThemeStyles = {
    backgroundColor: '#000',
    color: '#fff',
  };
  
  const lightThemeStyles = {
    backgroundColor: '#fff ',
    color: '#000',
  };
  console.log(theme);
  console.log(darkThemeStyles);
  const toggleTheme = () => {

    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  const themeStyles = theme === 'light' ? lightThemeStyles : darkThemeStyles;

  return (
    <div>
          <div style={themeStyles}>
            <Header></Header>
            <button onClick={toggleTheme}>Toggle Theme</button>

              <Outlet></Outlet>

            <Footer></Footer>
        </div>
    </div>
  )
}

export default Main