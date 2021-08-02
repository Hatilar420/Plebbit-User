
class RouteList {

    BASE = "http://localhost:8080"

    LoginRoute = this.BASE + "/login"
    RegisterRoute = this.BASE + "/register"

    //Post Controller Routes
    PostBase = this.BASE + '/post/'
    GetUserPosts = this.PostBase + '/user'
    PostGroupPosts = this.PostBase+'g/'
    PostContent = this.PostBase + 'p/'
    returnGroupPosts = (gid) =>{
        return `${this.PostGroupPosts}${gid}`
    }

    //User Controller routes
    UserBase  = this.BASE + '/user/'
    returnUserById = (uid) =>{
        return `${this.UserBase}${uid}`
    }

    //Group Controller routes
    GroupBase =  this.BASE + '/group/'
    GroupUserBase = this.GroupBase + '/users/'
    GroupGameBase = this.GroupBase + 'game/'

    returnGetGroupById = (gid) =>{
        return `${this.GroupBase}${gid}`
    }

    returnGetUsersByGroup = (gid) =>{
        return `${this.GroupUserBase}${gid}`
    }

    //Get Word APi call
    GetWordBase = 'http://random-word-form.herokuapp.com/random'
    GetAdjective = this.GetWordBase+'/adjective'
    GetNoun = this.GetWordBase+'/noun'
    GetAnimal = this.GetWordBase+'/animal'


}

const ApiList = new RouteList()

export default ApiList