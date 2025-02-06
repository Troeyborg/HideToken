// Module Initialization
Hooks.once('init', () => {
  console.log('Invisible Token Image Module Initialized');
});

// Function to assign invisible image to tokens for users without owner/observer permissions
// Function to assign invisible image to tokens for users without owner/observer permissions
function assignInvisibleImagesToAllUsers(token) {
  // Check if the user is the GM before running the rest of the function
  if (!game.user.isGM) return;

  console.log('ran mother');
  
  // Get the linked actor for the token
  const actor = token.actor;

  // Ensure the actor is valid
  if (actor) {
    // Iterate over all players in the game
    game.users.forEach((user) => {
      // Check if the user has 'owner' or 'observer' permission on the actor
      const hasOwnerPermission = actor.testUserPermission(user, 'OWNER');
      const hasObserverPermission = actor.testUserPermission(user, 'OBSERVER');

      // If the user does not have 'owner' or 'observer' permission, apply the invisible image
      if (!hasOwnerPermission && !hasObserverPermission) {
        const invisImage = 'invis.png'; // Replace with actual path to invis.png image
        const userNames = [user.name]; // Apply invis image to this user
        const options = {
          userName: userNames, // Apply invis image to this user
        };

        // Assign the invisible image to the token for the specific user using token-variants API
        game.modules.get('token-variants').api.assignUserSpecificImage(token, invisImage, options);
      }
    });
  } else {
    console.warn("Token has no linked actor or actor data is unavailable.");
  }
}


// Hook into token render to handle when tokens are first rendered
Hooks.on('renderToken', (token) => {
  assignInvisibleImagesToAllUsers(token);
});

// Wait until the system is ready and hook into canvas initialization
Hooks.once('ready', () => {
  canvas.tokens.placeables.forEach((token) => {
    assignInvisibleImagesToAllUsers(token);
});

// Hook into token creation (tokens added to the scene)
Hooks.on('drawToken', (token) => {
  assignInvisibleImagesToAllUsers(token);
  });
});

// Hook into canvas being ready (canvas and scene elements are fully loaded)
Hooks.on('canvasReady', () => {
  // Iterate through all tokens in the current scene to check visibility for all users
  canvas.tokens.placeables.forEach((token) => {
    assignInvisibleImagesToAllUsers(token);
  });
});


// Hook into token update to handle when token properties are updated
Hooks.on('updateToken', (token, updates) => {
  // Check if the token has a linked actor
  const actor = token.actor;

  // If the actor is available, apply the image assignment logic for all users
  if (actor) {
    assignInvisibleImagesToAllUsers(token);
  } else {
    console.warn("Token does not have a linked actor or actor data is unavailable.");
  }
});
