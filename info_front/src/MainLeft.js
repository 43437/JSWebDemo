import React from "react";
import '@fortawesome/fontawesome'

class MainLeft extends React.Component{
    constructor(props){
        super(props)
        this.onCollectionChoose = this.onCollectionChoose.bind(this)
        this.onTabChoose = this.onTabChoose.bind(this)
        this.filterTabs = ["All", "Collections", "Date"]
    }

    onCollectionChoose(collection){
        this.props.prop.pathMgr.setPath([collection], this.props.prop.activeTab)
        this.props.prop.updatePath()
        console.log(collection)
    }

    onTabChoose(index){
        this.props.prop.updateTab(index)
    }

    render(){
        const szTabs = this.filterTabs.length
        var collections = []
        var path = this.props.prop.pathMgr.getPath()
            if (1 == this.props.prop.activeTab){
                collections = this.props.prop.dataMgr.getCollections()
            }else if(2 == this.props.prop.activeTab){
                collections = this.props.prop.dataMgr.getAllDate()
            }
        return (
            <nav className="panel">
                <p className="panel-heading">
                    Repositories
                </p>
                <div className="panel-block">
                    <p className="control has-icons-left">
                    <input className="input" type="text" placeholder="Search"/>
                    <span className="icon is-left">
                        <i className="fas fa-search" aria-hidden="true"></i>
                    </span>
                    </p>
                </div>
                <p className="panel-tabs">
                    {
                        this.filterTabs.map((tab, index) => {
                            if (this.props.prop.activeTab == index){
                                return <a className="is-active" key={index}>{tab}</a>
                            }else{
                                return <a key={index} onClick={()=>{this.onTabChoose(index)}}>{tab}</a>
                            }
                        })
                    }
                </p>
                {
                    collections.map((todo, index) => {
                        return (
                        <a onClick={() => {this.onCollectionChoose(todo)}} key={index} className="panel-block">
                            <span className="panel-icon">
                            <i className="fas fa-code-branch" aria-hidden="true"></i>
                            </span>
                            {todo}
                        </a>
                        )
                    })
                }
                

                <div className="panel-block">
                    <button className="button is-link is-outlined is-fullwidth">
                    Reset all filters
                    </button>
                </div>
            </nav>
        )
    }
}

export default MainLeft;