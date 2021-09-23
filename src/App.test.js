import { WebGejmikaModelTest } from './test/WebGejmikaModelTest';

let wgmt = new WebGejmikaModelTest()

//tests for function compareCode()
test('testing compareCode() with correct combination',() => {
  expect(wgmt.compareCode(['T','H','L','S'],['T','H','L','S'])).toStrictEqual([2,2,2,2])
})

test('testing compareCode() with incorect combination',() => {
  expect(wgmt.compareCode(['T','T','T','T'],['T','T','T','S'])).toStrictEqual([2,2,2,0])
})

test('testing compareCode() with null in attpInProgress ',() => {
  expect(wgmt.compareCode(['T','T','T',null],['T','T','T','T'])).toStrictEqual([2,2,2,0])
})

test('testing compareCode() with empty attpInProgress', () => {
  expect(wgmt.compareCode([],['T','T','T','T'])).toStrictEqual([])
})


// tests for function IsTargetReached()
test('testing IsTargetReached() with empty array with no attempts',() => {
expect(wgmt.isTargetReached([[]])).toBe(true)
})

test('testing IsTargetReached() with no attempts',() => {
expect(wgmt.isTargetReached([])).toBe(false)
})

test('testing IsTargetReached() with 5 attempts', () => {
expect(wgmt.isTargetReached([['2','2','2','1'],['2','1','1','1'],['2','1','1','1'],['2','2','1','2'],['2','2','1','2']])).toBeTruthy()
})

test('testing IstargetReached() when you miss first four combinations - it should return false',() =>(
expect(wgmt.isTargetReached([['2','2','2','1'],['2','1','1','1'],['2','1','1','1'],['2','2','2','1']])).toBeFalsy()
))

test('testing IstargetReached() in when you hit correct combination in a second try',() =>(
expect(wgmt.isTargetReached([['2','2','2','1'],['2','2','2','2']])).toBeTruthy()
))

test('testing IstargetReached() with null',() =>(
expect(wgmt.isTargetReached([['2','2','2','1'],['2','2','2',null]])).toBeFalsy()
))


// tests for function score()
test('testing score() - 21 score 1 attempt', () => {
  expect(wgmt.score([['2','2','2','2']])).toBe(21)
})

test('testing score() - 21 score 2 attempt', () => {
  expect(wgmt.score([['2','2','2','1'],['2','2','2','2']])).toBe(21)
})

test('testing score() - 21 score 3 attempt', () => {
  expect(wgmt.score([['2','2','2','1'],['2','2','2','1'],['2','2','2','2']])).toBe(21)
})

test('testing score() - 13 score 4 attempt', () => {
  expect(wgmt.score([['2','2','2','1'],['2','2','2','1'],['2','2','2','0'],['2','2','2','2']])).toBe(13)
})

test('testing score() - 8 score 5 attempt', () => {
  expect(wgmt.score([['2','2','2','1'],['2','2','2','1'],['2','2','2','0'],['2','2','2','0'],['2','2','2','2']])).toBe(8)
})

test('testing score() - missed all attempts', () => {
  expect(wgmt.score([['2','2','2','1'],['2','2','2','1'],['2','2','2','0'],['2','2','2','0'],['2','2','2','1']])).toBe(0)
})