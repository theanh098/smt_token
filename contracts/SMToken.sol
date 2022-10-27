// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SMToken is ERC20, Ownable {
    uint256 tokenStore;
    uint256 tokenRate;

    constructor(uint256 _initialSupply) ERC20("Snake Mai", "SMT") {
        _mint(msg.sender, _initialSupply);
        tokenStore = _initialSupply;
        tokenRate = 1000;
    }

    function buy() external payable {
        uint256 amountToBuy = msg.value;
        require(amountToBuy > 0, "You need to send some ether ");
        require(
            amountToBuy * tokenRate <= tokenStore,
            "Not enough tokens in storage"
        );

        transferFrom(owner(), msg.sender, amountToBuy * tokenRate);
    }

    function setTokenRate(uint256 _newRate) external onlyOwner {
        tokenRate = _newRate;
    }
}
