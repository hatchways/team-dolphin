const redis = require("redis");
const Queue = require("bull");
const User = require("../models/userModel");
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
    // companiesQueue.add(
    //   {},
    //   {
    //     repeat: { cron: "*/1 * * * *" },
    //     delay: 2000,
    //     jobId: "repeatCompaniesUpdate",
    //   }
    // );
    // to remove existedQueue usecompaniesQueue.empty();
    // companiesQueue.add();

    // const platforms = User.getAllPlatforms().then((data) =>
    //   data[0].split(":").then((res) => console.log(res[0]))
    // );

    // console.log(typeof User.schema.obj.platforms);
    for (var platforms in User.schema.obj.platforms) {
      console.log(platforms);
    }
    // job consumer
    companiesQueue.process(function (job, done) {
      User.getAllCompanies().then((companies) =>
        companies.forEach((company) => {
          scrapingQueue.add({ company: company });
        })
      );
      //   User.getAllPlatforms().then((data) => console.log(data));
      // call done when finished
      done(console.log(`Job with id ${job.id} has been completed`));
    });

    scrapingQueue.process(function (job, done) {
      console.log(job.data.company);
      addMentionsToDB(job.data.company);
      done(console.log(`Job with id ${job.id} has been completed`));
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { connectRedis, handleTaskQueues };
