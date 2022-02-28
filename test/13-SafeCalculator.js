// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("SafeCalculator contract", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let SafeCalculator;
  let SafeCalculatorContract;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    // Deploy Contract
    SafeCalculator = await ethers.getContractFactory("SafeCalculator");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    SafeCalculatorContract = await SafeCalculator.deploy();
  });

  describe("Transactions", function () {
    // If the callback function is async, Mocha will `await` it.
    it("Should return right result when adding, substracting, multiplying, dividing", async function () {
      expect(await SafeCalculatorContract.add(2, 3)).to.equal(5);
      expect(await SafeCalculatorContract.sub(5, 3)).to.equal(2);
      expect(await SafeCalculatorContract.mul(2, 3)).to.equal(6);
      expect(await SafeCalculatorContract.div(9, 3)).to.equal(3);
    });
  });
});