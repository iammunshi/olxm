const updateUser = (user) => {
    return {
        type: "UPDATE_USER",
        data: user
    }
}
const updateUsers = (users) => {
    return {
        type: "UPDATE_USERS",
        data: users
    }
}
const removeUser = () => {
    return {
        type: "REMOVE_USER"
    }
}

export {
    updateUser,
    updateUsers,
    removeUser
}