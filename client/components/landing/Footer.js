import React from 'react';
import {Link} from 'react-router';

export default () => {
 return(
    <div className="footer">
      <div className="container-sml">
        <div className="col-12 text-center">
          <div>
            <a className="nav-link" href="https://twitter.com/ozz_ai" target="_blank">
              Twitter
            </a>
            <a className="nav-link" href="https://www.facebook.com/ozzai-361093794245516/" target="_blank">
              Facebook
            </a>
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
            <Link className="nav-link" to="/tos">
              TOS
            </Link>
            <Link className="nav-link" to="/privacy">
              Privacy
            </Link>
          </div>
          <br/>
          <div>
            <span>
              © 2017 Ozz.
            </span>
          </div>
        </div>
      </div>
    </div>
 );
}