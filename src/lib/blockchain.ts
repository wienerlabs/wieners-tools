export type NetworkId = "base" | "solana";

export type CategoryId =
  | "starters"
  | "wallets"
  | "dex"
  | "defi"
  | "infra"
  | "data"
  | "ai"
  | "agentic";

export type Resource = {
  name: string;
  tagline: string;
  blurb: string;
  whyVibeCoder: string;
  url: string;
  docsUrl: string;
  installCmd?: string;
  codeSnippet?: string;
  integrationPrompt: string;
  badge?: string;
};

export type Section = {
  id: CategoryId;
  resources: Resource[];
};

export type BrandAsset = {
  src: string;
  filename: string;
  label: string;
  variant: "color" | "light" | "dark";
  bg: "light" | "dark";
};

export type Network = {
  id: NetworkId;
  name: string;
  tagline: string;
  about: string;
  vibePitch: string;
  primaryColor: string;
  accentColor?: string;
  logoSrc: string;
  squareSrc: string;
  brandKitUrl: string;
  docsUrl: string;
  ecosystemUrl: string;
  ecosystemLabel: string;
  brandAssets: BrandAsset[];
  sections: Section[];
};

const PROMPT_CONTEXT = `You are integrating into an existing Next.js 16 + TypeScript + Tailwind CSS v4 app. The app uses the App Router, server components by default, and "use client" for interactive bits. Wallet adapters and signing live in client components; data fetching for read paths can stay on the server. Keep imports tree-shaken, avoid heavy global state, and prefer dynamic imports for any package over 50 KB.`;

export const networks: Network[] = [
  // ============================================================
  // BASE
  // ============================================================
  {
    id: "base",
    name: "Base",
    tagline: "Coinbase'in EVM L2'si — düşük ücret, hızlı bilgilendirme, smart wallet ile gasless onboarding.",
    about:
      "Base, Optimism'in OP Stack'i üzerine kurulu, Coinbase tarafından inkübe edilmiş bir Ethereum L2'sidir. EVM uyumlu, Solidity ile yazılır, Coinbase ürünleriyle native entegrasyon ve smart wallet (passkey + paymaster) ile sıfır-gas onboarding sağlar. Block time ~2 saniye, ortalama ücret bir kaç sent.",
    vibePitch:
      "Tek bir paketle (OnchainKit) wallet + transaction + identity tek-satır API gibi gelir. Smart Wallet sayesinde kullanıcılar passkey ile bağlanır, ilk işlemleri için gas ödemezler. Vibe coder için: prompt yaz, AI komponenti yaz, deploy et, kullanıcıyı 30 saniyede onboard et.",
    primaryColor: "#0052FF",
    accentColor: "#ffffff",
    logoSrc: "/brands/base-lockup.svg",
    squareSrc: "/brands/base-square.svg",
    brandKitUrl: "https://www.base.org/brand",
    docsUrl: "https://docs.base.org",
    ecosystemUrl: "https://www.base.org/ecosystem",
    ecosystemLabel: "Base ekosistemi",
    brandAssets: [
      { src: "/brands/base-lockup.svg", filename: "Base_lockup_black.svg", label: "Lockup · Siyah", variant: "dark", bg: "light" },
      { src: "/brands/base-lockup-white.svg", filename: "Base_lockup_white.svg", label: "Lockup · Beyaz", variant: "light", bg: "dark" },
      { src: "/brands/base-lockup-2color.svg", filename: "Base_lockup_2color.svg", label: "Lockup · 2-renk", variant: "color", bg: "light" },
      { src: "/brands/base-mark.svg", filename: "Base_square_black.svg", label: "Square · Siyah", variant: "dark", bg: "light" },
      { src: "/brands/base-square.svg", filename: "Base_square_blue.svg", label: "Square · Mavi", variant: "color", bg: "light" },
      { src: "/brands/base-square-white.svg", filename: "Base_square_white.svg", label: "Square · Beyaz", variant: "light", bg: "dark" }
    ],
    sections: [
      {
        id: "starters",
        resources: [
          {
            name: "create-onchain (OnchainKit)",
            tagline: "Tek komutla Base + wagmi + viem + RainbowKit'li Next.js iskelesi.",
            blurb: "Coinbase OnchainKit'in resmi scaffold'u. React + wagmi + viem + RainbowKit + Tailwind hazır gelir, smart wallet ve sponsored gas için Paymaster opsiyonu hazır.",
            whyVibeCoder: "Boş klasörden 90 saniyede deploy edilebilir bir Base dApp. AI'a istediğini söyle — wallet button, swap UI, transaction gönderimi tek komponentte.",
            url: "https://www.smartwallet.dev/",
            docsUrl: "https://docs.base.org/onchainkit/getting-started",
            installCmd: "npm create onchain@latest",
            codeSnippet: "import { OnchainKitProvider } from '@coinbase/onchainkit';\nimport { base } from 'wagmi/chains';\n\nexport function Providers({ children }) {\n  return (\n    <OnchainKitProvider apiKey={process.env.NEXT_PUBLIC_CDP_KEY} chain={base}>\n      {children}\n    </OnchainKitProvider>\n  );\n}",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: integrate Coinbase OnchainKit into this app so I can drop in <ConnectWallet />, <Transaction />, <Swap /> and <Identity /> components anywhere.

Steps:
1. Install: \`npm install @coinbase/onchainkit @rainbow-me/rainbowkit wagmi viem @tanstack/react-query\`.
2. Create a client provider component at src/app/providers.tsx that wraps OnchainKitProvider + WagmiProvider + QueryClientProvider, configured for chain=base. Read the Coinbase Developer Platform API key from process.env.NEXT_PUBLIC_CDP_KEY.
3. Wire the provider into src/app/layout.tsx.
4. Add a route /wallet that demonstrates <ConnectWallet />, <Identity /> and a sample <Transaction /> sending 0 wei to the connected address (sanity check).
5. Configure tailwind.config to scan @coinbase/onchainkit so its classes are kept.
6. Add a NEXT_PUBLIC_CDP_KEY entry to .env.example with a comment pointing to https://portal.cdp.coinbase.com.
7. Make sure the providers component is "use client" and the rest of the layout stays a server component.

Do not add Redux, Zustand, or any other state library. Use OnchainKit + wagmi hooks only. Keep diff focused; don't reformat unrelated files.`
          },
          {
            name: "Foundry",
            tagline: "Solidity build / test / deploy — Rust altyapılı en hızlı framework.",
            blurb: "forge build/test, anvil local node, cast CLI ile EVM kontratlarını yaz, fuzz test et, mainnet/Sepolia'ya deploy et. Hardhat'a göre 10x daha hızlı test çalışır.",
            whyVibeCoder: "Kontrat yazıyorsan sadece bunu kullan. cast ve forge ile AI'a verdiğin promptlar tek komutta deploy edilebilir.",
            url: "https://book.getfoundry.sh/",
            docsUrl: "https://docs.base.org/quickstart/deploy-with-foundry",
            installCmd: "curl -L https://foundry.paradigm.xyz | bash && foundryup",
            codeSnippet: "forge init my-base-app\ncd my-base-app\nforge build\nforge test\n# deploy to Base Sepolia\nforge create src/Counter.sol:Counter \\\n  --rpc-url https://sepolia.base.org \\\n  --private-key $PRIVATE_KEY",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: add a Foundry workspace under contracts/ inside this Next.js repo so I can write Solidity, run forge test, and deploy to Base Sepolia + mainnet.

Steps:
1. Create contracts/ directory at repo root (NOT inside src/). Inside contracts/, run \`forge init . --no-git\` (the repo already has git).
2. Configure foundry.toml with two RPC profiles: base_sepolia (https://sepolia.base.org) and base (https://mainnet.base.org). Add etherscan section pointing both to https://api.basescan.org/api with the same key from BASESCAN_API_KEY env var.
3. Write a sample Counter.sol with increment() and current() in contracts/src/, plus a forge test in contracts/test/ that reaches 100% coverage on it.
4. Add a Makefile target \`deploy-sepolia\` that runs forge create with --rpc-url base_sepolia and verifies on basescan.
5. Update .gitignore to exclude contracts/cache/, contracts/out/, contracts/broadcast/.
6. Document required env vars (PRIVATE_KEY, BASESCAN_API_KEY) in .env.example.

Do not move existing Next.js source. Foundry workspace must coexist alongside it without breaking the npm scripts.`
          },
          {
            name: "Hardhat",
            tagline: "Plugin'li klasik EVM developer environment.",
            blurb: "TypeScript-first kontrat geliştirme; viem/ethers seçimi, ignition deployment framework, plugin ekosistemi geniş. Foundry'ye göre yavaş ama JS/TS ile entegrasyonu kolay.",
            whyVibeCoder: "Front-end ile aynı dilde (TS) kalıp deploy script'ini AI'a yazdıracaksan tercih et. ignition modülleri okunabilir.",
            url: "https://hardhat.org/",
            docsUrl: "https://docs.base.org/quickstart/deploy-with-hardhat",
            installCmd: "npm install --save-dev hardhat",
            codeSnippet: "npx hardhat init\n# scripts/deploy.ts\nimport { network } from 'hardhat';\nconst { viem } = await network.connect();\nconst counter = await viem.deployContract('Counter');\nconsole.log('deployed:', counter.address);",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: add Hardhat 3 (viem-flavored) under contracts/ to deploy Solidity contracts to Base.

Steps:
1. Run \`npx hardhat --init\` inside a new contracts/ directory; pick TypeScript + viem when prompted.
2. Configure hardhat.config.ts with two networks: baseSepolia (rpc https://sepolia.base.org, chainId 84532) and base (rpc https://mainnet.base.org, chainId 8453). Read PRIVATE_KEY from process.env.
3. Add etherscan config block pointing to BaseScan with BASESCAN_API_KEY.
4. Write a simple Counter.sol + matching Hardhat-3 viem test.
5. Add a deploy script in scripts/deploy.ts that uses ignition to deploy to baseSepolia.
6. Document env vars in .env.example. Add contracts/artifacts/, contracts/cache/, contracts/typechain-types/ to .gitignore.

Do not modify any Next.js source files. Hardhat workspace lives entirely under contracts/.`
          },
          {
            name: "Base Quickstart",
            tagline: "Wallet bağla, ilk kontratını mainnet/Sepolia'ya gönder.",
            blurb: "Base'in resmi 5-dakikalık başlangıç rehberi. Sepolia faucet linkleri, deploy komutları, BaseScan doğrulama akışı tek sayfada.",
            whyVibeCoder: "İlk kez Base'e dokunuyorsan bunu oku, sonra geri gel. Faucet → deploy → verify döngüsünü tek geçiş.",
            url: "https://docs.base.org/get-started/base",
            docsUrl: "https://docs.base.org/get-started/base",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: bootstrap my Base development environment from zero.

Steps:
1. Walk me through obtaining Base Sepolia testnet ETH from https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet.
2. Suggest the right starter — OnchainKit for full-stack, Foundry for contract-first, Hardhat for TS-first.
3. After I pick one, generate the matching boilerplate in this repo and run the smoke test (deploy a Counter contract to Sepolia, verify on BaseScan).
4. Print the deployed address, BaseScan link and the next 3 things I should learn (paymaster, ENS-like Basenames, OnchainKit Identity).`,
            badge: "Quickstart"
          }
        ]
      },
      {
        id: "wallets",
        resources: [
          {
            name: "Coinbase Smart Wallet",
            tagline: "Passkey ile gasless onboarding, recovery key olmadan.",
            blurb: "Coinbase'in ERC-4337 tabanlı smart wallet'ı. Kullanıcı parola/seed phrase görmez; passkey (Touch ID, Face ID) ile bağlanır, ilk işlemleri için Coinbase paymaster gas öder.",
            whyVibeCoder: "Crypto-native olmayan kullanıcıyı saniyeler içinde onboard etmek için tek doğru yol. Demo videolarında 'wallet bağla' aşamasının kullanıcıyı düşürmesini engeller.",
            url: "https://www.smartwallet.dev/",
            docsUrl: "https://docs.base.org/identity/smart-wallet",
            installCmd: "npm install wagmi viem @coinbase/wallet-sdk",
            codeSnippet: "import { coinbaseWallet } from 'wagmi/connectors';\nimport { base } from 'wagmi/chains';\n\nexport const config = createConfig({\n  chains: [base],\n  connectors: [coinbaseWallet({ appName: 'My App', preference: 'smartWalletOnly' })]\n});",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: add Coinbase Smart Wallet as the primary connector in this app, with passkey-based onboarding and Paymaster sponsorship.

Steps:
1. Install wagmi, viem, @coinbase/wallet-sdk if missing.
2. In wagmi config, add coinbaseWallet connector with preference: 'smartWalletOnly' so users always get the smart wallet flow (no extension popup).
3. Create a <ConnectWallet /> client component that calls useConnect with the coinbase connector and shows the passkey prompt.
4. For the first transaction in the user journey, attach the Base Paymaster to sponsor gas. Use the @coinbase/onchainkit <Transaction /> component if OnchainKit is installed; otherwise call eth_sendUserOperation with paymasterAndData from https://api.developer.coinbase.com.
5. Add a NEXT_PUBLIC_CDP_PAYMASTER_URL to .env.example.

Do not implement seed-phrase fallback. The whole point is to skip it. Keep the bundle lean — do not add @web3modal or other connect-modal libraries.`,
            badge: "Wallet"
          },
          {
            name: "RainbowKit",
            tagline: "EVM cüzdanları için en güzel connect modal.",
            blurb: "Coinbase, MetaMask, WalletConnect, Phantom-EVM, Rabby gibi 100+ cüzdan için tek komponent. wagmi + viem üzerine oturur, Tailwind ile tema uyumlu.",
            whyVibeCoder: "Connect modal yazmaktan ölmek üzeresin — RainbowKit'i kur, geri kalan kullanıcı UX'ine odaklan.",
            url: "https://www.rainbowkit.com/",
            docsUrl: "https://www.rainbowkit.com/docs/installation",
            installCmd: "npm install @rainbow-me/rainbowkit wagmi viem @tanstack/react-query",
            codeSnippet: "import '@rainbow-me/rainbowkit/styles.css';\nimport { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';\nimport { base } from 'wagmi/chains';\n\nconst config = getDefaultConfig({\n  appName: 'My Base App',\n  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,\n  chains: [base]\n});",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: add RainbowKit as the connect modal for this Next.js app, defaulting to Base chain.

Steps:
1. Install @rainbow-me/rainbowkit, wagmi, viem, @tanstack/react-query.
2. Create src/app/providers.tsx ("use client") that exports a <Providers> component wrapping WagmiProvider + QueryClientProvider + RainbowKitProvider. Use getDefaultConfig with projectId from NEXT_PUBLIC_WC_PROJECT_ID, chains=[base], and a clean theme that matches our cream + black palette (use lightTheme with accentColor #000 and borderRadius 'small').
3. Import @rainbow-me/rainbowkit/styles.css in providers.tsx (NOT in layout — keeps it client-only).
4. Wire <Providers> into app/layout.tsx around {children}.
5. Add a <ConnectButton /> from RainbowKit to the navbar.
6. Document the WalletConnect projectId env var in .env.example pointing to https://cloud.reown.com.

Do not introduce Web3Modal alongside RainbowKit. Pick one. RainbowKit handles WalletConnect internally.`
          },
          {
            name: "Privy",
            tagline: "E-mail / sosyal giriş + embedded wallet.",
            blurb: "Privy, kullanıcı hiç crypto bilmeden e-mail ya da Google ile bağlanır, arka planda bir embedded wallet üretilir. Sonra istersek MPC ile transfer edilebilir bir wallet'a geçirilir.",
            whyVibeCoder: "Crypto-native olmayan kullanıcı hedefliyorsan: form sayfan kadar sürtünmesiz onboarding.",
            url: "https://www.privy.io/",
            docsUrl: "https://docs.privy.io/guide/react/quickstart",
            installCmd: "npm install @privy-io/react-auth",
            codeSnippet: "import { PrivyProvider } from '@privy-io/react-auth';\n\nexport function Providers({ children }) {\n  return (\n    <PrivyProvider\n      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}\n      config={{ loginMethods: ['email', 'google', 'wallet'], embeddedWallets: { createOnLogin: 'users-without-wallets' } }}\n    >\n      {children}\n    </PrivyProvider>\n  );\n}",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: add Privy auth so users can sign in with email/Google and get an embedded EVM wallet on Base.

Steps:
1. Install @privy-io/react-auth and @privy-io/wagmi (if integrating wagmi).
2. Create a "use client" Providers wrapper that hosts <PrivyProvider> with appId from NEXT_PUBLIC_PRIVY_APP_ID, loginMethods: ['email','google','wallet'], embeddedWallets: { createOnLogin: 'users-without-wallets' }, defaultChain: base from viem/chains.
3. Wrap children in app/layout.tsx with Providers.
4. Add a <LoginButton> client component using usePrivy() — shows "Sign in" when !authenticated, otherwise the truncated wallet address with a logout option.
5. Add a useSmartTx() helper that calls embedded wallet's sendTransaction directly when available (skips the connector popup).
6. Document NEXT_PUBLIC_PRIVY_APP_ID in .env.example pointing to https://dashboard.privy.io.

Don't bring in NextAuth alongside Privy. Privy IS the auth layer.`
          },
          {
            name: "Dynamic",
            tagline: "Multi-chain auth + wallet UI.",
            blurb: "Dynamic, Privy'ye benzer ama daha fazla chain destekler (Solana dahil). E-mail, sosyal, embedded wallet, plus farcaster/lens entegrasyonu.",
            whyVibeCoder: "Hem EVM hem Solana hedefliyorsan, tek kütüphane ile her ikisi.",
            url: "https://www.dynamic.xyz/",
            docsUrl: "https://docs.dynamic.xyz/",
            installCmd: "npm install @dynamic-labs/sdk-react-core @dynamic-labs/ethereum",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: add Dynamic.xyz as a multi-chain auth provider for Base + (optionally) Solana.

Steps:
1. Install @dynamic-labs/sdk-react-core, @dynamic-labs/ethereum, optionally @dynamic-labs/solana.
2. Create a "use client" providers component wrapping <DynamicContextProvider> with environmentId from NEXT_PUBLIC_DYNAMIC_ENV_ID and walletConnectors: [EthereumWalletConnectors] (add SolanaWalletConnectors if needed).
3. Default to Base mainnet via initialAuthenticationMode and overrides.evmNetworks.
4. Add a <DynamicWidget /> in the navbar — it handles connect, disconnect, network switch out of the box.
5. Use useDynamicContext() to access primaryWallet for sending tx.
6. Document NEXT_PUBLIC_DYNAMIC_ENV_ID in .env.example pointing to https://app.dynamic.xyz.

Pick Dynamic OR RainbowKit/Privy — don't ship two auth modals.`
          }
        ]
      },
      {
        id: "dex",
        resources: [
          {
            name: "Uniswap",
            tagline: "Base'in en yüksek hacimli AMM'i; v3 + Universal Router.",
            blurb: "Uniswap v3 concentrated liquidity + Universal Router ile multi-hop swap'lar. SDK'ları (v3-sdk, universal-router-sdk) ile token quote ve calldata generation tek satırda.",
            whyVibeCoder: "Swap UI yazıyorsan: token select → useTrade → universal router calldata → wagmi sendTransaction. Tüm ekosistemden likidite.",
            url: "https://docs.uniswap.org/",
            docsUrl: "https://docs.uniswap.org/sdk/v3/overview",
            installCmd: "npm install @uniswap/v3-sdk @uniswap/universal-router-sdk @uniswap/sdk-core",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: add a Uniswap v3 swap widget on Base mainnet.

Steps:
1. Install @uniswap/v3-sdk, @uniswap/universal-router-sdk, @uniswap/sdk-core, and viem if not present.
2. Create lib/uniswap.ts with helpers: getPool(tokenA, tokenB, fee), getQuote(tokenIn, tokenOut, amountIn), buildSwapCalldata(quote, slippageBps, recipient).
3. Create components/SwapWidget.tsx as "use client" — token selector (start with USDC + ETH on Base), input amount, useEffect to fetch quote on debounced input change, "Swap" button that calls useWriteContract with the universal router address (0x6fF5693b99212Da76ad316178A184AB56D299b43 on Base).
4. Show the price impact, minimum received (after slippage), and route hops in a small details footer.
5. Add basic error handling for: insufficient balance, slippage too high, route not found.
6. Hardcode Base USDC = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913.

Do not write a custom router — use Universal Router via the SDK. Keep the widget under 250 LOC.`
          },
          {
            name: "Aerodrome",
            tagline: "ve(3,3) modeli — Base-native veDEX.",
            blurb: "Velodrome'dan fork edilmiş Base-native AMM. AERO emisyonları için vote-escrow modeli, sürekli likidite stimülasyonu. TVL Base'in DeFi omurgasının önemli parçası.",
            whyVibeCoder: "Native Base token'larıyla çalışan bir DEX UI lazımsa Aerodrome routing tercih et. Quote endpoint'leri açık.",
            url: "https://aerodrome.finance/",
            docsUrl: "https://aerodrome.finance/docs",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: integrate Aerodrome swap routing into my dApp on Base.

Steps:
1. Install viem and wagmi if missing.
2. Add lib/aerodrome.ts with the official Router address (0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43) and the getAmountsOut readContract call.
3. Build a <AeroSwap> client component that quotes via getAmountsOut, then calls swapExactTokensForTokens on the router. Pass routes as { from, to, stable: false, factory } tuples.
4. Add a slippage slider (default 0.5%) and a deadline (now + 20 min).
5. Surface gauge incentives ("this pair earns AERO emissions") if the pair is whitelisted by reading from the Voter contract (0x16613524e02ad97eDfeF371bC883F2F5d6C480A5).

Use Aerodrome ONLY if the user explicitly wants AERO emissions / Base-native routing. For deepest liquidity across all venues, prefer Uniswap or 0x.`
          },
          {
            name: "0x Swap API",
            tagline: "Çoklu kaynaktan en iyi quote'u tek endpoint'le getir.",
            blurb: "0x Swap API, Uniswap, Curve, Aerodrome, Maverick gibi tüm büyük likidite kaynaklarını tarar, optimal route'u tek HTTP yanıtı olarak döner. Gasless mode + Permit2 desteği var.",
            whyVibeCoder: "Tek endpoint, sıfır SDK. Vibe coder için: fetch → calldata → sendTransaction.",
            url: "https://0x.org/docs/api",
            docsUrl: "https://0x.org/docs/0x-swap-api/api-references",
            installCmd: "# REST API only — no SDK needed",
            codeSnippet: "const r = await fetch(\n  `https://api.0x.org/swap/permit2/quote?` + new URLSearchParams({\n    chainId: '8453',\n    sellToken: '0x4200000000000000000000000000000000000006', // WETH\n    buyToken:  '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC\n    sellAmount: '100000000000000000', // 0.1 ETH\n    taker: address\n  }),\n  { headers: { '0x-api-key': key, '0x-version': 'v2' } }\n);",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: build a swap UI on Base using the 0x Swap API v2 with Permit2 + gasless option.

Steps:
1. Add a server route handler at app/api/quote/route.ts that proxies to https://api.0x.org/swap/permit2/quote with chainId=8453, forwarding sellToken/buyToken/sellAmount/taker. The 0x-api-key header is read server-side from ZEROEX_API_KEY (NEVER expose to client).
2. Create components/Swap.tsx as a client component: token selector, input amount, calls /api/quote on debounced change.
3. On Swap click: if the response includes a Permit2 EIP-712 message, use signTypedDataAsync (wagmi) to sign it, then call useWriteContract with the returned transaction.to / .data / .value.
4. Show the route breakdown from the response.routes field.
5. Add gasless mode: use the /swap/gasless/quote endpoint instead — the user only signs an EIP-712 message, 0x relays the tx.

Don't reimplement Permit2 — let the 0x response drive what to sign. Keep the API key on the server.`
          }
        ]
      },
      {
        id: "defi",
        resources: [
          {
            name: "Aave v3",
            tagline: "Lending / borrowing — Base mainnet'te aktif.",
            blurb: "Aave v3 Base'de tam destekli; supply, borrow, repay, withdraw, e-mode, isolated mode. Pool address resmi (0xA238Dd80C259a72e81d7e4664a9801593F98d1c5).",
            whyVibeCoder: "Faiz kazanma / yield UI yazıyorsan: useReadContract(getReserveData) + supply()/withdraw() yeter. Alfa.",
            url: "https://aave.com/",
            docsUrl: "https://docs.aave.com/developers/getting-started/readme",
            installCmd: "npm install @aave/contract-helpers",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: let users supply USDC and earn aUSDC interest via Aave v3 on Base.

Steps:
1. Install @aave/contract-helpers + viem.
2. Add lib/aave.ts with the Pool address (0xA238Dd80C259a72e81d7e4664a9801593F98d1c5) and Pool ABI fragments (supply, withdraw, getReserveData).
3. Build <SupplyForm /> client component: input USDC amount → approve USDC to Pool → call pool.supply(USDC, amount, user, 0). Show "earning ~X% APY" using the rate from getReserveData (liquidityRate / 1e25).
4. Build <WithdrawForm /> using pool.withdraw.
5. Display user's aUSDC balance using useReadContract(aUsdcAddress, balanceOf).
6. Hardcode Base USDC = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913, aUSDC = 0x4e65fE4DbA92790696d040ac24Aa414708F5c0AB.

Do NOT implement borrow flow yet — that needs collateral risk UI; supply-only first.`
          },
          {
            name: "Morpho",
            tagline: "Curated lending vault'ları; Base'de en derin TVL.",
            blurb: "Morpho Blue + MetaMorpho vault'ları. Risk küratörü seçilebilir vault'lar üzerinden lending. SDK ile vault listele, deposit, withdraw — Aave'den daha modüler.",
            whyVibeCoder: "Aave'den daha esnek vault seçenekleri. UI'da farklı vault risk profilleri gösterebilirsin.",
            url: "https://morpho.org/",
            docsUrl: "https://docs.morpho.org/build/",
            installCmd: "npm install @morpho-org/blue-sdk @morpho-org/blue-sdk-viem",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: integrate Morpho MetaMorpho USDC vaults on Base.

Steps:
1. Install @morpho-org/blue-sdk and @morpho-org/blue-sdk-viem.
2. Add lib/morpho.ts with the MetaMorpho factory address on Base and a list of curated USDC vaults from https://app.morpho.org (e.g. Steakhouse USDC vault).
3. Build <VaultPicker /> showing each vault's APY (read from vault.totalAssets vs lastTotalAssets), curator name, and total deposits.
4. On select, build <DepositForm /> that approves USDC to the vault and calls vault.deposit(amount, user).
5. Add <WithdrawForm /> using vault.withdraw or vault.redeem(shares, user, user).
6. Use viem multicall to batch reads.

Don't implement Morpho Blue's raw markets unless the user explicitly asks — MetaMorpho vaults handle the risk for them.`
          },
          {
            name: "Compound v3",
            tagline: "Komut açık lending markets, USDC odaklı.",
            blurb: "Compound v3 (Comet), tek-asset borrowing modeliyle Base'de USDC + WETH market'leri sunar. Daha sade ABI, izole risk.",
            whyVibeCoder: "Aave'den daha az ekran, daha basit konsept. Bir USDC vault demosu için yeter.",
            url: "https://compound.finance/",
            docsUrl: "https://docs.compound.finance/",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: integrate Compound v3 (Comet) USDC market on Base.

Steps:
1. Add lib/compound.ts with the Base USDC Comet address (0xb125E6687d4313864e53df431d5425969c15Eb2F).
2. Build <SupplyForm /> that approves USDC to Comet and calls comet.supply(USDC, amount).
3. Build <WithdrawForm /> calling comet.withdraw(USDC, amount).
4. Show the user's balance via comet.balanceOf(user) (returns supplied USDC) and the supply APR from comet.getSupplyRate(util) where util = comet.getUtilization().
5. Show a borrow widget too: collateral assets are listed via comet.getAssetInfo(0..N). Supply WETH as collateral, borrow USDC. Add a "health factor" indicator using comet.borrowBalanceOf and comet.getBorrowRate.

Use Compound v3 only — do not touch v2 markets. They are deprecated on most chains.`
          }
        ]
      },
      {
        id: "infra",
        resources: [
          {
            name: "Coinbase Cloud RPC (CDP)",
            tagline: "Base mainnet + Sepolia için resmi RPC + indexing.",
            blurb: "Coinbase Developer Platform — Base'in resmi RPC sağlayıcısı. Paymaster, Bundler, Smart Wallet API'leri tek dashboard'dan. Free tier yeterli.",
            whyVibeCoder: "OnchainKit zaten CDP key istiyor; aynı key'le Paymaster ve RPC. Tek dashboard, tek fatura.",
            url: "https://www.coinbase.com/cloud",
            docsUrl: "https://portal.cdp.coinbase.com",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: route all Base RPC calls through Coinbase Developer Platform.

Steps:
1. Sign me up: walk through https://portal.cdp.coinbase.com → create project → grab API key.
2. Add NEXT_PUBLIC_CDP_KEY to .env.example.
3. In wagmi config, override the Base transport: \`http(\`https://api.developer.coinbase.com/rpc/v1/base/\${process.env.NEXT_PUBLIC_CDP_KEY}\`)\`.
4. If using OnchainKit, pass the same key to OnchainKitProvider's apiKey prop.
5. For server-side reads (RSC), create a viem publicClient using the same RPC URL but with the server-only env CDP_KEY (no NEXT_PUBLIC_ prefix).
6. Set up a Paymaster URL pattern: https://api.developer.coinbase.com/rpc/v1/base/PAYMASTER/$KEY for sponsored gas.

Do not put the key directly in code or commit it. Use process.env strictly.`
          },
          {
            name: "Alchemy",
            tagline: "Enhanced RPC, webhooks, embedded accounts.",
            blurb: "Alchemy SDK + Account Kit. Smart wallet alternatif, webhook-based real-time event akışı, NFT API'leri.",
            whyVibeCoder: "Notification-driven UX (yeni token transferi → push) için webhook'lar tek satır kurulum.",
            url: "https://www.alchemy.com/base",
            docsUrl: "https://docs.alchemy.com/reference/base-api-quickstart",
            installCmd: "npm install alchemy-sdk",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: use Alchemy as the RPC + event provider on Base.

Steps:
1. Install alchemy-sdk and viem.
2. Add ALCHEMY_KEY to .env.example.
3. Override the Base RPC URL in wagmi config: \`http(\`https://base-mainnet.g.alchemy.com/v2/\${process.env.NEXT_PUBLIC_ALCHEMY_KEY}\`)\`.
4. For server-side enriched reads, create lib/alchemy.ts that exports an Alchemy SDK client using Network.BASE_MAINNET.
5. Add a /api/webhook/alchemy route handler to receive Alchemy custom-webhook events (set up the webhook in dashboard.alchemy.com pointing to this URL). Validate the X-Alchemy-Signature header against ALCHEMY_WEBHOOK_SECRET.
6. Document both env vars (ALCHEMY_KEY, ALCHEMY_WEBHOOK_SECRET) in .env.example.

For embedded accounts, prefer Coinbase Smart Wallet on Base — Alchemy Account Kit is great elsewhere but Smart Wallet is the Base-native default.`
          },
          {
            name: "QuickNode",
            tagline: "Düşük gecikmeli RPC + streams.",
            blurb: "QuickNode, dedicated endpoint'ler ile çok düşük gecikme, Streams (real-time blockchain event firehose) ve Functions (serverless compute) sunar.",
            whyVibeCoder: "Latency-sensitive bir şey yapıyorsan (örn. arbitrage UI, mempool watcher), QuickNode dedicated endpoint en hızlısı.",
            url: "https://www.quicknode.com/chains/base",
            docsUrl: "https://www.quicknode.com/docs/base",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: use QuickNode as the Base RPC + Streams provider for real-time event indexing.

Steps:
1. Add QUICKNODE_BASE_URL to .env.example (a personal dedicated URL like https://example.base-mainnet.quiknode.pro/abc).
2. Override Base transport in wagmi config to use it.
3. Add lib/quicknode-stream.ts with a Streams subscription example: filter for ERC-20 Transfer logs to/from the user's wallet address; webhook to /api/qn-stream.
4. Implement /api/qn-stream/route.ts to receive Stream payloads and push them to a WebSocket / SSE channel for the client.
5. Document the Stream setup steps (dashboard URL, filter JSON example, webhook endpoint) in docs/QUICKNODE_SETUP.md.

Do not poll RPC for events when QuickNode Streams can push them. Polling is wasted bandwidth.`
          },
          {
            name: "Pimlico",
            tagline: "ERC-4337 bundler / paymaster — gasless transactions.",
            blurb: "Pimlico, Base için ERC-4337 bundler + Verifying Paymaster + Singleton Paymaster. Coinbase Paymaster yerine bağımsız bir alternatif.",
            whyVibeCoder: "Coinbase ekosisteminden bağımsız bir paymaster istiyorsan — Pimlico'nun verifying paymaster'ı sponsorluk politikalarını JSON ile tanımlatır.",
            url: "https://pimlico.io/",
            docsUrl: "https://docs.pimlico.io/permissionless/tutorial/base",
            installCmd: "npm install permissionless viem",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: send sponsored (gasless) UserOperations on Base via Pimlico.

Steps:
1. Install permissionless and viem.
2. Add PIMLICO_API_KEY to .env.example. Construct bundler URL: https://api.pimlico.io/v2/base/rpc?apikey=$PIMLICO_API_KEY.
3. Create lib/pimlico.ts that creates a smart account client (toSimpleSmartAccount with the user's wagmi signer) and a bundler client.
4. Add a sponsoredSend(to, value, data) helper that builds a user operation and sets paymasterAndData using pimlicoPaymasterClient.sponsorUserOperation.
5. Wire a "Send sponsored tx" button into a demo page that invokes sponsoredSend with a no-op call to the user's own address.
6. Add a server-side check that limits sponsorship to authenticated users (otherwise anyone can drain your paymaster credits).

Always rate-limit sponsorship server-side. Don't expose the Pimlico key to the client.`
          }
        ]
      },
      {
        id: "data",
        resources: [
          {
            name: "BaseScan",
            tagline: "Etherscan-style block explorer + verifier.",
            blurb: "Base'in resmi explorer'ı. Contract verification, ABI export, transaction tracer, internal call viewer. API endpoint'leri Etherscan v2 uyumlu.",
            whyVibeCoder: "Foundry verify --etherscan-api-key ile tek satır kontrat doğrulama. ABI'ı tarayıcıdan kopyala-yapıştır.",
            url: "https://basescan.org/",
            docsUrl: "https://docs.basescan.org/",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: enable BaseScan API access for contract verification + tx queries.

Steps:
1. Walk me through getting a BaseScan API key from https://basescan.org/myapikey.
2. Add BASESCAN_API_KEY to .env.example.
3. If Foundry is in the repo, update foundry.toml etherscan section: \`base = { key = "\${BASESCAN_API_KEY}", url = "https://api.basescan.org/api" }\`.
4. If Hardhat is in the repo, add etherscan: { apiKey: { base: process.env.BASESCAN_API_KEY } } to hardhat.config.ts.
5. Write a small util fetchAbi(address) in lib/basescan.ts that calls https://api.basescan.org/api?module=contract&action=getabi&address=...&apikey=$BASESCAN_API_KEY and caches the result in memory for the dev session.
6. Add a CLI script scripts/verify.sh that runs forge verify-contract for the latest deploy.

Don't expose the BaseScan key to the client. Server-side / build-time only.`
          },
          {
            name: "Dune",
            tagline: "SQL ile onchain analitik dashboard'ları.",
            blurb: "Dune'da Base verisi tam — DuneSQL ile any-table query. Public dashboard'lar, embed'lenebilir grafikler, Dune API ile programatik veri.",
            whyVibeCoder: "İddialı bir 'protocol stats' sayfası lazımsa: Dune query yaz, embed iframe atla, bitti.",
            url: "https://dune.com/browse/dashboards?q=base",
            docsUrl: "https://docs.dune.com/api-reference/overview/introduction",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: pull live analytics from Dune queries into my dApp.

Steps:
1. Add DUNE_API_KEY to .env.example.
2. Create app/api/dune/[queryId]/route.ts: GET handler that calls https://api.dune.com/api/v1/query/{queryId}/results with the X-Dune-API-Key header. Cache 60s on the server (use Next's fetch revalidate).
3. Create components/DuneChart.tsx — fetches from /api/dune/$queryId on mount, renders a line/bar chart with Recharts (install if not present).
4. For embed-only use, add components/DuneEmbed.tsx that just renders an iframe with src=https://dune.com/embeds/$queryId/$visualizationId/.
5. Add a sample wired up to a public Base dashboard query.

Don't expose DUNE_API_KEY client-side. The /api/dune route is the only proxy.`
          },
          {
            name: "Goldsky",
            tagline: "Subgraph'ler ve real-time mirror pipeline'ları.",
            blurb: "Goldsky — Base destekli subgraph hosting + Mirror (raw event → Postgres / Webhook pipeline). The Graph alternatifi olarak hızlı.",
            whyVibeCoder: "Custom subgraph yazmaktan korkuyorsan Mirror ile sadece event filter ver, Postgres'e dökülsün.",
            url: "https://goldsky.com/",
            docsUrl: "https://docs.goldsky.com/chains/base",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: stream Transfer events from a specific Base ERC-20 to my Postgres via Goldsky Mirror.

Steps:
1. Sign up at https://goldsky.com and create a project.
2. Define a Mirror pipeline (in goldsky.yaml at repo root) that filters for Transfer events on the target token contract address on Base mainnet.
3. Add a webhook destination pointing to /api/goldsky-mirror in this app, OR a Postgres destination if I provide DATABASE_URL.
4. Implement /api/goldsky-mirror/route.ts to receive Mirror events and either store them or fan them out via SSE to the client.
5. Document the Goldsky CLI commands (goldsky pipeline apply, goldsky pipeline start) in docs/GOLDSKY.md.

Subgraph route is heavier — only suggest it if user wants complex graph queries. For "give me events" use Mirror.`
          }
        ]
      },
      {
        id: "ai",
        resources: [
          {
            name: "Coinbase AgentKit",
            tagline: "AI agent'lara cüzdan + onchain action toolkit.",
            blurb: "Coinbase'in resmi AI agent SDK'sı. LangChain / Vercel AI / OpenAI Agents adapter'ları, hazır action set'leri (transfer, swap, deploy contract). Smart wallet + Paymaster ile gas-sponsored agent transaction'ları.",
            whyVibeCoder: "Agent'a 'send 0.1 USDC to 0x...' demek için tek satır. Action set'leri import et, ToolCalling LLM'inden çalıştır.",
            url: "https://github.com/coinbase/agentkit",
            docsUrl: "https://docs.cdp.coinbase.com/agentkit/welcome",
            installCmd: "npm install @coinbase/agentkit @coinbase/agentkit-langchain",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: wire up an AI agent that can transact on Base autonomously using Coinbase AgentKit.

Steps:
1. Install @coinbase/agentkit, @coinbase/agentkit-langchain, langchain, @langchain/openai.
2. Add CDP_API_KEY_NAME, CDP_API_KEY_PRIVATE_KEY, OPENAI_API_KEY to .env.example.
3. Create lib/agent.ts that initializes an AgentKit instance with CdpWalletProvider (network 'base-mainnet'), then wraps with getLangChainTools(agentKit) for tool calling.
4. Build app/api/agent/route.ts: POST endpoint that takes a user prompt, runs the agent with the LangChain tools, streams the response back via SSE.
5. Build components/AgentChat.tsx — a "use client" chat UI that posts to /api/agent and renders streamed responses with each tool-call result inlined.
6. Restrict the actions: enable only [Transfer, Swap, GetBalance, ReadContract] for the demo. Do NOT enable DeployContract until after a feature-flag gate.

Always sandbox spending: enforce a max-USD-per-day cap server-side before sending any transaction. Log every agent action.`,
            badge: "AI"
          },
          {
            name: "x402",
            tagline: "HTTP 402 üzerinden agentic ödemeler — Coinbase'in açık standartı.",
            blurb: "x402 — HTTP 402 Payment Required'i agentic ödemeler için canlandıran açık standart. İstek → 402 + payment scheme → istemci öder → sunucu cevaplar. AI agent'ların API'lere otomatik ödeme yapmasını sağlar.",
            whyVibeCoder: "API'ni para karşılığı satıyorsan: x402 middleware ekle, herhangi bir AI agent (uygun cüzdanla) tek istekte ödeyip kullansın.",
            url: "https://www.x402.org/",
            docsUrl: "https://docs.cdp.coinbase.com/x402/welcome",
            installCmd: "npm install x402-next",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: gate a paid API endpoint behind x402 so AI agents can pay per call.

Steps:
1. Install x402-next.
2. Pick the endpoint to monetize, e.g. app/api/premium-data/route.ts.
3. In middleware.ts, wrap that route with the x402 middleware: require payment of 0.001 USDC on Base mainnet, paid to my treasury address (env: X402_TREASURY).
4. The middleware automatically returns 402 with the payment quote on first call. The client (or AI agent) signs an EIP-3009 transferWithAuthorization, retries with x-payment header, and the middleware verifies + settles before letting the request through to my route.
5. Add x402.config.ts with treasury address, accepted token (USDC base), price per call.
6. Document how AI agents (Coinbase AgentKit, MCP tools) can use x402 to pay automatically.

This is a new standard (2025) — keep an eye on x402.org for protocol updates. Don't fork the middleware; pin to a specific version.`,
            badge: "Agentic"
          }
        ]
      }
    ]
  },

  // ============================================================
  // SOLANA
  // ============================================================
  {
    id: "solana",
    name: "Solana",
    tagline: "~400ms slot time L1 — sub-cent ücretler, tek global state, paralel execution.",
    about:
      "Solana, sub-saniye slot süresi ve sub-cent ücretlerle çalışan paralel L1. Programlar Rust / Anchor ile yazılır; hesap modeli sayesinde state çakışmayan işlemler paralel execute edilir. SPL token standardı, Program Derived Address'ler, ve Versioned Transactions bütün UX'i hızlı tutar.",
    vibePitch:
      "Tek bir RPC çağrısıyla 50 hesap okuyabilirsin, sub-cent ücret demek mikro-payment ekonomisinin canlandığı tek L1. solana.new ile AI-ready bir scaffold tek satır, sonra Cursor + Claude'a 'add a Jupiter swap' demek bütün TWAP execution'ı kurar.",
    primaryColor: "#9945FF",
    accentColor: "#14F195",
    logoSrc: "/brands/solana-logo.svg",
    squareSrc: "/brands/solana-mark.svg",
    brandKitUrl: "https://solana.com/branding",
    docsUrl: "https://solana.com/docs",
    ecosystemUrl: "https://solana.com/ecosystem",
    ecosystemLabel: "Solana ekosistemi",
    brandAssets: [
      { src: "/brands/solana-mark.svg", filename: "solanaLogoMark.svg", label: "Logomark · Gradient", variant: "color", bg: "dark" },
      { src: "/brands/solana-logo.svg", filename: "solanaLogo.svg", label: "Full Lockup · Light wordmark", variant: "color", bg: "dark" },
      { src: "/brands/solana-wordmark.svg", filename: "solanaWordMark.svg", label: "Wordmark", variant: "dark", bg: "light" },
      { src: "/brands/solana-vertical.svg", filename: "solanaVerticalLogo.svg", label: "Vertical Lockup", variant: "color", bg: "dark" },
      { src: "/brands/solana-foundation.svg", filename: "solanaFoundationLogo.svg", label: "Foundation", variant: "color", bg: "dark" }
    ],
    sections: [
      {
        id: "starters",
        resources: [
          {
            name: "solana.new CLI",
            tagline: "Tek satır kurulum — AI-ready Solana app scaffold.",
            blurb: "SendAI + Superteam'in kuratör scaffold'u. Cursor + Claude için optimized, Privy + Phantom + Jupiter + Helius hazır gelen Next.js + TypeScript şablonu.",
            whyVibeCoder: "AI ile build ediyorsan: bu CLI sana Cursor rules + dokümantasyon + ön-konfigürasyonlu provider'lar verir. Boş klasörden TWAP execution'a 5 dakika.",
            url: "https://www.solana.new/",
            docsUrl: "https://github.com/sendaifun/solana-new",
            installCmd: "curl -fsSL https://www.solana.new/setup.sh | bash",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: bootstrap a new Solana dApp inside this monorepo using solana.new.

Steps:
1. Run \`curl -fsSL https://www.solana.new/setup.sh | bash\` in a NEW directory (e.g. apps/solana/).
2. Pick the AI-ready stack option (Privy auth, Phantom adapter, Jupiter swap, Helius RPC).
3. Move generated files into apps/solana/ if not already there. Update the root tsconfig paths to include it.
4. Read the generated .cursorrules / CLAUDE.md and copy any project-wide conventions into our root CLAUDE.md.
5. Generate a single demo page that connects Phantom, displays SOL balance, and shows a "swap 0.01 SOL → USDC" button using Jupiter's quote API.
6. Document the env vars (PRIVY_APP_ID, HELIUS_KEY) in .env.example.

Don't replace this Next.js app with the Solana one. They live as siblings under apps/.`,
            badge: "CLI"
          },
          {
            name: "Anchor",
            tagline: "Solana programları için Rust framework + IDL.",
            blurb: "Anchor, Solana program development'ta de-facto standart. Macro'larla boilerplate'i azaltır, IDL üretir, JS/TS client tarafını otomatik tip güvenli yapar.",
            whyVibeCoder: "Kontrat yazıyorsan: anchor init, anchor build, anchor test. AI'ın yazdığı Rust'ı Anchor ile sarmala — IDL sayesinde TypeScript tarafı sıfır manuel iş.",
            url: "https://www.anchor-lang.com/",
            docsUrl: "https://www.anchor-lang.com/docs",
            installCmd: "cargo install --git https://github.com/coral-xyz/anchor anchor-cli",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: add an Anchor program workspace next to my Next.js frontend.

Steps:
1. Make sure anchor-cli is installed (\`avm install latest\`).
2. Run \`anchor init programs/my-program --javascript=false\` at repo root (it scaffolds an Anchor workspace in programs/).
3. Set Anchor.toml provider cluster to "devnet" by default; commitment to "confirmed".
4. Write a sample counter program in programs/my-program/programs/my-program/src/lib.rs with initialize() and increment() instructions, both account-validated.
5. Write a TS test in programs/my-program/tests/my-program.ts using @coral-xyz/anchor that calls both instructions and asserts state.
6. After build, copy the generated IDL to apps/web/src/idl/ so the frontend can import it. Generate types with \`anchor idl type\`.
7. Add a deploy script targeting devnet and document the deployer keypair env (ANCHOR_WALLET).

Do not write raw Solana programs without Anchor unless the user asks — Anchor's account validation is critical safety.`
          },
          {
            name: "Solana Skills",
            tagline: "Etkileşimli dev kursları — Rust'tan dApp'e.",
            blurb: "Etkileşimli, hands-on Solana developer kursları. Rust temelleri, Anchor, SPL token, NFT, devnet'te canlı egzersizler.",
            whyVibeCoder: "Concept'leri öğrenmen gerekiyorsa (PDA, account model, rent) bu kursları geç, sonra geri dön.",
            url: "https://solanaskills.com/",
            docsUrl: "https://solanaskills.com/courses",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: I'm new to Solana — give me a 30-minute crash course tailored to building this app.

Steps:
1. Send me the 5 most-relevant lessons from solanaskills.com for someone with strong TS/React but new to Solana account model + PDAs.
2. Quiz me with 3 short tasks — read SOL balance, send a transfer, derive a PDA from a seed string.
3. After each task, point me to the corresponding API in @solana/web3.js v2 and the matching example in solana.new's generated code.
4. End with a one-paragraph "what's different about Solana vs EVM" cheatsheet I can keep open.

Don't generate code yet — this step is education only.`,
            badge: "Learn"
          },
          {
            name: "@solana/web3.js v2",
            tagline: "Modern, modüler Solana RPC client'ı.",
            blurb: "Anza ekibinin yeni nesil web3.js. Tree-shakeable, viem-stili composable API. Eski v1.x yerine yeni projeler için bunu kullan.",
            whyVibeCoder: "Bundle boyutu kritikse v1'den v2'ye geç — gereken kadar import et, RPC type-safe.",
            url: "https://github.com/anza-xyz/solana-web3.js",
            docsUrl: "https://github.com/anza-xyz/kit",
            installCmd: "npm install @solana/kit",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: use @solana/kit (web3.js v2) instead of legacy @solana/web3.js in this app.

Steps:
1. Install @solana/kit (and any of @solana-program/* packages we need, e.g. @solana-program/system).
2. Create lib/solana.ts that exports a configured RPC + RPC subscription client using helius URL from env.
3. Replace any @solana/web3.js imports: Connection → createSolanaRpc, PublicKey → string addresses (web3.js v2 uses base58 strings throughout), Transaction → message + signature pattern via createTransactionMessage / appendTransactionMessageInstructions / signTransactionMessageWithSigners.
4. Update wallet adapter integration to use signTransactions on the Wallet Standard interface.
5. Add a simple sendSol(to, amount) helper to verify the migration end-to-end on devnet.

Don't mix v1 and v2 in the same module. Migrate file by file.`
          }
        ]
      },
      {
        id: "wallets",
        resources: [
          {
            name: "Phantom",
            tagline: "En yaygın Solana cüzdanı — wallet adapter standardı.",
            blurb: "Phantom — Solana'nın en kullanılan cüzdanı. Wallet Standard implementasyonu, deep link, mobil in-app browser.",
            whyVibeCoder: "Tek cüzdan destekleyeceksen Phantom. Universal Wallet Adapter ile tek satır integrate.",
            url: "https://phantom.app/",
            docsUrl: "https://docs.phantom.app/",
            installCmd: "npm install @solana/wallet-adapter-react @solana/wallet-adapter-phantom @solana/wallet-adapter-react-ui",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: integrate Phantom wallet via @solana/wallet-adapter into this Next.js app.

Steps:
1. Install @solana/wallet-adapter-react, @solana/wallet-adapter-phantom, @solana/wallet-adapter-react-ui, @solana/web3.js.
2. Create a "use client" Providers wrapper in app/providers.tsx with <ConnectionProvider endpoint=$HELIUS_URL>, <WalletProvider wallets={[new PhantomWalletAdapter()]} autoConnect>, and <WalletModalProvider>.
3. Import @solana/wallet-adapter-react-ui/styles.css inside providers.tsx (NOT the layout server component).
4. Add <WalletMultiButton /> to the navbar.
5. Use useWallet() to read publicKey and signTransaction. Do NOT manage signer state in your own context.
6. For mobile: Phantom's deep link ("phantom://browse?url=...") routes users into the in-app browser. Add a "Open in Phantom" button on mobile detection.

Use Wallet Standard via the adapter — don't import the Phantom global directly. That breaks portability.`
          },
          {
            name: "Solflare",
            tagline: "Çoklu hesap, Ledger desteği, in-app browser.",
            blurb: "Solflare — Phantom alternatifi. Ledger entegrasyonu daha derin, in-app browser ve transaction simulation native. SDK'sı Wallet Adapter ile uyumlu.",
            whyVibeCoder: "Power-user / Ledger kullanıcılarını hedefliyorsan veya Phantom'a alternatif istiyorsan: Solflare adapter'ı eklemek tek satır.",
            url: "https://solflare.com/",
            docsUrl: "https://docs.solflare.com/",
            installCmd: "npm install @solana/wallet-adapter-solflare",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: add Solflare alongside Phantom in the wallet adapter list.

Steps:
1. Install @solana/wallet-adapter-solflare.
2. In the wallet provider config, add new SolflareWalletAdapter() to the wallets array.
3. Solflare exposes a 'simulateTransaction' helper before signing — wire it into a transaction preview UI: show what tokens will be debited / credited before the user clicks Sign.
4. For mobile, Solflare deep link is "solflare://browse?url=..." — add a "Open in Solflare" button when matchMedia mobile is true.
5. Register the dApp's icon URL in the wallet metadata so it shows up in Solflare's dashboard.

Always use the wallet adapter abstraction — don't import window.solflare directly.`
          },
          {
            name: "Privy (Solana)",
            tagline: "Solana embedded wallet + e-mail auth.",
            blurb: "Privy artık Solana destekli — e-mail/Google ile bağlanıp arka planda Solana embedded wallet üretir. Cross-chain (EVM + Solana) tek dashboard.",
            whyVibeCoder: "Crypto-native olmayan kullanıcı için: form-grade onboarding, sonra arka planda Solana wallet hazır.",
            url: "https://www.privy.io/",
            docsUrl: "https://docs.privy.io/guide/react/recipes/wallets/solana",
            installCmd: "npm install @privy-io/react-auth",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: configure Privy to provision Solana embedded wallets.

Steps:
1. Install @privy-io/react-auth.
2. In Providers wrapper, configure <PrivyProvider> with appId from NEXT_PUBLIC_PRIVY_APP_ID and config.embeddedWallets.solana = { createOnLogin: 'users-without-wallets' }.
3. Use useSolanaWallets() hook to access the embedded Solana wallet — call wallet.signTransaction or wallet.signAndSendTransaction.
4. Add a useSendSol(to, lamports) helper that uses the embedded wallet's sendTransaction.
5. For users who already have a Phantom/Solflare extension wallet, fall back to the wallet-adapter flow.
6. Document NEXT_PUBLIC_PRIVY_APP_ID in .env.example.

Don't mix Privy + wallet-adapter for the SAME wallet — pick one source of truth per session.`
          },
          {
            name: "Wallet Adapter",
            tagline: "Tek API ile tüm Solana cüzdanlarına bağlan.",
            blurb: "Anza Labs'ın resmi wallet adapter framework'ü. Phantom, Solflare, Backpack, Glow, Coin98 ve 30+ cüzdana tek arayüz.",
            whyVibeCoder: "Birden fazla cüzdan destekleyeceksen — wallets array'ine adapter ekle, useWallet() üzerinden hep aynı API.",
            url: "https://github.com/anza-xyz/wallet-adapter",
            docsUrl: "https://anza-xyz.github.io/wallet-adapter/",
            installCmd: "npm install @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: support multiple Solana wallets via @solana/wallet-adapter.

Steps:
1. Install @solana/wallet-adapter-react, @solana/wallet-adapter-react-ui, @solana/wallet-adapter-wallets, @solana/web3.js.
2. In Providers wrapper, set wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new BackpackWalletAdapter(), new GlowWalletAdapter()], []).
3. Use the WalletModalProvider for the connect modal.
4. Read selected wallet via useWallet().wallet?.adapter.name to surface a "Continue with X" CTA.
5. Wrap the wallets array under a "use client" component — the providers must NOT be in a server component.
6. Import the bundled styles.css once.

If you only support 1 wallet, skip the WalletModal and call connect() directly. For 2+, use the modal.`
          }
        ]
      },
      {
        id: "dex",
        resources: [
          {
            name: "Jupiter",
            tagline: "Solana'nın en derin DEX aggregator'ı + swap API.",
            blurb: "Jupiter, Solana'daki tüm DEX'leri tarar, optimal route'u tek HTTP yanıtı olarak döner. Versioned transaction + ALT desteği, swap-by-amount-in / amount-out, limit order API'si.",
            whyVibeCoder: "Swap UI yazıyorsan: fetch quote → fetch swap → wallet.signAndSendTransaction. Tüm Solana DEX'lerinden likidite, tek satır.",
            url: "https://station.jup.ag/docs/",
            docsUrl: "https://station.jup.ag/docs/swap-api/get-quote",
            codeSnippet: "const q = await fetch(`https://quote-api.jup.ag/v6/quote?` +\n  new URLSearchParams({\n    inputMint:  'So11111111111111111111111111111111111111112', // SOL\n    outputMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC\n    amount: '100000000', // 0.1 SOL\n    slippageBps: '50'\n  })).then(r => r.json());",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: build a Solana swap UI using the Jupiter v6 swap API.

Steps:
1. Install @solana/web3.js (or @solana/kit) + @solana/wallet-adapter-react.
2. Create lib/jupiter.ts with two helpers: getQuote(inputMint, outputMint, amount, slippageBps) calling https://quote-api.jup.ag/v6/quote, and getSwapTx(quote, userPublicKey) calling /v6/swap with { quoteResponse: quote, userPublicKey, wrapAndUnwrapSol: true }.
3. Build components/JupiterSwap.tsx as a "use client" component: token select (start with SOL + USDC), input amount, debounced quote fetch, "Swap" button that uses useWallet().sendTransaction with the deserialized VersionedTransaction from getSwapTx.
4. Show route hops (q.routePlan.length venues), price impact (q.priceImpactPct), and minimum received (q.otherAmountThreshold).
5. Add slippage slider (0.1 / 0.5 / 1.0%).

Do NOT write a custom router — Jupiter wins. For limit orders, use the Jupiter Limit Order API instead of an off-chain queue.`
          },
          {
            name: "DFlow",
            tagline: "MEV-protected order flow + price improvement.",
            blurb: "DFlow, retail order flow'u market maker'lara yönlendirir, price improvement + MEV koruması sağlar. Quote endpoint baseline + DFlow quote döner — fark bps cinsinden ölçülebilir kullanıcı geliri.",
            whyVibeCoder: "Slippage hassas / MEV-conscious bir trade UI yapıyorsan: DFlow quote alıp baseline ile karşılaştır, kullanıcıya '+X bps tasarruf' göster.",
            url: "https://www.dflow.net/",
            docsUrl: "https://docs.dflow.net/",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: integrate DFlow MEV-protected swap routing into my Solana dApp.

Steps:
1. Add lib/dflow.ts with two helpers: getMarketQuote(in, out, amount) (baseline AMM aggregate price, e.g. via Jupiter) and getDflowQuote(in, out, amount) (calls DFlow's quote endpoint).
2. Create components/DflowSwap.tsx — fetches both quotes in parallel, computes the bps improvement, displays "Save X bps via DFlow MEV protection".
3. On Swap click, build the transaction via DFlow's swap endpoint (returns a serialized VersionedTransaction), sign with useWallet(), send through Helius RPC.
4. Add a slippage limit: if dflow_quote.expectedOut < user_min, halt and surface the warning instead of falling back to baseline.
5. Document the API key requirement (if any) in .env.example.

Do not silently fall back to Jupiter on DFlow failure. Surface the error and let the user decide — that's the whole MEV-protection promise.`
          },
          {
            name: "Orca",
            tagline: "Concentrated liquidity AMM (Whirlpools).",
            blurb: "Orca Whirlpools — Uniswap v3-stili concentrated liquidity. SDK'sı (@orca-so/whirlpools-sdk) ile pool oluşturma, pozisyon açma, fee toplama tek satır.",
            whyVibeCoder: "LP UI yazıyorsan veya kendi havuzunu oluşturacaksan Orca SDK'sı en iyi DX.",
            url: "https://www.orca.so/",
            docsUrl: "https://docs.orca.so/",
            installCmd: "npm install @orca-so/whirlpools-sdk @orca-so/common-sdk",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: let users open a Orca Whirlpools concentrated liquidity position from this app.

Steps:
1. Install @orca-so/whirlpools-sdk @orca-so/common-sdk @coral-xyz/anchor.
2. Create lib/orca.ts that builds a WhirlpoolContext from useConnection() + useWallet().
3. Build <OpenPositionForm> — token A + B select, fee tier dropdown, lower/upper price inputs, deposit amount.
4. On submit: call WhirlpoolClient.openPosition with the resolved tickLowerIndex / tickUpperIndex from priceToTickIndex.
5. Show the user's open positions via fetchAllPositionsForOwner and offer "Collect fees" + "Close position" actions.
6. Validate the price range against current pool tickCurrentIndex; warn if the position is fully out of range.

Whirlpools concentrated liquidity is intentionally tricky. Default the fee tier to the most-liquid one for the pair, not 0.01%.`
          },
          {
            name: "Meteora",
            tagline: "Dynamic vaults + DLMM.",
            blurb: "Meteora — Dynamic Liquidity Market Maker (DLMM, bin-based concentrated liquidity) + Dynamic Vault'lar (lending üstüne LP'leme). High-yield setup'lar için.",
            whyVibeCoder: "DLMM bin allocation UI'ı agresif görünür ama SDK'sı temiz. Yield-stacking demolari için.",
            url: "https://www.meteora.ag/",
            docsUrl: "https://docs.meteora.ag/",
            installCmd: "npm install @meteora-ag/dlmm",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: integrate Meteora DLMM positions into my dApp.

Steps:
1. Install @meteora-ag/dlmm and @solana/web3.js.
2. Create lib/meteora.ts that loads a DLMM pool via DLMM.create(connection, poolAddress).
3. Build <MeteoraPosition /> showing the active bin, the user's existing position (if any), and a deposit form with Spot / Curve / BidAsk strategy presets (don't make users pick raw bin distributions).
4. On deposit: call dlmm.initializePositionAndAddLiquidityByStrategy with the chosen strategy.
5. Surface the live APR (read from pool.bin reward emissions) and the fees collected via dlmm.getPositionsByUserAndLbPair.

Default to "Spot" strategy. The other two need explainer copy that we don't want to write in v1.`
          }
        ]
      },
      {
        id: "defi",
        resources: [
          {
            name: "Kamino",
            tagline: "Lending + concentrated liquidity vault'ları.",
            blurb: "Kamino Lend (lending market) + Kamino Vault'lar (otomatik-rebalance LP). Klasik lending API'si supply/borrow/withdraw, vault'lar one-click yield.",
            whyVibeCoder: "Idle capital'i yield'a çevirmek istiyorsan: Kamino Lend'e deposit, kToken al, geri çekerken yield dahil.",
            url: "https://kamino.finance/",
            docsUrl: "https://docs.kamino.finance/",
            installCmd: "npm install @kamino-finance/klend-sdk",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: let users earn yield by supplying USDC to a Kamino lending vault.

Steps:
1. Install @kamino-finance/klend-sdk and @solana/web3.js.
2. Create lib/kamino.ts that loads the main USDC market and exposes supply(amount) / withdraw(amount) helpers using the SDK's KaminoMarket.load + buildSupplyTxn.
3. Build <KaminoSupply /> — input USDC amount, "Supply" button. After supply, store the kToken mint balance in state.
4. Build <KaminoWithdraw /> reading the user's current kToken balance, computing the underlying USDC value (depositValueLamports), and calling buildWithdrawTxn.
5. Show the live APY for the chosen reserve (read from reserveData.exchangeRate / utilization).
6. Use the SDK's "best APY vault" picker to default the user to the highest-yield USDC vault.

Lending only — do NOT enable borrow flow without a liquidation-risk UI.`
          },
          {
            name: "Sanctum",
            tagline: "LST altyapısı — her şey için liquid staking.",
            blurb: "Sanctum, Solana'nın LST router'ı. Herhangi bir LST'yi (mSOL, jitoSOL, bSOL, ...) başka bir LST'ye doğrudan yönlendirebilir, infinite-pool yapısıyla minimal slippage.",
            whyVibeCoder: "LST swap UI'ı yazıyorsan: Sanctum'un router API'si bütün LST'leri tek havuz gibi kullandırır.",
            url: "https://www.sanctum.so/",
            docsUrl: "https://learn.sanctum.so/",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: integrate Sanctum's LST router so users can swap between any liquid staking tokens with minimal slippage.

Steps:
1. Add lib/sanctum.ts that wraps Sanctum's HTTP API: getQuote(fromLst, toLst, amount), getSwapTx(quote, userPubkey).
2. Build <LstSwap /> — dropdown of supported LSTs (mSOL, jitoSOL, bSOL, INF, hSOL, jupSOL, etc.), input amount, quote display, swap button.
3. The transaction returned by /swap is already a serialized VersionedTransaction — deserialize, sign with useWallet().sendTransaction.
4. Show conversion rate vs raw SOL (LST exchange rate) so users see they're not losing value.
5. Optional: add an "Auto-route to highest-yield LST" toggle that picks the LST with the best APR from Sanctum's listings endpoint.

Use Sanctum router for LST↔LST. For SOL↔LST, the LST issuer's stake/unstake instructions are still cheaper.`
          },
          {
            name: "Marinade",
            tagline: "mSOL — likit staking standardı.",
            blurb: "Marinade Finance — Solana'nın en eski LST'si. SDK ile SOL stake et, mSOL al; unstake instant veya delayed.",
            whyVibeCoder: "Sadece 'kullanıcı SOL'unu stake etsin, mSOL alsın' istiyorsan: Marinade SDK doğrudan tek satır.",
            url: "https://marinade.finance/",
            docsUrl: "https://docs.marinade.finance/",
            installCmd: "npm install @marinade.finance/marinade-ts-sdk",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: add a one-click "Stake SOL → get mSOL" widget via Marinade.

Steps:
1. Install @marinade.finance/marinade-ts-sdk + @solana/web3.js.
2. Create lib/marinade.ts that constructs a Marinade instance with the connection.
3. Build <StakeWidget /> — input SOL amount, calls marinade.deposit(amount) which returns the transaction; sign with wallet.
4. Build <UnstakeWidget /> — show user's mSOL balance, support both instant (lower rate, higher fee) and delayed (full rate, ~2 epochs) via marinade.liquidUnstake / marinade.orderUnstake.
5. Display the current mSOL/SOL exchange rate and the live APY.
6. Show a small explainer: "stake earns ~7% APY, mSOL is liquid and can be used in DeFi".

Default to liquid unstake with a clear "fee shown" note.`
          }
        ]
      },
      {
        id: "infra",
        resources: [
          {
            name: "Helius",
            tagline: "Enhanced RPC, webhooks, indexed APIs.",
            blurb: "Helius — Solana'nın en gelişmiş RPC + indexer'ı. Standard JSON-RPC + getAssetsByOwner (DAS), enhanced transaction parsing, webhooks, Photon (compressed NFTs).",
            whyVibeCoder: "Tek key ile RPC + DAS + webhook hepsi. Solana RPC'sini Helius'a bağla, geri kalan her şey kolaylaşır.",
            url: "https://www.helius.dev/",
            docsUrl: "https://docs.helius.dev/",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: route all Solana RPC + indexed API calls through Helius.

Steps:
1. Sign up at https://dev.helius.xyz, copy the API key.
2. Add HELIUS_KEY to .env.example. Construct two URLs: NEXT_PUBLIC_HELIUS_RPC = https://mainnet.helius-rpc.com/?api-key=$HELIUS_KEY and a websocket URL ws://...
3. Pass NEXT_PUBLIC_HELIUS_RPC to <ConnectionProvider endpoint=...> in providers.tsx.
4. Create lib/helius.ts with helpers using the DAS API: getAssetsByOwner(owner) for NFT/token listing, getEnhancedTransactions(addr) for parsed tx history.
5. Set up one webhook (in dashboard) for transactions involving the user's wallet, hitting /api/helius/route.ts in this app. Validate the webhook secret.
6. Document HELIUS_KEY and HELIUS_WEBHOOK_AUTH in .env.example.

Don't poll RPC for events when Helius webhooks can push them.`
          },
          {
            name: "QuickNode (Solana)",
            tagline: "Düşük gecikmeli RPC + Streams + Functions.",
            blurb: "QuickNode'un Solana endpoint'leri — dedicated, real-time Streams, Functions (serverless compute). Latency hassasiyetinde tercih.",
            whyVibeCoder: "MEV / arbitrage / mempool watcher gibi latency-kritik şeyler için.",
            url: "https://www.quicknode.com/chains/sol",
            docsUrl: "https://www.quicknode.com/docs/solana",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: use QuickNode as the Solana RPC + real-time event source.

Steps:
1. Add QUICKNODE_SOL_URL to .env.example (your dedicated endpoint).
2. Pass it to ConnectionProvider in providers.tsx as endpoint.
3. Set up a QuickNode Stream filtering Token Program transactions involving the user's pubkey; webhook target is /api/qn-sol-stream in this app.
4. Implement /api/qn-sol-stream/route.ts to parse the stream payload and fan out to a per-user SSE channel.
5. For Functions: write a small QN Function that returns the user's SPL token balances (cached for 30s) and call it from the client when needed.
6. Document Stream + Function setup in docs/QUICKNODE_SOL.md.

Use QN Streams instead of getProgramAccounts polling — saves credits and is real-time.`
          },
          {
            name: "Triton",
            tagline: "Yüksek-performanslı RPC operatörü.",
            blurb: "Triton One — Solana RPC altyapısı. Kurumsal kullanım, pure RPC, Helius/QuickNode'a alternatif. Düşük gecikme + yüksek SLA.",
            whyVibeCoder: "Helius / QuickNode'dan bağımsız bir yedek RPC istiyorsan. Çoklu provider'ı load-balance etmek için.",
            url: "https://triton.one/",
            docsUrl: "https://docs.triton.one/",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: add Triton as a fallback Solana RPC alongside Helius.

Steps:
1. Add TRITON_RPC_URL to .env.example (request access from triton.one).
2. Create lib/rpc-failover.ts that exports a Connection instance using a custom commitment + a wrapped fetch that tries Helius first; on 5xx or timeout, retries against Triton.
3. Use this Connection instead of a single endpoint in ConnectionProvider.
4. Log RPC failover events to the console (or to /api/log) for observability.

Use Triton ONLY as a fallback — primary should remain Helius (or QuickNode) for the enriched APIs.`
          },
          {
            name: "Pyth",
            tagline: "Push-based real-time price oracle.",
            blurb: "Pyth — Solana-native oracle. Sub-second price updates, 700+ asset, on-chain veya HTTP push. Confidence interval ile birlikte gelir.",
            whyVibeCoder: "Fiyat-bağımlı UI (örn. swap preview, leverage UI) için: Pyth Hermes HTTP/SSE → tek satır integrate.",
            url: "https://pyth.network/",
            docsUrl: "https://docs.pyth.network/price-feeds",
            installCmd: "npm install @pythnetwork/hermes-client",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: stream real-time SOL/USD + USDC/USD prices via Pyth Hermes into my UI.

Steps:
1. Install @pythnetwork/hermes-client.
2. Create lib/pyth.ts that opens an SSE stream to https://hermes.pyth.network/v2/updates/price/stream for [SOL/USD, USDC/USD] (use the official feed IDs).
3. Build a usePythPrice(feedId) hook that returns { price, confidence, publishedAt } and updates as new SSE events arrive.
4. Surface a tiny price ticker in the navbar — SOL: $X.XX (±confidence).
5. For on-chain consumption (e.g. inside a Solana program), pass the latest signed price update to the program instruction (Pyth requires you to forward the update).

Don't store stale prices. The whole point of Pyth is sub-second freshness — invalidate aggressively.`
          }
        ]
      },
      {
        id: "data",
        resources: [
          {
            name: "Birdeye",
            tagline: "Token analitik + market data API.",
            blurb: "Birdeye — Solana token analitik. Price history, top holders, large trades, security score (rug detection). API'si geniş.",
            whyVibeCoder: "Token-info pop-up'ları, fiyat grafikleri, holder distribution UI'ları için tek API.",
            url: "https://birdeye.so/",
            docsUrl: "https://docs.birdeye.so/",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: pull token analytics from Birdeye into my Solana dApp.

Steps:
1. Sign up at https://docs.birdeye.so for an API key. Add BIRDEYE_KEY to .env.example.
2. Create app/api/token/[mint]/route.ts that proxies to https://public-api.birdeye.so/defi/token_overview?address={mint}&chain=solana with the X-API-KEY header server-side.
3. Build components/TokenInfo.tsx that fetches /api/token/$mint and shows: price (24h change), market cap, volume, top 10 holders, security score (rug risk).
4. Add a price history chart using Birdeye's /defi/history_price endpoint + Recharts.
5. Cache server responses for 30 seconds.

Don't expose the API key to the client. Always proxy through /api/.`
          },
          {
            name: "Solscan",
            tagline: "Block explorer + program analitik.",
            blurb: "Solscan — Solana'nın en kullanılan explorer'ı. Tx tracer, token metadata, NFT explorer. API key ile programatik erişim.",
            whyVibeCoder: "Tx history UI'ları için: Solscan API + linkler. Açıklayıcı tx footer'ları için 'View on Solscan' standart.",
            url: "https://solscan.io/",
            docsUrl: "https://public-api.solscan.io/docs/",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: link out to Solscan and pull token metadata for the UI.

Steps:
1. Add SOLSCAN_KEY to .env.example.
2. Create lib/solscan.ts with helpers: solscanTx(sig) and solscanAddr(addr) that return https://solscan.io/tx/$sig?cluster=mainnet-beta style URLs (respect a NEXT_PUBLIC_SOLANA_CLUSTER env to switch devnet/mainnet).
3. Add a "View on Solscan ↗" footer link to every transaction confirmation toast in the app.
4. Use Solscan public API server-side at /api/solscan/token/[mint] to fetch token metadata (name, symbol, logo) when our local cache misses.
5. Cache responses for 1 hour (token metadata rarely changes).

Use Solscan ONLY for explorer links + metadata lookups. For analytics, prefer Birdeye or Dune.`
          },
          {
            name: "Dune (Solana)",
            tagline: "Solana SQL dashboard'ları.",
            blurb: "Dune'da Solana indexed verisi tam — DuneSQL ile any-query. Public dashboard'lar, embed'lenebilir.",
            whyVibeCoder: "Protocol stats sayfan için: Dune'da query yaz, embed iframe atla, bitti.",
            url: "https://dune.com/browse/dashboards?q=solana",
            docsUrl: "https://docs.dune.com/",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: pull Solana analytics from Dune queries into my app.

Steps:
1. Add DUNE_API_KEY to .env.example.
2. Create app/api/dune/[queryId]/route.ts that proxies to https://api.dune.com/api/v1/query/{queryId}/results with the X-Dune-API-Key header. Cache 60s on the server.
3. Create components/DuneChart.tsx — fetches /api/dune/$queryId on mount, renders with Recharts.
4. For zero-effort embed: components/DuneEmbed.tsx that wraps an iframe at https://dune.com/embeds/$queryId/$visualizationId/.
5. Wire one chart to a public Solana TVL dashboard query as a sample.

Don't expose the Dune API key client-side.`
          }
        ]
      },
      {
        id: "ai",
        resources: [
          {
            name: "SendAI Agent Kit",
            tagline: "AI agent'lara Solana action toolkit.",
            blurb: "SendAI Agent Kit — Solana için Coinbase AgentKit'in karşılığı. Wallet, transfer, swap (Jupiter), Pump.fun launch, Anchor program çağırma — hepsi ToolCalling-ready action'lar.",
            whyVibeCoder: "AI agent'a Solana'da bir şey yaptırmak istiyorsan: SendAI tool'larını import et, OpenAI/Claude tool calling'e ver, tamamdır.",
            url: "https://github.com/sendaifun/solana-agent-kit",
            docsUrl: "https://docs.sendai.fun/",
            installCmd: "npm install solana-agent-kit",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: wire an AI agent that can transact on Solana via SendAI's solana-agent-kit.

Steps:
1. Install solana-agent-kit and your LLM SDK (e.g. ai + @ai-sdk/anthropic).
2. Create lib/sa-agent.ts: instantiate SolanaAgentKit(privateKey, rpcUrl) — the privateKey is the AGENT's wallet, NOT the user's. Load from env: AGENT_PRIVATE_KEY (server-only).
3. Wrap the agent's actions for the LLM tool calling interface. Start with a minimal set: getBalance, transferSol, swapToken (Jupiter), getTokenData.
4. Build app/api/agent/route.ts: POST endpoint, accepts { prompt }, calls Claude/GPT with the wrapped tools, streams the response.
5. Build components/SolanaAgentChat.tsx — chat UI that POSTs to /api/agent and renders streamed tool calls inline.
6. CRITICAL: enforce a max-USD-per-day spending cap on the agent wallet server-side. Log every tool invocation.

Never put the agent's private key in NEXT_PUBLIC_*. Server-side only. Treat the agent wallet like a hot wallet — fund it minimally.`,
            badge: "AI"
          },
          {
            name: "Cursor + Claude (with solana.new)",
            tagline: "AI-ready Solana stack — bootstrap'lanmış Claude rules.",
            blurb: "solana.new ile gelen .cursorrules + CLAUDE.md, Cursor ve Claude Code'un Solana convention'larını tanımasını sağlar. Account model, PDA, IDL kullanımı için hint'ler.",
            whyVibeCoder: "Cursor / Claude Code ile vibe coding yapıyorsan: solana.new'un kuralları AI'ın boş claim yapmasını engeller, doğru SDK'ları kullandırır.",
            url: "https://www.solana.new/",
            docsUrl: "https://docs.cursor.com/context/rules-for-ai",
            integrationPrompt: `${PROMPT_CONTEXT}

Goal: copy solana.new's AI-context files (.cursorrules + CLAUDE.md) into this repo so Cursor and Claude Code follow Solana conventions.

Steps:
1. Look at https://github.com/sendaifun/solana-new for the latest .cursorrules and any CLAUDE.md template.
2. Create CLAUDE.md at repo root (or merge with existing) with sections: "Solana account model", "Use @solana/kit not legacy web3.js", "Always use Anchor for new programs", "Versioned transactions only", "Wallet adapter abstraction — never window.solana".
3. Create .cursorrules with the same conventions in Cursor's preferred format.
4. Add a "AI assistant context" link in CLAUDE.md pointing to https://www.solana.new for updates.
5. Add a brief "Anti-patterns" section: don't use legacy v1 web3.js for new code, don't sign transactions outside the wallet adapter, don't poll RPC when QuickNode/Helius webhooks exist.

Don't blindly copy — adapt to OUR repo's actual stack. If we're not using Anchor yet, leave that section out.`,
            badge: "AI"
          }
        ]
      }
    ]
  }
];

export function getNetwork(id: NetworkId): Network | undefined {
  return networks.find((n) => n.id === id);
}
