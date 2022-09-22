const authenticate = (number, userType) => {
    // temp for testing
    if (number === "123" && userType === 1) {
        // fetch this from db
        let user = {
            firstName: "Divyam",
            lastName: "Chadha",
        }

        return user;
    }
        
    else
        return null;
};

export default authenticate;