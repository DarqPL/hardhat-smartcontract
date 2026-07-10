# Hardhat Smart Contract

Hardhat V3 project with Ethers + Mocha + TypeScript + OpenZeppelin.

## Prerequisites

- Node.js >= 22.13.0
- npm

## Setup

```shell
npm install
```

Copy `.env.example` to `.env` and fill in your keys, or use the existing `.env`.

## Scripts

| Script | Description |
|---|---|
| `npm run build` | Compile contracts |
| `npm test` | Run tests |
| `npm run test:gas` | Run tests with gas stats |
| `npm run test:coverage` | Run tests with coverage |
| `npm run node` | Start local Hardhat node |
| `npm run clean` | Clear cache and artifacts |

## Deploy (Ignition)

Deploy module to local network:

```shell
npx hardhat ignition deploy ignition/modules/Counter.ts
```

Deploy to Sepolia:

```shell
node --env-file .env node_modules/hardhat/dist/src/cli.js ignition deploy ignition/modules/Counter.ts --network sepolia --verify
```

## Verify

After deploying via Ignition:

```shell
node --env-file .env node_modules/hardhat/dist/src/cli.js ignition verify chain-11155111 --network sepolia
```

## Test

```shell
npm test
```

## Networks

| Network | Type | Description |
|---|---|---|
| `default` | edr-simulated | Local in-process network |
| `sepolia` | http (l1) | Sepolia testnet |
| `ethereum` | http (l1) | Ethereum mainnet |

## Structure

```
contracts/          # Solidity source files
ignition/modules/   # Ignition deploy modules
test/               # Mocha test files
scripts/            # Run scripts
types/              # Auto-generated TypeChain types (by build)
artifacts/          # Compiled artifacts
```
