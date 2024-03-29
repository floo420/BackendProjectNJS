document.addEventListener("DOMContentLoaded", () => {
    const createUserForm = document.getElementById("createUserForm");
    const createEventForm = document.getElementById("createEventForm");
    const getAllUsersButton = document.getElementById("getAllUsersButton");
    const getAllEventsButton = document.getElementById("getAllEventsButton");

    const updateUserContainer = document.getElementById("updateUserContainer");
    const updateUserForm = document.getElementById("updateUserForm");
    const updateEventForm = document.getElementById("updateEventForm");
    const updateEventContainer = document.getElementById("updateEventContainer");

    const userList = document.getElementById("userList");
    const eventList = document.getElementById("eventList");

    const deleteUserButton = document.querySelectorAll(".deleteUserButton");
    const deleteEventButton = document.querySelectorAll(".deleteEventButton");

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
        updateUserButton.addEventListener("click", (e) => {
            e.preventDefault();
            updateUser(user.user_id);
            updateUserForm.style.display = "block";
        });        

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
        updateEventButton.classList.add("updateEventButton");  

        updateEventButton.setAttribute("data-event-id", event.event_id);

        updateEventButton.addEventListener("click", () => {
            console.log(event.event_id);
            updateEvent(event.event_id);
            updateEventForm.style.display = "block"; 
        });
        const deleteEventButton = document.createElement("button");
        deleteEventButton.textContent = "Delete";
        deleteEventButton.addEventListener("click", () => deleteEvent(event.event_id));

        listItem.appendChild(updateEventButton);
        listItem.appendChild(deleteEventButton);
        
        return listItem;
    };
    const updateUser = (userId) => {
        // Fetch the user's data and populate the update form
        fetch(`/users/${userId}`)
            .then((response) => response.json())
            .then((user) => {
                // Populate the update form fields with user data
                document.getElementById("updateUserId").value = user.user_id;
                document.getElementById("updateFirstName").value = user.first_name;
                document.getElementById("updateLastName").value = user.last_name;
                document.getElementById("updateEmail").value = user.email;
                document.getElementById("updatePhoneNumber").value = user.phone_number;
                document.getElementById("updateBirthdate").value = user.birthdate;
                
                // Show the update form
                updateUserContainer.style.display = "block";
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    };

    // Add event listener for updating a user when "Update" button is clicked
    const updateButtons = document.querySelectorAll(".updateUserButton");
    updateButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const userId = button.getAttribute("data-user-id");
            updateUser(userId);
        });
    });

    updateUserForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const formData = new FormData(updateUserForm);
            const userId = formData.get("updateUserId");
            
            const response = await fetch(`/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: formData.get("updateFirstName"),
                    last_name: formData.get("updateLastName"),
                    email: formData.get("updateEmail"),
                    phone_number: formData.get("updatePhoneNumber"),
                    birthdate: formData.get("updateBirthdate"),
                }),
            });

            if (response.status === 200) {
                console.log("User updated successfully!");
                updateUserContainer.style.display = "none"; // Hide the update form
                updateUserForm.reset(); // Clear the form
                fetchUsers(); // Refresh user list
            } else {
                const data = await response.json();
                console.error("Error updating user:", data.error);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    const updateEvent = (eventId) => {
        // Fetch the event's data and populate the update form
        fetch(`/events/${eventId}`)
          .then((response) => response.json())
          .then((event) => {
            console.log("Fetched event:", event);
            // Populate the update form fields with event data
            document.getElementById("updateEventId").value = event.event_id;
            document.getElementById("updateEventName").value = event.event_name;
            document.getElementById("updateEventDate").value = event.event_date;
            document.getElementById("updateEventLocation").value = event.event_location;
            document.getElementById("updateEventDescription").value = event.event_description;
      
            // Show the update form
            updateEventContainer.style.display = "block";
          })
          .catch((error) => {
            console.error("Error fetching event data:", error);
          });
      };
      
      // Add event listener for updating an event when "Update" button is clicked
      const updateEventButtons = document.querySelectorAll(".updateEventButton");
      updateEventButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const eventId = button.getAttribute("data-event-id");
          updateEvent(eventId);
        });
      });

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
    
    // Function to delete an event by ID
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
    };
    
    // Add event listener for deleting a user when "Delete" button is clicked
    deleteUserButton.forEach((button) => {
        button.addEventListener("click", () => {
            const userId = button.getAttribute("data-user-id");
            deleteUser(userId);
        });
    });
    
    // Add event listener for deleting an event when "Delete" button is clicked
    deleteEventButton.forEach((button) => {
        button.addEventListener("click", () => {
            const eventId = button.getAttribute("data-event-id");
            deleteEvent(eventId);
        });
    });
    
    
});
