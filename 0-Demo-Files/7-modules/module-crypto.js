import { sha256 } from 'k6/crypto';

export default function () {
    let hash = sha256('my-value', 'hex');
    console.log(`SHA-256: ${hash}`);
}
