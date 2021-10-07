/** 
    @author Programerika
*/
import { WebGejmikaModel } from "../model/WebGejmikaModel";

// BEGIN of tests for function compareCode()

// customized object for testing purposes
const test21Points = {
  attempts: [],
  secretComb: ["H", "K", "T", "T"],
  score: -1,
  attpInProgress: [],
};

const wgmt = new WebGejmikaModel(test21Points);

/**
 * @param {Array} Strings of code combination letters (H,K,S,L,T,P)
 * @returns {Object} Model state with added new attempt, and set attemptOutcome
 *  This test tests if a player has hit a correct combination in first attempt.
 *  Function gets attemptInProgress as an argument, compares attemptInProgress with secret code,
 *  if it matches, attemptOutcome array will be [2,2,2,2], player will get 21 points,
 *  current attempt in progress object with attempt outcome will be placed in attempts array
 */

test("testing compareCode() with correct combination in first attempt", () => {
  expect(wgmt.compareCode(["H", "K", "T", "T"])).toStrictEqual({
    attempts: [
      { attemptCode: ["H", "K", "T", "T"], attemptOutcome: [2, 2, 2, 2] },
    ],
    attpInProgress: [],
    score: 21,
    secretComb: ["H", "K", "T", "T"],
  });
});

/**
 * @param {Array} Strings of code combination letters (H,K,S,L,T,P)
 * @returns {Object} Model state with added new attempt, and set attemptOutcome
 *  This test tests if a player has missed a correct combination in first attempt.
 *  Function gets attemptInProgress as an argument, compares attemptInProgress with secret code
 *  and if it doesn't match, attemptOutcome array will be [2,2,2,0] player will stay at -1 points,
 *  current attempt in progress object with attempt outcome will be placed in attempts array
 */
test("testing compareCode() with incorect combination in first attempt", () => {
  expect(wgmt.compareCode(["H", "K", "T", "S"])).toStrictEqual({
    attempts: [
      { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    ],
    attpInProgress: [],
    score: -1,
    secretComb: ["H", "K", "T", "T"],
  });
});

/**
 * @param {Array} Strings of code combination letters (H,K,S,L,T,P)
 * @returns {Object} Model state with added new attempt, and set attemptOutcome
 *  This test tests if a player has hit a correct combination in fourth attempt.
 *  Function gets attemptInProgress as an argument, compares attemptInProgress with secret code,
 *  if it matches, attemptOutcome array will be [2,2,2,2] in fourth attempt,
 *  player will get 13 points, current attempt in progress object with attempt
 *  outcome will be placed in attempts array
 */

// customized object for testing purposes
const test13Points = {
  attempts: [
    { attemptCode: ["H", "K", "T", "K"], attemptOutcome: [2, 2, 2, 1] },
    { attemptCode: ["H", "K", "T", "K"], attemptOutcome: [2, 2, 2, 1] },
    { attemptCode: ["H", "K", "T", "K"], attemptOutcome: [2, 2, 2, 1] },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: -1,
  attpInProgress: [],
};

const wgmtTest13 = new WebGejmikaModel(test13Points);

test("testing compareCode() with correct combination in fourth attempt", () => {
  expect(wgmtTest13.compareCode(["H", "K", "T", "T"])).toStrictEqual({
    attempts: [
      { attemptCode: ["H", "K", "T", "K"], attemptOutcome: [2, 2, 2, 1] },
      { attemptCode: ["H", "K", "T", "K"], attemptOutcome: [2, 2, 2, 1] },
      { attemptCode: ["H", "K", "T", "K"], attemptOutcome: [2, 2, 2, 1] },
      { attemptCode: ["H", "K", "T", "T"], attemptOutcome: [2, 2, 2, 2] },
    ],
    attpInProgress: [],
    score: 13,
    secretComb: ["H", "K", "T", "T"],
  });
});

/**
 * @param {Array} Strings of code combination letters (H,K,S,L,T,P)
 * @returns {Object} Model state with added new attempt, and set attemptOutcome
 * This test tests if a player has hit a correct combination in fifth attempt.
 * Function gets attemptInProgress as an argument, compares attemptInProgress with secret code,
 * if it matches, attemptOutcome array will be [2,2,2,2] in fifth attempt,
 * player will get 8 points, current attempt in progress object with attempt
 * outcome will be placed in attempts array
 */

// customized object for testing purposes
const test8Points = {
  attempts: [
    { attemptCode: ["H", "K", "T", "K"], attemptOutcome: [2, 2, 2, 1] },
    { attemptCode: ["H", "K", "T", "K"], attemptOutcome: [2, 2, 2, 1] },
    { attemptCode: ["H", "K", "T", "K"], attemptOutcome: [2, 2, 2, 1] },
    { attemptCode: ["H", "K", "T", "K"], attemptOutcome: [2, 2, 2, 1] },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: -1,
  attpInProgress: [],
};

const wgmtTest8Points = new WebGejmikaModel(test8Points);

test("testing compareCode() with correct combination in fifth attempt", () => {
  expect(wgmtTest8Points.compareCode(["H", "K", "T", "T"])).toStrictEqual({
    attempts: [
      { attemptCode: ["H", "K", "T", "K"], attemptOutcome: [2, 2, 2, 1] },
      { attemptCode: ["H", "K", "T", "K"], attemptOutcome: [2, 2, 2, 1] },
      { attemptCode: ["H", "K", "T", "K"], attemptOutcome: [2, 2, 2, 1] },
      { attemptCode: ["H", "K", "T", "K"], attemptOutcome: [2, 2, 2, 1] },
      { attemptCode: ["H", "K", "T", "T"], attemptOutcome: [2, 2, 2, 2] },
    ],
    attpInProgress: [],
    score: 8,
    secretComb: ["H", "K", "T", "T"],
  });
});

/**
 * @param {Array} Strings of code combination letters (H,K,S,L,T,P)
 * @returns {Object} Model state with added new attempt, and set attemptOutcome
 * This test tests if a player has missed a correct combination in fifth attempt.
 * Function gets attpInProgress as an argument, compares attemptInProgress with secret code,
 * if it doesn't match, attemptOutcome array will be [2,2,2,0] in fifth attempt,
 * target will be reached and player will get 0 points, current attempt in progress
 * object with attempt outcome will be replaced from attpInProgress in attempts array
 */

// customized object for testing purposes
const test0Points = {
  attempts: [
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: -1,
  attpInProgress: [],
};

const wgmtTest0Points = new WebGejmikaModel(test0Points);

test("testing compareCode() with missed all combinations in all attempts", () => {
  expect(wgmtTest0Points.compareCode(["H", "K", "T", "S"])).toStrictEqual({
    attempts: [
      { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
      { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
      { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
      { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
      { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    ],
    attpInProgress: [],
    score: 0,
    secretComb: ["H", "K", "T", "T"],
  });
});

/**
 * @param {Array} Strings of code combination letters (H,K,S,L,T,P)
 * @returns {Object} Model state with added new attempt, and set attemptOutcome
 *  This test tests if a sign is inside a secret code but in a wrong place
 */

test("testing compareCode() if a sign is inside a secret code but in a wrong place ", () => {
  expect(wgmt.compareCode(["S", "K", "T", "H"])).toStrictEqual({
    attempts: [
      { attemptCode: ["S", "K", "T", "H"], attemptOutcome: [0, 2, 2, 1] },
    ],
    attpInProgress: [],
    score: -1,
    secretComb: ["H", "K", "T", "T"],
  });
});

// END of tests for function compareCode()

//BEGIN of tests for function isTargetReached()

/**
 * @param {Array} Attempts - size 5
 * @return {boolean} true
 * Testing function isTargetReached with 5 total attempts, no guesses
 */

// customized object for testing purposes
const isTargetReached5Attempts = {
  attempts: [
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: -1,
  attpInProgress: [],
};

const wgmtIsTargetReached5Attemtps = new WebGejmikaModel(
  isTargetReached5Attempts
);

test("testing isTargetReached() with five wrong attempts ", () => {
  expect(
    wgmtIsTargetReached5Attemtps.isTargetReached(
      wgmtIsTargetReached5Attemtps.modelState.attempts
    )
  ).toBe(true);
});

/**
 * @param {Array} Attempts - size 4
 * @return {boolean} false
 *  Testing function isTargetReached with 4 total attempts, no guesses
 */

// customized object for testing purposes
const isTargetReached4Attempts = {
  attempts: [
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: -1,
  attpInProgress: [],
};

const wgmtIsTargetReached4Attemtps = new WebGejmikaModel(
  isTargetReached4Attempts
);

test("testing isTargetReached() with four wrong attempts ", () => {
  expect(
    wgmtIsTargetReached4Attemtps.isTargetReached(
      wgmtIsTargetReached4Attemtps.modelState.attempts
    )
  ).toBe(false);
});

/**
 * @param {Array} Attempts - size 4
 * @return {boolean} true
 *  Testing function isTargetReached with code guess in fourth attempt
 */

// customized object for testing purposes
const isTargetReachedCorrectCombination = {
  attempts: [
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "T"], attemptOutcome: [2, 2, 2, 2] },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: 13,
  attpInProgress: [],
};

const wgmtIsTargetReachedCorrectCombination = new WebGejmikaModel(
  isTargetReachedCorrectCombination
);

test("testing isTargetReached() with code guess in fourth attempt", () => {
  expect(
    wgmtIsTargetReachedCorrectCombination.isTargetReached(
      wgmtIsTargetReachedCorrectCombination.modelState.attempts
    )
  ).toBe(true);
});

/**
 * @param {Array} Attempts - size 0
 *  @return {boolean} false
 *  Testing isTargetReached() with empty attempts array
 */

// customized object for testing purposes
const isTargetReachedEmptyArray = {
  attempts: [],
  secretComb: ["H", "K", "T", "T"],
  score: 13,
  attpInProgress: [],
};

const wgmtIsTargetReachedEmptyArray = new WebGejmikaModel(
  isTargetReachedEmptyArray
);

test("testing isTargetReached() with empty attempts array ", () => {
  expect(
    wgmtIsTargetReachedEmptyArray.isTargetReached(
      wgmtIsTargetReachedEmptyArray.modelState.attempts
    )
  ).toBe(false);
});

// END of tests for function IsTargetReached()

// BEGIN of tests for function score()

/**
 * @param {Object} Model state with set attempts
 * @returns {number} Score - 21
 *  Testing hit in second attempt
 */

// customized object for testing purposes
const score21Points = {
  attempts: [
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "T"], attemptOutcome: [2, 2, 2, 2] },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: 21,
  attpInProgress: [],
};

const wgmtScore21Points = new WebGejmikaModel(score21Points);

test("testing score() - 21 points 2 attempt", () => {
  expect(
    wgmtScore21Points.score(wgmtScore21Points.modelState.attempts)
  ).toStrictEqual(21);
});

/**
 * @param {Object} Model state with set attempts
 * @returns {number} Score - 13
 * Testing score number for correct guess in fourth attempt
 */

// customized object for testing purposes
const score13Points = {
  attempts: [
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "T"], attemptOutcome: [2, 2, 2, 2] },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: 13,
  attpInProgress: [],
};

const wgmtScore13Points = new WebGejmikaModel(score13Points);

test("testing score() - 13 points 4 attempt", () => {
  expect(
    wgmtScore13Points.score(wgmtScore13Points.modelState.attempts)
  ).toStrictEqual(13);
});

/**
 * @param {Object} Model state with set attempts
 * @returns {number} Score - 8
 * Testing score number for correct guess in fifth attempt
 */

// customized object for testing purposes
const score8Points = {
  attempts: [
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "T"], attemptOutcome: [2, 2, 2, 2] },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: 8,
  attpInProgress: [],
};

const wgmtScore8Points = new WebGejmikaModel(score8Points);

test("testing score() - 8 points 5 attempt", () => {
  expect(
    wgmtScore8Points.score(wgmtScore8Points.modelState.attempts)
  ).toStrictEqual(8);
});

/**
 * @param {Object} Model state with set attempts
 * @returns {number} Score - 0
 * Testing score number for all five failed attempts
 */

// customized object for testing purposes
const score0Points = {
  attempts: [
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
    { attemptCode: ["H", "K", "T", "S"], attemptOutcome: [2, 2, 2, 0] },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: 8,
  attpInProgress: [],
};

const wgmtScore0Points = new WebGejmikaModel(score0Points);

test("testing score() - 0 points 5 attempt", () => {
  expect(
    wgmtScore0Points.score(wgmtScore0Points.modelState.attempts)
  ).toStrictEqual(0);
});

// END of testing score() function

test("testing secretCode() ", () => {
  expect(wgmt.secretCode().secretComb.length).toBe(4);
});
