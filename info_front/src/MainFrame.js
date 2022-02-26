import React from "react";
import MDEditor from '@uiw/react-md-editor';
import '../node_modules/bulma/css/bulma.min.css'

class MainFrame extends React.Component{
    constructor(props){
        super(props);
        this.setMDValue = this.setMDValue.bind(this)
        let doc = this.props.prop.value
        this.state = { counter: 0, value: doc};
    }

    setMDValue(val){
        this.setState({value: val})
        this.props.prop.updateDoc(val)
    }

    render(){
        if (this.props.prop.editable){
            return (
                <div className="container">
                    <MDEditor
                        value={this.state.value}
                        onChange={(val) => {this.setMDValue(val)}}
                        height={500}
                    />
                </div>
            );
        }else{
            return (
                <div className="container">
                    <MDEditor.Markdown source={this.props.prop.value} />
                </div>
            )
        }
    }
}

export default MainFrame