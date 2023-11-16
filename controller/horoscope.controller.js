const axios = require("axios");
const JSSoup = require("jssoup").default;
const db = require("../models");
const User = db.user;

const userId = 625358;
const apiKey = "7393797dca6038d780fe24f2020c3433";

exports.getTodayHints = async (req, res) => {
  const { sign } = req.params;
  const day = "today";
  try {
    const response = await axios.get(
      `https://www.horoscope.com/star-ratings/${day}/${sign}`
    );
    const soup = new JSSoup(response.data);
    const data = soup.find("div", (attrs = { class: "general-mood" }));
    const todayHints = {};
    for (let i = 1; i < data.parent.contents.length - 2; i++) {
      if (i % 2 === 1) {
        todayHints[data.parent.contents[i].getText()] =
          data.parent.contents[i + 1].getText();
      }
    }
    res.send({ data: todayHints });
  } catch (e) {
    console.log(e);
    res.send({
      data: {},
    });
  }
};

exports.getHoroscopeByDay = async (req, res) => {
  const { sign, day } = req.params;
  console.log(sign, day);
  try {
    let response;
    if (day.indexOf("-") > -1) {
      response = await axios.get(
        `https://www.horoscope.com/us/horoscopes/general/horoscope-archive.aspx?sign=${sign}&laDate=${day.replace(
          /-/g,
          ""
        )}`
      );
    } else {
      response = await axios.get(
        `https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-${day}.aspx?sign=${sign}`
      );
    }

    const soup = new JSSoup(response.data);
    const data = soup.find("div", (attrs = { class: "main-horoscope" }));
    const result = data.nextElement.nextSibling.getText();
    res.send({
      data: result.split("-").slice(1).join(""),
    });
  } catch (e) {
    console.log(e);
    res.send({
      data: "",
    });
  }
};

exports.getPlanetsReport = async (req, res) => {
  try {
    const api = "solar_return_planet_report";
    // const { userId } = req.body;
    var data = {
      day: 6,
      month: 1,
      year: 2000,
      hour: 7,
      min: 45,
      lat: 19.132,
      lon: 72.342,
      tzone: 5.5,
    };
    var auth = "Basic " + new Buffer(userId + ":" + apiKey).toString("base64");
    // const result = await axios.post(
    //   "https://json.astrologyapi.com/v1/" + api,
    //   data,
    //   {
    //     headers: {
    //       authorization: auth,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // console.log(result.data);
    res.send({
      data: [
        {
          name: "Mars",
          isRetro: "false",
          sign: "Cancer",
          forecast: [
            "It is more about how you express yourself than the specifics of what you are saying that helps sway others to your position. ",
            "",
            "The void within you can only be filled with a deep emotional connection, But that will occur when you are in touch with your own instincts. Even sexually, you'll really only be aroused by someone with whom you feel an especially close connection. You'll have an abundance of sensitive and caring energy building up inside of you, but if you don't know what to do with it, you may be frightened by it and try to deflect attention onto others. The result could be a passive-aggressive attack on someone, and you'll intuitively know just how to hurt them. Avoid allowing the ego to attempt to dominate others. ",
            "The work will make you feel both relaxed and revived at the same time. You are likely to socialize more.  You will be more inclined to work in a comfortable environment. Consider working from home whenever possible, as you'll feel safe there, and therefore, more likely to work more successfully on your projects. Success may come through your good managerial qualities or some form of artistic talent. ",
          ],
        },
        {
          name: "Mercury",
          isRetro: "true",
          sign: "Gemini",
          forecast: [
            "Having a Keenly alert mind is your strength. No one can compete with you when it comes to intellectual arguments and discussions. You will have effective replies for every contradictions that come your way. Anyone who thinks will be able to outwit you is foolish. ",
            "You have restless energy , you may utilise this excessive restlessness by occupying your mind and body with a healthy exercise routine. ",
            "Your sense of humor and quick wit will work like a breath of fresh air in your relationships. Your flirting skills will act in your favor. You may appear to be emotionally detached when communicating. Your clever chatting will impress your partner. ",
            "Your sharp mind will lead you to extreme success  at work this year. Your curiosity levels will remain high, and you'll attempt to understand every concept you come across. Because of the speed with which you'll barrel through ideas, you may be tempted to gloss over things without getting into their full depth. ",
          ],
        },
        {
          name: "Jupiter",
          isRetro: "false",
          sign: "Pisces",
          forecast: [
            "This year is good for your spiritual growth. You'll find yourself tuning into a higher consciousness and increasing your awareness of everything around you as you work to develop a stronger connection with others. ",
            "You may not be able to stick to your exercise routine. You tend to be lazy and careless when it comes to health. ",
            "You are a compassionate , devoted and tender person. You care for those who are less fortunate than you. Your kind and caring nature strikes a chord with people. Your ability to connect with others is rare. you may have psychic abilities as well. Your faith, regardless of what it is, will be a bridge to a stronger understanding of your world. Let your intuition guide you as you move through the year. ",
            "You are imaginative and creative these qualities can give you success in fields like Art, writing, music, entertainment. You can be very talented with healing arts of all kinds. You may not be very ambitious, as you dont need material things to be happy in life. You will be good at social work , counselling and ministry work. People who are close to you may even taken advantage of your compassionate nature. You may need to focus your sensitivity in healthy directions. ",
          ],
        },
        {
          name: "Venus",
          isRetro: "false",
          sign: "Cancer",
          forecast: [
            "Since you have a good memory it may be difficult for you to forget the past, and overcome the emotional hurt. Your fear of rejection makes you test your partner's loyalty now and then. This can be a bit frustrating for your companion. You tend to be more patient, loving and dependable once you get sure of your partner's intentions. ",
            "You are dedicated and this quality will help you to follow your strict exercise routine, you may be even more considered about your appearance and will take efforts to work out on your flaws. You tend to be more diet conscious than ever. ",
            "You are one of the most sensitive and romantic soul, this year you are more in touch with your deep emotional side. You crave for security, comfort and love in any relationship. Your ability to understand the feelings of your partner, may help you to resolve all the conflicts in your relationship. You are closely attached to your family and home. Since you have a big heart, you attract many people around you. Your intuitive power helps you to read character of people and you care for them accordingly. You may take some time to trust people, but if u trust someone you tend to be very affectionate towards that person.  You are attracted to those who need you.  Imagining the romantic world you'd like to live in will be the first step toward turning it into a reality. This will be a very sensual time for you, so live it up and let the emotions just run over you like water. ",
            "Your creative abilities may help you succeed in field of arts and music. you can be quite frugal with your money. You will spend most on your family and close friends. You may be interested in building your own home. You are attracted to art and tradition and will readily spend on decorating your home. You tend to be cautious before taking any decision. And will think twice before getting into any new business partnership. You may even consider counseling as a profession. Your empathetic nature will cut to the core of any issues others may be having, and you'll be able to help them come to a resolution over problems that may arise. ",
          ],
        },
        {
          name: "Saturn",
          isRetro: "true",
          sign: "Aquarius",
          forecast: [
            "Unfortunately, nothing in life is ever really stable for long, and much as you may not want the task, you'll need to challenge the status quo this year in an effort to move your life forward. You may be faced with situations in which you must accept new ideas because they'll help large numbers of people, or you may need to allow others to be different and establish their individuality. ",
            "You may be susceptible to heart affections. Drink enough water to prevent circulatory disorders. Do regular exercise and have a fat free diet. ",
            "You may experience greater sense of togetherness with your partner. There is stability and happiness in family life, due to increased income and prosperity. ",
            "You have a scientific mind, high concentration and good organizing skills. These qualities will lead you to success and prosperity. Work as a positive, understanding influence in your society and help bring your progressive knowledge to those around you. You need to learn to be more tolerant and impartial. You are more likely to get promoted this year. People involved in business may expect profit and financial growth. A great time for reaching the pinnacles of your career. ",
          ],
        },
        {
          name: "Uranus",
          isRetro: "false",
          sign: "Taurus",
          forecast: [
            "You are not in favor of change. Your mental powers will be strong and stabling this year, so don't forget to use them on your own psyche as well. ",
            "Follow healthy and nutritious diet. You may start with meditation to increase your concentration and focus. ",
            "Your relationship with your spouse will be fulfilling and happy. Your charming personality may attract many people this may cause your partner to get jealous. You like the emotional security and stability which you get from your partner. ",
            "You are practical and constructive. You may need an initial push to start, but once you get started nothing really can stop you. You may come up with innovative business ideas. You may get success in real estate. You tend to prefer partners and organizations that promote innovation and imagination. ",
          ],
        },
        {
          name: "Neptune",
          isRetro: "false",
          sign: "Pisces",
          forecast: [
            "Let your dream world and your imagination guide you along the path to enlightenment. Just be sure you don't fall astray into the world of escapism. Though you might enjoy yourself there, you will not fully complete yourself until you leave the physical realm behind your entirely. ",
            "Don’t ignore your health. Be consistent in whatever you do. Follow a healthy lifestyle. ",
            "You are an exceptionally compassionate and caring soul. You tend to be selfless and want to serve  others. In a relationship you tend to be forgiving and self sacrificing, these qualities make you attractive. People may also take advantage of your soft heart and take you for granted. Be careful before making any new connections. ",
            "The most real feelings of brotherhood and sisterhood will come to you this year when you are able to develop a genuine empathy for all creatures on earth. You will feel something of a craving to get out and help those in need as much as possible, and that's one craving you should certainly give in to. Volunteer at homeless shelters, children's organizations, hospitals, etc. -- anything that will leave you satisfied with the work you've done. You may become a successful philanthropist. You like to express yourself with art and drama. Good year for artists, writers , poets and actors. ",
          ],
        },
        {
          name: "Pluto",
          isRetro: "true",
          sign: "Capricorn",
          forecast: [
            "You are well organized and constructive. You may establish your own authority this year. You may have high ambitions, but you prefer moving ahead step by step. You are disciplined and believe in planning. Your mission for the year will be a total overhaul of all the outmoded forms of society that can no longer measure up or function as they're supposed to. ",
            "You tend to follow your daily routine religiously. You may be very consistent when it comes to exercising. You will achieve your fitness goals by year end. ",
            "You tend to express less, your partner may expect more emotional involvement from you in relationship. You may resolve the conflicts with patience. Be more open and straightforward and less diplomatic while dealing with your loved ones. ",
            "This year is good for politicians. You may focus on raising your social status. You are more likely to get promoted at work. This will increase your confidence. you'll actually be on the path to breaking up some of society's most useless structures, which involve placing power in a small minority. Your goal is to work your way into that minority and try to break it up from the inside. ",
          ],
        },
      ],
    });
  } catch (error) {
    console.log(error);
    res.send({ data: [] });
  }
};

exports.getPlanets = async (req, res) => {
  try {
    var api = "solar_return_planets";
    var data = {
      day: 6,
      month: 1,
      year: 2000,
      hour: 7,
      min: 45,
      lat: 19.132,
      lon: 72.342,
      tzone: 5.5,
    };

    var auth = "Basic " + new Buffer(userId + ":" + apiKey).toString("base64");

    // var request = await axios.post(
    //   "https://json.astrologyapi.com/v1/" + api,
    //   data,
    //   {
    //     headers: {
    //       authorization: auth,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    res.send({
      data: [
        {
          name: "Sun",
          fullDegree: 54.11380109399159,
          normDegree: 24.11380109399159,
          speed: 0.9650326085062656,
          isRetro: "false",
          sign: "Taurus",
          house: 1,
        },
        {
          name: "Moon",
          fullDegree: 47.31498623994308,
          normDegree: 17.31498623994308,
          speed: 14.338228826984029,
          isRetro: "false",
          sign: "Taurus",
          house: 1,
        },
        {
          name: "Mars",
          fullDegree: 299.5180197054693,
          normDegree: 29.518019705469328,
          speed: 0.39892711393865726,
          isRetro: "false",
          sign: "Capricorn",
          house: 9,
        },
        {
          name: "Mercury",
          fullDegree: 32.27603700198721,
          normDegree: 2.2760370019872127,
          speed: 1.5869226013806572,
          isRetro: "false",
          sign: "Taurus",
          house: 1,
        },
        {
          name: "Jupiter",
          fullDegree: 227.59923202631205,
          normDegree: 17.599232026312052,
          speed: -0.12617328212943554,
          isRetro: "true",
          sign: "Scorpio",
          house: 7,
        },
        {
          name: "Venus",
          fullDegree: 84.52954056784534,
          normDegree: 24.529540567845345,
          speed: 1.20082511692115,
          isRetro: "false",
          sign: "Gemini",
          house: 2,
        },
        {
          name: "Saturn",
          fullDegree: 278.5764139505125,
          normDegree: 8.576413950512517,
          speed: -0.04129842163652542,
          isRetro: "true",
          sign: "Capricorn",
          house: 9,
        },
        {
          name: "Uranus",
          fullDegree: 29.965198848479137,
          normDegree: 29.965198848479137,
          speed: 0.05351337432937592,
          isRetro: "false",
          sign: "Aries",
          house: 12,
        },
        {
          name: "Neptune",
          fullDegree: 346.16198941562084,
          normDegree: 16.161989415620837,
          speed: 0.018542846554730846,
          isRetro: "false",
          sign: "Pisces",
          house: 11,
        },
        {
          name: "Pluto",
          fullDegree: 291.167437553819,
          normDegree: 21.167437553819013,
          speed: -0.010481214318287215,
          isRetro: "true",
          sign: "Capricorn",
          house: 9,
        },
        {
          name: "Ascendant",
          fullDegree: 37.368916222730974,
          normDegree: 7.368916222730974,
          speed: 0,
          isRetro: false,
          sign: "Taurus",
          house: 1,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getPredictionDaily = async (req, res) => {
  const { zodiacName, type } = req.params;
  const { timeZone } = req.query;
  console.log(zodiacName, type, timeZone);
  try {
    // const result = await axios.post(
    //   `https://json.astrologyapi.com/v1/sun_sign_prediction/daily/${zodiacName}`,
    //   {
    //     timezone: timeZone,
    //   }
    // );

    res.send({
      data: {
        status: true,
        sun_sign: "taurus",
        prediction_date: "8-7-2019",
        prediction: {
          personal_life:
            "Mercury stations retrograde today. With it comes your need for a deeper understanding of your partner. Or if you are single this will mean that finding someone who matters has never been so important",
          profession:
            "Have faith in your own decisions. This will propel your career, which will also benefit you financially.",
          health:
            "You like to maintain a routine with both your diet and exercise. Stay on track and you will feel the benefits from all aspects",
          travel:
            "An exciting upcoming trip has injected life into your day. Relish the feeling. ",
          luck: "Go the road less travelled. It will bring you more luck.",
          emotions:
            "Try not to be insecure about something you have no control over. This will do more damage than good.",
        },
      },
    });
  } catch (error) {
    res.status(401).send(error);
  }
};
