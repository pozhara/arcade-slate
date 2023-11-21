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
import { useCurrentUser } from "./contexts/CurrentUserContext";
import ReviewsPage from "./pages/reviews/ReviewsPage";
import LikedReviews from "./pages/reviews/LikedReviews";
import ReviewEditForm from "./pages/reviews/ReviewEditForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
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
          <Route exact path="/reviews/:id" render={() => <ReviewPage/>} />
          <Route exact path="/reviews/:id/edit" render={() => <ReviewEditForm/>} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
