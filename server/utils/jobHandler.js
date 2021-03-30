const redis = require("redis");
const Queue = require("bull");
const User = require("../models/userModel");
const Mention = require("../models/mentionModel");
const { addMentionsToDB } = require("./scraper");

const connectRedis = () => {
  // to start redis server in background
  // run "redis-server --daemonize yes"
  // to stop the server running "redis-cli shutdown"
  const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });
  client.on("error", (err) => {
    console.log("Error " + err);
  });

  client.on("ready", function () {
    console.log("redis is running");
  });
};

const handleTaskQueues = () => {
  const companiesQueue = new Queue("queue-for-getting-componies", {
    redis: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST },
  });

  const scrapingQueue = new Queue("queue-for-scraping", {
    redis: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST },
  });
  // job producer, repeated every 15 mins
  companiesQueue.add(
    {},
    {
      repeat: { cron: "*/15 * * * *" },
      delay: 2000,
      jobId: "repeatCompaniesUpdate",
    }
  );

  // to remove existedQueue use
  // companiesQueue.empty();

  // job consumer
  companiesQueue.process(async function (job, done) {
    try {
      User.getAllCompanies().then((companies) =>
        companies.forEach((company) => {
          for (var platform in User.schema.obj.platforms) {
            scrapingQueue.add({ company: company, platform: platform });
          }
        })
      );
      done(new Error("error get all companies to queue"));
    } catch (err) {
      console.log(err);
    }
  });

  scrapingQueue.process(async function (job, done) {
    try {
      await addMentionsToDB(job.data.company, job.data.platform);
      done(new Error(`${job.data.company} and ${job.data.platform} error`));
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = { connectRedis, handleTaskQueues };
