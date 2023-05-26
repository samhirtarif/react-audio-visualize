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

  const ctx = canvas.getContext("2d");
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    ctx.roundRect(x, y, w, h, 50);
    ctx.fill();
  });
};
