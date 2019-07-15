const userResolvers = {
  Query: {
    allUsers: (root, args, { currentUser, dataSources }) => {
      if (!currentUser || !currentUser.admin) return null
      return dataSources.userDatabase.getAllUsers(currentUser)
    }
  },
  Mutation: {
    createUser: async (root, args, { dataSources }) => {
      const { username, password, name } = args
      let result
      if (username.toLowerCase() === 'superuser') {
        result = await dataSources.userDatabase.createSuperuser({
          username,
          password
        })
      } else {
        result = await dataSources.userDatabase.createUser({
          username,
          name,
          password
        })
      }
      return {
        value: result
      }
    },
    updateCurrentUser: async (_, args, { currentUser, dataSources }) => {
      const { username, name, password } = args
      const id = currentUser._id.toString()
      const result = await dataSources.userDatabase.updateUser({
        username,
        name,
        password,
        id
      })

      return {
        value: result
      }
    },
    login: async (_, args, { dataSources }) => {
      const { username, password } = args
      const result = await dataSources.userDatabase.login({
        username,
        password
      })

      return {
        value: result
      }
    }
  }
}

module.exports = {
  userResolvers
}
