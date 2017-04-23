import React from 'react';
import giphy from '../../img/404.gif';

const NoMatch = ({ location }) => (
  <div>
		<img src={giphy} alt=".."/><br/><br/>	
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

export default NoMatch;