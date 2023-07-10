interface CustomCanvasRenderingContext2D extends CanvasRenderingContext2D {
  roundRect: (
    x: number,
    y: number,
    w: number,
    h: number,
    radius: number
  ) => void;
}

export const calculateBarData = (
  frequencyData: Uint8Array,
  width: number,
  barWidth: number,
  gap: number
): number[] => {
  let units = width / (barWidth + gap);
  let step = Math.floor(frequencyData.length / units);

  if (units > frequencyData.length) {
    units = frequencyData.length;
    step = 1;
  }

  const data: number[] = [];

  for (let i = 0; i < units; i++) {
    let sum = 0;

    for (let j = 0; j < step && i * step + j < frequencyData.length; j++) {
      sum += frequencyData[i * step + j];
    }
    data.push(sum / step);
  }
  return data;
};

export const draw = (
  data: number[],
  canvas: HTMLCanvasElement,
  barWidth: number,
  gap: number,
  backgroundColor: string,
  barColor: string
): void => {
  const amp = canvas.height / 2;

  const ctx = canvas.getContext("2d") as CustomCanvasRenderingContext2D;
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (backgroundColor !== "transparent") {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  data.forEach((dp, i) => {
    ctx.fillStyle = barColor;

    const x = i * (barWidth + gap);
    const y = amp - dp / 2;
    const w = barWidth;
    const h = dp || 1;

    ctx.beginPath();
    if (ctx.roundRect) {
      // making sure roundRect is supported by the browser
      ctx.roundRect(x, y, w, h, 50);
      ctx.fill();
    } else {
      // fallback for browsers that do not support roundRect
      ctx.fillRect(x, y, w, h);
    }
  });
};
