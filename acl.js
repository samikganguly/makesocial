var MakeSocial = MakeSocial || {};
MakeSocial.ACL = function (args) {
    this.me = (args && args.me) ? args.me : (MakeSocial.ACL.PERM_READ + MakeSocial.ACL.PERM_WRITE);
    this.connections = (args && args.connections) ? args.connections : MakeSocial.ACL.PERM_READ;
    this.public = (args && args.public) ? args.public : MakeSocial.ACL.PERM_READ;
};
MakeSocial.ACL.PERM_NONE = "-";
MakeSocial.ACL.PERM_WRITE = "w";
MakeSocial.ACL.PERM_READ = "r";
module.exports = MakeSocial.ACL;
