class PathManager{
    constructor(){
        this.path = []
        this.type = 0
        this.setPath = this.setPath.bind(this)
    }

    getPath(){
        return this.path
    }

    getPathType(){
        return this.type
    }

    setPath(path, type){
        this.path = path
        this.type = type
    }

    goPath(depth){
        this.path = this.path.concat(0, depth + 1)
    }
}

export default PathManager