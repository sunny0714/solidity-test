// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("Rent contract", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let Rent;
  let RentContract;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    // Deploy Contract
    Rent = await ethers.getContractFactory("Rent");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    RentContract = await Rent.deploy('Jack', 25, 'Engineer');
  });

  describe("Transactions", function () {
    // If the callback function is async, Mocha will `await` it.
    it("Should be executed on plain Ether transfers", async function () {
      expect(await RentContract.landlord()).to.equal(owner.address);
      expect(await RentContract.tenantName()).to.equal('Jack');
    });
  });
});