const Random = require('./random');
const Sources = require('./sources');
const Races = require('./data/races.json');

module.exports = {
  names: function (sources = 'ALL') {
    return Sources.flatData(Races, sources).map(r => r.name);
  },
  byName: function (name) {
    return [].concat.apply([], Object.keys(Races).map(r => Races[r])).filter(r => r.name === name)[0];
  },
  random: function (sources = 'ALL') {
    return Random.sourcedElement(Races, sources);
  },
  randomSubrace: function (race) {
    return Random.element(race.subraces);
  },
  other: function (race, subrace) {
    const r = [];
    if (race.other) {
      r.push(...Object.keys(race.other).map(o => ({ name: o, value: Random.element(race.other[o]) })));
    }
    if (subrace && subrace.other) {
      r.push(...Object.keys(subrace.other).map(o => ({ name: o, value: Random.element(subrace.other[o]) })));
    }
    return r;
  },
}