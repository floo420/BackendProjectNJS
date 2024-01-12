document.addEventListener("DOMContentLoaded", () => {
    const createUserForm = document.getElementById("createUserForm");
    const createEventForm = document.getElementById("createEventForm");
    const getAllUsersButton = document.getElementById("getAllUsersButton");
    const getAllEventsButton = document.getElementById("getAllEventsButton");

    const userList = document.getElementById("userList");
    const eventList = document.getElementById("eventList");

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
    // Fetch and display users and events
    const fetchUsers = async () => {
        try {
            const response = await fetch("/users");
            const users = await response.json();
            console.log("Fetched users:", users); // Add this line to debug

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
            console.log("Fetched events:", events); // Add this line to debug
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

});
