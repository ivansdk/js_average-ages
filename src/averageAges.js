"use strict";

function averageAge(people, amount) {
  const sum = people.reduce(
    (total, person) => total + (person.died - person.born),
    0
  );

  return sum / amount;
}

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(
    (person) =>
      person.sex === "m" &&
      (century === undefined || Math.ceil(person.died / 100) === century)
  );

  return averageAge(men, men.length);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(
    (person) =>
      person.sex === "f" &&
      (withChildren === undefined ||
        people.find((child) => child.mother === person.name))
  );

  return averageAge(women, women.length);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people.filter((person) =>
    people.find((child) => child.mother === person.name)
  );

  const childrens = people.filter((child) =>
    mothers.find(
      (person) =>
        person.name === child.mother &&
        (onlyWithSon === undefined || child.sex === "m")
    )
  );

  const ageDifferenceSum = childrens.reduce((differenceSum, child) => {
    const mother = mothers.find((person) => person.name === child.mother);

    const difference = child.born - mother.born;

    return differenceSum + difference;
  }, 0);

  return ageDifferenceSum / childrens.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
