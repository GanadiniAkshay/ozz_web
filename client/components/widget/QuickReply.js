import React from 'react';

class QuickReply extends React.Component{
    constructor(props){
        super(props);
        this.message = props.message;
    }

    render(){
        const {color} = this.props;

        const quickStyle = {
            'color':color,
            'borderColor':color
        }

        var options = this.message.map((option,i)=>{
                    return (
                        <button className="quick_reply_button" key={i} style={quickStyle}>{option}</button>
                    )
        });

        return(
            <div className="quick_reply">
                {options}
            </div>
        )
    }
}

export default QuickReply;