import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ReviewCreateForm from "./pages/reviews/ReviewCreateForm";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import ReviewPage from "./pages/reviews/ReviewPage";
import ReviewsPage from "./pages/reviews/ReviewsPage";
import LikedReviews from "./pages/reviews/LikedReviews";
import ReviewEditForm from "./pages/reviews/ReviewEditForm";
import ProfilePage from './pages/profiles/ProfilePage';
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import ReviewsFeed from "./pages/reviews/ReviewsFeed";
import DealCreateForm from "./pages/deals/DealCreateForm";
import DealEditForm from "./pages/deals/DealEditForm";
import DealPage from "./pages/deals/DealPage";
import Deals from "./pages/deals/DealsPage";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/reviews/create" render={() => <ReviewCreateForm />} />
          <Route exact path="/reviews" render={() => <ReviewsPage/>} />
          <Route exact path="/reviews/all" render={() => <ReviewsPage/>} />
          <Route exact path="/liked" render={() => <LikedReviews/>} />
          <Route exact path="/feed" render={() =><ReviewsFeed/>}/>
          <Route exact path="/reviews/:id" render={() => <ReviewPage/>} />
          <Route exact path="/reviews/:id/edit" render={() => <ReviewEditForm/>} />
          <Route exact path='/profiles/:id' render={() => <ProfilePage/>}/>
          <Route exact path='/profiles/:id/edit/username' render={() => <UsernameForm/>}/>
          <Route exact path='/profiles/:id/edit/password' render={() => <UserPasswordForm/>}/>
          <Route exact path='/profiles/:id/edit' render={() => <ProfileEditForm/>}/>
          <Route exact path='/deals/create' render={() => <DealCreateForm/>}/>
          <Route exact path='/deals' render={() => <Deals/>}/>
          <Route exact path='/deals/:id' render={() =>  <DealPage/>}/>
          <Route exact path="/deals/:id/edit" render={() => <DealEditForm/>}/>
          <Route render={() => <p className='text-white'><NotFound/></p>} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
