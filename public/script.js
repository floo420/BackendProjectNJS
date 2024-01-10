document.addEventListener("DOMContentLoaded", () => {
    const createUserButton = document.getElementById("createUserButton");
    const updateUserButton = document.getElementById("updateUserButton");
    const deleteUserButton = document.getElementById("deleteUserButton");
    const getAllUsersButton = document.getElementById("getAllUsersButton");

    // Add event listeners for button clicks
    createUserButton.addEventListener("click", () => {
        // Perform API action to create a new user here
        console.log("Creating a new user...");
    });

    updateUserButton.addEventListener("click", () => {
        // Perform API action to update an existing user here
        console.log("Updating an existing user...");
    });

    deleteUserButton.addEventListener("click", () => {
        // Perform API action to delete a user here
        console.log("Deleting a user...");
    });

    getAllUsersButton.addEventListener("click", () => {
        // Perform API action to get all users here
        console.log("Getting all users...");
    });
});
