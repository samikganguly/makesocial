var Sanitizer = require('./sanitizer');
var MakeSocial = MakeSocial || {};
MakeSocial.ACL = function (args) {
    this.me = MakeSocial.ACL.PERM_READ + MakeSocial.ACL.PERM_WRITE;
    this.connections = (args && args.connections) ? args.connections : MakeSocial.ACL.PERM_READ;
    this.public = (args && args.public) ? args.public : MakeSocial.ACL.PERM_READ;
    this.accessAtDistance = [
        this.me,
        this.connections,
        this.public
    ];
    this.extendedACL = args.extendedACL || new MakeSocial.ACL.ExtendedACL();
};

MakeSocial.ACL.PERM_NONE = "-";
MakeSocial.ACL.PERM_WRITE = "w";
MakeSocial.ACL.PERM_READ = "r";

MakeSocial.ACL.ExtendedACL = function () {
    var acl = [];
    this.add = function (user, permission) {
        permission = Sanitizer.sanitizePermission(permission);
        acl.push({
            user: user,
            perm: permission
        });
        return acl;
    };
    this.remove = function(user, permission) {
        permission = Sanitizer.sanitizePermission(permission);
        acl.forEach(function (ACLentry) {
            if(ACLentry.user === user && ACLentry.permission === permission)
                delete(ACLentry);
        });
        return acl;
    };
};
module.exports = MakeSocial.ACL;
