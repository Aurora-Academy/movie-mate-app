# User Sign up

- database user record save
- nodemailer services module
- async await nodemailer service
- validation concept
- email from req.body, send welcome user email (event or async await)

# User Login

- input=> req.body => email, password
  - if email and password doesn't match => throw error
- output=> jwt token

# User list API (admin)

- if user is admin, show list of user
- if user is not admin, throw unauthorized error

- How?? By using JWT Token; by sending jwt token through headers.

# Utils

- secure => Verify JWT Token with checkRole middleware
- token => generateToken, verifyToken, checkRole

---

# User Signup

- API Endpoint (msg: User signup successfully)(/register)
- userController.register()
- register controller

  1. email, password check
  2. create bcrypt utility file (genHash, compareHash)
  3. payload.password = genHash(password)
  4. userModel.create(payload)
  5. email signup (email notification)

  # user login

  - APi endpoint (/login)
  - userController.login()
  - login controller

    1. email exist; isActive: true
    2. check email verification of user
    3. email not verified , throw error
    4. compare password hash with user password
    5. if invalid, throw error
    6. return true

  # Email Token Generation

  - API (/generate-email-token)

  1. email exist; isActive: true
  2. use crypto util, to create otp (truly random otp)
  3. if not verified, generate otp
  4. Store the otp in the user database
  5. email that otp

  # Email Token Verification

  - API (/verify-email-token)

  1. email exist; isActive: true
  2. compare otp
  3. if verified, update user database with isEmailVerified: true, otp: ""
  4. else Token invalid

  -----------Day 2-------------

  # User list (admin)

  - .find()
  - secure pass admin as sys role
  - select false

  # User block (admin)

  - blockUser method
  - user findOne({\_id: id})
  - use opposite of user isActive status
  - user updateOne()

  # user delete (admin)

  - secure admin only
  - user findOne()
  - user deleteOne({\_id: id})

  # get user profile (user, admin)

  - secure()
  - checkRole update for sysRole empty condition
  - secure token send only {name, email}
  - token decrypt
  - use email to find user detail (isActive: true, isEmail: true)
  - user Role and pass it to checkRole
  - user id => req.currentUser

  # update user profile (user, admin)

  # get user detail (admin)

  # user password change (user)

  # user password reset (admin)

  # user forget password (user, admin)
