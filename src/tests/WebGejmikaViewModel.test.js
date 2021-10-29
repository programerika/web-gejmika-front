/** 
    @author Programerika
*/

import { WebGejmikaViewModel } from "../viewModel/WebGejmikaViewModel";

// customized arrays for testing purposes

const wgVM = new WebGejmikaViewModel();

const iconsCorrect = [
  "/icons/diamond.png",
  "/icons/diamond.png",
  "/icons/star.png",
  "/icons/heart.png",
];

const iconsIncorrect = ["/icons/circle.png", "12345", "", "/icons/heart.png"];

/**
 * @param {Array} Strings of icon picture links
 * @returns {Array} Strings of code combination letters (H,K,S,L,T,P)
 * This test checks if array of correct icon picture links will be correctly transformed to combination code array
 *
 */

test("Testing iconToComb() function with correct picture links", () => {
  expect(wgVM.iconToComb(iconsCorrect)).toStrictEqual(["K", "K", "L", "H"]);
});

/**
 * @param {Array} Strings of icon picture links
 * @returns {Array} Strings of code combination letters (H,K,S,L,T,P)
 * This test tests if array of incorrect icon picture links will be correctly transformed to combination code array
 *
 */

test("Testing iconToComb() function with incorrect picture links", () => {
  expect(wgVM.iconToComb(iconsIncorrect)).toStrictEqual(["", "", "", "H"]);
});

// customized arrays for testing purposes

const combinationInProgress2 = ["S", "L", "", ""];
const combinationFull2 = ["S", "L", "H", "K"];

/**
 * @param {Array} Strings of code combination letters (H,K,S,L,T,P)
 * @returns {Array} Strings of icon picture links
 * This test tests combToIcon() function with combination in progress
 */

test("Testing combToIcon() function with combination in progress", () => {
  expect(wgVM.combToIcon(combinationInProgress2)).toStrictEqual([
    "/icons/traffic-light.png",
    "/icons/star.png",
    "/icons/circle.png",
    "/icons/circle.png",
  ]);
});

/**
 * @param {Array} Strings of code combination letters (H,K,S,L,T,P)
 * @returns {Array} Strings of icon picture links
 * This test tests combToIcon() function with full combination
 */

test("Testing combToIcon() function with full combination", () => {
  expect(wgVM.combToIcon(combinationFull2)).toStrictEqual([
    "/icons/traffic-light.png",
    "/icons/star.png",
    "/icons/heart.png",
    "/icons/diamond.png",
  ]);
});

// customized arrays for testing purposes

const outcomeAllInPlace = { inPlace: 4, correctCode: 0 };
const outcomeNoGuess = { inPlace: 0, correctCode: 0 };
const outcomeSomeInPlace = { inPlace: 2, correctCode: 2 };

const viewState = {
  preparedAttempts: [],
  correctView: [],
  attemptIncomplete: false,
  gameDifficulty: {
    attemptsLength: 5,
    combinationLength: 4,
  },
  id: -1,
  combID: -1,
};

const wgVM2 = new WebGejmikaViewModel(null, viewState, null, null);

/**
 * @param {Object} Object with inPlace and codeCorrect values
 * @returns {Array} Strings of color names for SVG Indicator (green, yellow or gray)
 * This test tests outcomeToColor() function with all guesses in place
 */

test("Testing outcomeToColor() function with all guesses in place", () => {
  expect(wgVM2.outcomeToColor(outcomeAllInPlace)).toStrictEqual([
    "green",
    "green",
    "green",
    "green",
  ]);
});

/**
 * @param {Array} Numbers Object with inPlace and codeCorrect values
 * @returns {Array} Strings of color names for SVG Indicator (green, yellow or gray)
 * This test tests outcomeToColor() function with 0 guesses
 */

test("Testing outcomeToColor() function with 0 guesses", () => {
  expect(wgVM2.outcomeToColor(outcomeNoGuess)).toStrictEqual([
    "gray",
    "gray",
    "gray",
    "gray",
  ]);
});

/**
 * @param {Array} Numbers Object with inPlace and codeCorrect values
 * @returns {Array} Strings of color names for SVG Indicator (green, yellow or gray)
 * This test tests outcomeToColor() function with some guesses in place, some out of place
 */

test("Testing outcomeToColor() function with some in place guesses", () => {
  expect(wgVM2.outcomeToColor(outcomeSomeInPlace)).toStrictEqual([
    "yellow",
    "yellow",
    "green",
    "green",
  ]);
});
