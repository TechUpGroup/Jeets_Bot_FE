export type JeetsSolana = {
  address: '3shn1c9kjtg655AtThsJjeYJfQESLGDpHyUpo6bhbiBs';
  metadata: {
    name: 'jeetsSolana';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'buy';
      discriminator: [102, 6, 61, 18, 1, 218, 235, 234];
      accounts: [
        {
          name: 'buyer';
          writable: true;
          signer: true;
        },
        {
          name: 'config';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [106, 101, 101, 116, 115, 95, 99, 111, 110, 102, 105, 103];
              },
            ];
          };
        },
        {
          name: 'mint';
        },
        {
          name: 'vault';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: 'account';
                path: 'mint';
              },
            ];
          };
        },
        {
          name: 'associateVault';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [97, 115, 115, 111, 99, 105, 97, 116, 101];
              },
              {
                kind: 'account';
                path: 'mint';
              },
            ];
          };
        },
        {
          name: 'associateUser';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'buyer';
              },
              {
                kind: 'const';
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ];
              },
              {
                kind: 'account';
                path: 'mint';
              },
            ];
            program: {
              kind: 'const';
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: 'feeReceiver';
          writable: true;
          relations: ['config'];
        },
        {
          name: 'fund';
          writable: true;
          relations: ['config'];
        },
        {
          name: 'operator';
          signer: true;
          relations: ['config'];
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
      ];
      args: [
        {
          name: 'amountSol';
          type: 'u64';
        },
      ];
    },
    {
      name: 'createToken';
      discriminator: [84, 52, 204, 228, 24, 140, 234, 75];
      accounts: [
        {
          name: 'payer';
          writable: true;
          signer: true;
        },
        {
          name: 'config';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [106, 101, 101, 116, 115, 95, 99, 111, 110, 102, 105, 103];
              },
            ];
          };
        },
        {
          name: 'mint';
          writable: true;
          signer: true;
        },
        {
          name: 'mintAuthority';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [109, 105, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121];
              },
            ];
          };
        },
        {
          name: 'operator';
        },
        {
          name: 'metadata';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [109, 101, 116, 97, 100, 97, 116, 97];
              },
              {
                kind: 'account';
                path: 'tokenMetadataProgram';
              },
              {
                kind: 'account';
                path: 'mint';
              },
            ];
            program: {
              kind: 'account';
              path: 'tokenMetadataProgram';
            };
          };
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'tokenMetadataProgram';
        },
        {
          name: 'rent';
        },
      ];
      args: [
        {
          name: 'name';
          type: 'string';
        },
        {
          name: 'ticker';
          type: 'string';
        },
        {
          name: 'uri';
          type: 'string';
        },
        {
          name: 'targetJeetsScore';
          type: 'u16';
        },
      ];
    },
    {
      name: 'initialize';
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: 'authority';
          writable: true;
          signer: true;
        },
        {
          name: 'operator';
        },
        {
          name: 'config';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [106, 101, 101, 116, 115, 95, 99, 111, 110, 102, 105, 103];
              },
            ];
          };
        },
        {
          name: 'mintAuthority';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [109, 105, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121];
              },
            ];
          };
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
      ];
      args: [];
    },
    {
      name: 'mint';
      discriminator: [51, 57, 225, 47, 182, 146, 137, 166];
      accounts: [
        {
          name: 'payer';
          writable: true;
          signer: true;
        },
        {
          name: 'config';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [106, 101, 101, 116, 115, 95, 99, 111, 110, 102, 105, 103];
              },
            ];
          };
        },
        {
          name: 'mint';
        },
        {
          name: 'vault';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: 'account';
                path: 'mint';
              },
            ];
          };
        },
        {
          name: 'ataVault';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [97, 115, 115, 111, 99, 105, 97, 116, 101];
              },
              {
                kind: 'account';
                path: 'mint';
              },
            ];
          };
        },
        {
          name: 'mintAuthority';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [109, 105, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121];
              },
            ];
          };
        },
        {
          name: 'operator';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
      ];
      args: [
        {
          name: 'creator';
          type: 'pubkey';
        },
        {
          name: 'price';
          type: 'u64';
        },
        {
          name: 'solTarget';
          type: 'u64';
        },
        {
          name: 'maxBuy';
          type: 'u64';
        },
      ];
    },
    {
      name: 'sell';
      discriminator: [51, 230, 133, 164, 1, 127, 131, 173];
      accounts: [
        {
          name: 'seller';
          writable: true;
          signer: true;
        },
        {
          name: 'config';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [106, 101, 101, 116, 115, 95, 99, 111, 110, 102, 105, 103];
              },
            ];
          };
        },
        {
          name: 'mint';
        },
        {
          name: 'vault';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: 'account';
                path: 'mint';
              },
            ];
          };
        },
        {
          name: 'ataVault';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [97, 115, 115, 111, 99, 105, 97, 116, 101];
              },
              {
                kind: 'account';
                path: 'mint';
              },
            ];
          };
        },
        {
          name: 'associateUser';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'seller';
              },
              {
                kind: 'const';
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ];
              },
              {
                kind: 'account';
                path: 'mint';
              },
            ];
            program: {
              kind: 'const';
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: 'feeReceiver';
          writable: true;
          relations: ['config'];
        },
        {
          name: 'fund';
          writable: true;
          relations: ['config'];
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
      ];
      args: [
        {
          name: 'amountToken';
          type: 'u64';
        },
      ];
    },
    {
      name: 'updateConfig';
      discriminator: [29, 158, 252, 191, 10, 83, 219, 99];
      accounts: [
        {
          name: 'operator';
          writable: true;
          signer: true;
        },
        {
          name: 'config';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [106, 101, 101, 116, 115, 95, 99, 111, 110, 102, 105, 103];
              },
            ];
          };
        },
      ];
      args: [
        {
          name: 'feePlatform';
          type: {
            option: 'u16';
          };
        },
        {
          name: 'feeFund';
          type: {
            option: 'u16';
          };
        },
        {
          name: 'fund';
          type: {
            option: 'pubkey';
          };
        },
        {
          name: 'newOperatorLp';
          type: {
            option: 'pubkey';
          };
        },
        {
          name: 'newFeeReceiver';
          type: {
            option: 'pubkey';
          };
        },
      ];
    },
    {
      name: 'withdraw';
      discriminator: [183, 18, 70, 156, 148, 109, 161, 34];
      accounts: [
        {
          name: 'operatorLp';
          writable: true;
          signer: true;
          relations: ['config'];
        },
        {
          name: 'config';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [106, 101, 101, 116, 115, 95, 99, 111, 110, 102, 105, 103];
              },
            ];
          };
        },
        {
          name: 'mint';
        },
        {
          name: 'vault';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: 'account';
                path: 'mint';
              },
            ];
          };
        },
        {
          name: 'ataVault';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [97, 115, 115, 111, 99, 105, 97, 116, 101];
              },
              {
                kind: 'account';
                path: 'mint';
              },
            ];
          };
        },
        {
          name: 'associateOperator';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'operatorLp';
              },
              {
                kind: 'const';
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ];
              },
              {
                kind: 'account';
                path: 'mint';
              },
            ];
            program: {
              kind: 'const';
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: 'associateCreator';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'creator';
              },
              {
                kind: 'const';
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ];
              },
              {
                kind: 'account';
                path: 'mint';
              },
            ];
            program: {
              kind: 'const';
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: 'dev';
          writable: true;
        },
        {
          name: 'creator';
          writable: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
      ];
      args: [];
    },
  ];
  accounts: [
    {
      name: 'config';
      discriminator: [155, 12, 170, 224, 30, 250, 204, 130];
    },
    {
      name: 'vault';
      discriminator: [211, 8, 232, 43, 2, 152, 117, 119];
    },
  ];
  events: [
    {
      name: 'tokenCreatedEvent';
      discriminator: [96, 122, 113, 138, 50, 227, 149, 57];
    },
    {
      name: 'tradingEvent';
      discriminator: [29, 122, 43, 227, 187, 48, 131, 190];
    },
    {
      name: 'transfer';
      discriminator: [25, 18, 23, 7, 172, 116, 130, 28];
    },
    {
      name: 'withdrawEvent';
      discriminator: [22, 9, 133, 26, 160, 44, 71, 192];
    },
  ];
  errors: [
    {
      code: 6000;
      name: 'insufficientFund';
      msg: 'Insufficient fund';
    },
    {
      code: 6001;
      name: 'invalidAmountSol';
      msg: 'Invalid amount sol';
    },
    {
      code: 6002;
      name: 'insufficientToken';
      msg: 'Insufficient token';
    },
    {
      code: 6003;
      name: 'tradingEnd';
      msg: 'Trading: completed, cannot buy';
    },
    {
      code: 6004;
      name: 'tradingNotEnd';
      msg: 'Trading: not completed';
    },
    {
      code: 6005;
      name: 'invalidAmountToken';
      msg: 'Trading: Invalid amount of token available to trade';
    },
    {
      code: 6006;
      name: 'invalidAmountSolTrade';
      msg: 'Trading: Invalid amount of sol available to trade';
    },
    {
      code: 6007;
      name: 'invalidFee';
      msg: 'Fee cannot over 100';
    },
    {
      code: 6008;
      name: 'invalidCreator';
      msg: 'Withdraw: Creator invalid';
    },
    {
      code: 6009;
      name: 'exceedMaximum';
      msg: 'Buy: Exceed max token can hold';
    },
  ];
  types: [
    {
      name: 'config';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'initialTokenReserve';
            type: 'u64';
          },
          {
            name: 'decimal';
            type: 'u8';
          },
          {
            name: 'operator';
            type: 'pubkey';
          },
          {
            name: 'operatorLp';
            type: 'pubkey';
          },
          {
            name: 'fund';
            type: 'pubkey';
          },
          {
            name: 'feeReceiver';
            type: 'pubkey';
          },
          {
            name: 'feePlatform';
            type: 'u16';
          },
          {
            name: 'feeFund';
            type: 'u16';
          },
        ];
      };
    },
    {
      name: 'tokenCreatedEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'token';
            type: 'pubkey';
          },
          {
            name: 'creator';
            type: 'pubkey';
          },
          {
            name: 'totalSupply';
            type: 'u64';
          },
          {
            name: 'targetJeetsScore';
            type: 'u16';
          },
        ];
      };
    },
    {
      name: 'tradingEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'token';
            type: 'pubkey';
          },
          {
            name: 'account';
            type: 'pubkey';
          },
          {
            name: 'amountSol';
            type: 'u64';
          },
          {
            name: 'amountToken';
            type: 'u64';
          },
          {
            name: 'isBuy';
            type: 'bool';
          },
          {
            name: 'virtualSolReserve';
            type: 'u64';
          },
          {
            name: 'virtualTokenReserve';
            type: 'u64';
          },
          {
            name: 'completed';
            type: 'bool';
          },
        ];
      };
    },
    {
      name: 'transfer';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'timestamp';
            type: 'u64';
          },
          {
            name: 'remain';
            type: 'pubkey';
          },
          {
            name: 'transferAmount';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'vault';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'tokenSupply';
            type: 'u64';
          },
          {
            name: 'decimal';
            type: 'u8';
          },
          {
            name: 'initialTokenReserve';
            type: 'u64';
          },
          {
            name: 'solTarget';
            type: 'u64';
          },
          {
            name: 'maxTokenBuy';
            type: 'u64';
          },
          {
            name: 'mint';
            type: 'pubkey';
          },
          {
            name: 'creator';
            type: 'pubkey';
          },
          {
            name: 'price';
            type: 'u64';
          },
          {
            name: 'completed';
            type: 'bool';
          },
        ];
      };
    },
    {
      name: 'withdrawEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'token';
            type: 'pubkey';
          },
          {
            name: 'account';
            type: 'pubkey';
          },
          {
            name: 'amountSol';
            type: 'u64';
          },
          {
            name: 'amountToken';
            type: 'u64';
          },
        ];
      };
    },
  ];
  constants: [
    {
      name: 'ataVault';
      type: 'bytes';
      value: '[97, 115, 115, 111, 99, 105, 97, 116, 101]';
    },
    {
      name: 'configSeed';
      type: 'bytes';
      value: '[106, 101, 101, 116, 115, 95, 99, 111, 110, 102, 105, 103]';
    },
    {
      name: 'mintAuthority';
      type: 'bytes';
      value: '[109, 105, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121]';
    },
    {
      name: 'percent';
      type: 'u64';
      value: '10000';
    },
    {
      name: 'vault';
      type: 'bytes';
      value: '[118, 97, 117, 108, 116]';
    },
  ];
};
