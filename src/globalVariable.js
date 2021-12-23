var currentUserId = "User#2";
var currentUserAuthorization = "77";
var currentUserStatus = "";

export default {
    currentUserId: function (){
        return currentUserId;
    },
    currentUserAuthorization: function (){
        return currentUserAuthorization;
    },
    currentUserStatus: function (){
        return currentUserStatus;
    },
    setId(item){
        currentUserId = item;
    },
    setAuthorization(item){
        currentUserAuthorization = item;
    },
};