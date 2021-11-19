/** 
    @author Programerika
*/
import { WebGejmikaModel } from "../lib/model/WebGejmikaModel";

// BEGIN of tests for function makeAGuess()

// customized object for testing purposes
const test21Points = {
  attempts: [],
  secretComb: ["H", "K", "T", "T"],
  score: -1,
  gameOver: false,
};

const wgmt = WebGejmikaModel.CreateFrom(test21Points);

/**
 * @param {Array} Strings of code combination letters (H,K,S,L,T,P)
 * @returns {Object} Model state with added new attempt, and set attemptOutcome
 *  This test tests if a player has hit a correct combination in first attempt.
 *  Function gets attemptInProgress as an argument, compares attemptInProgress with secret code,
 *  if it matches, attemptOutcome object will be {inPlace: 4, correctCode: 0}, player will get 21 points,
 *  current attempt in progress object with attempt outcome will be placed in attempts array
 */

test("testing makeAGuess() with correct combination in first attempt", () => {
  expect(wgmt.makeAGuess(["H", "K", "T", "T"])).resolves.toStrictEqual({
    attempts: [
      {
        attemptCode: ["H", "K", "T", "T"],
        attemptOutcome: { inPlace: 4, correctCode: 0 },
      },
    ],
    score: 21,
    gameOver: true,
    secretComb: ["H", "K", "T", "T"],
  });
});

/**
 * @param {Array} Strings of code combination letters (H,K,S,L,T,P)
 * @returns {Object} Model state with added new attempt, and set attemptOutcome
 *  This test tests if a player has missed a correct combination in first attempt.
 *  Function gets attemptInProgress as an argument, compares attemptInProgress with secret code
 *  and if it doesn't match, attemptOutcome array will be {inPlace: 3, correctCode: 0} player will stay at -1 points,
 *  current attempt in progress object with attempt outcome will be placed in attempts array
 */
test("testing makeAGuess() with incorect combination in first attempt", () => {
  expect(wgmt.makeAGuess(["H", "K", "T", "S"])).resolves.toStrictEqual({
    attempts: [
      {
        attemptCode: ["H", "K", "T", "S"],
        attemptOutcome: { inPlace: 3, correctCode: 0 },
      },
    ],
    gameOver: false,
  });
});

/**
 * @param {Array} Strings of code combination letters (H,K,S,L,T,P)
 * @returns {Object} Model state with added new attempt, and set attemptOutcome
 *  This test tests if a player has hit a correct combination in fourth attempt.
 *  Function gets attemptInProgress as an argument, compares attemptInProgress with secret code,
 *  if it matches, attemptOutcome array will be {inPlace: 4, correctCode: 0} in fourth attempt,
 *  player will get 13 points, current attempt in progress object with attempt
 *  outcome will be placed in attempts array
 */

// customized object for testing purposes
const test13Points = {
  attempts: [
    {
      attemptCode: ["H", "K", "T", "K"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "K"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "K"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: -1,
  gameOver: false,
};

const wgmtTest13 = WebGejmikaModel.CreateFrom(test13Points);

test("testing makeAGuess() with correct combination in fourth attempt", () => {
  expect(wgmtTest13.makeAGuess(["H", "K", "T", "T"])).resolves.toStrictEqual({
    attempts: [
      {
        attemptCode: ["H", "K", "T", "K"],
        attemptOutcome: { inPlace: 3, correctCode: 0 },
      },
      {
        attemptCode: ["H", "K", "T", "K"],
        attemptOutcome: { inPlace: 3, correctCode: 0 },
      },
      {
        attemptCode: ["H", "K", "T", "K"],
        attemptOutcome: { inPlace: 3, correctCode: 0 },
      },
      {
        attemptCode: ["H", "K", "T", "T"],
        attemptOutcome: { inPlace: 4, correctCode: 0 },
      },
    ],
    score: 13,
    gameOver: true,
    secretComb: ["H", "K", "T", "T"],
  });
});

/**
 * @param {Array} Strings of code combination letters (H,K,S,L,T,P)
 * @returns {Object} Model state with added new attempt, and set attemptOutcome
 * This test tests if a player has hit a correct combination in fifth attempt.
 * Function gets attemptInProgress as an argument, compares attemptInProgress with secret code,
 * if it matches, attemptOutcome array will be {inPlace: 4, correctCode: 0} in fifth attempt,
 * player will get 8 points, current attempt in progress object with attempt
 * outcome will be placed in attempts array
 */

// customized object for testing purposes
const test8Points = {
  attempts: [
    {
      attemptCode: ["H", "K", "T", "K"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "K"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "K"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "K"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: -1,
  gameOver: false,
};

const wgmtTest8Points = WebGejmikaModel.CreateFrom(test8Points);

test("testing makeAGuess() with correct combination in fifth attempt", () => {
  expect(
    wgmtTest8Points.makeAGuess(["H", "K", "T", "T"])
  ).resolves.toStrictEqual({
    attempts: [
      {
        attemptCode: ["H", "K", "T", "K"],
        attemptOutcome: { inPlace: 3, correctCode: 0 },
      },
      {
        attemptCode: ["H", "K", "T", "K"],
        attemptOutcome: { inPlace: 3, correctCode: 0 },
      },
      {
        attemptCode: ["H", "K", "T", "K"],
        attemptOutcome: { inPlace: 3, correctCode: 0 },
      },
      {
        attemptCode: ["H", "K", "T", "K"],
        attemptOutcome: { inPlace: 3, correctCode: 0 },
      },
      {
        attemptCode: ["H", "K", "T", "T"],
        attemptOutcome: { inPlace: 4, correctCode: 0 },
      },
    ],
    score: 8,
    gameOver: true,
    secretComb: ["H", "K", "T", "T"],
  });
});

/**
 * @param {Array} Strings of code combination letters (H,K,S,L,T,P)
 * @returns {Object} Model state with added new attempt, and set attemptOutcome
 * This test tests if a player has missed a correct combination in fifth attempt.
 * Function gets attpInProgress as an argument, compares attemptInProgress with secret code,
 * if it doesn't match, attemptOutcome array will be {inPlace: 3, correctCode: 0} in fifth attempt,
 * target will be reached and player will get 0 points, current attempt in progress
 * object with attempt outcome will be replaced from attpInProgress in attempts array
 */

// customized object for testing purposes
const test0Points = {
  attempts: [
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: -1,
  gameOver: false,
};

const wgmtTest0Points = WebGejmikaModel.CreateFrom(test0Points);

test("testing makeAGuess() with missed all combinations in all attempts", () => {
  expect(
    wgmtTest0Points.makeAGuess(["H", "K", "T", "S"])
  ).resolves.toStrictEqual({
    attempts: [
      {
        attemptCode: ["H", "K", "T", "S"],
        attemptOutcome: { inPlace: 3, correctCode: 0 },
      },
      {
        attemptCode: ["H", "K", "T", "S"],
        attemptOutcome: { inPlace: 3, correctCode: 0 },
      },
      {
        attemptCode: ["H", "K", "T", "S"],
        attemptOutcome: { inPlace: 3, correctCode: 0 },
      },
      {
        attemptCode: ["H", "K", "T", "S"],
        attemptOutcome: { inPlace: 3, correctCode: 0 },
      },
      {
        attemptCode: ["H", "K", "T", "S"],
        attemptOutcome: { inPlace: 3, correctCode: 0 },
      },
    ],
    score: 0,
    gameOver: true,
    secretComb: ["H", "K", "T", "T"],
  });
});

/**
 * @param {Array} Strings of code combination letters (H,K,S,L,T,P)
 * @returns {Object} Model state with added new attempt, and set attemptOutcome
 *  This test tests if a sign is inside a secret code but in a wrong place
 */

test("testing makeAGuess() if a sign is inside a secret code but in a wrong place ", () => {
  expect(wgmt.makeAGuess(["S", "K", "T", "H"])).resolves.toStrictEqual({
    attempts: [
      {
        attemptCode: ["S", "K", "T", "H"],
        attemptOutcome: { inPlace: 2, correctCode: 1 },
      },
    ],
    gameOver: false,
  });
});

// END of tests for function makeAGuess()

//BEGIN of tests for function isTargetReached()

/**
 * @param {Array} Attempts - size 5
 * @return {boolean} true
 * Testing function isTargetReached with 5 total attempts, no guesses
 */

// customized object for testing purposes
const isTargetReached5Attempts = {
  attempts: [
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: -1,
  gameOver: false,
};

const wgmtIsTargetReached5Attemtps = WebGejmikaModel.CreateFrom(
  isTargetReached5Attempts
);

test("testing isTargetReached() with five wrong attempts ", () => {
  expect(
    wgmtIsTargetReached5Attemtps.isTargetReached(
      isTargetReached5Attempts.attempts
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
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: -1,
  gameOver: false,
};

const wgmtIsTargetReached4Attemtps = WebGejmikaModel.CreateFrom(
  isTargetReached4Attempts
);

test("testing isTargetReached() with four wrong attempts ", () => {
  expect(
    wgmtIsTargetReached4Attemtps.isTargetReached(
      isTargetReached4Attempts.attempts
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
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "T"],
      attemptOutcome: { inPlace: 4, correctCode: 0 },
    },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: -1,
  gameOver: false,
};

const wgmtIsTargetReachedCorrectCombination = WebGejmikaModel.CreateFrom(
  isTargetReachedCorrectCombination
);

test("testing isTargetReached() with code guess in fourth attempt", () => {
  expect(
    wgmtIsTargetReachedCorrectCombination.isTargetReached(
      isTargetReachedCorrectCombination.attempts
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
  score: -1,
  gameOver: false,
};

const wgmtIsTargetReachedEmptyArray = WebGejmikaModel.CreateFrom(
  isTargetReachedEmptyArray
);

test("testing isTargetReached() with empty attempts array ", () => {
  expect(
    wgmtIsTargetReachedEmptyArray.isTargetReached(
      isTargetReachedEmptyArray.attempts
    )
  ).toBe(false);
});

// END of tests for function IsTargetReached()

// BEGIN of tests for function calculateScore()

/**
 * @param {Object} Model state with set attempts
 * @returns {number} Score - 21
 *  Testing hit in second attempt
 */

// customized object for testing purposes
const score21Points = {
  attempts: [
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "T"],
      attemptOutcome: { inPlace: 4, correctCode: 0 },
    },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: -1,
  gameOver: false,
};

const wgmtScore21Points = WebGejmikaModel.CreateFrom(score21Points);

test("testing calculateScore() - 21 points 2 attempt", () => {
  expect(
    wgmtScore21Points.calculateScore(score21Points.attempts)
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
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "T"],
      attemptOutcome: { inPlace: 4, correctCode: 0 },
    },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: -1,
  gameOver: false,
};

const wgmtScore13Points = WebGejmikaModel.CreateFrom(score13Points);

test("testing calculateScore() - 13 points 4 attempt", () => {
  expect(
    wgmtScore13Points.calculateScore(score13Points.attempts)
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
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "T"],
      attemptOutcome: { inPlace: 4, correctCode: 0 },
    },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: -1,
  gameOver: false,
};

const wgmtScore8Points = WebGejmikaModel.CreateFrom(score8Points);

test("testing calculateScore() - 8 points 5 attempt", () => {
  expect(wgmtScore8Points.calculateScore(score8Points.attempts)).toStrictEqual(
    8
  );
});

/**
 * @param {Object} Model state with set attempts
 * @returns {number} Score - 0
 * Testing score number for all five failed attempts
 */

// customized object for testing purposes
const score0Points = {
  attempts: [
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
    {
      attemptCode: ["H", "K", "T", "S"],
      attemptOutcome: { inPlace: 3, correctCode: 0 },
    },
  ],
  secretComb: ["H", "K", "T", "T"],
  score: -1,
  gameOver: false,
};

const wgmtScore0Points = WebGejmikaModel.CreateFrom(score0Points);

test("testing calculateScore() - 0 points 5 attempt", () => {
  expect(wgmtScore0Points.calculateScore(score0Points.attempts)).toStrictEqual(
    0
  );
});

// END of testing calculateScore() function

// BEGIN of testing generateSecretCode()

// customized object for testing purposes
let testGenerateSecretCode = {};

const wgmtGenerateSecretCode = WebGejmikaModel.CreateFrom(
  testGenerateSecretCode,
  ({ payload: { newModelState } }) => {
    testGenerateSecretCode = { ...newModelState };
  }
);

test("testing if function generateSecretCode returns secret combination array with correct length", () => {
  wgmtGenerateSecretCode.generateSecretCode();
  expect(testGenerateSecretCode.secretComb.length).toBe(
    wgmtGenerateSecretCode.combinationLength()
  );
});

// END of testing generateSecretCode()
