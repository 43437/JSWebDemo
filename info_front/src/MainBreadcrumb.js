import React from 'react'

class MainBreadcrumb extends React.Component{
    constructor(props){
        super(props)
        this.onCrumbClick = this.onCrumbClick.bind(this)
    }

    onCrumbClick(index){
      // const path = this.props.prop.path.slice(0, index+1)
      this.props.prop.pathMgr.goPath(index)
      this.props.prop.updatePath()
    }

    render(){
        const cPath = this.props.prop.pathMgr.getPath()
        const lstSZ = cPath.length
        return (
            <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
              {
                  cPath.map((path, index) => {
                  if (index == lstSZ-1){
                    return <li className="is-active" key={index}><a aria-current="page">{path}</a></li>
                  }else{
                    return <li key={index}><a onClick={() => {this.onCrumbClick(index)}}>{path}</a></li>
                  }
                })
              }
              {/* <li className="is-active"><a href="#" aria-current="page">Breadcrumb</a></li> */}
            </ul> 
          </nav>
        )
    }
}

export default MainBreadcrumb