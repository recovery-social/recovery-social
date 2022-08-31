import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-recover-success',
  templateUrl: './recover-success.component.html',
  styleUrls: ['./recover-success.component.scss']
})
export class RecoverSuccessComponent implements OnInit {

  private canvas?: HTMLCanvasElement;
  private confettiCanvas: any;
  private confettiLib: any;

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.celebrate()
  }

  async importCanvas(): Promise<any> {
    //@ts-ignore
    this.confettiLib = await import("canvas-confetti");
    this.canvas = this.renderer2.createElement("canvas");
  }

  celebrate(): void {
    console.log("celebrate");
    let checkCanvasConfettiExists = async () => Promise.resolve();
    if (!this.confettiCanvas) {
      checkCanvasConfettiExists = this.importCanvas;
    }
    checkCanvasConfettiExists
      .call(this)
      .then(() => {
        this.renderer2.appendChild(this.elementRef.nativeElement, this.canvas); // append the canvas

        this.confettiCanvas = this.confettiLib.create(this.canvas, {
          resize: true,
        });
        const end = Date.now() + 10 * 1000;
        const interval = setInterval(() => {
          if (Date.now() > end) {
            clearInterval(interval);
            return;
          }
          var colors = ["#f38b90", "#6199ff", "#FFFFFF"];
          
          this.confettiCanvas({
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            shapes: ["square", "circle"],
            colors: colors,
            origin: {
              x: Math.random(),
              y: Math.random() - 0.2,
            },
          });
        }, 500);
      });
  }
}
