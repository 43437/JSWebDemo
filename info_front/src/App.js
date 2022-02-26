import MainFrame from './MainFrame'
import MainLeft from './MainLeft'
import MainBreadcrumb from './MainBreadcrumb'
import '../node_modules/bulma/css/bulma.min.css'
import React from 'react'
import {get, post} from './http'
import DataManager from './DataManager'
import PathManager from './PathManager'
import MainList from './MainList'

class App extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {
      editdoc: false,
      path: [],
      MainLeft: {
        activeTab: 0
      },
      pathState: 1,
      mainContentType: 0,
    }
    this.dataMgr = new DataManager()
    this.pathMgr = new PathManager()
    this.refreshDocEditable = this.refreshDocEditable.bind(this)
    this.updateDoc = this.updateDoc.bind(this)
    this.updatePath = this.updatePath.bind(this)
    this.updateTab = this.updateTab.bind(this)
    this.updateMainContentType = this.updateMainContentType.bind(this)
    this.setDoc = this.setDoc.bind(this)
    this.doc = {}
  }

  componentDidMount(){
    get('/api/alldoc', '').then((rsp) => {
      this.dataMgr.init(rsp.data)
      console.log(rsp)
    }, (err) => {
      console.log('err: ', err)
    })
  }

  refreshDocEditable(){
    if (this.state.editdoc){
      post('/api/doc', this.doc).then((rsp) => {
        this.setState({
          editdoc: false
        }, (err) => {
          console.log('post failed: ', err)
        })
      })
    }else{
      this.setState({
        editdoc: true
      })
    }
  }

  setDoc(doc){
    this.doc = doc
    this.doc.content = ''
    get('/api/doc', this.doc.sn).then((rsp) => {
      this.doc.content = rsp.data.doc
      this.updateMainContentType(1)
    }, (err) => {
      console.log('get doc error: ', err)
    })
  }

  updateDoc(val){
    this.doc.content = val
  }

  updateMainContentType(type){
    this.setState({
      mainContentType: type
    })
  }

  updatePath(){
    this.setState({
      pathState: this.state.pathState + 1,
    })
    this.updateMainContentType(0)
  }

  updateTab(index){
    this.setState({
      MainLeft: {activeTab: index}
    })
  }

  render(){
    const MainFrameProp = {
      updatePath: this.updatePath,
      editable: this.state.editdoc,
      value: this.doc.content,
      updateDoc: this.updateDoc,
      dataMgr: this.dataMgr,
      pathMgr: this.pathMgr,
      pathState: this.state.pathState,
    }
    const MainBreadcrumbProp = {
      updatePath: this.updatePath,
      dataMgr: this.dataMgr,
      pathMgr: this.pathMgr,
      pathState: this.state.pathState,
    }
    const MainLeftProp = {
      updatePath: this.updatePath,
      updateTab: this.updateTab,
      activeTab: this.state.MainLeft.activeTab,
      dataMgr: this.dataMgr,
      pathMgr: this.pathMgr,
      pathState: this.state.pathState,
    }
    const MainListProp = {
      updatePath: this.updatePath,
      activeTab: this.state.MainLeft.activeTab,
      dataMgr: this.dataMgr,
      pathMgr: this.pathMgr,
      pathState: this.state.pathState,
      updateMainContentType: this.updateMainContentType,
      setDoc: this.setDoc,
    }
    let mainContent
    if (0 != this.state.mainContentType){
      mainContent = (
        <div>
          <button className="button is-small" onClick={this.refreshDocEditable}>edit</button> 
          <MainFrame prop = {MainFrameProp}/>
      </div>
      )
    }else{
      mainContent = (<MainList prop = {MainListProp}/>)
    }
    return (
      <div className="columns">
        <div className="column is-one-fifth">
          <MainLeft prop = {MainLeftProp}/>
        </div>
        <div className="column">
          <MainBreadcrumb prop = {MainBreadcrumbProp}/>
          {mainContent}
        </div>
      </div>
    );
  }
}

export default App;
