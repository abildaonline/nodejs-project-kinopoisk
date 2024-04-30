const country = require('./country');

const data = [
    'Россия',
    'СССР',
    'США',
    'Франция',
    'Корея Южная',
    'Великобритания',
    'Япония',
    'Италия',
    'Испания',
    'Германия',
    'Турция',
    'Швеция',
    'Дания',
    'Норвегия',
    'Гонконг',
    'Австралия',
    'Бельгия',
    'Нидерланды',
    'Греция',
    'Австрия',
]

async function writeDatacountry(){
    const count = await country.countDocuments();
    if(count == 0){
        data.map((item, index) => {
            new country({
                name: item,
                key: index
            }).save()
        })
    }
}

module.exports = writeDatacountry;
