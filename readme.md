# Exercice de test unitaire

Présentation en video
https://www.loom.com/share/dada937b8e0c4ae4a7a98f6dac983686


## **Tests**

	 TEST ON REGISTERED FUNCTION

- `describe("Registered test section)"` l-19

*type : expect*

`it("is whitelisteded"` / l-27 ==> We are testing if the Voter is registered

*type : expect*

`it("is whitelisteded"` / l-35 ==> We are testing if the Voter is NOT registered

*type : expectEvent*

`it("is not whitelisted"`/ l-42 ==> We are testing if the event **VoterRegistered** well trigger


	TEST ON VOTING FUNCTION

- `describe("Voting test section")"` / l-58

*type : expect*

`it("he hasn't voted yet")` / l-70 ==> We are testing if the voter are already voted

*type : expectRevert*

`it("should not allow if already voted")` / l-78 ==> We are testing if the voter tryu to vote multiple time.

*type : expectEvent*

`it("should return event after the vote")`/ l-88 ==> We are testing if the **Voted** event well  trigger

    TEST ON PROPOSAL FUNCTION

- `describe("check proposal section")"` / l-108

*type : expectRevert*

`it("should be onlyvoter")` / l-117 ==> We are testing if only voter can make a proposal

*type : expectRevert*

`it("should not have empty proposal")` / l-122 ==> We are testing if the voter try to submit empty proposal

*type : expectEvent*

`it("should return event after proposal")`/ l-130 ==> We are testing if the **ProposalRegistered** event well trigger

    TEST ON TALLY FUNCTION

- `describe("Tally test section")"` / l-146

*type : expectEvent*

`it("should return event after tallyl")`/ l-159 ==> We are testing if the **WorkflowStatusChange** event well trigger

    SOLIDITY COVERAGE RESULT


| File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Lines
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| Voting.sol | 76.92 | 53.57  | 81.82 | 78.0 |  135,137,138
| All files  | 76.92 | 53.57 | 81.82 | 78.0 |  |








