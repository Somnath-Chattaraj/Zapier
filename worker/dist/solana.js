"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSol = sendSol;
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const connection = new web3_js_1.Connection("https://api.mainnet-beta.solana.com", "finalized");
function sendSol(to, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const keypair = web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(((_a = process.env.SOL_PRIVATE_KEY) !== null && _a !== void 0 ? _a : "")));
        console.log(keypair.publicKey);
        const transferTransaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
            fromPubkey: keypair.publicKey,
            toPubkey: new web3_js_1.PublicKey(to),
            lamports: parseFloat(amount) * web3_js_1.LAMPORTS_PER_SOL, // 0.1 => 10 ^ 8
        }));
        yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transferTransaction, [keypair]);
        console.log("sol Sent!");
    });
}
