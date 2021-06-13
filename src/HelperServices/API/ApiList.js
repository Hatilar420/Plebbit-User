
class RouteList {

    BASE = "http://localhost:8080"

    LoginRoute = this.BASE + "/login"

    //Post Controller Routes
    PostBase = this.BASE + '/post'
    GetUserPosts = this.PostBase + '/user'

    //User Controller routes
    UserBase  = this.BASE + '/user/'


    //Group Controller routes
    GroupBase =  this.BASE + '/group/'

    returnGetGroupById = (gid) =>{
        return `${this.GroupBase}${gid}`
    }

}

const ApiList = new RouteList()

export default ApiList