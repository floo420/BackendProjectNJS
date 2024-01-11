document.addEventListener("DOMContentLoaded", () => {
    const createUserButton = document.getElementById("createUserButton");
    const createEventButton = document.getElementById("createEventButton");
    const updateUserButton = document.getElementById("updateUserButton");
    const deleteUserButton = document.getElementById("deleteUserButton");
    const deleteEventButton = document.getElementById("deleteEventButton"); 
    const getAllUsersButton = document.getElementById("getAllUsersButton");

    // Add event listener for creating a new user
    createUserButton.addEventListener("click", async () => {
        try {
            const response = await fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: "florian",
                    last_name: "brasseur",
                    email: "florian@gmail.com",
                    phone_number: "123-456-7890",
                    birthdate: "2003-07-28"
                }),
            });

            if (response.status === 201) {
                console.log("User created successfully!");
            } else {
                const data = await response.json();
                console.error("Error creating user:", data.error);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    // Add event listener for creating a new event
    createEventButton.addEventListener("click", async () => {
        try {
            const response = await fetch("/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    event_name: "Sample Event",
                    event_date: "2024-01-20",
                    event_location: "Sample Location",
                    event_description: "This is a sample event description.",
                }),
            });

            if (response.status === 201) {
                console.log("Event created successfully!");
            } else {
                const data = await response.json();
                console.error("Error creating event:", data.error);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    // Add event listeners for other actions (update, delete, get all users) if needed
});
