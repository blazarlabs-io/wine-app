import {
  Blockfrost,
  C,
  Data,
  Lucid,
  SpendingValidator,
  TxHash,
  fromHex,
  toHex,
  toUnit,
  Constr,
  MintingPolicy,
  fromText,
  applyParamsToScript,
  applyDoubleCborEncoding,
  UTxO,
} from "lucid-cardano";
import { owner } from "./owner";

import plutus from "./plutus.json";

export async function mintWine() {
  const BLOCKFROST = "previewp6Xeq7xjR0tlaqjlCovmRpoCVi7l1tpz";

  const lucid = await Lucid.new(
    new Blockfrost("https://cardano-preview.blockfrost.io/api/v0", BLOCKFROST),
    "Preview"
  );

  lucid.selectWalletFromPrivateKey(owner.key);
  // lucid.selectWalletFromPrivateKey(await Deno.readTextFile("./beneficiary.sk"));

  const ownerPKH = lucid.utils.getAddressDetails(owner.address)
    .paymentCredential?.hash as string;

  const mint = {
    type: "PlutusV2",
    script: applyParamsToScript(
      applyDoubleCborEncoding(plutus.validators[2].compiledCode),
      [ownerPKH]
    ),
  };

  const mintCS = lucid.utils.mintingPolicyToId(mint as any);

  const lock = await readLockValidator();

  const distro = await readDistroValidator();

  // async function readMintValidator(): Promise<MintingPolicy> {
  //   const validator = plutus.validators[2];
  //   return {
  //     type: "PlutusV2",
  //     script: applyParamsToScript(
  //       applyDoubleCborEncoding(validator.compiledCode),
  //       [ownerPKH]
  //     ),
  //   };
  // }

  async function readLockValidator(): Promise<SpendingValidator> {
    const validator = plutus.validators[1];
    return {
      type: "PlutusV2",
      script: applyParamsToScript(
        applyDoubleCborEncoding(validator.compiledCode),
        [ownerPKH, mintCS]
      ),
    };
  }

  async function readDistroValidator(): Promise<SpendingValidator> {
    const validator = plutus.validators[0];
    return {
      type: "PlutusV2",
      script: applyParamsToScript(
        applyDoubleCborEncoding(validator.compiledCode),
        [ownerPKH]
      ),
    };
  }

  async function distroWine() {
    const unit = toUnit(mintCS, tokenName, 444);
    const utxos: UTxO[] = await lucid.utxosAtWithUnit(dAddress, unit);
    const utxo: UTxO = utxos[0];
    const value = await utxo.assets[unit];
    const outValue = value - 1n;

    const tx = await lucid
      .newTx()
      .collectFrom([utxo], redeemer)
      .attachSpendingValidator(distro)
      .payToAddress(ownerAddress, { [unit]: 1n })
      .payToContract(dAddress, { inline: dDatum }, { [unit]: outValue })
      .complete();

    const signedTx = await tx.sign().complete();

    return signedTx.submit();
  }

  const ownerAddress = owner.address;

  const lAddress = lucid.utils.validatorToAddress(lock);

  const lDatum = Data.to(
    new Constr(0, [
      new Constr(0, [
        fromText("Rioja"),
        fromText("image"),
        fromText("ipfs://QmfK8VWnUcYNjUvWuuGmU4AFbfd47dfGKvEoZKomSr451o"),
        fromText("ipfs://QmPrhhrKypNzSoYP8h1AxbwNbvmvm7QMyJED6aXcWpx5R8"),
      ]),
    ]) as any,
    new Constr(1, [BigInt(0)])
  );

  // const lockHash = lucid.utils.getAddressDetails(lAddress).paymentCredential
  //   ?.hash as string;

  const dAddress = lucid.utils.validatorToAddress(distro);
  const dDatum = Data.to(new Constr(0, [BigInt(420)]));
  // const distroHash = lucid.utils.getAddressDetails(lAddress).paymentCredential
  //   ?.hash as string;

  const tokenName = fromText("Wine"); // whatever the wine name is

  const redeemer = Data.to(new Constr(0, [BigInt(1), BigInt(0)]));
  const mintRedeemer = Data.to(
    new Constr(0, [BigInt(1), BigInt(1000), tokenName])
  );
  // const updateRedeemer = Data.to(
  //   new Constr(0, [BigInt(1), fromText("newTrackingData")])
  // );

  const distroToken = await distroWine();

  await lucid.awaitTx(distroToken);

  console.log(`Purchased Wine!
      Tx Hash: ${distroToken}
  `);

  const tx = await lucid
    .newTx()
    .mintAssets(
      {
        [toUnit(mintCS, tokenName, 100)]: BigInt(1),
        [toUnit(mintCS, tokenName, 444)]: BigInt(1000),
      },
      mintRedeemer
    )
    .attachMintingPolicy(mint as any)
    .payToContract(
      lAddress,
      { inline: lDatum },
      { [toUnit(mintCS, tokenName, 100)]: BigInt(1) }
    )
    .payToContract(
      dAddress,
      { inline: dDatum },
      { [toUnit(mintCS, tokenName, 444)]: BigInt(1000) }
    )
    .addSignerKey(ownerPKH)
    .complete();

  const signedTx = await tx.sign().complete();

  return signedTx.submit();
}
