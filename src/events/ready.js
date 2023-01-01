const mongoose = require("mongoose");
const mongodbURL = process.env.MONGODBURL;

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log("Ready!");

    if (!mongodbURL) return;

    await mongoose.connect(mongodbURL || "", {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (mongoose.connect) {
      console.log("The database is online!");
    }

    const statusArray = [
      {
        type: "LISTENING",
        content: "/invite command",
        status: "online",
      },
      {
        type: "WATCHING",
        content: `${client.guilds.cache.size} servers!`,
        status: "online",
      },
      {
        type: "COMPETING",
        content: `/help command`,
        status: "online",
      },
      {
        type: "PLAYING",
        content: ``,
        status: "online",
      },
    ];

    async function pickPresence() {
      const option = Math.floor(Math.random() * statusArray.length);

      try {
        await client.user.setPresence({
          activities: [
            {
              name: statusArray[option].content,
              type: statusArray[option].type,
            },
          ],

          status: statusArray[option].status,
        });
      } catch (error) {
        console.error(error);
      }
    }
  },
};
