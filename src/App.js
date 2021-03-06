import React from 'react'
import "./App.scss"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import ls from 'local-storage'
import { useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom"
import axios from "axios"
import SignupPage from "./components/SignupPage"
import LoginPage from "./components/LoginPage"
import ForgetPassword from "./components/ForgetPassword"
import Posts from "./components/Posts"
import Pagination from "./components/Pagination"
import LineChart from "./components/LineChart"
import Navbar from "./components/Navbar"
import SignupInfo from "./components/SignupInfo"

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("http://www.grabthetrendz.com/troubleshooter/get/services");
      setPosts(res.data.data);
      setLoading(false);
    }
    fetchPosts();
  }, []);


  //  get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //  change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <Router>
        <Link to="/"></Link>
        <Switch>
          <Route exact path="/" >
            <LoginPage />
          </Route>
          <Route exact path="/forget">
            <ForgetPassword />
          </Route>
          <Route exact path="/signup">
            <SignupPage />
          </Route>
          <Router>
            <Switch>
              <Route exact path="/signupinfo">
                <SignupInfo />
              </Route>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/linechart">
                <LineChart />
              </Route>
            </Switch>
          </Router>
          <Router>
            <Navbar />
            <Switch>
              <Route path='/linechart'>
                <div className="col-md-8 offset-md-2 ">
                  <div className="chart">
                    <LineChart />
                  </div>
                </div>
              </Route>
              <Route path="/posts">
                <Posts posts={currentPosts} loading={loading} /><br />
                <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} Paginate={paginate} />
              </Route>
              {/* <Route path='/calender' exact component={posts} /> */}
              <Route path='/products' component={ForgetPassword} />
            </Switch>
          </Router>
        </Switch>
      </Router >
    </div >
  );
}

export default App;