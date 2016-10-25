
import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';

import {Router,Route ,IndexRoute,Link, hashHistory} from 'react-router';



export default class App extends React.Component{

	render(){
		return (
			<div>
				app
				{this.props.children}
			</div>
			)
	}
} 



class Left extends React.Component{
	render(){
		return (
				<h1>Left content</h1>
			)
	}
}
class Right extends React.Component{

	componentDidMount() {
		var a = this.props.params;
		console.log(this.props.params);
	}

	render(){
		return (
				<h1>Right content</h1>
			)
	}
}

class Content extends React.Component{

	render(){
		return (
			<div>
				content
				{this.props.children}
			</div>
			)
	}
} 

class Main extends React.Component{
	render(){
		return (
				<div>
					main page
					<ul>
						<li><Link className="l1" to="/main/left">Left</Link></li>
						<li><Link to="/main/right">Right</Link></li>
					</ul>
					
					{this.props.children}
				</div>
			)
	}
}


ReactDOM.render(
	
	<Router history={hashHistory}>
		
		<Route path="/" component={App}>
			<Route path="left" component={Left} />
			<Route path="right" component={Right} />
		</Route>
		<Route path="/main" component={Main}>
			<Route path="left" component={Left} />
			<Route path="right" component={Right} />
		</Route>
	</Router>
	

	, 
	$('#container')[0])


// <Route path="/" component={App}>
// 			<IndexRoute component={Main} />
// 			<Route path="left" component={Left}/>
// 			<Route path="right" component={Right}/>
// 		</Route>


