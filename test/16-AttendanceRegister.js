// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("AttendanceRegister contract", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let AttendanceRegister;
  let AttendanceRegisterContract;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    // Deploy Contract
    AttendanceRegister = await ethers.getContractFactory("AttendanceRegister");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    AttendanceRegisterContract = await AttendanceRegister.deploy();
  });

  describe("Transactions", function () {
    // If the callback function is async, Mocha will `await` it.
    it("Should only teacher add the data of student. An event will be emitted on success", async function () {
      await AttendanceRegisterContract.connect(owner).add('Jack', 1, Date.now());
      let student = await AttendanceRegisterContract.register(1);
      expect(student.name).to.equal('Jack');
      expect(student.class).to.equal(1);

      await expect(AttendanceRegisterContract.add('Bob', 2, Date.now()))
        .to.emit(AttendanceRegisterContract, "Added")
        .withArgs('Bob', 2, Math.round(Date.now() / 1000) + 22);
      console.log('Timestamp with JS', Math.round(Date.now() / 1000) + 22);
    });
  });
});