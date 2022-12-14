# recovery.social

<img src="https://recovery.social/assets/img/logo_text.svg" alt="logo" width="100"/>

## https://recovery.social

## Abstract

With the LSP11 - Social Recovery Contract a user is able to regain access after losing access to his/her UP.

To do that the user can add different guardians who vote for a his new address to regain access.

A user is able to add Guardians like family members or friends.
But a user donβt just wants to have friends and family members as guardians.
Users should be able to authenticate themselves with 2FA, Social Logins or even Biometric Authenfication.

For this we created the LSP11 - Recovery Service Contract, which allows external operators to act as Guardians for the LSP 11 - Social Recovery in a standardized way.

With recovery.social, we offer a UI, which helps the user setup everything and interact with Recovery Services.

We also provide sample projects and docs on how to become a Recovery Service and how to communicate with the LSP11 - Recovery Service and recovery.social.

Our vision is to build an open ecosystem where anyone can build a Recovery Service. The user decides, which services he trusts to help recover his profile.
Because the number of guards (threshold), which are needed to recover, can be set individually a user don't has to trust one service alone. This makes the system very flexible and trustworthy.



## FAQ

<details>
<summary>How can account recovery work?</summary>

If you setup your own social recovery contract (LSP11),
you add several guardians to it.
If you lose access to your π,those guardians can vote for your new 
address.
If a threshold of votes is met, you can regain access to your ππ.

</details>
<details>
<summary>What is a Recovery Service?</summary>

A recovery service is basically a service that verifies the users Identity 
when setting it up (which method is up to the recovery service), and 
stores this information safely.
A recovery service always has to follow the standard.
If the user reaches back to the recovery service, because he lost access 
to his π. The recovery service will identify the user and will vote for 
his new address.
A user always has to decide which recovery service, friends and family 
members he trusts and adds as guardians π‘οΈ.

</details>
<details>
<summary>Why should someone operate a recovery service?</summary>

In the standard, a recovery service can define a price the user has to 
pay, if he wants the recovery service to vote after the user got verified.
Another option could be a monthly subscription model the user pays to the 
service.

</details>
<details>
<summary>Best price guaranteeβ:</summary>

If the user adds the recovery service as a guardian the current price gets 
saved.
Therefore if the recovery service changes prices afterwards, the user 
don't has to worry.

If the recovery service reduces the price, the user will pay the reduced 
amount.

</details>


## Video

Full Video: https://youtu.be/ymi8fKFvod8

Product Video: https://youtu.be/ymi8fKFvod8?t=117

## Team

### NBR2807

nbr2807@recovery.social

[<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="github" width="50"/>](https://github.com/NBR2807)

### tmst99

tmst99@recovery.social

[<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="github" width="50"/>](https://github.com/tmst99)

## Full Docs

[https://docs.recovery.social](https://docs.recovery.social)

## Run the Program

The Program is deployed at https://recovery.social.

# Development

## Prerequisites

Download or clone the project. Open the project folder in your Terminal.
Run `npm i ` to install dependencies.

To use the Application you also need the LUKSO UP Browser Extension, which can be downloaded [here](https://docs.lukso.tech/guides/browser-extension/install-browser-extension/)

## Development server

Run `ng serve` for a dev server. Navigate to `https://localhost:4300/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/lsp11-social-recovery` directory.

<br>
<br>

# Recovery Services

## Abstract

This standard allows recovery services to provide a service to Universal Profile users to have them as an external guardian. The Recovery Service provides a method or multiple methods of Authentification for users. Universal Profile Users can setup the Authentification method with the Recovery Service and add them as a Recovery Service Guardian in their LSP11SocialRecovery.

The Recovery Service contract provides the most flexible and secure process, where the Recovery Service operator, if added as an guardian at the LSP11SocialRecovery, can vote to one address in each recoverProcessId.

The operator itself is able to let the user sign a transaction with a ticket provided by the Recovery Service Operator to vote, therefore the user pays for the gas.

The operator is able to define a price which has to be paid for the recovery process. When choosing a Recovery Service as a Guardian you will always be able to get the price which was set at that time.

The operator is also able to make a vote by himself, but has to cover the gas fees himself.

## Full Docs

https://docs.recovery.social/docs/standards/lsp11recoveryservice

<br/>

## Sample Implementations of Recovery Services

---

### Social Recovery Service TOTP

https://totp.recovery.social/

[GitHub](https://github.com/recovery-social/recovery-service-totp)

### Social Recovery Service Webauthn

https://passkey.recovery.social/

[GitHub](https://github.com/recovery-social/recovery-service-passkey)
