// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract QuantumWrappedBNB is ERC20 {
    address public bridgeAdmin;

    constructor() ERC20("Quantum Wrapped BNB", "qBNB") {
        bridgeAdmin = msg.sender; // Bapak sebagai Admin
    }

    // Fungsi ini akan dipanggil otomatis oleh Relayer VPS Bapak
    function mintFromBridge(address _to, uint256 _amount) public {
        require(msg.sender == bridgeAdmin, "Hanya Bridge yang boleh mencetak!");
        _mint(_to, _amount);
    }
}
