//We get the contract we want to test
const Voting = artifacts.require("./Voting.sol");

//We get the helper we need to make the test
const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

contract('Voting', accounts => {

    const owner = accounts[0];
    const voter = accounts[1];
    const voter2 = accounts[2];
    const voter3 = accounts[3];

    let votingInstance;

    /* ====================== TEST ON REGISTERED FUNCTION  ======================= */

    describe("Registered test section", function() {

        beforeEach(async function () {
            votingInstance = await Voting.new({ from: owner});
            await votingInstance.addVoter(voter, { from: owner });
        });

        // we check if the voter si registered
        it("is whitelisteded", async () => {
            const storeData = await votingInstance.getVoter(voter, { from: voter });
            // console.log(storeData);
            // console.log(storeData.isRegistered);
            expect(storeData.isRegistered).to.be.equal(true);
        });

        // We check if the voter is not registered
        it("is not whitelisted", async () => {
            const storeData = await votingInstance.getVoter(voter2, { from: voter });
            //console.log(storeData.isRegistered);
            expect(storeData.isRegistered).to.equal(false);
        });


         // We test the addVoter event trigger
        it("should return address of voter in emit", async () => {
            const storeData = await votingInstance.addVoter(voter3, { from: voter });
            expectEvent(
                storeData,
                "VoterRegistered",
                {
                    voterAddress: voter3, 
                });     
        });

    });


    /* ====================== TEST ON VOTING FUNCTION  ======================= */

    describe("Voting test section", function () {

        beforeEach(async function () {
            votingInstance = await Voting.new({ from: owner});
            await votingInstance.addVoter(voter, { from: owner });
            await votingInstance.startProposalsRegistering({ from: owner });
            // we add a new proposal
            await votingInstance.addProposal("test", { from: voter }), "You're not a voter";
        });


        // we check if the voter has already voted
        it("he hasn't voted yet", async () => {
            const storeData = await votingInstance.getVoter(voter, { from: voter });
            // we add a new proposal
            expect(storeData.hasVoted).to.be.equal(false);
        });


        //We check the require "hasVoted" of the setVote function
        it("should not allow if already voted", async () => {
            await votingInstance.endProposalsRegistering({ from: owner });
            await votingInstance.startVotingSession({ from: owner });
            // we vote for the first proposal = index 0
            await votingInstance.setVote(new BN(0),{from:voter});
            await expectRevert(votingInstance.setVote(new BN(0),{from:voter}), "You have already voted");

        });

        //We check the event trigger Voted
        it("should return event after the vote", async () => { 
            await votingInstance.endProposalsRegistering({ from: owner });
            await votingInstance.startVotingSession({ from: owner });
            const storeData = await votingInstance.setVote(new BN(0), { from: voter });
            //console.log(storeData);
            
            expectEvent(
                storeData, 
                "Voted",
                { 
                    voter: voter,
                    proposalId: new BN(0),
                }
            );
        });

    });

    /* ====================== TEST ON PROPOSAL FUNCTION  ======================= */

    describe("check proposal section", function () {

        beforeEach(async function () {
            votingInstance = await Voting.new({ from: owner});
            await votingInstance.addVoter(voter, { from: owner });
            await votingInstance.startProposalsRegistering({ from: owner });
        });

        // Onlyvoter can make a proposal
        it("should be onlyvoter", async () => {
            await expectRevert(votingInstance.addProposal("", { from: voter2 }), "You're not a voter");
        });

        // We check that the proposal is not empty
        it("should not have empty proposal", async () => {   
            await expectRevert(votingInstance.addProposal(
                "",
                { from: voter }),
                 "Vous ne pouvez pas ne rien proposer");
        });

        // We check the Proposal Registered event trigger
        it("should return event after proposal", async () => {  
            const storeData = await votingInstance.addProposal("ProposalRegistered", { from: voter });
            //console.log(storeData);
            
            expectEvent(
                    storeData, 
                    "ProposalRegistered",
                    {   
                    proposalId: new BN(0),
                    }
                );
        });
    });

    /* ====================== TEST ON TALLY FUNCTION  ======================= */

    describe("Tally test section", function () {

        beforeEach(async function () {
            votingInstance = await Voting.new({ from: owner});
            await votingInstance.addVoter(voter, { from: owner });
            await votingInstance.startProposalsRegistering({ from: owner });
            await votingInstance.addProposal("test", { from: voter }), "You're not a voter";
            await votingInstance.endProposalsRegistering({ from: owner });
            await votingInstance.startVotingSession({ from: owner });
            await votingInstance.setVote(new BN(0), { from: voter });
        }, "You're not a voter");

        // We check the Tally event trigger
        it("should return event after tally", async () => {  
            const storeData = await votingInstance.endVotingSession({ from: owner });
            //console.log(storeData);
            
            expectEvent(
                    storeData, 
                    "WorkflowStatusChange",
                    {   
                    previousStatus: new BN(3),
                    newStatus: new BN(4),
                    }
                );
        });

    });




});

