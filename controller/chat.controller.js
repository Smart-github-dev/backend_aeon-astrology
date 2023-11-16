const { Configuration, OpenAIApi } = require("openai");
const db = require("../models");
const User = db.user;
const Chat = db.chat;

exports.getTopQuestions = async (req, res) => {
  try {
    const topQuestions = await Chat.find({ isQuestion: true })
      .sort({
        createdAt: -1,
      })
      .limit(10);

    res.status(200).send(topQuestions);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.getHistory = async (req, res) => {
  try {
    const userid = req.query.userid;
    const historyId = req.query.historyId;
    const history = await Chat.findById(historyId).sort({
      createdAt: -1,
    });
    res.status(200).send(history);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getHistories = async (req, res) => {
  try {
    const userid = req.query.userid;
    const historys = await Chat.find({ userid }).sort({ createdAt: -1 });
    res.status(200).send(historys);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.storeHistory = async (req, res) => {};

exports.getAiAnswer = async (req, res) => {
  try {
    const { question, historyId, userid } = req.body;

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    let model = "gpt-3.5-turbo";
    let messages = [{ role: "system", content: question }];
    const response = await openai.createChatCompletion({
      model,
      messages,
      max_tokens: 3800,
      temperature: 0.7,
    });
    const content = response.data.choices[0].message.content;
    let history;
    if (historyId == "") {
      history = new Chat({
        userid,
        question: question,
        history: [
          { content: question, isQuestion: true },
          { content: content, isQuestion: false },
        ],
      });
    } else {
      history = await Chat.findById(historyId);
      history.history.push({ content: question, isQuestion: true });
      history.history.push({ content: content, isQuestion: false });
    }

    await history.save();

    const user = await User.findById(userid);
    user.availableMessages = user.availableMessages - 1;
    user.save();

    res.send({ content, historyId: history._id });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
