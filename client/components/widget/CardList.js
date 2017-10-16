import React from 'react';

class CardList extends React.Component{
    constructor(props){
        super(props);
        this.message = props.message;
    }

    render(){
        const {color} = this.props;

        const linkStyle = {
            'color':color
        }
        var list = this.message.map((card,i)=>{
            return(
                <div className="ozz_card" key={i}>
                    <div>
                        <img src={card.img} height="100px"/>
                    </div>
                    <div style={{"textAlign":"center"}}>
                        <p>{card.title}</p>
                    </div>
                    <div style={{"textAlign":"center"}}>
                        <a style={linkStyle}>{card.button}</a>
                    </div>
                </div>
            )
        })
        return (
            <div>
                {list}
            </div>        
        )
    }
}

export default CardList;