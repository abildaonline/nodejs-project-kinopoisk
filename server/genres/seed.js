const genres = require("./genres");

const data = [
  "Комедии",
  "Мультфильмы",
  "Ужасы",
  "Фантастика",
  "Триллеры",
  "Боевики",
  "Мелодрамы",
  "Детективы",
  "Приключения",
  "Фэнтези",
  "Военные",
  "Семейные",
  "Аниме",
  "Исторические",
  "Драмы",
  "Документальные",
  "Детские",
  "Криминал",
  "Биографии",
  "Вестерны",
  "Фильмы-нуар",
];

async function writeDataGengre() {
  const count = await genres.countDocuments();
  if (count == 0) {
    data.map((item, index) => {
      new genres({
        name: item,
        key: index,
      }).save();
    });
  }
}

module.exports = writeDataGengre;
