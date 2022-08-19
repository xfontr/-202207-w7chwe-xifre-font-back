# ENDPOINTS

[POST]

/users/sign-up - Will sign the user up
/users/sign-in - Will sign the user in

[GET]

/users - Will send a list with all the users in the database

/users/:id/friends - Will send a list with all the friends the user by Id has
/users/:id/enemies - Will send a list with all the enemies the user by Id has

[UPDATE]

/users/update - Will update the user to the data inserted in the body

/users/add-friend/:id/:friendId - Will add a friend, by Id, to the user
/users/add-enemy/:id/:enemyId - Will add an enemy, by Id, to the user

# MODELS

[USER]

- id: String,
- name: String,
- image?: String,
- biography: String,
- contacts{}
  - enemies: String[],
  - friends: String[],

[LOG]

["New relationship: <User1> & <User2> (friends)",
"New relationship: <User1> & <User2> (enemies)",
"Removed relationship: <User1> & <User2>"]
