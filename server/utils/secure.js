const { checkRole, verifyToken } = require("./token");
const userModel = require("../modules/users/user.model");

const secure = (sysRole = []) => {
  return async (req, res, next) => {
    try {
      const { access_token } = req.headers;
      // what to do if no token
      if (!access_token) throw new Error("Token is missing");
      // check the token is valid or not
      const isValid = verifyToken(access_token);
      // token expired??
      if (!isValid) throw new Error("Token expired");
      const { data } = isValid;
      // Check user email with database
      const userInfo = await userModel.findOne({
        email: data?.email,
        isActive: true,
        isEmailVerified: true,
      });
      if (!userInfo) throw new Error("user not found");
      // RBAC vs PBAC vs ABAC
      const validRole = checkRole({ sysRole, userRole: userInfo?.roles || [] });
      if (!validRole) throw new Error("User unauthorized");
      req.currentUser = userInfo?._id;
      req.isAdmin = userInfo?.roles.includes("admin");
      next();
    } catch (e) {
      next(e);
    }
  };
};

module.exports = { secure };
