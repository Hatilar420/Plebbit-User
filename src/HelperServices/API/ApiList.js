
class RouteList {

    BASE = "http://localhost:8080"

    LoginRoute = this.BASE + "/login"

    //Post Controller Routes
    PostBase = this.BASE + '/post/'
    GetUserPosts = this.PostBase + '/user'
    PostGroupPosts = this.PostBase+'g/'
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

    returnGetGroupById = (gid) =>{
        return `${this.GroupBase}${gid}`
    }

    returnGetUsersByGroup = (gid) =>{
        return `${this.GroupUserBase}${gid}`
    }

}

const ApiList = new RouteList()

export default ApiList