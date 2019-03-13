import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import renderCard from './card';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

let model = {blogs : 0}

class Page extends React.Component{

    showCard=()=>{
        renderCard();
    }

    render(){
        return(
            <div>
                <button onClick={this.showCard}>Show Card</button>
            </div>
        );
    }
}

function render()
{
    ReactDOM.render(<Page />, document.getElementById('root'));
}

const Card = (props) => {
    return(
        <div> 
            <img src={props.avatar_url} width='50'/>
            <div style={{display : 'inline-block',marginLeft : 10}}>
                <div style={{fontSize : '1.25em',fontWeight : 'bold'}}>{props.name}</div>
                <div>{props.id}</div>
            </div>
        </div>
    )
}

const CardList = (props) => {
    return(
        <div>
            {props.cards.map(card => <Card {...card}/>)}
        </div>
    );
}

class Form extends React.Component{
    state = {userName:''}
    
    handleSubmit=(event)=>{
        event.preventDefault();
        axios.get(`https://api.github.com/users/${this.state.userName}`)
        .then(resp => {
            this.props.onSubmit(resp.data);
            this.setState({userName : ''});
        });
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                    <input type='text' required value={this.state.userName} onChange={(event) => this.setState({userName : event.target.value})}/>
                    <button type='submit'>Add Card</button>
            </form>
        )
    }
}

function renderCard()
{
    ReactDOM.render(<Page1 />, document.getElementById('root'));
}

class Page1 extends React.Component{

    state = {card: []};   
    
    addCard=(cardInfo)=>{
        this.setState(prevState => ({card : this.state.card.concat(cardInfo)}));
    }

    render(){
        return(
            <div>
                <Form onSubmit={this.addCard}/>    
                <CardList cards={this.state.card}/>
            </div>
        );        
    }
}

renderCard();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();