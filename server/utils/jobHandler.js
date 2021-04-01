const redis = require("redis");
const Queue = require("bull");
const User = require("../models/userModel");
const { addMentionsToDB } = require("./scraper");
const { sendWeeklyReport } = require("./mailjet");

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

const handleSendWeeklyReport = () => {
  const emailsQueue = new Queue("report email enqueue", {
    redis: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST },
  });

  const sendingQueue = new Queue("sending", {
    redis: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST },
  });

  emailsQueue.add(
    {},
    {
      repeat: { cron: "05 16 * * 4" }, // 9:00 AM every Monday
      delay: 2000,
      jobId: "repeatEmailsUpdate",
    }
  );
  // emailsQueue.empty();
  // sendingQueue.empty();

  emailsQueue.process(async (job, done) => {
    try {
      const users = await User.find({});

      users.forEach(async (user) => {
        const mentions = await user.getTopFiveMentions();
        sendingQueue.add({ email: user.reportEmail, mentions: mentions });
      });

      done(new Error("error adding emails to queue"));
    } catch (error) {
      console.log(error);
    }
  });

  sendingQueue.process(async (job, done) => {
    try {
      await sendWeeklyReport(job.data.email, job.data.mentions);
      done(new Error(`${job.data.email} and mentions error`));
    } catch (error) {
      console.log(error);
    }
  });
};

const handleIndividualCompany = (company) => {
  const individualQueue = new Queue("company enqueue", {
    redis: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST },
  });

  for (var platform in User.schema.obj.platforms) {
    individualQueue.add({ company: company, platform: platform });
  }
  // individualQueue.empty();

  individualQueue.process(async function (job, done) {
    try {
      await addMentionsToDB(job.data.company, job.data.platform);
      done(new Error(`${job.data.company} and ${job.data.platform} error`));
    } catch (err) {
      console.log(err);
    }
  });
};

const handleTaskQueues = () => {
  const companiesQueue = new Queue("componies enqueue", {
    redis: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST },
  });

  const scrapingQueue = new Queue("scraping", {
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
  // scrapingQueue.empty();

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
      done(new Error("error get all companies"));
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

module.exports = {
  connectRedis,
  handleTaskQueues,
  handleIndividualCompany,
  handleSendWeeklyReport,
};
