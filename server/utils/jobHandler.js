const redis = require("redis");
const Queue = require("bull");
const User = require("../models/userModel");
const Mention = require("../models/mentionModel");
const { addMentionsToDB } = require("./scraper");

const connectRedis = async () => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

const handleTaskQueues = async () => {
  try {
    const companiesQueue = new Queue("queue-for-getting-componies", {
      redis: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST },
    });

    const scrapingQueue = new Queue("queue-for-scraping", {
      redis: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST },
    });
    // job producer
    companiesQueue.add(
      {},
      {
        repeat: { cron: "*/1 * * * *" },
        delay: 2000,
        jobId: "repeatCompaniesUpdate",
      }
    );

    // to remove existedQueue use
    // companiesQueue.empty();

    // job consumer
    companiesQueue.process(function (job, done) {
      // delete all Mention at the first of updating job queues
      Mention.deleteMany();
      User.getAllCompanies().then((companies) =>
        companies.forEach((company) => {
          for (var platform in User.schema.obj.platforms) {
            scrapingQueue.add({ company: company, platform: platform });
          }
        })
      );
      // call done when finished
      done();
    });

    scrapingQueue.process(function (job, done) {
      addMentionsToDB(job.data.company, job.data.platform);
      done();
      console.log(
        `Job with company ${job.data.company}, platform ${job.data.platform} has been finished`
      );
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { connectRedis, handleTaskQueues };
