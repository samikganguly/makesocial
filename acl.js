var MakeSocial = MakeSocial || {};
MakeSocial.ACL = function (args) {
    this.me = (args && args.me) ? args.me : (MakeSocial.ACL.PERM_READ + MakeSocial.ACL.PERM_WRITE);
    this.connections = (args && args.connections) ? args.connections : MakeSocial.ACL.PERM_READ;
    this.public = (args && args.public) ? args.public : MakeSocial.ACL.PERM_READ;
    this.accessAtDistance = {
        0 : this.me,
        1 : this.connections,
        3 : this.public
    };
    if(args.extendedACL) {
        this.extendedACL = args.extendedACL;
    }
};
MakeSocial.ACL.PERM_NONE = "-";
MakeSocial.ACL.PERM_WRITE = "w";
MakeSocial.ACL.PERM_READ = "r";
MakeSocial.ACL.ExtendedACL = function () {
    var acl = [];
    this.add = function (user, permission) {
        if(permission.indexOf(MakeSocial.ACL.PERM_NONE) == -1 &&
                permission.indexOf(MakeSocial.ACL.PERM_READ) == -1 &&
                permission.indexOf(MakeSocial.ACL.PERM_WRITE) == -1) {
            throw "Not a valid permission string";
        }
        acl.push({
            user: user,
            permission: permission
        });
    };
    this.get = function() {
        return acl;
    };
};
module.exports = MakeSocial.ACL;
