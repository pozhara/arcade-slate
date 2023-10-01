import styles from './App.module.css'
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm';

function App() {
  return (
    <div className={styles.App}>
      <NavBar/>
      <Container className={styles.Main}>
        <Switch>
          <Route exact path='/' render={()=><h1>Home page</h1>}/>
          <Route exact path='/reviews' render={()=><h1>Reviews</h1>}/>
          <Route exact path='/deals' render={()=><h1>Deals</h1>}/>
          <Route exact path='/signin' render={()=><h1>Sign in</h1>}/>
          <Route exact path='/signup' render={()=><h1><SignUpForm/></h1>}/>
          <Route render={()=><p>Page not found!</p>}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;