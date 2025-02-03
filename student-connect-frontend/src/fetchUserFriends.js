const fetchUserFriends = async (userId) => {
  const response = await fetch("http://localhost:5000/getFriends", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userId }),
  });
  const data = await response.json();
  // i am expecting to have the the user name and the user profile
};
