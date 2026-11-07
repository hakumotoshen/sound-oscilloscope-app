// 錄音擷取：把麥克風的原始聲音樣本，每 2048 個一包送回主程式（只在吹奏當下暫存來計算，不保存）
class OscCapture extends AudioWorkletProcessor {
  constructor() { super(); this.b = new Float32Array(2048); this.n = 0; }
  process(inputs) {
    const c = inputs[0] && inputs[0][0];
    if (c) {
      for (let i = 0; i < c.length; i++) {
        this.b[this.n++] = c[i];
        if (this.n === this.b.length) {
          this.port.postMessage({ f: currentFrame + i + 1, d: this.b }, [this.b.buffer]);
          this.b = new Float32Array(2048); this.n = 0;
        }
      }
    }
    return true;
  }
}
registerProcessor('osc-capture', OscCapture);
