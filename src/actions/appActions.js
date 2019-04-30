export const login = (av, un, bi) => {
    console.log("inside action")
    return {
        type: "LOGIN",
        avatar: av,
        username: un,
        bio: bi
    }
}
export const duxLogout = () => {
    return {
        type: "LOGOUT"
    }
}