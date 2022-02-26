class DataManager{
    constructor(){
        this.alldoc = []
        this.init = this.init.bind(this)
        this.getCollections = this.getCollections.bind(this)
        this.getAllDate = this.getAllDate.bind(this)
        this.getDocsByCollection = this.getDocsByCollection.bind(this)
        this.getDocsByDate = this.getDocsByDate.bind(this)
    }

    init(data){
        this.alldoc = data.docs
    }

    getCollections(){
        var collections = []
        for (var i in this.alldoc){
            collections.push(this.alldoc[i].collection)
        }
        return collections
    }

    getAllDate(){
        var allDate = []
        for (var i in this.alldoc){
            allDate.push(this.alldoc[i].date)
        }
        return allDate
    }

    getDocsByCollection(collection){
        var docs= []
        for (var i in this.alldoc){
            if (this.alldoc[i].collection == collection)
            docs.push(this.alldoc[i])
        }
        return docs
    }

    getDocsByDate(date){
        var docs= []
        for (var i in this.alldoc){
            if (this.alldoc[i].date == date)
            docs.push(this.alldoc[i])
        }
        return docs
    }
}

export default DataManager;