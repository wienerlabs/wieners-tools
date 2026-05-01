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
  url: string;
  blurb: string;
  badge?: string;
};

export type Section = {
  id: CategoryId;
  resources: Resource[];
};

export type Network = {
  id: NetworkId;
  name: string;
  tagline: string;
  about: string;
  primaryColor: string;
  accentColor?: string;
  logoSrc: string;
  squareSrc: string;
  brandKitUrl: string;
  docsUrl: string;
  ecosystemUrl: string;
  ecosystemLabel: string;
  sections: Section[];
};

export const networks: Network[] = [
  {
    id: "base",
    name: "Base",
    tagline: "Coinbase'in EVM L2 ağı — düşük ücret, hızlı bilgilendirme.",
    about:
      "Base, Optimism'in OP Stack'i üzerine kurulu, Coinbase tarafından inkübe edilmiş bir Ethereum L2'sidir. EVM uyumlu, Solidity ile çalışır, Coinbase ürünleriyle native entegrasyon sağlar.",
    primaryColor: "#0052FF",
    accentColor: "#ffffff",
    logoSrc: "/brands/base-lockup.svg",
    squareSrc: "/brands/base-square.svg",
    brandKitUrl: "https://www.base.org/brand",
    docsUrl: "https://docs.base.org",
    ecosystemUrl: "https://www.base.org/ecosystem",
    ecosystemLabel: "Base ekosistemi",
    sections: [
      {
        id: "starters",
        resources: [
          {
            name: "create-onchain",
            url: "https://docs.base.org/onchainkit/getting-started",
            blurb: "Coinbase OnchainKit ile React + wagmi şablonu — tek komutla.",
            badge: "CLI"
          },
          {
            name: "Foundry",
            url: "https://book.getfoundry.sh/",
            blurb: "Hızlı Solidity build / test / deploy framework'ü."
          },
          {
            name: "Hardhat",
            url: "https://hardhat.org/",
            blurb: "Plugin'li klasik EVM developer environment."
          },
          {
            name: "Base Quickstart",
            url: "https://docs.base.org/get-started/base",
            blurb: "Wallet bağla, ilk kontratını mainnet/Sepolia'ya gönder."
          }
        ]
      },
      {
        id: "wallets",
        resources: [
          {
            name: "Coinbase Wallet SDK",
            url: "https://www.smartwallet.dev/",
            blurb: "Smart Wallet — passkey ile gasless onboarding."
          },
          {
            name: "RainbowKit",
            url: "https://www.rainbowkit.com/",
            blurb: "EVM cüzdanları için açıklayıcı connect modal."
          },
          {
            name: "Privy",
            url: "https://www.privy.io/",
            blurb: "E-mail / sosyal giriş + embedded wallet."
          },
          {
            name: "Dynamic",
            url: "https://www.dynamic.xyz/",
            blurb: "Multi-chain auth + wallet UI."
          }
        ]
      },
      {
        id: "dex",
        resources: [
          {
            name: "Uniswap",
            url: "https://docs.uniswap.org/",
            blurb: "Base'in en yüksek hacimli AMM'i; v3 + Universal Router."
          },
          {
            name: "Aerodrome",
            url: "https://aerodrome.finance/",
            blurb: "ve(3,3) modeli — Base-native veDEX."
          },
          {
            name: "0x Swap API",
            url: "https://0x.org/docs/api",
            blurb: "Çoklu kaynaktan en iyi quote'u tek endpoint'le getir."
          }
        ]
      },
      {
        id: "defi",
        resources: [
          {
            name: "Aave",
            url: "https://aave.com/",
            blurb: "Lending / borrowing — Base mainnet'te aktif."
          },
          {
            name: "Morpho",
            url: "https://morpho.org/",
            blurb: "Curated lending vault'ları; Base'de en derin TVL."
          },
          {
            name: "Compound",
            url: "https://compound.finance/",
            blurb: "Komut açık lending markets, USDC odaklı."
          }
        ]
      },
      {
        id: "infra",
        resources: [
          {
            name: "Coinbase Cloud RPC",
            url: "https://www.coinbase.com/cloud",
            blurb: "Base mainnet + Sepolia için resmi RPC + indexing."
          },
          {
            name: "Alchemy",
            url: "https://www.alchemy.com/base",
            blurb: "Enhanced RPC, webhooks, embedded accounts."
          },
          {
            name: "QuickNode",
            url: "https://www.quicknode.com/chains/base",
            blurb: "Düşük gecikmeli RPC + streams."
          },
          {
            name: "Pimlico",
            url: "https://pimlico.io/",
            blurb: "ERC-4337 bundler / paymaster — gasless transactions."
          }
        ]
      },
      {
        id: "data",
        resources: [
          {
            name: "BaseScan",
            url: "https://basescan.org/",
            blurb: "Etherscan-style block explorer."
          },
          {
            name: "Dune",
            url: "https://dune.com/browse/dashboards?q=base",
            blurb: "SQL ile onchain analitik dashboard'ları."
          },
          {
            name: "Goldsky",
            url: "https://goldsky.com/",
            blurb: "Subgraph'ler ve real-time mirror pipeline'ları."
          }
        ]
      },
      {
        id: "ai",
        resources: [
          {
            name: "Coinbase AgentKit",
            url: "https://github.com/coinbase/agentkit",
            blurb: "AI agent'lara cüzdan + onchain action toolkit'i.",
            badge: "AI"
          },
          {
            name: "x402",
            url: "https://www.x402.org/",
            blurb: "HTTP 402 üzerinden agentic ödemeler — Coinbase'in açık standartı.",
            badge: "Agentic"
          }
        ]
      }
    ]
  },
  {
    id: "solana",
    name: "Solana",
    tagline: "Yüksek throughput, düşük gecikme L1 — tek bir global state.",
    about:
      "Solana ~400ms slot süresi ile çalışan paralel L1. Rust ve Anchor framework'ü ile yazılır, sub-cent fees + tek bir global state ile hızlı UX'in temelidir.",
    primaryColor: "#9945FF",
    accentColor: "#14F195",
    logoSrc: "/brands/solana-logo.svg",
    squareSrc: "/brands/solana-mark.svg",
    brandKitUrl: "https://solana.com/branding",
    docsUrl: "https://solana.com/docs",
    ecosystemUrl: "https://solana.com/ecosystem",
    ecosystemLabel: "Solana ekosistemi",
    sections: [
      {
        id: "starters",
        resources: [
          {
            name: "solana.new CLI",
            url: "https://www.solana.new/",
            blurb: "Tek satır kurulum — AI-ready Solana app scaffold.",
            badge: "CLI"
          },
          {
            name: "Anchor",
            url: "https://www.anchor-lang.com/",
            blurb: "Solana programları için Rust framework + IDL."
          },
          {
            name: "Solana Skills",
            url: "https://solanaskills.com/",
            blurb: "Etkileşimli dev kursları — Rust'tan dApp'e."
          },
          {
            name: "Web3.js v2",
            url: "https://github.com/anza-xyz/solana-web3.js",
            blurb: "Modern, modüler Solana RPC client'ı."
          }
        ]
      },
      {
        id: "wallets",
        resources: [
          {
            name: "Phantom",
            url: "https://phantom.app/",
            blurb: "En yaygın Solana cüzdanı — wallet adapter standardı."
          },
          {
            name: "Solflare",
            url: "https://solflare.com/",
            blurb: "Çoklu hesap, Ledger, in-app browser."
          },
          {
            name: "Privy",
            url: "https://www.privy.io/",
            blurb: "Solana embedded wallet + e-mail auth."
          },
          {
            name: "Wallet Adapter",
            url: "https://github.com/anza-xyz/wallet-adapter",
            blurb: "Tek API ile tüm Solana cüzdanlarına bağlan."
          }
        ]
      },
      {
        id: "dex",
        resources: [
          {
            name: "Jupiter",
            url: "https://station.jup.ag/docs/",
            blurb: "Solana'nın en derin DEX aggregator'ı + swap API."
          },
          {
            name: "DFlow",
            url: "https://www.dflow.net/",
            blurb: "MEV-protected order flow + price improvement."
          },
          {
            name: "Orca",
            url: "https://www.orca.so/",
            blurb: "Concentrated liquidity AMM (Whirlpools)."
          },
          {
            name: "Meteora",
            url: "https://www.meteora.ag/",
            blurb: "Dynamic vaults + DLMM."
          }
        ]
      },
      {
        id: "defi",
        resources: [
          {
            name: "Kamino",
            url: "https://kamino.finance/",
            blurb: "Lending + concentrated liquidity vault'ları."
          },
          {
            name: "Sanctum",
            url: "https://www.sanctum.so/",
            blurb: "LST altyapısı — her şey için liquid staking."
          },
          {
            name: "Marinade",
            url: "https://marinade.finance/",
            blurb: "mSOL — likit staking standartı."
          }
        ]
      },
      {
        id: "infra",
        resources: [
          {
            name: "Helius",
            url: "https://www.helius.dev/",
            blurb: "Enhanced RPC, webhooks, indexed APIs."
          },
          {
            name: "QuickNode",
            url: "https://www.quicknode.com/chains/sol",
            blurb: "Düşük gecikmeli RPC + Streams + Functions."
          },
          {
            name: "Triton",
            url: "https://triton.one/",
            blurb: "Yüksek-performanslı RPC operatörü."
          },
          {
            name: "Pyth",
            url: "https://pyth.network/",
            blurb: "Push-based real-time price oracle."
          }
        ]
      },
      {
        id: "data",
        resources: [
          {
            name: "Birdeye",
            url: "https://birdeye.so/",
            blurb: "Token analitik + market data API."
          },
          {
            name: "Solscan",
            url: "https://solscan.io/",
            blurb: "Block explorer + program analitik."
          },
          {
            name: "Dune (Solana)",
            url: "https://dune.com/browse/dashboards?q=solana",
            blurb: "Solana SQL dashboard'ları."
          }
        ]
      },
      {
        id: "ai",
        resources: [
          {
            name: "SendAI Agent Kit",
            url: "https://github.com/sendaifun/solana-agent-kit",
            blurb: "AI agent'lara Solana action toolkit'i.",
            badge: "AI"
          },
          {
            name: "Cursor + Claude",
            url: "https://www.solana.new/",
            blurb: "solana.new ile bootstrap'lanmış AI-ready stack.",
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
