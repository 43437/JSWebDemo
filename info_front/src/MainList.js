import React from 'react'

class MainList extends React.Component{
    constructor(props){
        super(props)
    }

    onItemSelect(doc){
        this.props.prop.setDoc(doc)
        // this.props.prop.updateMainContentType(1)
        console.log('item: ', doc)
    }

    render(){
        var collections = []
        var path = this.props.prop.pathMgr.getPath()
        if (path.length > 0){
            if (1 == this.props.prop.activeTab){
                collections = this.props.prop.dataMgr.getDocsByCollection(path[path.length-1])
            }else if(2 == this.props.prop.activeTab){
                collections = this.props.prop.dataMgr.getDocsByDate(path[path.length-1])
            }
        }
        // this.props.prop.dataMgr
        return (
            <table className="table is-fullwidth">
            <thead>
                <tr>
                <th><abbr title="Collections">Collections</abbr></th>
                <th>Title</th>
                <th><abbr title="Date">Date</abbr></th>
                </tr>
            </thead>
            <tbody>
                {
                    collections.map((doc, index) => {
                        return (
                            <tr key={index} onClick={()=>{this.onItemSelect(doc)}}>
                                <th>{doc.collection}</th>
                                <td>{doc.title}</td>
                                <td>{doc.date}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
        )
    }
}

export default MainList;