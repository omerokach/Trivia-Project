const { CountriesTable, Question } = require("./models");
const { Sequelize, Op } = require("sequelize");

const typeOneTemplateArr = [
  {
    keyWord: ["most", "least"],
    optionForKeyWord: [
      {
        column: "density_pop_km",
        most: "Which country is most densely populated?",
        least: "Which country is least densely populated?",
        questionAbout: "Density of population per km",
      },
      {
        column: "birthrate",
        most: "Which country has the most birthrate?",
        least: "Which country has the  least birthrate?",
        questionAbout: "Birthrate",
      },
      {
        column: "deathrate",
        most: "Which country has the most deathrate?",
        least: "Which country has the least deathrate?",
        questionAbout: "deathrate",
      },
      {
        column: "phones_per_thousand",
        most: "Which country hat the most cell phones per person?",
        least: "Which country hat the least cell phones per person?",
        questionAbout: "Nunber of phones per thousand people",
      },
      {
        column: "cost_of_living_index",
        most: "Which country is the most expensive?",
        least: "Which country is the least expensive?",
        questionAbout: "Cost of living index",
      },
    ],
  },
  {
    keyWord: ["largest", "smallest"],
    optionForKeyWord: [
      {
        column: "km",
        largest: "Which country is the largest by total area?",
        smallest: "Which country is the smallest by total area?",
        questionAbout: "Area in km",
      },
      {
        column: "coastline",
        largest: "Which country is the largest by coastline per land?",
        smallest: "Which country is the smallest by coastline per land?",
        questionAbout: "Coast line in km",
      },
    ],
  },
];

const typeTwoTemplateArr = [
  {
    column: "capital",
    template: "What is the capital of country?",
    questionAbout: "Capitals",
  },
  {
    column: "population",
    template: "How many people live in country?",
    questionAbout: "Population",
  },
  {
    column: "continent",
    template: "In what continent is country?",
    questionAbout: "Continent",
  },
  {
    column: "age_zero_to_fourteen_years_percentage",
    template: "What is the percentage of the ages 0-14 in country?",
    questionAbout: "Percentage of population: age 0-14",
  },
  {
    column: "age_fifteen_to_sixty_four_years_percentage",
    template: "What is the percentage of the ages 15-64 in country?",
    questionAbout: "Percentage of population: age 15-64",
  },
  {
    column: "age_Above_sixty_five_years_percentage",
    template: "What is the percentage of the ages 65 and above in country?",
    questionAbout: "Percentage of population: age 65 and above",
  },
];

const typeThreeTemplateArr = [
  {
    template: "Are there more people in X than in Y?",
    column: "population",
    questionAbout: "population",
  },
  {
    template: "Is X larger than Y?",
    column: "km",
    questionAbout: "Area in km",
  },
  {
    template: "Does X have a higher population density than Y?",
    column: "density_pop_km",
    questionAbout: "Density of population per km",
  },
  {
    template:
      "Is the quality of life in X higher than the quality of life in Y?",
    column: "quality_of_life_index",
    questionAbout: "Quality of living index",
  },
  {
    template: "Is the crime rate of X higher than the crime rate in Y?",
    column: "crime_index",
    questionAbout: "Crime rate index",
  },
  {
    template: "Are restaurants in X more expensive than restaurants in Y?",
    column: "restaurant_price_index",
    questionAbout: "Restaurant price index",
  },
];

function questionGeneratorTypeOneFunc() {
  const questionTemplate =
    typeOneTemplateArr[Math.floor(Math.random() * typeOneTemplateArr.length)];
  const keyWord = questionTemplate.keyWord[Math.floor(Math.random() * 2)];
  const optionForKeyWordIndex = Math.floor(
    Math.random() * questionTemplate.optionForKeyWord.length
  );
  const column =
    questionTemplate.optionForKeyWord[optionForKeyWordIndex].column;

  return CountriesTable.findAll({
    order: Sequelize.literal("rand()"),
    limit: 4,
    attributes: ["country", column],
    where: {
      [Op.or]: [
        { [column]: { [Op.ne]: null } },
        { [column]: { [Op.ne]: undefined } },
      ],
    },
  }).then((countries) => {
    const typeOneQuestionObj = {};
    let valuesArr = countries.map((country) => country.toJSON());
    let columnsVals = valuesArr.map((data) => data[column]);
    let countryVals = valuesArr.map((data) => data["country"]);

    if (keyWord === "most" || keyWord === "largest") {
      const maxVal = Math.max(...columnsVals);
      let maxValIndex;
      if (typeof columnsVals[0] === "number") {
        maxValIndex = columnsVals.indexOf(maxVal);
      } else {
        maxValIndex = columnsVals.indexOf(String(maxVal));
      }
      typeOneQuestionObj.answer = valuesArr[maxValIndex].country;
      countryVals = countryVals.filter(
        (value) => value !== typeOneQuestionObj.answer
      );
    } else {
      const minVal = Math.min(...columnsVals);
      let minValIndex;
      if (typeof columnsVals[0] === "number") {
        minValIndex = columnsVals.indexOf(minVal);
      } else {
        minValIndex = columnsVals.indexOf(String(minVal));
      }
      typeOneQuestionObj.answer = valuesArr[minValIndex].country;
      countryVals = countryVals.filter(
        (value) => value !== typeOneQuestionObj.answer
      );
    }

    typeOneQuestionObj.type = "type_one";
    typeOneQuestionObj.question =
      questionTemplate.optionForKeyWord[optionForKeyWordIndex][keyWord];
    typeOneQuestionObj.questionValues = JSON.stringify(valuesArr);
    typeOneQuestionObj.optionA = countryVals.pop();
    typeOneQuestionObj.optionB = countryVals.pop();
    typeOneQuestionObj.optionC = countryVals.pop();
    typeOneQuestionObj.questionAbout =
      questionTemplate.optionForKeyWord[optionForKeyWordIndex].questionAbout;
    typeOneQuestionObj.parameterA = "country";
    typeOneQuestionObj.parameterB = column;
    typeOneQuestionObj.rating = 0;
    typeOneQuestionObj.numOfVotes = 0;

    return typeOneQuestionObj;
  });
}

function questionGeneratorTypeTwoFunc() {
  const questionTemplate =
    typeTwoTemplateArr[Math.floor(Math.random() * typeTwoTemplateArr.length)];
  const { column } = questionTemplate;
  let { template } = questionTemplate;

  return CountriesTable.findAll({
    order: Sequelize.literal("rand()"),
    limit: 4,
    attributes: ["country", column],
    where: {
      [Op.or]: [
        { [column]: { [Op.ne]: null } },
        { [column]: { [Op.ne]: undefined } },
      ],
    },
  }).then((countries) => {
    const typeTwoQuestionObj = {};
    const valuesArr = countries.map((country) => country.toJSON());

    template = template.replace("country", valuesArr[0].country);

    typeTwoQuestionObj.type = "type_Two";
    typeTwoQuestionObj.question = template;
    typeTwoQuestionObj.questionValues = JSON.stringify(valuesArr);
    typeTwoQuestionObj.answer = valuesArr.shift()[column];
    typeTwoQuestionObj.optionA = valuesArr.pop()[column];
    typeTwoQuestionObj.optionB = valuesArr.pop()[column];
    typeTwoQuestionObj.optionC = valuesArr.pop()[column];
    typeTwoQuestionObj.questionAbout = questionTemplate.questionAbout;
    typeTwoQuestionObj.parameterA = "country";
    typeTwoQuestionObj.parameterB = column;
    typeTwoQuestionObj.rating = 0;
    typeTwoQuestionObj.numOfVotes = 0;

    console.log(typeTwoQuestionObj);
    return typeTwoQuestionObj;
  });
}

function questionGeneratorTypeThreeFunc() {
  const questionObj =
    typeThreeTemplateArr[
      Math.floor(Math.random() * typeThreeTemplateArr.length)
    ];
  const template = questionObj.template;
  const column = questionObj.column;

  return CountriesTable.findAll({
    order: Sequelize.literal("rand()"),
    limit: 2,
    attributes: ["country", column],
    where: {
      [Op.or]: [
        { [column]: { [Op.ne]: null } },
        { [column]: { [Op.ne]: undefined } },
      ],
    },
  }).then((countries) => {
    const typeThreeQuestionObj = {};
    const valuesArr = countries.map((country) => country.toJSON());
    const columnsVals = valuesArr.map((data) => data[column]);
    const countryVals = valuesArr.map((data) => data["country"]);
    const question = template
      .replace("X", countryVals[0])
      .replace("Y", countryVals[1]);
    const maxVal = Math.max(...columnsVals);
    let maxValIndex;

    if (typeof columnsVals[0] === "number") {
      maxValIndex = columnsVals.indexOf(maxVal);
    } else {
      maxValIndex = columnsVals.indexOf(String(maxVal));
    }

    if (maxValIndex === 0) {
      typeThreeQuestionObj.answer = "Yes";
    } else {
      typeThreeQuestionObj.answer = "No";
    }

    typeThreeQuestionObj.questionValues = JSON.stringify(valuesArr);
    typeThreeQuestionObj.type = "type_three";
    typeThreeQuestionObj.question = question;
    typeThreeQuestionObj.optionA = null;
    typeThreeQuestionObj.optionB = null;
    typeThreeQuestionObj.optionC = null;
    typeThreeQuestionObj.questionAbout = questionObj.questionAbout;
    typeThreeQuestionObj.parameterA = "country";
    typeThreeQuestionObj.parameterB = column;
    typeThreeQuestionObj.rating = 0;
    typeThreeQuestionObj.numOfVotes = 0;

    return typeThreeQuestionObj;
  });
}

async function questionGenerator() {
  const randomType = Math.floor(Math.random() * 3) + 1;
  switch (randomType) {
    case 1:
      return await questionGeneratorTypeOneFunc();
      break;

    case 2:
      return await questionGeneratorTypeTwoFunc();
      break;

    case 3:
      return await questionGeneratorTypeThreeFunc();
      break;

    default:
      break;
  }
}

// (async function a() {
//   Question.create(await questionGenerator());
// })();

module.exports = { questionGenerator };
