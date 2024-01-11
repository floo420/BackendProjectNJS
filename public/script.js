document.addEventListener("DOMContentLoaded", () => {
    const createUserButton = document.getElementById("createUserButton");
    const createEventButton = document.getElementById("createEventButton");
    const updateUserButton = document.getElementById("updateUserButton");
    const updateEventButton = document.getElementById("updateEventButton");
    const deleteUserButton = document.getElementById("deleteUserButton");
    const deleteEventButton = document.getElementById("deleteEventButton"); 
    const getAllUsersButton = document.getElementById("getAllUsersButton");
    const getAllEventsButton = document.getElementById("getAllEventsButton");

    const userList = document.getElementById("userList");
    const eventList = document.getElementById("eventList");

    const createUserForm = document.getElementById("createUserForm");
    createUserForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const formData = new FormData(createUserForm);
            const response = await fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: formData.get("first_name"),
                    last_name: formData.get("last_name"),
                    email: formData.get("email"),
                    phone_number: formData.get("phone_number"),
                    birthdate: formData.get("birthdate"),
                }),
            });

            if (response.status === 201) {
                console.log("User created successfully!");
                createUserForm.reset(); // Clear the form
                fetchUsers(); // Refresh user list
            } else {
                const data = await response.json();
                console.error("Error creating user:", data.error);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    // Add event listener for creating a new event
    const createEventForm = document.getElementById("createEventForm");
    createEventForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const formData = new FormData(createEventForm);
            const response = await fetch("/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    event_name: formData.get("event_name"),
                    event_date: formData.get("event_date"),
                    event_location: formData.get("event_location"),
                    event_description: formData.get("event_description"),
                }),
            });

            if (response.status === 201) {
                console.log("Event created successfully!");
                createEventForm.reset(); // Clear the form
                fetchEvents(); // Refresh event list
            } else {
                const data = await response.json();
                console.error("Error creating event:", data.error);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });


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
    updateUserButton.addEventListener("click", async () => {
        // Assuming you have a form with id "updateUserForm" for updating users
        const updateUserForm = document.getElementById("updateUserForm");

        try {
            // Extract data from the form
            const formData = new FormData(updateUserForm);
            const userId = formData.get("user_id"); // Assuming you have a field with user ID

            // Make a fetch request to update the user
            const response = await fetch(`/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // Include fields you want to update in the body
                    first_name: formData.get("first_name"),
                    last_name: formData.get("last_name"),
                    // ...
                }),
            });

            if (response.status === 200) {
                console.log("User updated successfully!");
            } else {
                const data = await response.json();
                console.error("Error updating user:", data.error);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    deleteUserButton.addEventListener("click", async () => {
        const deleteUserForm = document.getElementById("deleteUserForm");

        try {
            // Extract data from the form
            const formData = new FormData(deleteUserForm);
            const userId = formData.get("user_id"); 

            // Make a fetch request to delete the user
            const response = await fetch(`/users/${userId}`, {
                method: "DELETE",
            });

            if (response.status === 204) {
                console.log("User deleted successfully!");
            } else {
                const data = await response.json();
                console.error("Error deleting user:", data.error);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
    updateEventButton.addEventListener("click", async () => {
        const updateEventForm = document.getElementById("updateEventForm");
    
        try {
            // Extract data from the form
            const formData = new FormData(updateEventForm);
            const eventId = formData.get("event_id"); // Assuming you have a field with event ID
    
            // Make a fetch request to update the event
            const response = await fetch(`/events/${eventId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // Include fields you want to update in the body
                    event_name: formData.get("event_name"),
                    event_date: formData.get("event_date"),
                    event_location: formData.get("event_location"),
                    event_description: formData.get("event_description"),
                    // ...
                }),
            });
    
            if (response.status === 200) {
                console.log("Event updated successfully!");
            } else {
                const data = await response.json();
                console.error("Error updating event:", data.error);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
    
    deleteEventButton.addEventListener("click", async () => {
        // Assuming you have a form with id "deleteEventForm" for deleting events
        const deleteEventForm = document.getElementById("deleteEventForm");
    
        try {
            // Extract data from the form
            const formData = new FormData(deleteEventForm);
            const eventId = formData.get("event_id"); // Assuming you have a field with event ID
    
            // Make a fetch request to delete the event
            const response = await fetch(`/events/${eventId}`, {
                method: "DELETE",
            });
    
            if (response.status === 204) {
                console.log("Event deleted successfully!");
            } else {
                const data = await response.json();
                console.error("Error deleting event:", data.error);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    const createUserListItem = (user) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${user.first_name} ${user.last_name} - Email: ${user.email}`;
        
        // Buttons for updating and deleting the user
        const updateUserButton = document.createElement("button");
        updateUserButton.textContent = "Update";
        updateUserButton.addEventListener("click", () => updateUser(user.user_id));

        const deleteUserButton = document.createElement("button");
        deleteUserButton.textContent = "Delete";
        deleteUserButton.addEventListener("click", () => deleteUser(user.user_id));

        listItem.appendChild(updateUserButton);
        listItem.appendChild(deleteUserButton);
        
        return listItem;
    };

    // Function to create event list items
    const createEventListItem = (event) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Event Name: ${event.event_name} - Date: ${event.event_date}, Location: ${event.event_location}`;
        
        // Buttons for updating and deleting the event
        const updateEventButton = document.createElement("button");
        updateEventButton.textContent = "Update";
        updateEventButton.addEventListener("click", () => updateEvent(event.event_id));

        const deleteEventButton = document.createElement("button");
        deleteEventButton.textContent = "Delete";
        deleteEventButton.addEventListener("click", () => deleteEvent(event.event_id));

        listItem.appendChild(updateEventButton);
        listItem.appendChild(deleteEventButton);
        
        return listItem;
    };

    // Fetch and display users and events
    const fetchUsers = async () => {
        try {
            const response = await fetch("/users");
            const users = await response.json();
            userList.innerHTML = "";
            users.forEach((user) => {
                const listItem = createUserListItem(user);
                userList.appendChild(listItem);
            });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await fetch("/events");
            const events = await response.json();
            eventList.innerHTML = "";
            events.forEach((event) => {
                const listItem = createEventListItem(event);
                eventList.appendChild(listItem);
            });
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };
    fetchUsers();
    fetchEvents();

    const updateUser = async (userId) => {
        try {
            const updateUserForm = document.getElementById("updateUserForm");
            const formData = new FormData(updateUserForm);
    
            const response = await fetch(`/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: formData.get("first_name"),
                    last_name: formData.get("last_name"),
                    // Include other fields you want to update
                }),
            });
    
            if (response.status === 200) {
                console.log("User updated successfully!");
                fetchUsers(); // Refresh user list
            } else {
                const data = await response.json();
                console.error("Error updating user:", data.error);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    
    // Delete a user
    const deleteUser = async (userId) => {
        try {
            const response = await fetch(`/users/${userId}`, {
                method: "DELETE",
            });
    
            if (response.status === 204) {
                console.log("User deleted successfully!");
                fetchUsers(); // Refresh user list
            } else {
                const data = await response.json();
                console.error("Error deleting user:", data.error);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    
    // Update an existing event
    const updateEvent = async (eventId) => {
        try {
            const updateEventForm = document.getElementById("updateEventForm");
            const formData = new FormData(updateEventForm);
    
            const response = await fetch(`/events/${eventId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    event_name: formData.get("event_name"),
                    event_date: formData.get("event_date"),
                    event_location: formData.get("event_location"),
                    // Include other fields you want to update
                }),
            });
    
            if (response.status === 200) {
                console.log("Event updated successfully!");
                fetchEvents(); // Refresh event list
            } else {
                const data = await response.json();
                console.error("Error updating event:", data.error);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    
    // Delete an event
    const deleteEvent = async (eventId) => {
        try {
            const response = await fetch(`/events/${eventId}`, {
                method: "DELETE",
            });
    
            if (response.status === 204) {
                console.log("Event deleted successfully!");
                fetchEvents(); // Refresh event list
            } else {
                const data = await response.json();
                console.error("Error deleting event:", data.error);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

});
