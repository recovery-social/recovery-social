// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

library TicketLib {
    struct Ticket {
        bytes32 r;
        bytes32 s;
        uint8 v;
    }
}
