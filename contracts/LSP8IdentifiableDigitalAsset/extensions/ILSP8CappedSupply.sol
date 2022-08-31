// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// interfaces
import {ILSP8IdentifiableDigitalAsset} from "../ILSP8IdentifiableDigitalAsset.sol";

/**
 * @dev LSP8 extension, adds token supply cap.
 */
interface ILSP8CappedSupply is ILSP8IdentifiableDigitalAsset {
    /**
     * @dev Returns the number of tokens that can be minted.
     * @return The token max supply
     */
    function tokenSupplyCap() external view returns (uint256);
}
