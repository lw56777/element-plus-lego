import { getRandomInt } from '@element-plus-pro/utils';
import type { ILightningRoot } from '../interfaces/lightning';

const INITIAL_ALPHA = 0.35;
const MIN_COUNT = 30;
const MAX_COUNT = 2000;

class CLightningRoot implements ILightningRoot {
  startPos: number[] = [];
  length = 0;
  degrees = 0;
  count = 0;
  direction = 0; // 生长方向（0：往左、1往右）

  constructor(
    startPos: number[],
    startIndex: number,
    length: number,
    degrees: number,
  ) {
    this.startPos = startPos;
    this.length = length;
    this.degrees = degrees;
    this.setDirection(startIndex);
  }

  setDirection(startIndex: number) {
    switch (startIndex) {
      case 0: // 上
      case 2: // 下
        if (Math.random() < 0.5) {
          this.direction = 0;
        } else {
          this.direction = 1;
        }
        break;

      case 1: // 右
        this.direction = 0;
        break;

      case 3: // 左
        this.direction = 1;
        break;

      default:
        break;
    }
  }
}

export default class CLightning {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private points: number[][] = [];
  private roots: CLightningRoot[] = [];
  private animations: Function[] = [];
  private fps: number = 0;
  private isStop: boolean = false;
  private isReseting: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = canvas.getContext('2d')!;
    this.createPoints();
    this.createRoots();
  }

  private createPoints() {
    const { width, height } = this.canvas;

    this.points = [
      // 上
      [getRandomInt(0, width), 0],

      // 右
      [width, getRandomInt(0, height)],

      // 下
      [getRandomInt(0, width), height],

      // 左
      [0, getRandomInt(0, height)],
    ];
  }

  private createRoots() {
    this.roots = [];
    let maxRootCount = getRandomInt(1, 3);
    const points = [...this.points];

    while (maxRootCount > 0) {
      let pointIndex = getRandomInt(0, points.length - 1);
      const startPos = points[pointIndex];
      const length = this.randomLength();
      const degrees = this.randomDegrees();
      const root = new CLightningRoot(startPos, pointIndex, length, degrees);
      const rootIndex = this.roots.length;

      points.splice(pointIndex, 1);
      this.roots.push(root);
      this.animations.push(() =>
        this.drawLine(startPos, length, degrees, rootIndex),
      );
      maxRootCount--;
    }
  }

  drawLine(
    startPos: number[],
    length: number,
    degrees: number,
    rootIndex: number,
  ) {
    const root = this.roots[rootIndex];
    const [x, y] = startPos;
    const endPos = this.getEndPos(root.direction, startPos, length, degrees);

    // 计算当前线条的透明度
    const alpha = this.calculateAlpha(root.count);
    const effectColor = `rgba(136, 136, 136, ${alpha})`;

    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = effectColor;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(endPos[0], endPos[1]);
    this.ctx.stroke();

    if (root.count < MIN_COUNT) {
      this.animations.push(() =>
        this.drawLine(
          endPos,
          this.randomLength(),
          degrees + this.randomDegrees(),
          rootIndex,
        ),
      );
      this.animations.push(() =>
        this.drawLine(
          endPos,
          this.randomLength(),
          degrees - this.randomDegrees(),
          rootIndex,
        ),
      );
      root.count++;
    } else if (root.count < MAX_COUNT) {
      if (Math.random() < 0.5) {
        this.animations.push(() =>
          this.drawLine(
            endPos,
            this.randomLength(),
            degrees + this.randomDegrees(),
            rootIndex,
          ),
        );
      }

      if (Math.random() < 0.5) {
        this.animations.push(() =>
          this.drawLine(
            endPos,
            this.randomLength(),
            degrees - this.randomDegrees(),
            rootIndex,
          ),
        );
      }

      root.count++;
    }
  }

  getEndPos(
    direction: number,
    startPos: number[],
    length: number,
    degrees: number,
  ) {
    const [x, y] = startPos;

    if (direction === 0) {
      return [x - length * Math.cos(degrees), y - length * Math.sin(degrees)];
    } else {
      return [x + length * Math.cos(degrees), y + length * Math.sin(degrees)];
    }
  }

  randomLength() {
    return getRandomInt(5, 10);
  }

  randomDegrees() {
    return Math.random() * 0.3;
  }

  /**
   * 计算渐变透明度
   * @param count 当前绘制次数
   * @returns 透明度值 (0-1)
   */
  private calculateAlpha(count: number): number {
    // 透明度从 INITIAL_ALPHA 开始，随着 count 增加而递减
    const progress = Math.min(count / MAX_COUNT, 1);
    const alpha = INITIAL_ALPHA * Math.exp(-progress * 2);
    return Math.max(alpha, 0.05); // 保持最小透明度，避免完全透明
  }

  getAnimations() {
    const animations = [...this.animations];
    this.animations.length = 0;
    animations.forEach(animation => animation());

    return this.animations.length === 0;
  }

  play() {
    requestAnimationFrame(() => {
      this.fps++;

      if (this.fps % 3 === 0 && !this.isStop) {
        this.isStop = this.getAnimations();
      }

      if (this.isStop && !this.isReseting) {
        this.reset();
      }

      this.play();
    });
  }

  reset() {
    this.isReseting = true;
    this.canvas.classList.add('fade-out');
    const t = setTimeout(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.createRoots();
      this.isStop = false;
      this.isReseting = false;
      this.canvas.classList.remove('fade-out');
      clearTimeout(t);
    }, 5000);
  }
}
