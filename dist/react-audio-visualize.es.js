import { jsx as j } from "react/jsx-runtime";
import { useState as B, useRef as z, useEffect as R, useCallback as C, forwardRef as F, useImperativeHandle as P } from "react";
const E = (n, o, x, m) => {
  let i = o / (x + m), l = Math.floor(n.length / i);
  i > n.length && (i = n.length, l = 1);
  const p = [];
  for (let e = 0; e < i; e++) {
    let f = 0;
    for (let r = 0; r < l && e * l + r < n.length; r++)
      f += n[e * l + r];
    p.push(f / l);
  }
  return p;
}, V = (n, o, x, m, i, l) => {
  const p = o.height / 2, e = o.getContext("2d");
  e && (e.clearRect(0, 0, o.width, o.height), i !== "transparent" && (e.fillStyle = i, e.fillRect(0, 0, o.width, o.height)), n.forEach((f, r) => {
    e.fillStyle = l;
    const s = r * (x + m), t = p - f / 2, h = x, d = f || 1;
    e.beginPath(), e.roundRect ? (e.roundRect(s, t, h, d, 50), e.fill()) : e.fillRect(s, t, h, d);
  }));
}, L = ({
  mediaRecorder: n,
  width: o = "100%",
  height: x = "100%",
  barWidth: m = 2,
  gap: i = 1,
  backgroundColor: l = "transparent",
  barColor: p = "rgb(160, 198, 255)",
  fftSize: e = 1024,
  maxDecibels: f = -10,
  minDecibels: r = -90,
  smoothingTimeConstant: s = 0.4
}) => {
  const [t, h] = B(), [d, w] = B(), [a, D] = B(), A = z(null);
  R(() => {
    if (!n.stream)
      return;
    const c = new AudioContext(), y = c.createAnalyser();
    D(y), y.fftSize = e, y.minDecibels = r, y.maxDecibels = f, y.smoothingTimeConstant = s;
    const S = c.createMediaStreamSource(n.stream);
    return S.connect(y), h(c), w(S), () => {
      S.disconnect(), y.disconnect(), c.state !== "closed" && c.close();
    };
  }, [n.stream]), R(() => {
    a && n.state === "recording" && g();
  }, [a, n.state]);
  const g = C(() => {
    if (!a || !t)
      return;
    const c = new Uint8Array(a == null ? void 0 : a.frequencyBinCount);
    n.state === "recording" ? (a == null || a.getByteFrequencyData(c), u(c), requestAnimationFrame(g)) : n.state === "paused" ? u(c) : n.state === "inactive" && t.state !== "closed" && t.close();
  }, [a, t == null ? void 0 : t.state]);
  R(() => () => {
    t && t.state !== "closed" && t.close(), d == null || d.disconnect(), a == null || a.disconnect();
  }, []);
  const u = (c) => {
    if (!A.current)
      return;
    const y = E(
      c,
      A.current.width,
      m,
      i
    );
    V(
      y,
      A.current,
      m,
      i,
      l,
      p
    );
  };
  return /* @__PURE__ */ j(
    "canvas",
    {
      ref: A,
      width: o,
      height: x,
      style: {
        aspectRatio: "unset"
      }
    }
  );
}, N = (n, o, x, m, i) => {
  const l = n.getChannelData(0), p = x / (m + i), e = Math.floor(l.length / p), f = o / 2;
  let r = [], s = 0;
  for (let t = 0; t < p; t++) {
    const h = [];
    let d = 0;
    const w = [];
    let a = 0;
    for (let u = 0; u < e && t * e + u < n.length; u++) {
      const c = l[t * e + u];
      c <= 0 && (h.push(c), d++), c > 0 && (w.push(c), a++);
    }
    const D = h.reduce((u, c) => u + c, 0) / d, g = { max: w.reduce((u, c) => u + c, 0) / a, min: D };
    g.max > s && (s = g.max), Math.abs(g.min) > s && (s = Math.abs(g.min)), r.push(g);
  }
  if (f * 0.8 > s * f) {
    const t = f * 0.8 / s;
    r = r.map((h) => ({
      max: h.max * t,
      min: h.min * t
    }));
  }
  return r;
}, M = (n, o, x, m, i, l, p, e = 0, f = 1) => {
  const r = o.height / 2, s = o.getContext("2d");
  if (!s)
    return;
  s.clearRect(0, 0, o.width, o.height), i !== "transparent" && (s.fillStyle = i, s.fillRect(0, 0, o.width, o.height));
  const t = (e || 0) / f;
  n.forEach((h, d) => {
    const w = d / n.length, a = t > w;
    s.fillStyle = a && p ? p : l;
    const D = d * (x + m), A = r + h.min, g = x, u = r + h.max - A;
    s.beginPath(), s.roundRect ? (s.roundRect(D, A, g, u, 50), s.fill()) : s.fillRect(D, A, g, u);
  });
}, $ = F(
  ({
    blob: n,
    width: o,
    height: x,
    barWidth: m = 2,
    gap: i = 1,
    currentTime: l,
    style: p,
    backgroundColor: e = "transparent",
    barColor: f = "rgb(184, 184, 184)",
    barPlayedColor: r = "rgb(160, 198, 255)"
  }, s) => {
    const t = z(null), [h, d] = B([]), [w, a] = B(0);
    return P(
      s,
      () => t.current,
      []
    ), R(() => {
      (async () => {
        if (!t.current)
          return;
        if (!n) {
          const u = Array.from({ length: 100 }, () => ({
            max: 0,
            min: 0
          }));
          M(
            u,
            t.current,
            m,
            i,
            e,
            f,
            r
          );
          return;
        }
        const A = await n.arrayBuffer();
        await new AudioContext().decodeAudioData(A, (u) => {
          if (!t.current)
            return;
          a(u.duration);
          const c = N(
            u,
            x,
            o,
            m,
            i
          );
          d(c), M(
            c,
            t.current,
            m,
            i,
            e,
            f,
            r
          );
        });
      })();
    }, [n, t.current]), R(() => {
      t.current && M(
        h,
        t.current,
        m,
        i,
        e,
        f,
        r,
        l,
        w
      );
    }, [l, w]), /* @__PURE__ */ j(
      "canvas",
      {
        ref: t,
        width: o,
        height: x,
        style: {
          ...p
        }
      }
    );
  }
);
$.displayName = "AudioVisualizer";
export {
  $ as AudioVisualizer,
  L as LiveAudioVisualizer
};
