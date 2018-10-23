import { Directive, OnInit, Input, ViewContainerRef, TemplateRef } from '@angular/core'

@Directive({
  selector: '[carousel]'
})
export class Carousel implements OnInit {
  @Input('carouselFrom')
  private steps: string[]
  private currentStepIndex: number = 0

  constructor(private vcr: ViewContainerRef, private tmpl: TemplateRef<any>) {}

  ngOnInit(): void {
    this.vcr.createEmbeddedView(this.tmpl, this.getContext())
  }

  prevNextStep(delta: -1 | 1): void {
    this.currentStepIndex += delta
    this.vcr.clear()
    this.vcr.createEmbeddedView(this.tmpl, this.getContext())
  }

  private getContext(): any {
    return {
      $implicit: this.steps[this.currentStepIndex],
      controller: { prev: d => this.prevNextStep(d), next: () => this.prevNextStep(1) }
    }
  }
}
