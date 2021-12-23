// var currentUserId = "User#4";       // 快递工作人员测试
var currentUserId = "User#2";    // 报修工作人员测试
// var currentUserId = "User#6";    // 报修工作人员2测试
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